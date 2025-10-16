import React, { memo } from 'react';
import { Button } from '../components/ui/Button';
import { InstructorCard } from '../components/ui/InstructorCard';
export function About() {
  const instructors = [{
    name: 'John Mwangi',
    role: 'Senior Driving Instructor',
    experience: '10 years',
    certifications: ['Kenya Driving School Association', 'Defensive Driving Certified'],
    bio: 'John has trained over 1,200 learners and specializes in defensive driving techniques for all vehicle categories.',
    imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80'
  }, {
    name: 'Mary Kamau',
    role: 'Head Driving Instructor',
    experience: '15 years',
    certifications: ['Master Instructor Certificate', 'Road Safety Trainer'],
    bio: 'Mary leads our team of instructors and has expertise in all vehicle categories with a focus on safety first approach.',
    imageUrl: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80'
  }, {
    name: 'David Otieno',
    role: 'Computer Training Instructor',
    experience: '8 years',
    certifications: ['Microsoft Certified Trainer', 'CompTIA A+ Certified'],
    bio: 'David is our lead computer instructor with extensive experience in Microsoft Office and IT fundamentals training.',
    imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80'
  }, {
    name: 'Sarah Njeri',
    role: 'First Aid & Safety Instructor',
    experience: '12 years',
    certifications: ['Red Cross First Aid Trainer', 'Occupational Safety Specialist'],
    bio: 'Sarah brings real-world emergency response experience to her first aid classes, making them practical and memorable.',
    imageUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80'
  }];
  return <div className="min-h-screen bg-white">
      {/* Header Banner */}
      <div className="bg-gray-800 py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-4 text-3xl font-bold md:text-4xl">About Lashawn</h1>
          <p className="mx-auto max-w-2xl text-lg">
            Learn with Experts at Lashawn Driving and Computer College
          </p>
        </div>
      </div>
      {/* About Section */}
      <section className="bg-white py-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-6 text-2xl font-semibold text-gray-800">
              Our Story
            </h2>
            <div className="space-y-4 text-gray-600">
              <p>
                Lashawn Driving and Computer College was established with a
                mission to provide high-quality, accessible education and
                services to our community. We believe in practical, hands-on
                learning that prepares our students for real-world challenges.
              </p>
              <p>
                Our college delivers professional driving and computer
                instruction in a friendly, safety-first environment. Our
                experienced instructors teach practical driving, road-signs
                theory, and certification preparation across all license
                categories. We also offer computer packages, basic mechanics,
                first aid, and a suite of business services to support
                individuals and companies.
              </p>
              <p>
                What sets us apart is our commitment to excellence and our
                motto: "Learn with Experts." Every instructor at Lashawn is a
                certified professional with years of experience in their field,
                ensuring that our students receive the best possible education.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Mission & Values */}
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <div>
                <h2 className="mb-6 text-2xl font-semibold text-gray-800">
                  Our Mission
                </h2>
                <p className="text-gray-600">
                  To empower individuals with practical skills and knowledge
                  that enhance their personal and professional lives, delivered
                  through expert instruction in a supportive environment.
                </p>
              </div>
              <div>
                <h2 className="mb-6 text-2xl font-semibold text-gray-800">
                  Our Values
                </h2>
                <ul className="ml-6 list-disc space-y-2 text-gray-600">
                  <li>
                    <span className="font-semibold">Excellence:</span> Striving
                    for the highest standards in all our services
                  </li>
                  <li>
                    <span className="font-semibold">Safety:</span> Prioritizing
                    safety in all our training programs
                  </li>
                  <li>
                    <span className="font-semibold">Integrity:</span> Conducting
                    business with honesty and transparency
                  </li>
                  <li>
                    <span className="font-semibold">Innovation:</span> Embracing
                    new technologies and teaching methods
                  </li>
                  <li>
                    <span className="font-semibold">Community:</span> Supporting
                    and giving back to our local community
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Instructors Section */}
      <section className="bg-white py-12">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-center text-2xl font-semibold text-gray-800">
            Meet Our Instructors
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {instructors.map((instructor, index) => <InstructorCard key={index} name={instructor.name} role={instructor.role} experience={instructor.experience} certifications={instructor.certifications} bio={instructor.bio} imageUrl={instructor.imageUrl} />)}
          </div>
        </div>
      </section>
      {/* Facilities Section */}
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-center text-2xl font-semibold text-gray-800">
            Our Facilities
          </h2>
          <div className="mx-auto max-w-5xl">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="overflow-hidden rounded-lg shadow-sm">
                <img src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Classroom" className="h-48 w-full object-cover" />
                <div className="p-4">
                  <h3 className="mb-2 text-lg font-semibold text-gray-800">
                    Modern Classrooms
                  </h3>
                  <p className="text-gray-600">
                    Equipped with multimedia facilities for effective theory
                    classes and computer training.
                  </p>
                </div>
              </div>
              <div className="overflow-hidden rounded-lg shadow-sm">
                <img src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Driving training" className="h-48 w-full object-cover" />
                <div className="p-4">
                  <h3 className="mb-2 text-lg font-semibold text-gray-800">
                    Training Vehicles
                  </h3>
                  <p className="text-gray-600">
                    Well-maintained vehicles for all license categories to
                    ensure safe and effective practical training.
                  </p>
                </div>
              </div>
              <div className="overflow-hidden rounded-lg shadow-sm">
                <img src="https://images.unsplash.com/photo-1588681664899-f142ff2dc9b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Printing services" className="h-48 w-full object-cover" />
                <div className="p-4">
                  <h3 className="mb-2 text-lg font-semibold text-gray-800">
                    Printing & Service Center
                  </h3>
                  <p className="text-gray-600">
                    State-of-the-art printing equipment and dedicated service
                    areas for all your business needs.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="bg-[#2E8B57] py-12 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 text-2xl font-bold">
            Ready to Learn with Experts?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl">
            Join Lashawn Driving and Computer College today and start your
            journey towards acquiring valuable skills with our experienced
            instructors.
          </p>
          <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
            <Button variant="primary" to="/booking" className="bg-white text-[#2E8B57] hover:bg-gray-100">
              Enroll Now
            </Button>
            <Button variant="outline" to="/contact" className="border-white text-white hover:bg-white/10">
              Contact Us
            </Button>
          </div>
        </div>
      </section>
    </div>;
}