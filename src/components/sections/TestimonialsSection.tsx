import React from 'react';
import { TestimonialCard } from '../ui/TestimonialCard';
export function TestimonialsSection() {
  const testimonials = [{
    quote: 'The instructors at Lashawn are professional and patient. I passed my driving test on the first attempt thanks to their excellent training.',
    name: 'Sarah Kamau',
    role: 'Category B Graduate',
    imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80'
  }, {
    quote: 'The computer courses helped me secure a job in an office. The Microsoft Excel skills I learned are invaluable in my daily work.',
    name: 'John Omondi',
    role: 'Microsoft Office Graduate',
    imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80'
  }, {
    quote: 'I appreciate how Lashawn helped me with both driving lessons and KRA registration. Their services are comprehensive and professional.',
    name: 'Mary Wanjiku',
    role: 'Satisfied Customer',
    imageUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80'
  }];
  return <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-2 text-3xl font-bold text-gray-800">
            What Our Students Say
          </h2>
          <p className="mx-auto max-w-2xl text-gray-600">
            Hear from our graduates and clients about their experience with
            Lashawn Driving and Computer College.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => <TestimonialCard key={index} quote={testimonial.quote} name={testimonial.name} role={testimonial.role} imageUrl={testimonial.imageUrl} />)}
        </div>
      </div>
    </section>;
}