import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://ocylvzrjvxeiokrcibgt.supabase.co'; 
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9jeWx2enJqdnhlaW9rcmNpYmd0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAzMTI1MDYsImV4cCI6MjA3NTg4ODUwNn0.FSaZKV74oHYGXPGOMoFivJTEMcZ3t4xctHNgmOVQKuQ';

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
