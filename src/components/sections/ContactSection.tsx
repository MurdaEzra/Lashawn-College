import React, { lazy } from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { Button } from '../ui/Button';
export function ContactSection() {
  return (
    <section className="bg-brand-cream py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="mb-14">
            <p className="font-accent text-xs font-semibold uppercase tracking-[0.25em] text-brand-green mb-3">
              Get In Touch
            </p>
            <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-brand-charcoal">
              Contact Us
            </h2>
            <div className="w-16 h-[3px] bg-brand-green mt-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="bg-white rounded-xl p-8 border border-gray-200">
              <h3 className="font-heading text-xl font-bold text-brand-charcoal mb-6">
                Visit Our Office
              </h3>
              <div className="space-y-5">
                <div className="flex items-start">
                  <MapPin
                    className="mr-4 mt-1 flex-shrink-0 text-brand-green"
                    size={20} />
                  
                  <span className="font-body text-gray-600">
                    Along Eldoret Roadblock — Opposite Khetias Supermarket
                  </span>
                </div>
                <div className="flex items-center">
                  <Phone
                    className="mr-4 flex-shrink-0 text-brand-green"
                    size={20} />
                  
                  <a
                    href="tel:+254117564318"
                    className="font-accent text-sm font-semibold text-brand-charcoal hover:text-brand-green transition-colors">
                    
                    +254 117 564 318
                  </a>
                </div>
                <div className="flex items-center">
                  <Mail
                    className="mr-4 flex-shrink-0 text-brand-green"
                    size={20} />
                  
                  <a
                    href="mailto:lashawnlimited@gmail.com"
                    className="font-body text-gray-600 hover:text-brand-green transition-colors">
                    
                    lashawnlimited@gmail.com
                  </a>
                </div>
                <div className="flex items-start">
                  <Clock
                    className="mr-4 mt-1 flex-shrink-0 text-brand-green"
                    size={20} />
                  
                  <div className="font-body text-gray-600">
                    <div>Monday – Friday: 8:00 AM – 6:00 PM</div>
                    <div>Saturday: 9:00 AM – 4:00 PM</div>
                    <div>Sunday: Closed</div>
                  </div>
                </div>
              </div>
              <div className="mt-8">
                <Button
                  variant="secondary"
                  href="https://www.google.com/maps?q=Eldoret+Roadblock"
                  className="w-full justify-center">
                  
                  View on Google Maps
                </Button>
              </div>
            </div>
            <div className="overflow-hidden rounded-xl border border-gray-200">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.656641285244!2d35.2616!3d0.5143!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x178101ae37f9f535%3A0xe2db337bf071c994!2sEldoret!5e0!3m2!1sen!2ske!4v1700000000000!5m2!1sen!2ske"
                width="100%"
                height="100%"
                style={{
                  border: 0,
                  minHeight: '380px'
                }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Lashawn Location">
              </iframe>
            </div>
          </div>
        </div>
      </div>
    </section>);

}