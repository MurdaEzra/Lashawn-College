import React, { useState } from 'react';
import { supabase } from '../../contexts/supabaseClient';
import { Button } from './Button';

const initialFormData = {
  name: '',
  phone: '',
  course: '',
  preferredDate: '',
  preferredTime: ''
};

export function BookingForm() {
  const [formData, setFormData] = useState(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');
    setSubmitSuccess('');

    const { error } = await supabase.from('booking_requests').insert({
      name: formData.name,
      phone: formData.phone,
      course: formData.course,
      preferred_date: formData.preferredDate || null,
      preferred_time: formData.preferredTime || null,
      status: 'new'
    });

    if (error) {
      setSubmitError(error.message);
      setIsSubmitting(false);
      return;
    }

    setSubmitSuccess('Booking request submitted successfully.');
    setFormData(initialFormData);
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {submitError &&
      <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {submitError}
        </div>
      }
      {submitSuccess &&
      <div className="rounded-md border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-700">
          {submitSuccess}
        </div>
      }

      <div>
        <label
          htmlFor="name"
          className="mb-1 block text-sm font-medium text-gray-700">

          Full Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#2E8B57] focus:outline-none focus:ring-1 focus:ring-[#2E8B57]" />

      </div>
      <div>
        <label
          htmlFor="phone"
          className="mb-1 block text-sm font-medium text-gray-700">

          Phone Number
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#2E8B57] focus:outline-none focus:ring-1 focus:ring-[#2E8B57]" />

      </div>
      <div>
        <label
          htmlFor="course"
          className="mb-1 block text-sm font-medium text-gray-700">

          Course/Service
        </label>
        <select
          id="course"
          name="course"
          value={formData.course}
          onChange={handleChange}
          required
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#2E8B57] focus:outline-none focus:ring-1 focus:ring-[#2E8B57]">

          <option value="">Select a course or service</option>
          <optgroup label="Driving Courses">
            <option value="category-a">Category A (Motorcycles)</option>
            <option value="category-b">Category B (Cars)</option>
            <option value="category-c">Category C (Light Commercial)</option>
            <option value="category-d">Category D (Heavy Vehicles)</option>
            <option value="tuktuk">Tuktuk (Three-wheelers)</option>
          </optgroup>
          <optgroup label="Computer Courses">
            <option value="microsoft-office">Microsoft Office</option>
            <option value="basic-it">Basic IT & Networking</option>
          </optgroup>
          <optgroup label="Other Services">
            <option value="first-aid">First Aid Lessons</option>
            <option value="mechanics">Basic Mechanics</option>
            <option value="printing">Printing Services</option>
            <option value="kra-services">KRA Services</option>
            <option value="other">Other Services</option>
          </optgroup>
        </select>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="preferredDate"
            className="mb-1 block text-sm font-medium text-gray-700">

            Preferred Date
          </label>
          <input
            type="date"
            id="preferredDate"
            name="preferredDate"
            value={formData.preferredDate}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#2E8B57] focus:outline-none focus:ring-1 focus:ring-[#2E8B57]" />

        </div>
        <div>
          <label
            htmlFor="preferredTime"
            className="mb-1 block text-sm font-medium text-gray-700">

            Preferred Time
          </label>
          <select
            id="preferredTime"
            name="preferredTime"
            value={formData.preferredTime}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#2E8B57] focus:outline-none focus:ring-1 focus:ring-[#2E8B57]">

            <option value="">Select time</option>
            <option value="morning">Morning (8AM - 12PM)</option>
            <option value="afternoon">Afternoon (12PM - 4PM)</option>
            <option value="evening">Evening (4PM - 7PM)</option>
          </select>
        </div>
      </div>
      <div className="pt-2">
        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full"
          disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Book Now'}
        </Button>
      </div>
    </form>);
}
