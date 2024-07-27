import { render, screen } from '@testing-library/react';
import { AnamnesisFormDetail } from '../../../src/components/AnamnesisForm/AnamnesisFormDetail';
import { AnamnesisForm } from '../../../src/types';

const mockForm: AnamnesisForm = {
  id: 1,
  title: 'Test Form',
  description: 'Test Description',
  createdAt: '2024-07-26T10:00:00Z',
  sections: [
    { 
      id: 1, 
      title: 'Section 1', 
      order: 1, 
      questions: [
        { id: 1, text: 'Question 1', type: 'text', order: 1 }
      ] 
    }
  ]
};

test('renders AnamnesisFormDetail with form data', () => {
  render(<AnamnesisFormDetail form={mockForm} />);
  
  expect(screen.getByText('Test Form')).toBeInTheDocument();
  expect(screen.getByText('Test Description')).toBeInTheDocument();
  expect(screen.getByText('Section 1')).toBeInTheDocument();
  expect(screen.getByText('Question 1')).toBeInTheDocument();
});
