import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AnamnesisFormUpdate } from '../components/AnamnesisForm/AnamnesisFormUpdate';
import { useAnamnesisForm } from '../hooks/useAnamnesisForm';
import { AnamnesisForm } from '../types';

export const UpdatePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { form, loading, error, fetchForm, updateForm } = useAnamnesisForm();

  useEffect(() => {
    if (id) {
      fetchForm(parseInt(id, 10));
    }
  }, [id, fetchForm]);

  const handleUpdate = async (formData: Partial<AnamnesisForm>) => {
    if (!id) return;
    try {
      await updateForm(parseInt(id, 10), formData);
      navigate('/');
    } catch (error) {
      console.error('Failed to update form:', error);
      alert('Failed to update form. Please try again.');
    }
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center py-10 text-red-500">Error: {error}</div>;
  if (!form) return <div className="text-center py-10">No form found</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Update Anamnesis Form</h1>
      <AnamnesisFormUpdate form={form} onSubmit={handleUpdate} />
    </div>
  );
};
