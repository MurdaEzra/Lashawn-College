import React from 'react';
interface InstructorCardProps {
  name: string;
  role: string;
  experience: string;
  certifications: string[];
  bio: string;
  imageUrl: string;
}
export function InstructorCard({
  name,
  role,
  experience,
  certifications,
  bio,
  imageUrl
}: InstructorCardProps) {
  return <div className="overflow-hidden rounded-lg bg-white shadow-sm transition-shadow hover:shadow-md">
      <div className="relative h-64 overflow-hidden">
        <img src={imageUrl} alt={name} className="h-full w-full object-cover" />
      </div>
      <div className="p-5">
        <h3 className="mb-1 text-xl font-semibold text-gray-800">{name}</h3>
        <p className="mb-2 text-sm font-medium text-[#2E8B57]">{role}</p>
        <div className="mb-3 flex items-center text-sm text-gray-600">
          <span className="mr-2 font-medium">Experience:</span>
          <span>{experience}</span>
        </div>
        <div className="mb-3">
          <span className="mb-1 block text-sm font-medium text-gray-600">
            Certifications:
          </span>
          <ul className="ml-5 list-disc text-sm text-gray-600">
            {certifications.map((cert, index) => <li key={index}>{cert}</li>)}
          </ul>
        </div>
        <p className="text-gray-600">{bio}</p>
      </div>
    </div>;
}