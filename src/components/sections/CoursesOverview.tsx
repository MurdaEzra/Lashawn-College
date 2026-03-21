import React from 'react';
import { Car, Monitor, Wrench, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
export function CoursesOverview() {
  return (
    <section className="bg-brand-cream py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header — left aligned, editorial */}
          <div className="mb-14">
            <p className="font-accent text-xs font-semibold uppercase tracking-[0.25em] text-brand-green mb-3">
              What We Offer
            </p>
            <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-brand-charcoal">
              Courses &amp; Services
            </h2>
            <div className="w-16 h-[3px] bg-brand-green mt-4"></div>
          </div>

          <div className="space-y-0 divide-y divide-gray-200">
            {/* Driving Courses */}
            <Link
              to="/driving-courses"
              className="group flex flex-col md:flex-row items-start gap-6 py-10 first:pt-0">
              
              <div className="flex-shrink-0 h-16 w-16 rounded-xl bg-brand-green/10 text-brand-green flex items-center justify-center">
                <Car size={28} />
              </div>
              <div className="flex-1">
                <h3 className="font-heading text-xl font-bold text-brand-charcoal mb-2 group-hover:text-brand-green transition-colors">
                  Driving Courses
                </h3>
                <p className="font-body text-gray-600 leading-relaxed max-w-2xl">
                  Professional driving instruction for all NTSA license
                  categories — from motorcycles (A1–A3) and light vehicles
                  (B1–B3) to commercial trucks (C, CE) and passenger buses
                  (D1–D3). Theory, practical, and test preparation included.
                </p>
              </div>
              <div className="flex-shrink-0 self-center">
                <ArrowRight
                  size={20}
                  className="text-gray-300 group-hover:text-brand-green group-hover:translate-x-1 transition-all" />
                
              </div>
            </Link>

            {/* Computer Courses */}
            <Link
              to="/computer-courses"
              className="group flex flex-col md:flex-row items-start gap-6 py-10">
              
              <div className="flex-shrink-0 h-16 w-16 rounded-xl bg-brand-green/10 text-brand-green flex items-center justify-center">
                <Monitor size={28} />
              </div>
              <div className="flex-1">
                <h3 className="font-heading text-xl font-bold text-brand-charcoal mb-2 group-hover:text-brand-green transition-colors">
                  Computer Courses
                </h3>
                <p className="font-body text-gray-600 leading-relaxed max-w-2xl">
                  Comprehensive computer training including Microsoft Office
                  packages, basic IT skills, and networking fundamentals.
                  Designed for beginners through advanced users looking to build
                  workplace-ready digital skills.
                </p>
              </div>
              <div className="flex-shrink-0 self-center">
                <ArrowRight
                  size={20}
                  className="text-gray-300 group-hover:text-brand-green group-hover:translate-x-1 transition-all" />
                
              </div>
            </Link>

            {/* Additional Services */}
            <Link
              to="/services"
              className="group flex flex-col md:flex-row items-start gap-6 py-10 last:pb-0">
              
              <div className="flex-shrink-0 h-16 w-16 rounded-xl bg-brand-green/10 text-brand-green flex items-center justify-center">
                <Wrench size={28} />
              </div>
              <div className="flex-1">
                <h3 className="font-heading text-xl font-bold text-brand-charcoal mb-2 group-hover:text-brand-green transition-colors">
                  Additional Services
                </h3>
                <p className="font-body text-gray-600 leading-relaxed max-w-2xl">
                  First aid training, basic mechanics, printing &amp; branding,
                  KRA assistance, HELB applications, eCitizen services, driving
                  licence renewal, and more — all under one roof.
                </p>
              </div>
              <div className="flex-shrink-0 self-center">
                <ArrowRight
                  size={20}
                  className="text-gray-300 group-hover:text-brand-green group-hover:translate-x-1 transition-all" />
                
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>);

}