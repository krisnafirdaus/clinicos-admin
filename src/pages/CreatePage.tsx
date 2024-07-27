import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AnamnesisFormCreate } from '../components/AnamnesisForm/AnamnesisFormCreate';
import { useAnamnesisForm } from '../hooks/useAnamnesisForm';
import { FormData } from '../types';

export const CreatePage: React.FC = () => {
  const navigate = useNavigate();
  const { createForm } = useAnamnesisForm();

  const handleCreate = async (formData: FormData) => {
    try {
      await createForm(formData);
      navigate('/');
    } catch (error) {
      console.error('Failed to create form:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Create Anamnesis Form</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <AnamnesisFormCreate onSubmit={handleCreate} />
      </div>
    </div>
  );
};