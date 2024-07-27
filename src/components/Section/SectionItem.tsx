import React from 'react';
import { QuestionItem } from '../Question/QuestionItem';

interface Section {
  id: number;
  title: string;
  questions: Array<{ id: number; text: string }>;
}

export const SectionItem: React.FC<{ section: Section }> = ({ section }) => {
  return (
    <div className="bg-gray-100 p-4 rounded-lg mb-4">
      <h3 className="text-xl font-semibold mb-3 text-gray-800">{section.title}</h3>
      <div className="space-y-2">
        {section.questions.map(question => (
          <QuestionItem key={question.id} question={question} />
        ))}
      </div>
    </div>
  );
};