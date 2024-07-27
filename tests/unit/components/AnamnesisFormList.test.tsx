import { render, screen } from '@testing-library/react';
import { AnamnesisFormList } from '../../../src/components/AnamnesisForm/AnamnesisFormList';
import { BrowserRouter } from 'react-router-dom';
import { useAnamnesisForm } from '../../../src/hooks/useAnamnesisForm';

jest.mock('../../../src/hooks/useAnamnesisForm');

const mockUseAnamnesisForm = useAnamnesisForm as jest.MockedFunction<typeof useAnamnesisForm>;

const mockForms = [
  { 
    id: 1, 
    title: 'Form 1', 
    description: 'Description 1', 
    createdAt: '2024-07-26T10:00:00Z',
    sections: []
  },
  { 
    id: 2, 
    title: 'Form 2', 
    description: 'Description 2', 
    createdAt: '2024-07-26T11:00:00Z',
    sections: []
  },
];

describe('AnamnesisFormList', () => {
  beforeEach(() => {
    mockUseAnamnesisForm.mockReturnValue({
      deleteForm: jest.fn(),
      fetchForms: jest.fn(),
    } as any);
  });

  test('renders AnamnesisFormList with forms', () => {
    render(
      <BrowserRouter>
        <AnamnesisFormList forms={mockForms} />
      </BrowserRouter>
    );
    
    expect(screen.getByText('Form 1')).toBeInTheDocument();
    expect(screen.getByText('Form 2')).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: /View/i }).length).toBe(2);
    expect(screen.getAllByRole('button', { name: /Edit/i }).length).toBe(2);
    expect(screen.getAllByRole('button', { name: /Delete/i }).length).toBe(2);
  });  
});
