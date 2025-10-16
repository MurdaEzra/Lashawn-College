import React from 'react';
import { BookingForm } from '../ui/BookingForm';
export function QuickBookingSection() {
  return <section className="bg-[#2E8B57]/5 py-16">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl rounded-lg bg-white p-8 shadow-md">
          <div className="mb-8 text-center">
            <h2 className="mb-2 text-3xl font-bold text-gray-800">
              Book a Lesson
            </h2>
            <p className="text-gray-600">
              Fill out the form below to schedule your lesson or request more
              information about our services.
            </p>
          </div>
          <BookingForm />
        </div>
      </div>
    </section>;
}