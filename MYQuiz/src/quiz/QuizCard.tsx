import React from 'react';
import { BookOpen, Clock, Award } from 'lucide-react';
import { Quiz } from '../types';
import Card, { CardBody, CardFooter } from '../ui/Card';
import Button from '../ui/Button';

interface QuizCardProps {
  quiz: Quiz;
  onClick?: () => void;
}

const QuizCard: React.FC<QuizCardProps> = ({ quiz, onClick }) => {
  return (
    <Card hoverable className="h-full flex flex-col transition-transform hover:scale-[1.01] duration-200">
      <CardBody className="flex-grow">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
          {quiz.title}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          {quiz.description}
        </p>
        <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center">
            <BookOpen size={16} className="mr-1" />
            <span>{quiz.questions.length} Questions</span>
          </div>
          <div className="flex items-center">
            <Clock size={16} className="mr-1" />
            <span>~{Math.max(Math.round(quiz.questions.length * 0.5), 1)} mins</span>
          </div>
          {quiz.published && (
            <div className="flex items-center">
              <Award size={16} className="mr-1" />
              <span>Ranked</span>
            </div>
          )}
        </div>
      </CardBody>
      <CardFooter className="bg-gray-50 dark:bg-gray-900 pt-3 pb-3">
        <Button 
          variant="primary" 
          fullWidth
          onClick={onClick}
        >
          {quiz.published ? 'Take Quiz' : 'Preview Quiz'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default QuizCard;