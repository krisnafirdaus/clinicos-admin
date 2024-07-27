import React from 'react';

interface Question {
  id: number;
  text: string;
}

export const QuestionItem: React.FC<{ question: Question }> = ({ question }) => {
  return (
    <div className="bg-white p-3 rounded shadow">
      <p className="text-gray-700">{question.text}</p>
    </div>
  );
};