import { render, screen } from '@testing-library/react';
import { SectionItem } from '../../../src/components/Section/SectionItem';
import { Section } from '../../../src/types';

const mockSection: Section = {
  id: 1,
  title: 'Test Section',
  order: 1,
  questions: [
    { id: 1, text: 'Test Question', type: 'text', order: 1 }
  ]
};

test('renders SectionItem with section data', () => {
  render(<SectionItem section={mockSection} />);
  
  expect(screen.getByText('Test Section')).toBeInTheDocument();
  expect(screen.getByText('Test Question')).toBeInTheDocument();
});