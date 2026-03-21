import React from 'react';
import { Button } from '../components/ui/Button';
import { MapPin, Phone, Clock, ArrowRight, CheckCircle } from 'lucide-react';
import { DRIVING_CATEGORIES } from '../data/courseCategories';
export function Registration() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Student Registration
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Start your journey to becoming a professional driver. Registration
            is handled in-person at our office to ensure all your documents are
            verified correctly.
          </p>
        </div>

        {/* Info Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mb-12">
          <div className="bg-[#2E8B57] p-6 text-white">
            <h2 className="text-xl font-bold flex items-center">
              <CheckCircle className="mr-2 h-6 w-6" />
              How to Register
            </h2>
          </div>
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-[#2E8B57]/10 text-[#2E8B57] flex items-center justify-center font-bold mt-1">
                    1
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Visit Our Office
                    </h3>
                    <p className="text-gray-600 mt-1">
                      Come to our office with your original National ID or
                      Passport and two passport-sized photos.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-[#2E8B57]/10 text-[#2E8B57] flex items-center justify-center font-bold mt-1">
                    2
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Fill the Form
                    </h3>
                    <p className="text-gray-600 mt-1">
                      Our admin staff will help you fill out the official NTSA
                      registration form and select your course.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-[#2E8B57]/10 text-[#2E8B57] flex items-center justify-center font-bold mt-1">
                    3
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Make Payment
                    </h3>
                    <p className="text-gray-600 mt-1">
                      Pay your registration fee and course deposit via M-Pesa or
                      cash at the reception.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-[#2E8B57]/10 text-[#2E8B57] flex items-center justify-center font-bold mt-1">
                    4
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Start Learning
                    </h3>
                    <p className="text-gray-600 mt-1">
                      Get your schedule, log into the student portal, and begin
                      your classes!
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Contact Information
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <MapPin className="h-5 w-5 text-[#2E8B57] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">
                      Along Eldoret Roadblock — Opposite Khetias Supermarket
                    </span>
                  </li>
                  <li className="flex items-center">
                    <Phone className="h-5 w-5 text-[#2E8B57] mr-3 flex-shrink-0" />
                    <a
                      href="tel:+254117564318"
                      className="text-gray-700 hover:text-[#2E8B57] font-medium">
                      
                      +254 117 564 318
                    </a>
                  </li>
                  <li className="flex items-start">
                    <Clock className="h-5 w-5 text-[#2E8B57] mr-3 mt-0.5 flex-shrink-0" />
                    <div className="text-gray-700">
                      <p>Mon - Fri: 8:00 AM - 6:00 PM</p>
                      <p>Saturday: 9:00 AM - 4:00 PM</p>
                      <p>Sunday: Closed</p>
                    </div>
                  </li>
                </ul>
                <div className="mt-8 space-y-3">
                  <Button
                    variant="primary"
                    to="/contact"
                    className="w-full justify-center">
                    
                    Contact Us
                  </Button>
                  <Button
                    variant="outline"
                    to="/driving-courses"
                    className="w-full justify-center">
                    
                    View All Courses
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Available Categories */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Available License Categories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {DRIVING_CATEGORIES.map((category) =>
            <div
              key={category.code}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              
                <div className="flex items-center mb-4">
                  <div className="h-10 w-10 rounded-lg bg-[#2E8B57]/10 text-[#2E8B57] flex items-center justify-center font-bold text-lg mr-4">
                    {category.code}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">
                    {category.name}
                  </h3>
                </div>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {category.description}
                </p>
                <div className="space-y-2">
                  {category.subclasses.map((sub) =>
                <div
                  key={sub.code}
                  className="flex items-center text-sm text-gray-700 bg-gray-50 px-3 py-2 rounded-md">
                  
                      <ArrowRight className="h-4 w-4 text-[#2E8B57] mr-2 flex-shrink-0" />
                      <span className="font-medium mr-2">{sub.code}:</span>
                      <span className="truncate">{sub.name}</span>
                    </div>
                )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>);

}