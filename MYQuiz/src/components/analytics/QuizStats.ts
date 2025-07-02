import React from 'react';
import { BarChart3, Users, Clock, Award } from 'lucide-react';
import { Quiz, QuizAttempt } from '../../types';
import Card, { CardHeader, CardBody } from '../ui/Card';

interface QuizStatsProps {
  quiz: Quiz;
  attempts: QuizAttempt[];
}

const QuizStats: React.FC<QuizStatsProps> = ({ quiz, attempts }) => {
  // Filter attempts for this specific quiz
  const quizAttempts = attempts.filter(attempt => attempt.quizId === quiz.id);
  
  // Calculate statistics
  const totalAttempts = quizAttempts.length;
  const averageScore = totalAttempts > 0 
    ? Math.round(quizAttempts.reduce((sum, attempt) => sum + attempt.score, 0) / totalAttempts) 
    : 0;
  const averagePercentage = totalAttempts > 0 
    ? Math.round((averageScore / quiz.questions.length) * 100) 
    : 0;
  
  // Calculate question difficulty
  const questionStats = quiz.questions.map((question, index) => {
    const answersForQuestion = quizAttempts.map(attempt => attempt.answers[index]);
    const correctCount = answersForQuestion.filter(answer => answer?.isCorrect).length;
    const incorrectCount = answersForQuestion.length - correctCount;
    const correctPercentage = answersForQuestion.length > 0 
      ? Math.round((correctCount / answersForQuestion.length) * 100) 
      : 0;
    
    return {
      questionNumber: index + 1,
      questionText: question.text,
      correctCount,
      incorrectCount,
      correctPercentage
    };
  });
  
  // Sort questions by difficulty (lowest correct percentage first)
  const sortedQuestionStats = [...questionStats].sort((a, b) => a.correctPercentage - b.correctPercentage);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardBody className="flex items-center p-6">
            <div className="p-3 rounded-full bg-indigo-100 dark:bg-indigo-900/50 mr-4">
              <Users className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Attempts</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">{totalAttempts}</p>
            </div>
          </CardBody>
        </Card>
        
        <Card>
          <CardBody className="flex items-center p-6">
            <div className="p-3 rounded-full bg-green-100 dark:bg-green-900/50 mr-4">
              <Award className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Average Score</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                {averageScore} / {quiz.questions.length}
              </p>
            </div>
          </CardBody>
        </Card>
        
        <Card>
          <CardBody className="flex items-center p-6">
            <div className="p-3 rounded-full bg-yellow-100 dark:bg-yellow-900/50 mr-4">
              <BarChart3 className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Average Percentage</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">{averagePercentage}%</p>
            </div>
          </CardBody>
        </Card>
        
        <Card>
          <CardBody className="flex items-center p-6">
            <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/50 mr-4">
              <Clock className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Quiz Length</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">{quiz.questions.length}</p>
            </div>
          </CardBody>
        </Card>
      </div>
      
      {totalAttempts > 0 && (
        <Card>
          <CardHeader>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Question Difficulty</h2>
          </CardHeader>
          <CardBody>
            <div className="space-y-4">
              {sortedQuestionStats.map((stat) => (
                <div key={stat.questionNumber} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Q{stat.questionNumber}: {stat.questionText.length > 60 
                        ? `${stat.questionText.substring(0, 60)}...` 
                        : stat.questionText}
                    </p>
                    <span 
                      className={`px-2 py-1 text-xs rounded-full font-medium 
                        ${stat.correctPercentage >= 80 ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : 
                          stat.correctPercentage >= 60 ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' :
                          stat.correctPercentage >= 40 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' :
                          'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'}`}
                    >
                      {stat.correctPercentage}% correct
                    </span>
                  </div>
                  
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
                    <div 
                      className="bg-green-600 dark:bg-green-500 h-2.5"
                      style={{ width: `${stat.correctPercentage}%` }}
                    ></div>
                  </div>
                  
                  <div className="flex text-xs text-gray-500 dark:text-gray-400">
                    <span className="mr-4">{stat.correctCount} correct</span>
                    <span>{stat.incorrectCount} incorrect</span>
                  </div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      )}
    </div>
  );
};

export default QuizStats;