import React from 'react';
import { Button } from '../components/ui/Button';
import {
  Phone,
  ArrowRight,
  Monitor,
  Network,
  HeartPulse,
  Wrench } from
'lucide-react';
export function ComputerCourses() {
  const courses = [
  {
    title: 'Microsoft Office Suite',
    category: 'Computer',
    description:
    'Comprehensive training on Word, Excel, PowerPoint, and Outlook for professional document creation and data management.',
    duration: '4 weeks',
    prerequisites: 'Basic computer knowledge',
    icon: <Monitor size={24} />
  },
  {
    title: 'Basic IT & Networking',
    category: 'Computer',
    description:
    'Introduction to computer hardware, software, operating systems, and basic network configuration and troubleshooting.',
    duration: '6 weeks',
    prerequisites: 'None',
    icon: <Network size={24} />
  },
  {
    title: 'First Aid Training',
    category: 'Special',
    description:
    'Essential first aid skills including CPR, wound care, and emergency response procedures for various situations.',
    duration: '2 weeks',
    prerequisites: 'None',
    icon: <HeartPulse size={24} />
  },
  {
    title: 'Basic Mechanics',
    category: 'Special',
    description:
    'Fundamentals of vehicle mechanics including basic maintenance, troubleshooting, and emergency repairs.',
    duration: '3 weeks',
    prerequisites: 'None',
    icon: <Wrench size={24} />
  }];

  return (
    <div className="min-h-screen bg-white">
      {/* Header Banner */}
      <div className="bg-brand-charcoal py-24 text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1/3 h-full bg-blue-500/10 -skew-x-12 -translate-x-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <p className="font-accent text-xs font-semibold uppercase tracking-[0.25em] text-blue-400 mb-4">
              Digital Skills
            </p>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
              Master <span className="text-blue-400">Technology.</span>
            </h1>
            <p className="font-body text-xl text-gray-300 leading-relaxed max-w-2xl">
              Gain essential computer skills with our practical, hands-on
              courses taught by experienced instructors in a supportive
              environment.
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
                  Our computer training programs are designed to provide
                  practical, job-ready skills for today's digital workplace.
                  Whether you're a complete beginner or looking to enhance your
                  existing skills, our courses offer:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Hands-on practice with real-world applications</li>
                  <li>Small class sizes for personalized attention</li>
                  <li>Flexible scheduling options</li>
                  <li>Certificates upon successful completion</li>
                  <li>Career guidance and practical application tips</li>
                </ul>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl border border-gray-200 text-center">
                <p className="font-heading text-3xl font-extrabold text-blue-500 mb-1">
                  4
                </p>
                <p className="font-accent text-xs uppercase tracking-widest text-gray-500">
                  Core Courses
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl border border-gray-200 text-center">
                <p className="font-heading text-3xl font-extrabold text-blue-500 mb-1">
                  100%
                </p>
                <p className="font-accent text-xs uppercase tracking-widest text-gray-500">
                  Hands-on
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
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl font-bold text-brand-charcoal">
                Available Computer & Special Courses
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {courses.map((course, index) =>
              <div
                key={index}
                className="flex bg-brand-cream border border-gray-100 rounded-r-xl overflow-hidden group">
                
                  <div className="w-2 bg-blue-500 group-hover:bg-blue-600 transition-colors"></div>
                  <div className="p-8 flex items-start gap-6">
                    <div className="flex-shrink-0 h-14 w-14 rounded-full bg-white text-brand-charcoal flex items-center justify-center shadow-sm group-hover:text-blue-500 transition-colors">
                      {course.icon}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-accent text-xs font-bold uppercase tracking-wider text-blue-500 bg-blue-50 px-2 py-1 rounded">
                          {course.category}
                        </span>
                        <span className="font-accent text-xs font-semibold text-gray-500">
                          {course.duration}
                        </span>
                      </div>
                      <h3 className="font-heading text-xl font-bold text-brand-charcoal mb-3">
                        {course.title}
                      </h3>
                      <p className="font-body text-gray-600 leading-relaxed mb-3">
                        {course.description}
                      </p>
                      <p className="font-accent text-xs text-gray-500">
                        <span className="font-semibold">Prerequisites:</span>{' '}
                        {course.prerequisites}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Learning Outcomes Section */}
      <section className="bg-brand-cream py-20">
        <div className="container mx-auto px-4">
          <h2 className="font-heading mb-12 text-center text-3xl font-bold text-brand-charcoal">
            Learning Outcomes
          </h2>
          <div className="mx-auto max-w-4xl space-y-6">
            <div className="rounded-xl bg-white border border-gray-200 p-8 shadow-sm">
              <h3 className="font-heading mb-4 text-xl font-bold text-blue-500">
                Microsoft Office Suite
              </h3>
              <ul className="font-body ml-6 list-disc space-y-2 text-gray-600 leading-relaxed">
                <li>
                  Create professional documents, reports, and newsletters using
                  Word
                </li>
                <li>
                  Build spreadsheets with formulas, functions, and data
                  visualization in Excel
                </li>
                <li>Design engaging presentations with PowerPoint</li>
                <li>
                  Manage emails, contacts, and schedules efficiently with
                  Outlook
                </li>
                <li>Integrate Office applications for maximum productivity</li>
              </ul>
            </div>
            <div className="rounded-xl bg-white border border-gray-200 p-8 shadow-sm">
              <h3 className="font-heading mb-4 text-xl font-bold text-blue-500">
                Basic IT & Networking
              </h3>
              <ul className="font-body ml-6 list-disc space-y-2 text-gray-600 leading-relaxed">
                <li>
                  Understand computer hardware components and their functions
                </li>
                <li>Install and configure operating systems and software</li>
                <li>Set up and troubleshoot home and small office networks</li>
                <li>Implement basic cybersecurity practices</li>
                <li>Perform routine maintenance and troubleshooting</li>
              </ul>
            </div>
            <div className="rounded-xl bg-white border border-gray-200 p-8 shadow-sm">
              <h3 className="font-heading mb-4 text-xl font-bold text-blue-500">
                First Aid & Basic Mechanics
              </h3>
              <ul className="font-body ml-6 list-disc space-y-2 text-gray-600 leading-relaxed">
                <li>Respond effectively to common emergency situations</li>
                <li>Perform CPR and use AED devices</li>
                <li>Identify and fix common vehicle issues</li>
                <li>Perform basic vehicle maintenance</li>
                <li>
                  Know when to seek professional help for complex problems
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
            Ready to Enhance Your Skills?
          </h2>
          <p className="font-body text-xl text-gray-400 mx-auto mb-10 max-w-2xl">
            Join our computer and special courses today and gain valuable skills
            for your personal and professional development.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              variant="primary"
              size="lg"
              to="/register"
              className="bg-blue-500 hover:bg-blue-600 border-none">
              
              Register Now <ArrowRight size={18} className="ml-2" />
            </Button>
            <a
              href="tel:+254117564318"
              className="font-accent text-sm font-semibold text-gray-300 hover:text-white transition-colors ml-4 flex items-center">
              
              <Phone size={16} className="mr-2" />
              Or call +254 117 564 318
            </a>
          </div>
        </div>
      </section>
    </div>);

}