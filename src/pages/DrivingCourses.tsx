import React from 'react';
import { Button } from '../components/ui/Button';
import {
  Clock,
  Award,
  Shield,
  Users,
  ArrowRight } from
'lucide-react';
import { getDrivingCategories } from '../data/courseCategories';
import { useFeeStructure } from '../data/feeStructure';
export function DrivingCourses() {
  const fees = useFeeStructure();
  const drivingCategories = getDrivingCategories(fees);
  const benefits = [
  {
    icon: <Shield size={24} />,
    title: 'Safety First Approach',
    description:
    'Our curriculum emphasizes defensive driving techniques to keep you and others safe on the road.'
  },
  {
    icon: <Users size={24} />,
    title: 'Experienced Instructors',
    description:
    'Learn from certified instructors with years of professional driving and teaching experience.'
  },
  {
    icon: <Clock size={24} />,
    title: 'Flexible Scheduling',
    description:
    'Choose from morning, afternoon, or evening sessions to fit your busy schedule.'
  },
  {
    icon: <Award size={24} />,
    title: 'Recognized Certification',
    description:
    'Receive a certificate that is recognized by employers and authorities across Kenya.'
  }];

  return (
    <div className="min-h-screen bg-white">
      {/* Header Banner */}
      <div className="bg-brand-charcoal py-24 text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1/3 h-full bg-brand-green/10 -skew-x-12 -translate-x-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <p className="font-accent text-xs font-semibold uppercase tracking-[0.25em] text-brand-green mb-4">
              Professional Training
            </p>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
              Master the <span className="text-brand-green">Road.</span>
            </h1>
            <p className="font-body text-xl text-gray-300 leading-relaxed max-w-2xl">
              Professional driving instruction for all license categories with
              experienced instructors and comprehensive theory training.
            </p>
          </div>
        </div>
      </div>

      {/* Intro Section */}
      <section className="py-16 bg-brand-cream border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-heading text-2xl font-bold text-brand-charcoal mb-4">
                Course Overview
              </h2>
              <div className="font-body text-lg text-gray-700 leading-relaxed space-y-4">
                <p>
                  Our driving courses combine comprehensive theory classes with
                  practical hands-on training to ensure you become a confident
                  and safe driver. All courses include:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    Thorough understanding of road signs and traffic rules
                  </li>
                  <li>Vehicle control and maneuvering techniques</li>
                  <li>Defensive driving strategies</li>
                  <li>Hazard perception and risk assessment</li>
                  <li>
                    Preparation for both theory and practical driving tests
                  </li>
                </ul>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-brand-green/10 rounded-2xl transform rotate-3"></div>
              <img
                src="https://res.cloudinary.com/dgfmhyebp/image/upload/v1760686048/WhatsApp_Image_2025-10-16_at_3.02.27_PM_jgs1gx.jpg"
                alt="Students in a classroom"
                className="relative rounded-2xl shadow-lg object-cover h-[500px] w-full" />
              
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl font-bold text-brand-charcoal">
                Why Choose Our Driving School
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {benefits.map((benefit, index) =>
              <div
                key={index}
                className="flex bg-brand-cream border border-gray-100 rounded-r-xl overflow-hidden group">
                
                  <div className="w-2 bg-brand-green group-hover:bg-brand-green-dark transition-colors"></div>
                  <div className="p-8 flex items-start gap-6">
                    <div className="flex-shrink-0 h-14 w-14 rounded-full bg-white text-brand-charcoal flex items-center justify-center shadow-sm group-hover:text-brand-green transition-colors">
                      {benefit.icon}
                    </div>
                    <div>
                      <h3 className="font-heading text-xl font-bold text-brand-charcoal mb-3">
                        {benefit.title}
                      </h3>
                      <p className="font-body text-gray-600 leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Course List Section */}
      <section className="bg-brand-cream py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="font-heading text-3xl font-bold text-brand-charcoal mb-4">
              Available License Categories
            </h2>
            <p className="font-body text-lg text-gray-600 max-w-2xl mx-auto">
              We offer comprehensive training for all NTSA license categories.
              Explore our detailed subclasses below.
            </p>
          </div>

          <div className="space-y-12 max-w-6xl mx-auto">
            {drivingCategories.map((category) =>
            <div
              key={category.code}
              className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/3 h-48 md:h-auto relative">
                    <img
                    src={category.imageUrl}
                    alt={category.name}
                    className="w-full h-full object-cover" />
                  
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/90 to-transparent flex items-end p-6">
                      <div>
                        <div className="inline-block px-3 py-1 bg-brand-green text-white font-accent text-xs font-bold uppercase tracking-wider rounded-full mb-2">
                          Category {category.code}
                        </div>
                        <h3 className="font-heading text-2xl font-bold text-white">
                          {category.name}
                        </h3>
                      </div>
                    </div>
                  </div>
                  <div className="md:w-2/3 p-6 md:p-8">
                    <p className="font-body text-gray-600 mb-6 leading-relaxed">
                      {category.description}
                    </p>

                    <div className="space-y-4">
                      <h4 className="font-heading font-semibold text-brand-charcoal border-b border-gray-100 pb-2">
                        Available Subclasses:
                      </h4>
                      <div className="grid grid-cols-1 gap-4">
                        {category.subclasses.map((sub) =>
                      <div
                        key={sub.code}
                        className="bg-brand-cream rounded-xl p-5 border border-gray-100 hover:border-brand-green/30 transition-colors">
                        
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3">
                              <div className="flex items-center">
                                <span className="font-heading text-xl font-bold text-brand-green mr-3">
                                  {sub.code}
                                </span>
                                <span className="font-heading font-semibold text-brand-charcoal">
                                  {sub.name}
                                </span>
                              </div>
                              <span className="font-accent text-brand-green font-bold mt-2 sm:mt-0 bg-brand-green/10 px-3 py-1 rounded-full text-sm self-start sm:self-auto">
                                KSh {sub.fee.toLocaleString()}
                              </span>
                            </div>
                            <p className="font-body text-sm text-gray-600 mb-4">
                              {sub.description}
                            </p>
                            <div className="flex flex-wrap gap-3 font-accent text-xs text-gray-500 font-medium">
                              <span className="flex items-center bg-white px-2.5 py-1.5 rounded border border-gray-200">
                                <Clock className="h-3.5 w-3.5 mr-1.5" />{' '}
                                {sub.duration}
                              </span>
                              <span className="flex items-center bg-white px-2.5 py-1.5 rounded border border-gray-200">
                                <Users className="h-3.5 w-3.5 mr-1.5" /> Min
                                Age: {sub.minAge}
                              </span>
                              {sub.prerequisites &&
                          <span className="flex items-center bg-white px-2.5 py-1.5 rounded border border-gray-200">
                                  <Shield className="h-3.5 w-3.5 mr-1.5" /> Req:{' '}
                                  {sub.prerequisites}
                                </span>
                          }
                            </div>
                          </div>
                      )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* License Requirements */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <h2 className="font-heading mb-8 text-center text-3xl font-bold text-brand-charcoal">
            License Requirements
          </h2>
          <div className="mx-auto max-w-4xl">
            <div className="overflow-x-auto rounded-xl shadow-sm border border-gray-200">
              <table className="w-full border-collapse bg-white font-body">
                <thead className="bg-brand-green text-white font-heading">
                  <tr>
                    <th className="border-b border-gray-200 px-6 py-4 text-left font-semibold">
                      License Category
                    </th>
                    <th className="border-b border-gray-200 px-6 py-4 text-left font-semibold">
                      Minimum Age
                    </th>
                    <th className="border-b border-gray-200 px-6 py-4 text-left font-semibold">
                      Prerequisites
                    </th>
                    <th className="border-b border-gray-200 px-6 py-4 text-left font-semibold">
                      Vehicles Covered
                    </th>
                  </tr>
                </thead>
                <tbody className="text-gray-600">
                  <tr>
                    <td className="border-b border-gray-100 px-6 py-4 font-medium text-brand-charcoal">
                      Category A
                    </td>
                    <td className="border-b border-gray-100 px-6 py-4">
                      18 years
                    </td>
                    <td className="border-b border-gray-100 px-6 py-4">
                      Valid ID/Passport
                    </td>
                    <td className="border-b border-gray-100 px-6 py-4">
                      Motorcycles and three-wheelers
                    </td>
                  </tr>
                  <tr className="bg-brand-cream/50">
                    <td className="border-b border-gray-100 px-6 py-4 font-medium text-brand-charcoal">
                      Category B
                    </td>
                    <td className="border-b border-gray-100 px-6 py-4">
                      18 years
                    </td>
                    <td className="border-b border-gray-100 px-6 py-4">
                      Valid ID/Passport
                    </td>
                    <td className="border-b border-gray-100 px-6 py-4">
                      Light vehicles (Cars, Pickups up to 3.5 tonnes)
                    </td>
                  </tr>
                  <tr>
                    <td className="border-b border-gray-100 px-6 py-4 font-medium text-brand-charcoal">
                      Category C
                    </td>
                    <td className="border-b border-gray-100 px-6 py-4">
                      21 years
                    </td>
                    <td className="border-b border-gray-100 px-6 py-4">
                      Valid ID/Passport
                    </td>
                    <td className="border-b border-gray-100 px-6 py-4">
                      Light and Heavy Commercial Vehicles
                    </td>
                  </tr>
                  <tr className="bg-brand-cream/50">
                    <td className="border-b border-gray-100 px-6 py-4 font-medium text-brand-charcoal">
                      Category D
                    </td>
                    <td className="border-b border-gray-100 px-6 py-4">
                      24 years
                    </td>
                    <td className="border-b border-gray-100 px-6 py-4">
                      Valid ID/Passport, 4 years experience
                    </td>
                    <td className="border-b border-gray-100 px-6 py-4">
                      Passenger Vehicles (Matatus, Buses)
                    </td>
                  </tr>
                  <tr>
                    <td className="border-b border-gray-100 px-6 py-4 font-medium text-brand-charcoal">
                      Category E
                    </td>
                    <td className="border-b border-gray-100 px-6 py-4">
                      21 years
                    </td>
                    <td className="border-b border-gray-100 px-6 py-4">
                      Valid ID/Passport
                    </td>
                    <td className="border-b border-gray-100 px-6 py-4">
                      Special types of vehicles
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="bg-brand-charcoal py-20 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-extrabold mb-6">
            Ready to Start Learning?
          </h2>
          <p className="font-body text-xl text-gray-400 mx-auto mb-10 max-w-2xl">
            Enroll in one of our courses today or contact us for more
            information.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="primary" size="lg" to="/register">
              Enroll Now <ArrowRight size={18} className="ml-2" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              to="/fees"
              className="border-gray-500 text-gray-300 hover:bg-brand-green hover:border-brand-green hover:text-white">
              
              View Fee Structure
            </Button>
          </div>
        </div>
      </section>
    </div>);

}
