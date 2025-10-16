import React from 'react';
import { Button } from './Button';
interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}
export function ServiceCard({
  title,
  description,
  icon
}: ServiceCardProps) {
  return <div className="flex flex-col rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-transform hover:-translate-y-1">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#2E8B57]/10 text-[#2E8B57]">
        {icon}
      </div>
      <h3 className="mb-2 text-lg font-semibold text-gray-800">{title}</h3>
      <p className="mb-4 flex-grow text-gray-600">{description}</p>
      <div className="mt-auto flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
        <Button variant="outline" size="sm" className="w-full sm:w-auto">
          Request Quote
        </Button>
        <Button variant="primary" size="sm" className="w-full sm:w-auto">
          Book Service
        </Button>
      </div>
    </div>;
}