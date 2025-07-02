import React, { createContext, useContext, useState, useEffect } from 'react';
import { Quiz, Question, QuizAttempt, LeaderboardEntry } from '../types';

interface QuizContextType {
  quizzes: Quiz[];
  userQuizzes: Quiz[];
  currentQuiz: Quiz | null;
  attempts: QuizAttempt[];
  leaderboard: LeaderboardEntry[];
  createQuiz: (quiz: Omit<Quiz, 'id' | 'createdAt'>) => void;
  updateQuiz: (quiz: Quiz) => void;
  deleteQuiz: (quizId: string) => void;
  getQuiz: (quizId: string) => Quiz | undefined;
  saveQuizAttempt: (attempt: Omit<QuizAttempt, 'id' | 'completedAt'>) => void;
  setCurrentQuiz: (quiz: Quiz | null) => void;
  publishQuiz: (quizId: string) => void;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
};

const sampleQuiz: Quiz = {
  id: 'quiz-general-1',
  title: 'Quick General Knowledge',
  description: 'Test your general knowledge with these quick questions! You have 10 seconds per question.',
  createdBy: 'system',
  createdAt: new Date(),
  published: true,
  difficulty: 'easy',
  questions: [
    {
      id: 'q1',
      text: 'Which planet is closest to the Sun?',
      options: [
        { id: 'q1-a', text: 'Mercury' },
        { id: 'q1-b', text: 'Venus' },
        { id: 'q1-c', text: 'Earth' },
        { id: 'q1-d', text: 'Mars' }
      ],
      correctOptionId: 'q1-a'
    },
    {
      id: 'q2',
      text: 'What is the capital of Japan?',
      options: [
        { id: 'q2-a', text: 'Seoul' },
        { id: 'q2-b', text: 'Beijing' },
        { id: 'q2-c', text: 'Tokyo' },
        { id: 'q2-d', text: 'Bangkok' }
      ],
      correctOptionId: 'q2-c'
    },
    {
      id: 'q3',
      text: 'How many continents are there?',
      options: [
        { id: 'q3-a', text: '5' },
        { id: 'q3-b', text: '6' },
        { id: 'q3-c', text: '7' },
        { id: 'q3-d', text: '8' }
      ],
      correctOptionId: 'q3-c'
    },
    {
      id: 'q4',
      text: 'What is the largest mammal in the world?',
      options: [
        { id: 'q4-a', text: 'African Elephant' },
        { id: 'q4-b', text: 'Blue Whale' },
        { id: 'q4-c', text: 'Giraffe' },
        { id: 'q4-d', text: 'Hippopotamus' }
      ],
      correctOptionId: 'q4-b'
    },
    {
      id: 'q5',
      text: 'Which element has the chemical symbol "O"?',
      options: [
        { id: 'q5-a', text: 'Gold' },
        { id: 'q5-b', text: 'Silver' },
        { id: 'q5-c', text: 'Oxygen' },
        { id: 'q5-d', text: 'Iron' }
      ],
      correctOptionId: 'q5-c'
    },
    {
      id: 'q6',
      text: 'What is the largest organ in the human body?',
      options: [
        { id: 'q6-a', text: 'Heart' },
        { id: 'q6-b', text: 'Brain' },
        { id: 'q6-c', text: 'Liver' },
        { id: 'q6-d', text: 'Skin' }
      ],
      correctOptionId: 'q6-d'
    },
    {
      id: 'q7',
      text: 'Which country is known as the Land of the Rising Sun?',
      options: [
        { id: 'q7-a', text: 'China' },
        { id: 'q7-b', text: 'Japan' },
        { id: 'q7-c', text: 'Thailand' },
        { id: 'q7-d', text: 'Vietnam' }
      ],
      correctOptionId: 'q7-b'
    },
    {
      id: 'q8',
      text: 'What is the primary color of chlorophyll?',
      options: [
        { id: 'q8-a', text: 'Red' },
        { id: 'q8-b', text: 'Blue' },
        { id: 'q8-c', text: 'Green' },
        { id: 'q8-d', text: 'Yellow' }
      ],
      correctOptionId: 'q8-c'
    },
    {
      id: 'q9',
      text: 'How many sides does a pentagon have?',
      options: [
        { id: 'q9-a', text: '4' },
        { id: 'q9-b', text: '5' },
        { id: 'q9-c', text: '6' },
        { id: 'q9-d', text: '7' }
      ],
      correctOptionId: 'q9-b'
    },
    {
      id: 'q10',
      text: 'Which vitamin is produced by the body when exposed to sunlight?',
      options: [
        { id: 'q10-a', text: 'Vitamin A' },
        { id: 'q10-b', text: 'Vitamin B' },
        { id: 'q10-c', text: 'Vitamin C' },
        { id: 'q10-d', text: 'Vitamin D' }
      ],
      correctOptionId: 'q10-d'
    }
  ]
};

