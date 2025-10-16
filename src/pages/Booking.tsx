import React, { useState } from 'react';
import { Button } from '../components/ui/Button';
import { CheckCircle } from 'lucide-react';
export function Booking() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    courseType: '',
    specificCourse: '',
    courseFormat: '',
    preferredDate: '',
    preferredTime: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const {
      name,
      value
    } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const nextStep = () => {
    setStep(step + 1);
    window.scrollTo(0, 0);
  };
  const prevStep = () => {
    setStep(step - 1);
    window.scrollTo(0, 0);
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real implementation, this would send data to a backend
    console.log('Form submitted:', formData);
    setSubmitted(true);
    window.scrollTo(0, 0);
  };
  const courseOptions = {
    driving: ['Category A (Motorcycles)', 'Category B (Cars)', 'Category C (Light Commercial)', 'Category D (Heavy Vehicles)', 'Tuktuk (Three-wheelers)'],
    computer: ['Microsoft Office Suite', 'Basic IT & Networking', 'Graphic Design Fundamentals'],
    other: ['First Aid Training', 'Basic Mechanics', 'Printing Services', 'KRA Services', 'HELB Applications', 'eCitizen Services', 'Other Services']
  };
  return <div className="min-h-screen bg-white">
      {/* Header Banner */}
      <div className="bg-[#2E8B57] py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-4 text-3xl font-bold md:text-4xl">
            Book a Course or Service
          </h1>
          <p className="mx-auto max-w-2xl text-lg">
            Fill out the form below to schedule your lesson or request our
            services. Our team will get back to you promptly.
          </p>
        </div>
      </div>
      <section className="bg-white py-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            {submitted ? <div className="rounded-lg bg-green-50 p-8 text-center">
                <div className="mb-4 flex justify-center">
                  <CheckCircle className="h-16 w-16 text-green-500" />
                </div>
                <h2 className="mb-4 text-2xl font-bold text-gray-800">
                  Booking Submitted Successfully!
                </h2>
                <p className="mb-6 text-gray-600">
                  Thank you for your booking request. We have received your
                  information and will contact you shortly to confirm your
                  booking details.
                </p>
                <div className="mt-6">
                  <Button variant="primary" to="/">
                    Return to Homepage
                  </Button>
                </div>
              </div> : <div className="rounded-lg border border-gray-200 bg-white p-8 shadow-sm">
                <div className="mb-8">
                  <div className="flex items-center justify-between">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-full text-white ${step >= 1 ? 'bg-[#2E8B57]' : 'bg-gray-300'}`}>
                      1
                    </div>
                    <div className={`h-1 flex-1 ${step >= 2 ? 'bg-[#2E8B57]' : 'bg-gray-300'}`}></div>
                    <div className={`flex h-10 w-10 items-center justify-center rounded-full text-white ${step >= 2 ? 'bg-[#2E8B57]' : 'bg-gray-300'}`}>
                      2
                    </div>
                    <div className={`h-1 flex-1 ${step >= 3 ? 'bg-[#2E8B57]' : 'bg-gray-300'}`}></div>
                    <div className={`flex h-10 w-10 items-center justify-center rounded-full text-white ${step >= 3 ? 'bg-[#2E8B57]' : 'bg-gray-300'}`}>
                      3
                    </div>
                  </div>
                  <div className="mt-2 flex justify-between text-sm">
                    <span className="text-center">Select Course</span>
                    <span className="text-center">Choose Schedule</span>
                    <span className="text-center">Your Details</span>
                  </div>
                </div>
                <form onSubmit={handleSubmit}>
                  {step === 1 && <div className="space-y-6">
                      <h2 className="text-xl font-semibold text-gray-800">
                        Select Course or Service
                      </h2>
                      <div>
                        <label htmlFor="courseType" className="mb-1 block text-sm font-medium text-gray-700">
                          Course/Service Type
                        </label>
                        <select id="courseType" name="courseType" value={formData.courseType} onChange={handleChange} required className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#2E8B57] focus:outline-none focus:ring-1 focus:ring-[#2E8B57]">
                          <option value="">Select type</option>
                          <option value="driving">Driving Course</option>
                          <option value="computer">Computer Course</option>
                          <option value="other">Other Services</option>
                        </select>
                      </div>
                      {formData.courseType && <div>
                          <label htmlFor="specificCourse" className="mb-1 block text-sm font-medium text-gray-700">
                            Specific Course/Service
                          </label>
                          <select id="specificCourse" name="specificCourse" value={formData.specificCourse} onChange={handleChange} required className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#2E8B57] focus:outline-none focus:ring-1 focus:ring-[#2E8B57]">
                            <option value="">
                              Select specific course/service
                            </option>
                            {formData.courseType === 'driving' && courseOptions.driving.map(course => <option key={course} value={course}>
                                  {course}
                                </option>)}
                            {formData.courseType === 'computer' && courseOptions.computer.map(course => <option key={course} value={course}>
                                  {course}
                                </option>)}
                            {formData.courseType === 'other' && courseOptions.other.map(service => <option key={service} value={service}>
                                  {service}
                                </option>)}
                          </select>
                        </div>}
                      {formData.courseType === 'driving' && <div>
                          <label htmlFor="courseFormat" className="mb-1 block text-sm font-medium text-gray-700">
                            Course Format
                          </label>
                          <select id="courseFormat" name="courseFormat" value={formData.courseFormat} onChange={handleChange} required className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#2E8B57] focus:outline-none focus:ring-1 focus:ring-[#2E8B57]">
                            <option value="">Select format</option>
                            <option value="theory">Theory Only</option>
                            <option value="practical">Practical Only</option>
                            <option value="both">
                              Both Theory & Practical
                            </option>
                          </select>
                        </div>}
                      <div className="pt-4">
                        <Button type="button" variant="primary" className="w-full" onClick={nextStep} disabled={!formData.courseType || !formData.specificCourse || formData.courseType === 'driving' && !formData.courseFormat}>
                          Continue to Schedule
                        </Button>
                      </div>
                    </div>}
                  {step === 2 && <div className="space-y-6">
                      <h2 className="text-xl font-semibold text-gray-800">
                        Choose Your Schedule
                      </h2>
                      <div>
                        <label htmlFor="preferredDate" className="mb-1 block text-sm font-medium text-gray-700">
                          Preferred Start Date
                        </label>
                        <input type="date" id="preferredDate" name="preferredDate" value={formData.preferredDate} onChange={handleChange} required min={new Date().toISOString().split('T')[0]} className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#2E8B57] focus:outline-none focus:ring-1 focus:ring-[#2E8B57]" />
                      </div>
                      <div>
                        <label htmlFor="preferredTime" className="mb-1 block text-sm font-medium text-gray-700">
                          Preferred Time
                        </label>
                        <select id="preferredTime" name="preferredTime" value={formData.preferredTime} onChange={handleChange} required className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#2E8B57] focus:outline-none focus:ring-1 focus:ring-[#2E8B57]">
                          <option value="">Select time</option>
                          <option value="morning">Morning (8AM - 12PM)</option>
                          <option value="afternoon">
                            Afternoon (12PM - 4PM)
                          </option>
                          <option value="evening">Evening (4PM - 7PM)</option>
                          <option value="flexible">Flexible</option>
                        </select>
                      </div>
                      <div className="pt-4 flex justify-between">
                        <Button type="button" variant="outline" onClick={prevStep}>
                          Back
                        </Button>
                        <Button type="button" variant="primary" onClick={nextStep} disabled={!formData.preferredDate || !formData.preferredTime}>
                          Continue to Personal Details
                        </Button>
                      </div>
                    </div>}
                  {step === 3 && <div className="space-y-6">
                      <h2 className="text-xl font-semibold text-gray-800">
                        Your Contact Details
                      </h2>
                      <div>
                        <label htmlFor="name" className="mb-1 block text-sm font-medium text-gray-700">
                          Full Name
                        </label>
                        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#2E8B57] focus:outline-none focus:ring-1 focus:ring-[#2E8B57]" />
                      </div>
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                          <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-700">
                            Email
                          </label>
                          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#2E8B57] focus:outline-none focus:ring-1 focus:ring-[#2E8B57]" />
                        </div>
                        <div>
                          <label htmlFor="phone" className="mb-1 block text-sm font-medium text-gray-700">
                            Phone Number
                          </label>
                          <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} required className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#2E8B57] focus:outline-none focus:ring-1 focus:ring-[#2E8B57]" />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="message" className="mb-1 block text-sm font-medium text-gray-700">
                          Additional Information (Optional)
                        </label>
                        <textarea id="message" name="message" value={formData.message} onChange={handleChange} rows={3} className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#2E8B57] focus:outline-none focus:ring-1 focus:ring-[#2E8B57]"></textarea>
                      </div>
                      <div className="pt-4 flex justify-between">
                        <Button type="button" variant="outline" onClick={prevStep}>
                          Back
                        </Button>
                        <Button type="submit" variant="primary" disabled={!formData.name || !formData.email || !formData.phone}>
                          Submit Booking
                        </Button>
                      </div>
                    </div>}
                </form>
              </div>}
          </div>
        </div>
      </section>
    </div>;
}