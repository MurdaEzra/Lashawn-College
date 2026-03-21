import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '../components/ui/Button';
interface FAQItemProps {
  question: string;
  answer: React.ReactNode;
  isOpen: boolean;
  toggleOpen: () => void;
}
function FAQItem({ question, answer, isOpen, toggleOpen }: FAQItemProps) {
  return (
    <div className="border-b border-gray-200">
      <button
        onClick={toggleOpen}
        className="flex w-full items-center justify-between py-5 text-left font-heading font-semibold text-brand-charcoal hover:text-brand-green transition-colors"
        aria-expanded={isOpen}>
        
        <span className="text-base">{question}</span>
        {isOpen ?
        <ChevronUp
          className="ml-3 flex-shrink-0 text-brand-green"
          size={20} /> :


        <ChevronDown className="ml-3 flex-shrink-0" size={20} />
        }
      </button>
      {isOpen &&
      <div className="pb-5">
          <div className="font-body text-gray-600 leading-relaxed">
            {answer}
          </div>
        </div>
      }
    </div>);

}
export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  const faqItems = [
  {
    question: 'What age can I start learning to drive?',
    answer:
    <p>
          For motorcycles (Category A) and cars (Category B), learners must be
          18 years or older. For commercial vehicles (Category C) you must be
          21+ years, and for heavy vehicles (Category D) you must be 24+ years.
          All learners must have a valid ID or passport.
        </p>

  },
  {
    question: 'Do you provide vehicles for the driving test?',
    answer:
    <p>
          Yes, we provide vehicles for the driving test upon request. We also
          offer test-day preparation sessions to help you feel confident and
          ready for your test. Additional fees may apply for test day vehicle
          use.
        </p>

  },
  {
    question: 'How long does it take to complete a driving course?',
    answer:
    <p>
          Course duration varies depending on the license category and your
          prior experience:
          <br />
          - Category A (Motorcycles): 4–6 weeks
          <br />
          - Category B (Cars): 6–8 weeks
          <br />
          - Category C (Light Commercial): 8–10 weeks
          <br />
          - Category D (Heavy Vehicles): 10–12 weeks
          <br />
          - Tuktuk: 3–4 weeks
          <br />
          <br />
          These timeframes are for students attending regular lessons. The
          duration may be shorter or longer based on individual learning pace
          and lesson frequency.
        </p>

  },
  {
    question: 'What documents do I need to enroll in a driving course?',
    answer:
    <p>
          To enroll in our driving courses, you'll need:
          <br />
          - Original ID card or passport
          <br />
          - Two passport-sized photographs
          <br />
          - Medical certificate (can be obtained through our assistance)
          <br />- Payment for the course fees
        </p>

  },
  {
    question: 'What computer courses do you offer?',
    answer:
    <p>
          We offer a variety of computer courses including:
          <br />
          - Microsoft Office Suite (Word, Excel, PowerPoint, Outlook)
          <br />
          - Basic IT and Computer Fundamentals
          <br />
          - Networking Basics
          <br />
          - Graphic Design Fundamentals
          <br />
          <br />
          Our courses are designed for different skill levels, from beginners to
          advanced users. Contact us for the current schedule and pricing.
        </p>

  },
  {
    question: 'Do you offer payment plans for courses?',
    answer:
    <p>
          Yes, we offer flexible payment plans for our longer courses.
          Typically, you can pay an initial deposit followed by installments
          throughout the course. Please contact our office for specific payment
          plan options for your chosen course.
        </p>

  },
  {
    question: "What's your refund policy?",
    answer:
    <p>
          Course fees are generally non-refundable once classes have begun.
          However, in exceptional circumstances, we may offer partial refunds or
          credit toward future courses. Each case is reviewed individually.
          Please refer to the enrollment agreement for complete details.
        </p>

  },
  {
    question: 'How many students are in each class?',
    answer:
    <p>
          For driving theory classes, we typically have 10–15 students per
          session. Practical driving lessons are one-on-one with an instructor.
          <br />
          <br />
          For computer courses, we maintain small class sizes of 6–10 students
          to ensure each student receives adequate attention and access to
          equipment.
        </p>

  },
  {
    question: 'Do you provide certificates upon completion?',
    answer:
    <p>
          Yes, we provide certificates of completion for all our courses. These
          certificates are recognized locally and can be used as proof of
          training for employment purposes. For driving courses, we also assist
          with the official licensing process through the relevant government
          authorities.
        </p>

  },
  {
    question: 'What printing and design services do you offer?',
    answer:
    <p>
          Our printing and design services include:
          <br />
          - Document printing and photocopying
          <br />
          - Large format printing for posters and banners
          <br />
          - Business cards, letterheads, and brochures
          <br />
          - T-shirt printing with custom designs
          <br />
          - Graphic design services
          <br />
          - Binding and lamination
          <br />
          <br />
          Contact us for a quote on your specific printing needs.
        </p>

  }];

  return (
    <div className="min-h-screen bg-white">
      {/* Header Banner */}
      <div className="bg-brand-charcoal py-24 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <p className="font-accent text-xs font-semibold uppercase tracking-[0.25em] text-brand-green mb-4">
              Help Center
            </p>
            <h1 className="font-heading text-4xl md:text-5xl font-extrabold leading-tight mb-4">
              Frequently Asked Questions
            </h1>
            <p className="font-body text-xl text-gray-300 leading-relaxed">
              Find answers to common questions about our courses, services, and
              policies.
            </p>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <div className="rounded-xl border border-gray-200 bg-white p-8">
              {faqItems.map((faq, index) =>
              <FAQItem
                key={index}
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex === index}
                toggleOpen={() => toggleFAQ(index)} />

              )}
            </div>
            <div className="mt-10 text-center">
              <p className="font-body text-gray-600 mb-6">
                Don't see your question? Contact us directly and we'll be happy
                to help.
              </p>
              <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
                <Button variant="primary" to="/contact">
                  Contact Us
                </Button>
                <Button variant="outline" href="tel:+254117564318">
                  Call +254 117 564 318
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Terms and Conditions Section */}
      <section className="bg-white py-16 border-t border-gray-200">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <div className="mb-10 text-center">
              <p className="font-accent text-xs font-semibold uppercase tracking-[0.25em] text-brand-green mb-3">
                Legal
              </p>
              <h2 className="font-heading text-3xl font-extrabold text-brand-charcoal">
                Terms & Conditions
              </h2>
              <div className="w-16 h-[3px] bg-brand-green mx-auto mt-4"></div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm">
              <ol className="space-y-6 font-body text-gray-600 list-decimal list-outside ml-4">
                <li className="pl-2">
                  <strong className="text-brand-charcoal font-heading">
                    Registration & Enrollment:
                  </strong>{' '}
                  All registration fees are due at the time of enrollment and
                  are strictly non-refundable.
                </li>
                <li className="pl-2">
                  <strong className="text-brand-charcoal font-heading">
                    Course Fees:
                  </strong>{' '}
                  Flexible payment plans are available. However, full payment
                  must be completed before a student is eligible to sit for any
                  final examinations.
                </li>
                <li className="pl-2">
                  <strong className="text-brand-charcoal font-heading">
                    Attendance:
                  </strong>{' '}
                  A minimum of 80% attendance is required to successfully
                  complete any course. Missed classes can be rescheduled subject
                  to instructor availability.
                </li>
                <li className="pl-2">
                  <strong className="text-brand-charcoal font-heading">
                    Cancellation & Refunds:
                  </strong>{' '}
                  A 50% refund of course fees (excluding registration) may be
                  granted if cancellation occurs within the first week of
                  classes. No refunds will be issued thereafter.
                </li>
                <li className="pl-2">
                  <strong className="text-brand-charcoal font-heading">
                    Code of Conduct:
                  </strong>{' '}
                  Students must maintain respectful behavior towards staff and
                  peers. The use of any intoxicating substances before or during
                  training sessions is strictly prohibited and will lead to
                  immediate dismissal.
                </li>
                <li className="pl-2">
                  <strong className="text-brand-charcoal font-heading">
                    Liability:
                  </strong>{' '}
                  The school is not liable for loss or damage to personal items.
                  Students must strictly follow all safety instructions provided
                  by instructors.
                </li>
                <li className="pl-2">
                  <strong className="text-brand-charcoal font-heading">
                    Certification:
                  </strong>{' '}
                  Official certificates are only issued upon the successful
                  completion of the course and passing of all required
                  examinations.
                </li>
                <li className="pl-2">
                  <strong className="text-brand-charcoal font-heading">
                    Data Privacy:
                  </strong>{' '}
                  Personal data collected during registration will be used
                  exclusively for administrative and educational purposes in
                  compliance with data protection laws.
                </li>
                <li className="pl-2">
                  <strong className="text-brand-charcoal font-heading">
                    Changes to Terms:
                  </strong>{' '}
                  The school reserves the right to update or modify these terms
                  and conditions at any time. Notice of significant changes will
                  be provided to active students.
                </li>
                <li className="pl-2">
                  <strong className="text-brand-charcoal font-heading">
                    Governing Law:
                  </strong>{' '}
                  These terms and conditions are governed by and construed in
                  accordance with the laws of Kenya.
                </li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* License Categories Section */}
      <section className="bg-brand-cream py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <div className="mb-10">
              <p className="font-accent text-xs font-semibold uppercase tracking-[0.25em] text-brand-green mb-3">
                Reference Guide
              </p>
              <h2 className="font-heading text-3xl font-extrabold text-brand-charcoal">
                Driving License Categories
              </h2>
              <div className="w-16 h-[3px] bg-brand-green mt-4"></div>
            </div>
            <div className="space-y-4">
              <div className="rounded-xl border border-gray-200 bg-white p-6">
                <h3 className="font-heading text-lg font-bold text-brand-charcoal mb-2">
                  Category A
                </h3>
                <p className="font-body text-gray-600">
                  For motorcycles and three-wheeled vehicles. Minimum age: 18
                  years.
                </p>
              </div>
              <div className="rounded-xl border border-gray-200 bg-white p-6">
                <h3 className="font-heading text-lg font-bold text-brand-charcoal mb-2">
                  Category B
                </h3>
                <p className="font-body text-gray-600">
                  For motor vehicles with a maximum authorized mass not
                  exceeding 3,500 kg and designed to carry no more than 8
                  passengers in addition to the driver. Minimum age: 18 years.
                </p>
              </div>
              <div className="rounded-xl border border-gray-200 bg-white p-6">
                <h3 className="font-heading text-lg font-bold text-brand-charcoal mb-2">
                  Category C
                </h3>
                <p className="font-body text-gray-600">
                  For motor vehicles other than those in Category D, with a
                  maximum authorized mass exceeding 3,500 kg. Minimum age: 21
                  years.
                </p>
              </div>
              <div className="rounded-xl border border-gray-200 bg-white p-6">
                <h3 className="font-heading text-lg font-bold text-brand-charcoal mb-2">
                  Category D
                </h3>
                <p className="font-body text-gray-600">
                  For motor vehicles designed for the carriage of more than 8
                  passengers in addition to the driver (buses, matatus). Minimum
                  age: 24 years.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-brand-charcoal py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl font-extrabold mb-4">
            Ready to Start Learning?
          </h2>
          <p className="font-body text-xl text-gray-400 mx-auto mb-8 max-w-2xl">
            Enroll in one of our courses today or contact us for more
            information.
          </p>
          <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
            <Button variant="primary" size="lg" to="/register">
              Enroll Now
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