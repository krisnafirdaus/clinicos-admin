import React from 'react';
import { SectionItem } from '../Section/SectionItem';

interface AnamnesisForm {
  id: number;
  title: string;
  description: string;
  createdAt: string;
  updatedAt?: string;
  sections: {
    id: number;
    title: string;
    order: number;
    questions: {
      id: number;
      text: string;
      type: string;
      order: number;
    }[];
  }[];
}

interface AnamnesisFormDetailProps {
  form: AnamnesisForm;
}

export const AnamnesisFormDetail: React.FC<AnamnesisFormDetailProps> = ({ form }) => {
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">{form.title}</h2>
      <p className="text-gray-600 mb-6">{form.description}</p>
      <div className="space-y-4">
        {form.sections.map(section => (
          <div key={section.id} className="bg-gray-50 p-4 rounded-md">
            <SectionItem section={section} />
          </div>
        ))}
      </div>
      <div className="mt-6 text-sm text-gray-500">
        <p>Created at: {new Date(form.createdAt).toLocaleString()}</p>
        {form.updatedAt && (
          <p>Last updated: {new Date(form.updatedAt).toLocaleString()}</p>
        )}
      </div>
    </div>
  );
};