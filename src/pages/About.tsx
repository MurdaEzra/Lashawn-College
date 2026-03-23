import React from 'react';
import { Button } from '../components/ui/Button';
import { ArrowRight } from 'lucide-react';
export function About() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header Banner */}
      <div className="bg-brand-charcoal py-24 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-green/10 skew-x-12 translate-x-20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <p className="font-accent text-xs font-semibold uppercase tracking-[0.25em] text-brand-green mb-4">
              About Us
            </p>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
              Learn with <span className="text-brand-green">Experts.</span>
            </h1>
            <p className="font-body text-xl text-gray-300 leading-relaxed max-w-2xl">
              Lashawn Driving and Computer College is Eldoret's premier
              institution for practical skills training, empowering students.
              
            </p>
          </div>
        </div>
      </div>

      {/* Our Story Section - Side by Side */}
      <section className="py-20 bg-brand-cream">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-brand-charcoal mb-6">
                Our Story
              </h2>
              <div className="w-16 h-[3px] bg-brand-green mb-8"></div>
              <div className="font-body text-lg text-gray-700 space-y-6 leading-relaxed">
                <p>
                 Lashawn Driving and Computer College has evolved over the past 5 years. 
                 It was founded in 2020 to play the role of giving trainees the opportunity to learn with experts. 
                 We believe in practical, hands-on learning that prepares our students for real-world challenges.
                </p>
                <p>
                  Our college delivers professional driving and computer
                  instruction in a friendly, safety-first environment. Our
                  experienced instructors teach practical driving, road-signs
                  theory, and certification preparation across all license
                  categories.
                </p>
                <p>
                  What sets us apart is our commitment to excellence. Every
                  instructor at Lashawn is a certified professional with years
                  of experience in their field, ensuring that our students
                  receive the best possible education.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-brand-green/10 rounded-2xl transform rotate-3"></div>
              <img
                src="https://res.cloudinary.com/dgfmhyebp/image/upload/v1760686049/WhatsApp_Image_2025-10-16_at_3.02.25_PM_2_vmoy2n.jpg"
                alt="Students in a classroom"
                className="relative rounded-2xl shadow-lg object-cover h-[500px] w-full" />
              
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values - Side by Side */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="border-l-4 border-brand-green pl-8 py-4">
              <h2 className="font-heading text-2xl font-bold text-brand-charcoal mb-4 uppercase tracking-wider">
                Our Mission
              </h2>
              <p className="font-body text-xl text-gray-600 leading-relaxed italic">
                "To provide holistic learning and services to our trainees and clients."
              </p>
            </div>
            <div className="border-l-4 border-brand-green pl-8 py-4">
              <h2 className="font-heading text-2xl font-bold text-brand-charcoal mb-4 uppercase tracking-wider">
                Our Vision
              </h2>
              <p className="font-body text-xl text-gray-600 leading-relaxed italic">
                "To be a college that enables our trainees to learn with
                 experts as well as provide the exact required services to our clients."
              </p>
            </div>
            <div>
              <h2 className="font-heading text-2xl font-bold text-brand-charcoal mb-6 uppercase tracking-wider">
                Core Values
              </h2>
              <ul className="space-y-4 font-body text-lg text-gray-700">
                <li className="flex items-start">
                  <span className="font-accent font-bold text-brand-green mr-3 mt-1 tracking-widest text-sm uppercase">
                    01
                  </span>
                  <span>
                    <strong className="font-heading text-brand-charcoal">
                      Excellence:
                    </strong>{' '}
                    Striving for the highest standards in all our services.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="font-accent font-bold text-brand-green mr-3 mt-1 tracking-widest text-sm uppercase">
                    02
                  </span>
                  <span>
                    <strong className="font-heading text-brand-charcoal">
                      Safety:
                    </strong>{' '}
                    Prioritizing safety in all our training programs.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="font-accent font-bold text-brand-green mr-3 mt-1 tracking-widest text-sm uppercase">
                    03
                  </span>
                  <span>
                    <strong className="font-heading text-brand-charcoal">
                      Integrity:
                    </strong>{' '}
                    Conducting business with honesty and transparency.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="font-accent font-bold text-brand-green mr-3 mt-1 tracking-widest text-sm uppercase">
                    04
                  </span>
                  <span>
                    <strong className="font-heading text-brand-charcoal">
                      Innovation:
                    </strong>{' '}
                    Embracing new technologies and teaching methods.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-brand-charcoal py-20 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-extrabold mb-6">
            Ready to Learn with Experts?
          </h2>
          <p className="font-body text-xl text-gray-400 mx-auto mb-10 max-w-2xl">
            Join Lashawn Driving and Computer College today and start your
            journey towards acquiring valuable skills.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="primary" size="lg" to="/register">
              Register Now <ArrowRight size={18} className="ml-2" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              to="/contact"
              className="border-gray-500 text-gray-300 hover:bg-brand-green hover:border-brand-green hover:text-white">
              
              Contact Us
            </Button>
          </div>
        </div>
      </section>
    </div>);

}
