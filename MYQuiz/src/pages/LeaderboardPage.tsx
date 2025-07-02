import React, { useState } from 'react';
import Layout from '../layout/Layout';
import LeaderboardTable from '../leaderboard/LeaderboardTable';
import { useQuiz } from '../context/QuizContext';

const LeaderboardPage: React.FC = () => {
  const { leaderboard, quizzes } = useQuiz();
  const [selectedQuizId, setSelectedQuizId] = useState<string | 'all'>('all');
  
  // Filter leaderboard by quiz if one is selected
  const filteredLeaderboard = selectedQuizId === 'all'
    ? leaderboard
    : leaderboard.filter(entry => entry.quizId === selectedQuizId);
  
  // Get list of quizzes that have entries in the leaderboard
  const quizzesWithEntries = [...new Set(leaderboard.map(entry => entry.quizId))]
    .map(quizId => quizzes.find(quiz => quiz.id === quizId))
    .filter(quiz => quiz !== undefined) as any[];

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Leaderboard
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            See how you compare with other quiz-takers. Filter by quiz to view specific rankings.
          </p>
        </div>
        
        {/* Quiz Filter */}
        {quizzesWithEntries.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
            <div className="flex items-center flex-wrap gap-3">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Filter by Quiz:
              </span>
              
              <button
                onClick={() => setSelectedQuizId('all')}
                className={`px-3 py-1 text-sm rounded-full ${
                  selectedQuizId === 'all'
                    ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300'
                    : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                All Quizzes
              </button>
              
              {quizzesWithEntries.map(quiz => (
                <button
                  key={quiz.id}
                  onClick={() => setSelectedQuizId(quiz.id)}
                  className={`px-3 py-1 text-sm rounded-full ${
                    selectedQuizId === quiz.id
                      ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300'
                      : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {quiz.title}
                </button>
              ))}
            </div>
          </div>
        )}
        
        {/* Leaderboard Table */}
        <LeaderboardTable entries={filteredLeaderboard} />
      </div>
    </Layout>
  );
};

export default LeaderboardPage;