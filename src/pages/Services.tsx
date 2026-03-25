import React, { useEffect, useState } from 'react';
import { Button } from '../components/ui/Button';
import {
  Printer,
  PenTool,
  Globe,
  Settings,
  FileText,
  HelpCircle,
  Repeat,
  Award,
  ArrowRight } from
'lucide-react';
import { DEFAULT_SERVICES, getStoredServices, ServiceIconKey, ServiceItem } from '../data/services';

const serviceIcons: Record<ServiceIconKey, React.ReactNode> = {
  printer: <Printer size={24} />,
  'pen-tool': <PenTool size={24} />,
  globe: <Globe size={24} />,
  settings: <Settings size={24} />,
  'file-text': <FileText size={24} />,
  'help-circle': <HelpCircle size={24} />,
  repeat: <Repeat size={24} />,
  award: <Award size={24} />
};

export function Services() {
  const [services, setServices] = useState<ServiceItem[]>(DEFAULT_SERVICES);

  useEffect(() => {
    setServices(getStoredServices());

    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'lashawnServices') {
        setServices(getStoredServices());
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Header Banner */}
      <div className="bg-brand-charcoal py-24 text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1/3 h-full bg-brand-red/10 -skew-x-12 -translate-x-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <p className="font-accent text-xs font-semibold uppercase tracking-[0.25em] text-brand-red mb-4">
              Beyond Training
            </p>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
              Professional <span className="text-brand-red">Services.</span>
            </h1>
            <p className="font-body text-xl text-gray-300 leading-relaxed max-w-2xl">
              We offer a comprehensive range of business, digital, and
              administrative services to support individuals and companies in
              Eldoret.
            </p>
          </div>
        </div>
      </div>

      {/* Intro Section - Side by Side */}
      <section className="py-16 bg-brand-cream border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-heading text-2xl font-bold text-brand-charcoal mb-4">
                Your One-Stop Solution Center
              </h2>
              <p className="font-body text-lg text-gray-700 leading-relaxed">
                At Lashawn, we understand that our students and community
                members need more than just training. Our service center is
                equipped to handle your everyday digital and administrative
                needs efficiently and professionally.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl border border-gray-200 text-center">
                <p className="font-heading text-3xl font-extrabold text-brand-red mb-1">
                  {services.length}+
                </p>
                <p className="font-accent text-xs uppercase tracking-widest text-gray-500">
                  Core Services
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl border border-gray-200 text-center">
                <p className="font-heading text-3xl font-extrabold text-brand-red mb-1">
                  Fast
                </p>
                <p className="font-accent text-xs uppercase tracking-widest text-gray-500">
                  Turnaround
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {services.map((service) =>
              <div
                key={service.id}
                className="flex bg-brand-cream border border-gray-100 rounded-r-xl overflow-hidden group">
                
                  <div className="w-2 bg-brand-green group-hover:bg-brand-red transition-colors"></div>
                  <div className="p-8 flex items-start gap-6">
                    <div className="flex-shrink-0 h-14 w-14 rounded-full bg-white text-brand-charcoal flex items-center justify-center shadow-sm group-hover:text-brand-red transition-colors">
                      {serviceIcons[service.icon]}
                    </div>
                    <div>
                      <h3 className="font-heading text-xl font-bold text-brand-charcoal mb-3">
                        {service.title}
                      </h3>
                      <p className="font-body text-gray-600 leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-brand-charcoal py-20 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-extrabold mb-6">
            Need Assistance?
          </h2>
          <p className="font-body text-xl text-gray-400 mx-auto mb-10 max-w-2xl">
            Visit our office today or contact us to learn more about our
            services and pricing.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="primary" size="lg" to="/contact">
              Contact Us <ArrowRight size={18} className="ml-2" />
            </Button>
            <a
              href="tel:+254117564318"
              className="font-accent text-sm font-semibold text-gray-300 hover:text-white transition-colors ml-4">
              
              Or call +254 117 564 318
            </a>
          </div>
        </div>
      </section>
    </div>);

}
