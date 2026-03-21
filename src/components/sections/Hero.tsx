import React from 'react';
import { Phone, ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';
export function Hero() {
  return (
    <section className="bg-brand-cream">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 min-h-[520px]">
          {/* Left — Content */}
          <div className="flex flex-col justify-center py-16 lg:py-20 lg:pr-16">
            <p className="font-accent text-xs font-semibold uppercase tracking-[0.25em] text-brand-green mb-6">
              Lashawn Driving &amp; Computer College
            </p>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-[3.4rem] font-extrabold leading-[1.1] text-brand-charcoal mb-6">
              Learn to Drive.
              <br />
              Master Computers.
              <br />
              <span className="text-brand-green">Build Your Future.</span>
            </h1>
            <p className="font-body text-lg text-gray-600 leading-relaxed mb-8 max-w-lg">
              Practical &amp; theory driving lessons across all NTSA categories,
              Microsoft &amp; IT training, and business services — taught by
              experienced instructors in Eldoret.
            </p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-10">
              <Button variant="primary" size="lg" to="/register">
                Register Now
                <ArrowRight size={18} className="ml-2" />
              </Button>
              <a
                href="tel:+254117564318"
                className="flex items-center font-accent text-sm font-semibold text-brand-charcoal hover:text-brand-green transition-colors">
                
                <div className="h-10 w-10 rounded-full border-2 border-brand-charcoal flex items-center justify-center mr-3">
                  <Phone size={16} />
                </div>
                +254 117 564 318
              </a>
            </div>
          </div>

          {/* Right — Image */}
          <div className="relative hidden lg:block">
            <div className="absolute inset-0 overflow-hidden rounded-bl-[3rem]">
              <img
                src="https://res.cloudinary.com/dgfmhyebp/image/upload/v1760686048/WhatsApp_Image_2025-10-16_at_3.02.26_PM_3_r8ryit.jpg"
                alt="Student learning to drive"
                className="w-full h-full object-cover" />
              
            </div>
          </div>
        </div>
      </div>
    </section>);

}