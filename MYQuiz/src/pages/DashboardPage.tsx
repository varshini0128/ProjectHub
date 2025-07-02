import React from 'react';
import { PlusCircle } from 'lucide-react';
import Layout from '../layout/Layout';
import QuizList from '../dashboard/QuizList';
import Button from '../ui/Button';
import { useQuiz } from '../context/QuizContext';
import { useAuth } from '../context/AuthContext';

const DashboardPage: React.FC = () => {
  const { userQuizzes, attempts } = useQuiz();
  const { user } = useAuth();
  
  // Get user's quiz attempts
  const userAttempts = user 
    ? attempts.filter(attempt => attempt.userId === user.id)
    : [];
  
  // Get unique quiz IDs from attempts
  const attemptedQuizIds = [...new Set(userAttempts.map(attempt => attempt.quizId))];
  
  // Calculate stats
  const totalQuizzes = userQuizzes.length;
  const totalAttempts = userAttempts.length;
  const averageScore = userAttempts.length > 0
    ? Math.round(
        userAttempts.reduce((acc, curr) => acc + (curr.score / curr.totalQuestions) * 100, 0) / 
        userAttempts.length
      )
    : 0;

  if (!user) {
    window.location.href = '/login';
    return null;
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Dashboard
          </h1>
          <a href="/create-quiz">
            <Button 
              variant="primary" 
              leftIcon={<PlusCircle size={16} />}
            >
              Create New Quiz
            </Button>
          </a>
        </div>
        
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h3 className="text-lg font-medium text-gray-500 dark:text-gray-400 mb-2">
              Your Quizzes
            </h3>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">
              {totalQuizzes}
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h3 className="text-lg font-medium text-gray-500 dark:text-gray-400 mb-2">
              Quizzes Taken
            </h3>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">
              {attemptedQuizIds.length}
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h3 className="text-lg font-medium text-gray-500 dark:text-gray-400 mb-2">
              Average Score
            </h3>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">
              {averageScore}%
            </p>
          </div>
        </div>
        
        {/* Created Quizzes */}
        <div className="mb-8">
          <QuizList quizzes={userQuizzes} />
        </div>
        
        {/* Recent Activity */}
        {userAttempts.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden mb-8">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Recent Activity</h2>
            </div>
            <div className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-800 text-left">
                    <tr>
                      <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Quiz</th>
                      <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Score</th>
                      <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {userAttempts
                      .sort((a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime())
                      .slice(0, 5)
                      .map((attempt) => {
                        const quiz = useQuiz().quizzes.find(q => q.id === attempt.quizId);
                        const percentage = Math.round((attempt.score / attempt.totalQuestions) * 100);
                        
                        return (
                          <tr key={attempt.id} className="bg-white dark:bg-gray-800">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                              {quiz ? quiz.title : 'Unknown Quiz'}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              <div className="flex items-center">
                                <span className="mr-2">{attempt.score}/{attempt.totalQuestions}</span>
                                <div 
                                  className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full
                                    ${percentage >= 80 ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : 
                                      percentage >= 60 ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' :
                                      percentage >= 40 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' :
                                      'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'}`}
                                >
                                  {percentage}%
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                              {new Date(attempt.completedAt).toLocaleDateString()}
                            </td>
                          </tr>
                        );
                      })
                    }
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default DashboardPage;