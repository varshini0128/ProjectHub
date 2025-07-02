import React from 'react';
import Layout from '../layout/Layout';
import QuizCreator from '../quiz/QuizCreator';
import { useAuth } from '../context/AuthContext';

const CreateQuizPage: React.FC = () => {
  const { user } = useAuth();
  
  // Redirect if user is not logged in
  if (!user?.isAuthenticated) {
    window.location.href = '/login';
    return null;
  }

  return (
    <Layout>
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Create a New Quiz
        </h1>
        
        <QuizCreator />
      </div>
    </Layout>
  );
};

export default CreateQuizPage;