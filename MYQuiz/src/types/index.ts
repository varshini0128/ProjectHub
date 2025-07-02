export interface User {
  id: string;
  name: string;
  email: string;
  isAuthenticated: boolean;
  avatar?: string;
  bio?: string;
}

export interface Question {
  id: string;
  text: string;
  options: Option[];
  correctOptionId: string;
  explanation?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
}

export interface Option {
  id: string;
  text: string;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  createdBy: string;
  questions: Question[];
  createdAt: Date;
  published: boolean;
  category?: QuizCategory;
  difficulty?: 'easy' | 'medium' | 'hard';
}

export type QuizCategory = 
  | 'general-knowledge'
  | 'technology'
  | 'business-economics'
  | 'health-wellness'
  | 'science-nature'
  | 'mathematics'
  | 'geography'
  | 'current-affairs'
  | 'literature'
  | 'history'
  | 'pop-culture'
  | 'trivia'
  | 'movies';

export interface QuizAttempt {
  id: string;
  quizId: string;
  userId: string;
  score: number;
  totalQuestions: number;
  completedAt: Date;
  answers: {
    questionId: string;
    selectedOptionId: string;
    isCorrect: boolean;
  }[];
}

export interface LeaderboardEntry {
  userId: string;
  userName: string;
  quizId: string;
  quizTitle: string;
  score: number;
  totalQuestions: number;
  completedAt: Date;
}

export interface CategoryInfo {
  id: QuizCategory;
  name: string;
  description: string;
  icon: string;
}