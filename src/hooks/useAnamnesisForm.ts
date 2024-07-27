import { useState, useCallback } from 'react';
import { AnamnesisForm, FormData } from '../types';
import * as api from '../services/api';

export const useAnamnesisForm = () => {
  const [forms, setForms] = useState<AnamnesisForm[]>([]);
  const [form, setForm] = useState<AnamnesisForm | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchForms = useCallback(async (searchTerm?: string) => {
    setLoading(true);
    try {
      const data = await api.fetchForms(searchTerm);
      setForms(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch forms');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchForm = useCallback(async (id: number) => {
    setLoading(true);
    try {
      const data = await api.fetchFormById(id);
      setForm(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch form');
    } finally {
      setLoading(false);
    }
  }, []);

  const createForm = useCallback(async (formData: FormData) => {
    setLoading(true);
    try {
      const newForm = await api.createForm(formData);
      setForms(prevForms => [...prevForms, newForm]);
      setError(null);
    } catch (err) {
      setError('Failed to create form');
    } finally {
      setLoading(false);
    }
  }, []);

  const updateForm = useCallback(async (id: number, formData: Partial<AnamnesisForm>) => {
    setLoading(true);
    try {
      const updatedForm = await api.updateForm(id, formData);
      setForms(prevForms => prevForms.map(form => form.id === id ? updatedForm : form));
      setError(null);
    } catch (err) {
      setError('Failed to update form');
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteForm = useCallback(async (id: number) => {
    setLoading(true);
    try {
      await api.deleteForm(id);
      setForms(prevForms => prevForms.filter(form => form.id !== id));
      setError(null);
    } catch (err) {
      setError('Failed to delete form');
    } finally {
      setLoading(false);
    }
  }, []);

  return { forms, form, loading, error, fetchForms, fetchForm, createForm, updateForm, deleteForm };
};