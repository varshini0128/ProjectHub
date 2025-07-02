import React from 'react';
import { Trophy, Medal } from 'lucide-react';
import { LeaderboardEntry } from '../types';
import Card, { CardHeader, CardBody } from '../ui/Card';

interface LeaderboardTableProps {
  entries: LeaderboardEntry[];
}

const LeaderboardTable: React.FC<LeaderboardTableProps> = ({ entries }) => {
  // Sort entries by score (highest first) and then by date (most recent first)
  const sortedEntries = [...entries].sort((a, b) => {
    const scoreComparison = b.score / b.totalQuestions - a.score / a.totalQuestions;
    if (scoreComparison !== 0) return scoreComparison;
    return new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime();
  });

  return (
    <Card>
      <CardHeader className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
          <Trophy size={20} className="mr-2 text-yellow-500" />
          Leaderboard
        </h2>
      </CardHeader>
      <CardBody className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-800 text-left">
              <tr>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Rank</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Quiz</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Score</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Percentage</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {sortedEntries.map((entry, index) => {
                const percentage = Math.round((entry.score / entry.totalQuestions) * 100);
                
                // Custom styling for top 3 ranks
                const getRankStyle = (rank: number) => {
                  if (rank === 0) return "text-yellow-500"; // Gold
                  if (rank === 1) return "text-gray-400";   // Silver
                  if (rank === 2) return "text-amber-600";  // Bronze
                  return "text-gray-500 dark:text-gray-400";
                };
                
                const getRankIcon = (rank: number) => {
                  if (rank <= 2) {
                    return <Medal size={18} className={getRankStyle(rank)} />;
                  }
                  return null;
                };
                
                return (
                  <tr 
                    key={`${entry.userId}-${entry.quizId}-${entry.completedAt}`} 
                    className={`
                      ${index < 3 ? 'bg-gray-50 dark:bg-gray-700/50' : 'bg-white dark:bg-gray-800'}
                      hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors
                    `}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className={`font-bold ${getRankStyle(index)}`}>{index + 1}</span>
                        <span className="ml-2">{getRankIcon(index)}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      {entry.userName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {entry.quizTitle}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      {entry.score} / {entry.totalQuestions}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div 
                        className={`
                          px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full
                          ${percentage >= 80 ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : 
                            percentage >= 60 ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' :
                            percentage >= 40 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' :
                            'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'}
                        `}
                      >
                        {percentage}%
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {new Date(entry.completedAt).toLocaleDateString()}
                    </td>
                  </tr>
                );
              })}
              
              {sortedEntries.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center text-gray-500 dark:text-gray-400">
                    No entries yet. Be the first to complete a quiz!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </CardBody>
    </Card>
  );
};

export default LeaderboardTable;