import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AnamnesisFormList } from "../components/AnamnesisForm/AnamnesisFormList";
import { SearchInput } from "../components/common/SearchInput";
import { useDebounce } from "../hooks/useDebounce";
import { useAnamnesisForm } from "../hooks/useAnamnesisForm";

export const ListPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const { forms, loading, error, fetchForms } = useAnamnesisForm();

  useEffect(() => {
    fetchForms(debouncedSearchTerm);
  }, [debouncedSearchTerm, fetchForms]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Anamnesis Forms</h1>
        <Link to="/create">
          <div className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-150 ease-in-out">
            Create New Form
          </div>
        </Link>
      </div>

      <div className="mb-6">
        <SearchInput onSearch={setSearchTerm} />
      </div>

      {loading && (
        <div
          className="flex justify-center items-center h-32"
          data-testid="loading-spinner"
        >
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      )}

      {error && (
        <div
          className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6"
          role="alert"
        >
          <p className="font-bold">Error</p>
          <p>{error}</p>
        </div>
      )}

      {forms && forms.length > 0 ? (
        <AnamnesisFormList forms={forms} />
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 text-xl">
            No forms found. Try a different search term or create a new form.
          </p>
        </div>
      )}
    </div>
  );
};
