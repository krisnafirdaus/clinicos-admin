import { FC, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { AnamnesisFormDetail } from '../components/AnamnesisForm/AnamnesisFormDetail';
import { useAnamnesisForm } from '../hooks/useAnamnesisForm';
import { AnamnesisForm } from '../types';

export const DetailPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const { form, loading, error, fetchForm } = useAnamnesisForm();

  useEffect(() => {
    if (id) {
      fetchForm(parseInt(id, 10));
    }
  }, [id, fetchForm]);

  if (loading) return (
    <div className="flex justify-center items-center h-screen" data-testid="loading-spinner">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
    </div>
  );

  if (error) return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Error: </strong>
        <span className="block sm:inline">{error}</span>
      </div>
    </div>
  );

  if (!form) return (
    <div className="max-w-4xl mx-auto p-6">
      <p className="text-gray-600">No form found</p>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Anamnesis Form Detail</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <AnamnesisFormDetail form={form as AnamnesisForm} />
      </div>
    </div>
  );
};