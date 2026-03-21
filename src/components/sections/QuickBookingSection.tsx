import React from 'react';
import { Button } from '../ui/Button';
import { ArrowRight } from 'lucide-react';
export function QuickBookingSection() {
  return (
    <section className="bg-brand-charcoal py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <div>
            <p className="font-accent text-xs font-semibold uppercase tracking-[0.25em] text-brand-green mb-4">
              Get Started Today
            </p>
            <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-white leading-tight mb-4">
              Ready to Start
              <br />
              Your Journey?
            </h2>
            <p className="font-body text-lg text-gray-400 leading-relaxed max-w-md">
              Visit our office to begin your driving or computer course. Our
              team will guide you through registration, help you choose the
              right category, and get you on the road.
            </p>
          </div>

          {/* Right */}
          <div className="space-y-6">
            <div className="border border-gray-700 rounded-xl p-6">
              <h3 className="font-heading text-lg font-bold text-white mb-2">
                Register for a Course
              </h3>
              <p className="font-body text-gray-400 text-sm mb-4">
                Visit our office or learn about the registration process online.
                Simple 3-step enrollment.
              </p>
              <Button variant="primary" to="/register">
                Register Now <ArrowRight size={16} className="ml-2" />
              </Button>
            </div>
            <div className="border border-gray-700 rounded-xl p-6">
              <h3 className="font-heading text-lg font-bold text-white mb-2">
                View Fee Structure
              </h3>
              <p className="font-body text-gray-400 text-sm mb-4">
                Transparent pricing for all driving categories and computer
                courses. Installment plans available.
              </p>
              <Button
                variant="outline"
                to="/fees"
                className="border-gray-500 text-gray-300 hover:bg-brand-green hover:border-brand-green hover:text-white">
                
                See All Fees <ArrowRight size={16} className="ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>);

}