import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../layout/Layout';
import QuizRunner from '../quiz/QuizRunner';
import QuizResults from '../quiz/QuizResults';
import { useQuiz } from '../context/QuizContext';

const QuizPage: React.FC = () => {
  const { quizId } = useParams<{ quizId: string }>();
  const { getQuiz, attempts } = useQuiz();
  const [quiz, setQuiz] = useState(getQuiz(quizId || ''));
  const [isCompleted, setIsCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  
  // Find the latest attempt for this quiz
  const latestAttempt = attempts
    .filter(attempt => attempt.quizId === quizId)
    .sort((a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime())[0];

  useEffect(() => {
    // Set quiz data from params
    if (quizId) {
      const quizData = getQuiz(quizId);
      if (quizData) {
        setQuiz(quizData);
        document.title = `${quizData.title} | QuizCraft`;
      }
    }
  }, [quizId, getQuiz]);

  const handleQuizComplete = (score: number, total: number) => {
    setScore(score);
    setTotalQuestions(total);
    setIsCompleted(true);
  };

  if (!quiz) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto text-center py-16">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Quiz Not Found
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            The quiz you're looking for doesn't exist or has been removed.
          </p>
          <a 
            href="/explore" 
            className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300"
          >
            Explore other quizzes
          </a>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        {!isCompleted ? (
          <>
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {quiz.title}
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                {quiz.description}
              </p>
            </div>
            
            <QuizRunner quiz={quiz} onComplete={handleQuizComplete} />
          </>
        ) : (
          <>
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Results: {quiz.title}
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                You scored {score} out of {totalQuestions}
              </p>
            </div>
            
            {latestAttempt && (
              <QuizResults quiz={quiz} attempt={latestAttempt} />
            )}
          </>
        )}
      </div>
    </Layout>
  );
};

export default QuizPage;