export const QuizProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [quizzes, setQuizzes] = useState<Quiz[]>(() => {
    const storedQuizzes = localStorage.getItem('quizzes');
    if (storedQuizzes) {
      const parsedQuizzes = JSON.parse(storedQuizzes);
      // Ensure sample quiz is always present
      if (!parsedQuizzes.find((q: Quiz) => q.id === sampleQuiz.id)) {
        return [...parsedQuizzes, sampleQuiz];
      }
      return parsedQuizzes;
    }
    return [sampleQuiz];
  });

  const [currentQuiz, setCurrentQuiz] = useState<Quiz | null>(null);
  const [attempts, setAttempts] = useState<QuizAttempt[]>(() => {
    const storedAttempts = localStorage.getItem('attempts');
    return storedAttempts ? JSON.parse(storedAttempts) : [];
  });
  
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>(() => {
    const storedLeaderboard = localStorage.getItem('leaderboard');
    return storedLeaderboard ? JSON.parse(storedLeaderboard) : [];
  });

  useEffect(() => {
    localStorage.setItem('quizzes', JSON.stringify(quizzes));
    localStorage.setItem('attempts', JSON.stringify(attempts));
    localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
  }, [quizzes, attempts, leaderboard]);

  const createQuiz = (quizData: Omit<Quiz, 'id' | 'createdAt'>) => {
    const newQuiz: Quiz = {
      ...quizData,
      id: `quiz-${Date.now()}`,
      createdAt: new Date()
    };
    setQuizzes(prev => [...prev, newQuiz]);
  };

  const updateQuiz = (updatedQuiz: Quiz) => {
    setQuizzes(prev => 
      prev.map(quiz => quiz.id === updatedQuiz.id ? updatedQuiz : quiz)
    );
  };

  const deleteQuiz = (quizId: string) => {
    setQuizzes(prev => prev.filter(quiz => quiz.id !== quizId));
  };

  const getQuiz = (quizId: string) => {
    return quizzes.find(quiz => quiz.id === quizId);
  };

  const saveQuizAttempt = (attemptData: Omit<QuizAttempt, 'id' | 'completedAt'>) => {
    const newAttempt: QuizAttempt = {
      ...attemptData,
      id: `attempt-${Date.now()}`,
      completedAt: new Date()
    };
    
    setAttempts(prev => [...prev, newAttempt]);
    
    const quiz = quizzes.find(q => q.id === attemptData.quizId);
    if (quiz) {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const leaderboardEntry: LeaderboardEntry = {
        userId: attemptData.userId,
        userName: user.name || 'Anonymous',
        quizId: attemptData.quizId,
        quizTitle: quiz.title,
        score: attemptData.score,
        totalQuestions: attemptData.totalQuestions,
        completedAt: new Date()
      };
      
      setLeaderboard(prev => [...prev, leaderboardEntry]);
    }
  };

  const publishQuiz = (quizId: string) => {
    setQuizzes(prev =>
      prev.map(quiz => quiz.id === quizId ? { ...quiz, published: true } : quiz)
    );
  };

  const userQuizzes = quizzes.filter(quiz => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return quiz.createdBy === user.id;
  });

  return (
    <QuizContext.Provider 
      value={{ 
        quizzes, 
        userQuizzes, 
        currentQuiz, 
        attempts, 
        leaderboard, 
        createQuiz, 
        updateQuiz, 
        deleteQuiz, 
        getQuiz, 
        saveQuizAttempt, 
        setCurrentQuiz,
        publishQuiz
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};