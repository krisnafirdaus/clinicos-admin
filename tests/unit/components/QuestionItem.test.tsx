import { render, screen } from '@testing-library/react';
import { QuestionItem } from '../../../src/components/Question/QuestionItem';
import { Question } from '../../../src/types';

const mockQuestion: Question = {
  id: 1,
  text: 'Test Question',
  type: 'text',
  order: 1
};

test('renders QuestionItem with question data', () => {
  render(<QuestionItem question={mockQuestion} />);
  
  expect(screen.getByText('Test Question')).toBeInTheDocument();
});