import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, TableColumn } from '../common/Table';
import { AnamnesisForm } from '../../types';
import { useAnamnesisForm } from '../../hooks/useAnamnesisForm';
import { EyeIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

interface AnamnesisFormListProps {
  forms: AnamnesisForm[];
}

export const AnamnesisFormList: React.FC<AnamnesisFormListProps> = ({ forms }) => {
  const navigate = useNavigate();
  const { deleteForm } = useAnamnesisForm();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [formToDelete, setFormToDelete] = useState<number | null>(null);

  const handleView = (id: number) => {
    navigate(`/form/${id}`);
  };

  const handleEdit = (id: number) => {
    navigate(`/update/${id}`);
  };

  const openDeleteModal = (id: number) => {
    setFormToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    if (formToDelete) {
      try {
        await deleteForm(formToDelete);
        setIsDeleteModalOpen(false);
        setFormToDelete(null);
      } catch (error) {
        console.error('Failed to delete form:', error);
        alert('Failed to delete form. Please try again.');
      }
    }
  };

  const columns: TableColumn<AnamnesisForm>[] = [
    { Header: 'Title', accessor: 'title' },
    { Header: 'Description', accessor: 'description' },
    { 
      Header: 'Created At', 
      accessor: 'createdAt', 
      Cell: ({ value }: { value: string }) => new Date(value).toLocaleDateString()
    },
    {
      Header: 'Actions',
      accessor: 'id',
      Cell: ({ value }: { value: number }) => (
        <div className="flex space-x-2">
          <button
            onClick={() => handleView(value)}
            aria-label="View"
            className="text-blue-500 hover:text-blue-600 transition duration-150 ease-in-out"
          >
            <EyeIcon className="h-5 w-5" />
          </button>
          <button
            onClick={() => handleEdit(value)}
            aria-label="Edit"
            className="text-green-500 hover:text-green-600 transition duration-150 ease-in-out"
          >
            <PencilIcon className="h-5 w-5" />
          </button>
          <button
            onClick={() => openDeleteModal(value)}
            aria-label="Delete"
            className="text-red-500 hover:text-red-600 transition duration-150 ease-in-out"
          >
            <TrashIcon className="h-5 w-5" />
          </button>
        </div>
      ),
    }    
  ];

  return (
    <div className="overflow-x-auto">
      <Table columns={columns} data={forms} />
      
      {isDeleteModalOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          {/* Modal content */}
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <TrashIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                      Delete Anamnesis Form
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Are you sure you want to delete this anamnesis form? This action cannot be undone.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:w-auto sm:text-sm"
                  onClick={handleDelete}
                >
                  Delete
                </button>
                <button
                  type="button"
                  className="mt-3 inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:w-auto sm:text-sm"
                  onClick={() => setIsDeleteModalOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
