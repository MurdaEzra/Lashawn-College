import express from 'express';
import cors from 'cors';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import axios from 'axios';
import process from 'node:process';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

const supabaseUrl = 'https://vngglknaprzwerkodnto.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZuZ2dsa25hcHJ6d2Vya29kbnRvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NTE3NTIsImV4cCI6MjA4OTQyNzc1Mn0.5w_lobzLfpq9Tc8VkzRVP-sAk7_AMHk4AeXdhuvQneA';
const supabase = createClient(supabaseUrl, supabaseKey);

const app = express();
app.use(express.json());
app.use(cors());

const googleConfig = {
  clientId: process.env.GOOGLE_BUSINESS_CLIENT_ID,
  clientSecret: process.env.GOOGLE_BUSINESS_CLIENT_SECRET,
  refreshToken: process.env.GOOGLE_BUSINESS_REFRESH_TOKEN,
  accountId: process.env.GOOGLE_BUSINESS_ACCOUNT_ID,
  locationId: process.env.GOOGLE_BUSINESS_LOCATION_ID
};

let reviewsCache = {
  expiresAt: 0,
  reviews: []
};

async function getGoogleBusinessAccessToken() {
  const response = await axios.post(
    'https://oauth2.googleapis.com/token',
    new URLSearchParams({
      client_id: googleConfig.clientId,
      client_secret: googleConfig.clientSecret,
      refresh_token: googleConfig.refreshToken,
      grant_type: 'refresh_token'
    }).toString(),
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
  );

  return response.data.access_token;
}

function mapStarRating(starRating) {
  const ratingMap = {
    ONE: 1,
    TWO: 2,
    THREE: 3,
    FOUR: 4,
    FIVE: 5
  };

  return ratingMap[starRating] || 0;
}

app.get('/google-business-reviews', async (_req, res) => {
  const missingValues = Object.entries(googleConfig)
    .filter(([, value]) => !value)
    .map(([key]) => key);

  if (missingValues.length > 0) {
    return res.status(503).json({
      error:
        'Google Business reviews are not configured yet. Missing: ' +
        missingValues.join(', ')
    });
  }

  if (reviewsCache.expiresAt > Date.now()) {
    return res.json({ reviews: reviewsCache.reviews, cached: true });
  }

  try {
    const accessToken = await getGoogleBusinessAccessToken();
    const locationName = `accounts/${googleConfig.accountId}/locations/${googleConfig.locationId}`;
    const response = await axios.get(
      `https://mybusiness.googleapis.com/v4/${locationName}/reviews`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        },
        params: {
          pageSize: 6,
          orderBy: 'updateTime desc'
        }
      }
    );

    const reviews = (response.data.reviews || []).map((review) => ({
      reviewId: review.reviewId,
      comment: review.comment || '',
      reviewerName:
        review.reviewer?.displayName ||
        (review.reviewer?.isAnonymous ? 'Google User' : 'Google Reviewer'),
      reviewerPhotoUrl: review.reviewer?.profilePhotoUrl || '',
      starRating: mapStarRating(review.starRating),
      updateTime: review.updateTime
    }));

    reviewsCache = {
      expiresAt: Date.now() + 15 * 60 * 1000,
      reviews
    };

    return res.json({ reviews, cached: false });
  } catch (error) {
    const message = axios.isAxiosError(error) ?
      error.response?.data?.error?.message || error.message :
      'Failed to fetch Google Business reviews.';

    return res.status(500).json({ error: message });
  }
});

app.post('/admin-register', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }

  const { data: existing } = await supabase
    .from('admins')
    .select('id')
    .eq('email', email)
    .single();

  if (existing) {
    return res.status(409).json({ error: 'Admin already exists.' });
  }

  const password_hash = await bcrypt.hash(password, 10);
  const { error: insertError } = await supabase
    .from('admins')
    .insert([{ email, password_hash }]);

  if (insertError) {
    return res.status(500).json({ error: 'Failed to create admin.' });
  }

  return res.json({ success: true });
});

app.post('/admin-login', async (req, res) => {
  const { email, password } = req.body;

  const { data, error } = await supabase
    .from('admins')
    .select('*')
    .eq('email', email)
    .single();

  if (error || !data) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const valid = await bcrypt.compare(password, data.password_hash);

  if (!valid) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  return res.json({ success: true });
});

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Backend running on port ${port}`);
});
