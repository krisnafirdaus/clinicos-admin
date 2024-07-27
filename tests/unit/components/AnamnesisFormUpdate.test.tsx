import { render, screen } from '@testing-library/react';
import { AnamnesisFormUpdate } from '../../../src/components/AnamnesisForm/AnamnesisFormUpdate';
import { BrowserRouter } from 'react-router-dom';
import { useAnamnesisForm } from '../../../src/hooks/useAnamnesisForm';

// Mock useAnamnesisForm hook
jest.mock('../../../src/hooks/useAnamnesisForm');

const mockUseAnamnesisForm = useAnamnesisForm as jest.MockedFunction<typeof useAnamnesisForm>;

const mockForm = {
  id: 1,
  title: 'Mock Form',
  description: 'Mock Description',
  createdAt: '2024-07-26T10:00:00Z',
  sections: []
};

const mockOnSubmit = jest.fn();

describe('AnamnesisFormUpdate', () => {
  beforeEach(() => {
    mockUseAnamnesisForm.mockReturnValue({
      deleteForm: jest.fn(),
    } as any);
  });

  test('renders AnamnesisFormUpdate with form data', () => {
    render(
      <BrowserRouter>
        <AnamnesisFormUpdate form={mockForm} onSubmit={mockOnSubmit} />
      </BrowserRouter>
    );
    
    expect(screen.getByLabelText(/Title/i)).toHaveValue(mockForm.title);
    expect(screen.getByLabelText(/Description/i)).toHaveValue(mockForm.description);
    expect(screen.getByText(new Date(mockForm.createdAt).toLocaleDateString())).toBeInTheDocument();
  });
});
