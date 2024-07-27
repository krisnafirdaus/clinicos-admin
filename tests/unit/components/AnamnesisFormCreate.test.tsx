import { render, screen, fireEvent } from '@testing-library/react';
import { AnamnesisFormCreate } from '../../../src/components/AnamnesisForm/AnamnesisFormCreate';

test('renders AnamnesisFormCreate and handles form submission', async () => {
  const mockOnSubmit = jest.fn();
  render(<AnamnesisFormCreate onSubmit={mockOnSubmit} />);
  
  fireEvent.change(screen.getByLabelText('Form Title'), { target: { value: 'New Form' } });
  fireEvent.change(screen.getByLabelText('Form Description'), { target: { value: 'New Description' } });
  fireEvent.click(screen.getByText('Add Section'));
  fireEvent.click(screen.getByText('Create Form'));
  
  expect(mockOnSubmit).toHaveBeenCalledWith(expect.objectContaining({
    title: 'New Form',
    description: 'New Description',
    sections: expect.arrayContaining([expect.objectContaining({ title: 'New Section 1', order: 1 })])
  }));
});