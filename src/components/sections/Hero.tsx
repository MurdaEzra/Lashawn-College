import React from 'react';
import { Phone } from 'lucide-react';
import { Button } from '../ui/Button';
export function Hero() {
  return <div className="relative bg-gray-900 py-16 md:py-24">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0 bg-cover bg-center" style={{
      backgroundImage: "url('https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80')"
    }}>
        <div className="absolute inset-0 bg-gray-900/70"></div>
      </div>
      <div className="container relative z-10 mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center text-white">
          <h1 className="mb-4 text-3xl font-bold leading-tight md:text-4xl">
            Learn to Drive | Master Computers | Build Skills
          </h1>
          <p className="mb-8 text-lg text-gray-200 md:text-xl">
            Practical & theory driving lessons (all classes), Microsoft & IT
            training, and business services — taught by experienced instructors.
            <span className="block mt-2 font-semibold text-[#2E8B57]">
              Learn with Experts.
            </span>
          </p>
          <div className="mb-8 flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
            <Button variant="primary" size="lg" href="/booking">
              Book a Lesson
            </Button>
            <a href="tel:+254117564318" className="flex items-center rounded-full bg-white/10 px-6 py-3 text-lg font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/20">
              <Phone size={20} className="mr-2" />
              +254 117 564 318
            </a>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-sm text-gray-300">
            <div className="flex items-center">
              <div className="mr-2 h-1.5 w-1.5 rounded-full bg-[#2E8B57]"></div>
              <span>Experienced instructors</span>
            </div>
            <div className="flex items-center">
              <div className="mr-2 h-1.5 w-1.5 rounded-full bg-[#2E8B57]"></div>
              <span>Licence prep</span>
            </div>
            <div className="flex items-center">
              <div className="mr-2 h-1.5 w-1.5 rounded-full bg-[#2E8B57]"></div>
              <span>Practical & Theory</span>
            </div>
            <div className="flex items-center">
              <div className="mr-2 h-1.5 w-1.5 rounded-full bg-[#2E8B57]"></div>
              <span>Certificates issued</span>
            </div>
          </div>
        </div>
      </div>
    </div>;
}