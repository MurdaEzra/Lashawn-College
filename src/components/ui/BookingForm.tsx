import React, { useState } from 'react';
import { Button } from './Button';

export function BookingForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    course: '',
    preferredDate: '',
    preferredTime: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Your WhatsApp business/personal number (no "+" or spaces)
    const phoneNumber = '254728135200';

    // Build a neat WhatsApp message
    const message = `
📋 *New Booking Request*

👤 Name: ${formData.name}
📞 Phone: ${formData.phone}
🎓 Course/Service: ${formData.course}
📅 Preferred Date: ${formData.preferredDate || 'Not specified'}
⏰ Preferred Time: ${formData.preferredTime || 'Not specified'}

Please follow up with this client.
    `;

    // Encode for URL
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    // Open WhatsApp chat
    window.open(whatsappURL, '_blank');

    // Reset form
    setFormData({
      name: '',
      phone: '',
      course: '',
      preferredDate: '',
      preferredTime: ''
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="mb-1 block text-sm font-medium text-gray-700">
          Full Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#2E8B57] focus:outline-none focus:ring-1 focus:ring-[#2E8B57]"
        />
      </div>

      <div>
        <label htmlFor="phone" className="mb-1 block text-sm font-medium text-gray-700">
          Phone Number
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#2E8B57] focus:outline-none focus:ring-1 focus:ring-[#2E8B57]"
        />
      </div>

      <div>
        <label htmlFor="course" className="mb-1 block text-sm font-medium text-gray-700">
          Course/Service
        </label>
        <select
          id="course"
          name="course"
          value={formData.course}
          onChange={handleChange}
          required
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#2E8B57] focus:outline-none focus:ring-1 focus:ring-[#2E8B57]"
        >
          <option value="">Select a course or service</option>
          <optgroup label="Driving Courses">
            <option value="Category A (Motorcycles)">Category A (Motorcycles)</option>
            <option value="Category B (Cars)">Category B (Cars)</option>
            <option value="Category C (Light Commercial)">Category C (Light Commercial)</option>
            <option value="Category D (Heavy Vehicles)">Category D (Heavy Vehicles)</option>
            <option value="Tuktuk (Three-wheelers)">Tuktuk (Three-wheelers)</option>
          </optgroup>
          <optgroup label="Computer Courses">
            <option value="Microsoft Office">Microsoft Office</option>
            <option value="Basic IT & Networking">Basic IT & Networking</option>
          </optgroup>
          <optgroup label="Other Services">
            <option value="First Aid Lessons">First Aid Lessons</option>
            <option value="Basic Mechanics">Basic Mechanics</option>
            <option value="Printing Services">Printing Services</option>
            <option value="KRA Services">KRA Services</option>
            <option value="Other Services">Other Services</option>
          </optgroup>
        </select>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="preferredDate" className="mb-1 block text-sm font-medium text-gray-700">
            Preferred Date
          </label>
          <input
            type="date"
            id="preferredDate"
            name="preferredDate"
            value={formData.preferredDate}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#2E8B57] focus:outline-none focus:ring-1 focus:ring-[#2E8B57]"
          />
        </div>
        <div>
          <label htmlFor="preferredTime" className="mb-1 block text-sm font-medium text-gray-700">
            Preferred Time
          </label>
          <select
            id="preferredTime"
            name="preferredTime"
            value={formData.preferredTime}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#2E8B57] focus:outline-none focus:ring-1 focus:ring-[#2E8B57]"
          >
            <option value="">Select time</option>
            <option value="Morning (8AM - 12PM)">Morning (8AM - 12PM)</option>
            <option value="Afternoon (12PM - 4PM)">Afternoon (12PM - 4PM)</option>
            <option value="Evening (4PM - 7PM)">Evening (4PM - 7PM)</option>
          </select>
        </div>
      </div>

      <div className="pt-2">
        <Button type="submit" variant="primary" size="lg" className="w-full">
          Book via WhatsApp
        </Button>
      </div>
    </form>
  );
}
