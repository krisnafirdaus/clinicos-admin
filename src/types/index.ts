export interface Question {
  id: number;
  text: string;
  type: string;
  order: number;
}

export interface Section {
  id: number;
  title: string;
  order: number;
  questions: Question[];
}

export interface AnamnesisForm {
  id: number;
  title: string;
  description: string;
  createdAt: string;
  updatedAt?: string;
  sections: Section[];
}

export interface FormData {
  title: string;
  description: string;
  sections: Section[];
}