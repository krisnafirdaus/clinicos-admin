import { AnamnesisForm, FormData } from '../types';

import anamnesisFormsData from './anamnesisFormsData.json';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const fetchForms = async (searchTerm?: string): Promise<AnamnesisForm[]> => {
  await delay(300);
  if (searchTerm) {
    return anamnesisFormsData.anamnesisFormsData.filter(form => 
      form.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      form.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
  return anamnesisFormsData.anamnesisFormsData;
};

export const fetchFormById = async (id: number): Promise<AnamnesisForm> => {
  await delay(200);
  const form = anamnesisFormsData.anamnesisFormsData.find(form => form.id === id);
  if (!form) {
    throw new Error('Form not found');
  }
  return form;
};

export const createForm = async (formData: FormData): Promise<AnamnesisForm> => {
  await delay(400);
  const now = new Date().toISOString();
  const newForm: AnamnesisForm = {
    ...formData,
    id: Math.max(...anamnesisFormsData.anamnesisFormsData.map(f => f.id)) + 1,
    createdAt: now,
    updatedAt: now
  };
  anamnesisFormsData.anamnesisFormsData.push(newForm);
  return newForm;
};

export const updateForm = async (id: number, formData: Partial<AnamnesisForm>): Promise<AnamnesisForm> => {
  await delay(300);
  const index = anamnesisFormsData.anamnesisFormsData.findIndex(form => form.id === id);
  if (index === -1) {
    throw new Error('Form not found');
  }
  const updatedForm: AnamnesisForm = { 
    ...anamnesisFormsData.anamnesisFormsData[index], 
    ...formData,
    updatedAt: new Date().toISOString()
  };
  anamnesisFormsData.anamnesisFormsData[index] = updatedForm;
  return updatedForm;
};

export const deleteForm = async (id: number): Promise<void> => {
  await delay(200);
  const index = anamnesisFormsData.anamnesisFormsData.findIndex(form => form.id === id);
  if (index === -1) {
    throw new Error('Form not found');
  }
  anamnesisFormsData.anamnesisFormsData.splice(index, 1);
};