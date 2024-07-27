import React, { useState } from 'react';
import { DragAndDrop } from '../common/DragAndDrop';
import { Section } from '../../types';

interface FormData {
  title: string;
  description: string;
  sections: Section[];
}

interface AnamnesisFormCreateProps {
  onSubmit: (formData: FormData) => Promise<void>;
}

export const AnamnesisFormCreate: React.FC<AnamnesisFormCreateProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    sections: [],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleAddSection = () => {
    const newSection: Section = {
      id: Date.now(),
      title: `New Section ${formData.sections.length + 1}`,
      order: formData.sections.length + 1,
      questions: []
    };
    setFormData({
      ...formData,
      sections: [...formData.sections, newSection]
    });
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Create New Anamnesis Form</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Form Title</label>
          <input
            id="title"
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="Enter form title"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Form Description</label>
          <textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Enter form description"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
          />
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2 text-gray-800">Sections</h3>
          <DragAndDrop
            items={formData.sections}
            onReorder={(newSections: Section[]) => setFormData({ ...formData, sections: newSections })}
          />
          <button 
            type="button" 
            onClick={handleAddSection}
            className="mt-2 bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Add Section
          </button>
        </div>
        <button 
          type="submit" 
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Create Form
        </button>
      </form>
    </div>
  );
};