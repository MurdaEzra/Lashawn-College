import React from 'react';
export function TestimonialsSection() {
  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="mb-14">
            <p className="font-accent text-xs font-semibold uppercase tracking-[0.25em] text-brand-green mb-3">
              Testimonials
            </p>
            <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-brand-charcoal">
              Testimonials Coming Soon
            </h2>
            <div className="w-16 h-[3px] bg-brand-green mt-4"></div>
          </div>

          <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 px-8 py-12 text-center">
            <p className="font-body text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Reviews Will Be Added From Google
            </p>
          </div>
        </div>
      </div>
    </section>);

}
