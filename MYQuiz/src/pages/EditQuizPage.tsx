import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../layout/Layout';
import QuizCreator from '../quiz/QuizCreator';
import { useQuiz } from '../context/QuizContext';
import { useAuth } from '../context/AuthContext';

const EditQuizPage: React.FC = () => {
  const { quizId } = useParams<{ quizId: string }>();
  const { getQuiz } = useQuiz();
  const { user } = useAuth();
  const [quiz, setQuiz] = useState(getQuiz(quizId || ''));
  
  useEffect(() => {
    if (quizId) {
      const quizData = getQuiz(quizId);
      if (quizData) {
        setQuiz(quizData);
        document.title = `Edit: ${quizData.title} | QuizCraft`;
      }
    }
  }, [quizId, getQuiz]);
  
  // Redirect if user is not logged in
  if (!user?.isAuthenticated) {
    window.location.href = '/login';
    return null;
  }
  
  // Redirect if quiz doesn't exist or user doesn't own it
  if (!quiz || quiz.createdBy !== user.id) {
    window.location.href = '/dashboard';
    return null;
  }

  return (
    <Layout>
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Edit Quiz: {quiz.title}
        </h1>
        
        <QuizCreator />
      </div>
    </Layout>
  );
};

export default EditQuizPage;