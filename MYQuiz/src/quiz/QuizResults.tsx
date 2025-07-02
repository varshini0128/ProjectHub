import React from 'react';
import { CheckCircle, XCircle, Clock } from 'lucide-react';
import { Quiz, QuizAttempt } from '../types';
import Card, { CardHeader, CardBody } from '../ui/Card';

interface QuizResultsProps {
  quiz: Quiz;
  attempt: QuizAttempt;
}

const QuizResults: React.FC<QuizResultsProps> = ({ quiz, attempt }) => {
  const scorePercentage = Math.round((attempt.score / attempt.totalQuestions) * 100);
  
  // Get stats for results display
  const totalCorrect = attempt.answers.filter(answer => answer.isCorrect).length;
  const totalIncorrect = attempt.totalQuestions - totalCorrect;
  
  return (
    <div className="max-w-3xl mx-auto">
      <Card className="mb-8">
        <CardHeader>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Quiz Results</h2>
        </CardHeader>
        <CardBody>
          <div className="flex flex-col md:flex-row md:justify-around items-center gap-6 py-4">
            <div className="text-center">
              <div className="text-3xl font-bold mb-1 text-indigo-600 dark:text-indigo-400">
                {attempt.score} / {attempt.totalQuestions}
              </div>
              <p className="text-gray-500 dark:text-gray-400">Final Score</p>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold mb-1 text-gray-900 dark:text-gray-100">
                {scorePercentage}%
              </div>
              <p className="text-gray-500 dark:text-gray-400">Percentage</p>
            </div>
            
            <div className="flex gap-6">
              <div className="text-center">
                <div className="flex justify-center mb-1">
                  <CheckCircle size={28} className="text-green-500" />
                </div>
                <div className="text-xl font-bold text-gray-900 dark:text-gray-100">
                  {totalCorrect}
                </div>
                <p className="text-gray-500 dark:text-gray-400">Correct</p>
              </div>
              
              <div className="text-center">
                <div className="flex justify-center mb-1">
                  <XCircle size={28} className="text-red-500" />
                </div>
                <div className="text-xl font-bold text-gray-900 dark:text-gray-100">
                  {totalIncorrect}
                </div>
                <p className="text-gray-500 dark:text-gray-400">Incorrect</p>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
      
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Question Breakdown</h2>
        
        {quiz.questions.map((question, index) => {
          const answer = attempt.answers.find(a => a.questionId === question.id);
          const selectedOption = question.options.find(o => o.id === answer?.selectedOptionId);
          const correctOption = question.options.find(o => o.id === question.correctOptionId);
          
          return (
            <Card key={question.id} className="overflow-hidden">
              <div className="px-6 py-4 flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">
                  {answer?.isCorrect ? (
                    <CheckCircle className="h-6 w-6 text-green-500" />
                  ) : (
                    <XCircle className="h-6 w-6 text-red-500" />
                  )}
                </div>
                
                <div className="flex-grow">
                  <h3 className="text-md font-medium text-gray-900 dark:text-gray-100 mb-3">
                    {index + 1}. {question.text}
                  </h3>
                  
                  <div className="space-y-2 mb-3">
                    {question.options.map((option) => (
                      <div 
                        key={option.id}
                        className={`p-3 rounded-md ${
                          option.id === question.correctOptionId
                            ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800'
                            : option.id === answer?.selectedOptionId && !answer.isCorrect
                              ? 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
                              : 'bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700'
                        }`}
                      >
                        <div className="flex items-center">
                          <div className="flex-grow">
                            {option.text}
                          </div>
                          
                          {option.id === question.correctOptionId && (
                            <span className="text-xs font-medium text-green-600 dark:text-green-400 ml-2">
                              Correct Answer
                            </span>
                          )}
                          
                          {option.id === answer?.selectedOptionId && !answer.isCorrect && (
                            <span className="text-xs font-medium text-red-600 dark:text-red-400 ml-2">
                              Your Answer
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {question.explanation && (
                    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 p-3 rounded-md">
                      <p className="text-sm text-blue-800 dark:text-blue-300">
                        <span className="font-medium">Explanation:</span> {question.explanation}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default QuizResults;