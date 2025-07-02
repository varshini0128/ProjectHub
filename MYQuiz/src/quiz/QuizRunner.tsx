import React, { useState, useEffect } from 'react';
import { ArrowRight, ArrowLeft, CheckCircle, Clock } from 'lucide-react';
import { Quiz } from '../types';
import { useQuiz } from '../context/QuizContext';
import { useAuth } from '../context/AuthContext';
import Button from '../ui/Button';
import Card, { CardBody, CardFooter } from '../ui/Card';

interface QuizRunnerProps {
  quiz: Quiz;
  onComplete: (score: number, totalQuestions: number) => void;
}

const QuizRunner: React.FC<QuizRunnerProps> = ({ quiz, onComplete }) => {
  const { user } = useAuth();
  const { saveQuizAttempt } = useQuiz();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [questionTimer, setQuestionTimer] = useState(10);

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const totalQuestions = quiz.questions.length;
  const isFirstQuestion = currentQuestionIndex === 0;
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;

  useEffect(() => {
    // Reset timer when question changes
    setQuestionTimer(10);

    // Start countdown
    const timer = setInterval(() => {
      setQuestionTimer((prev) => {
        if (prev <= 1) {
          // Time's up - move to next question
          if (!isLastQuestion) {
            moveToNextQuestion();
          } else {
            calculateResults();
          }
          return 10;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentQuestionIndex]);

  const handleOptionSelect = (questionId: string, optionId: string) => {
    setSelectedOptions(prev => ({
      ...prev,
      [questionId]: optionId
    }));
    
    // Automatically move to next question after selection
    setTimeout(() => {
      if (isLastQuestion) {
        calculateResults();
      } else {
        moveToNextQuestion();
      }
    }, 500);
  };

  const moveToNextQuestion = () => {
    if (isLastQuestion) {
      calculateResults();
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const calculateResults = () => {
    let correctAnswers = 0;
    
    const answers = quiz.questions.map(question => {
      const selectedOptionId = selectedOptions[question.id] || '';
      const isCorrect = selectedOptionId === question.correctOptionId;
      
      if (isCorrect) correctAnswers++;
      
      return {
        questionId: question.id,
        selectedOptionId,
        isCorrect
      };
    });
    
    setScore(correctAnswers);
    setShowResults(true);
    
    if (user) {
      saveQuizAttempt({
        quizId: quiz.id,
        userId: user.id,
        score: correctAnswers,
        totalQuestions,
        answers
      });
    }
    
    onComplete(correctAnswers, totalQuestions);
  };

  const progressPercentage = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  if (showResults) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardBody className="text-center py-10">
          <div className="w-20 h-20 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} className="text-indigo-600 dark:text-indigo-400" />
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Quiz Complete!
          </h2>
          
          <div className="mb-6">
            <p className="text-xl font-semibold mb-1">Your Score</p>
            <div className="flex items-center justify-center gap-2 text-2xl">
              <span className="font-bold text-indigo-600 dark:text-indigo-400">{score}</span>
              <span className="text-gray-400">/</span>
              <span>{totalQuestions}</span>
            </div>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              {Math.round((score / totalQuestions) * 100)}% correct
            </p>
          </div>
          
          <div className="space-y-3">
            <Button
              variant="primary"
              onClick={() => window.location.href = '/explore'}
              fullWidth
            >
              Take Another Quiz
            </Button>
            
            <Button
              variant="outline"
              onClick={() => window.location.href = '/leaderboard'}
              fullWidth
            >
              View Leaderboard
            </Button>
          </div>
        </CardBody>
      </Card>
    );
  }

  return (
    <div className="max-w-2xl mx-auto relative">
      <div className="absolute -top-12 right-0 text-gray-600 dark:text-gray-400 flex items-center">
        <Clock size={16} className="mr-2" />
        <span className={`font-bold ${questionTimer <= 3 ? 'text-red-500' : ''}`}>
          {questionTimer}s
        </span>
      </div>
      
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2 text-sm">
          <span className="text-gray-500 dark:text-gray-400">
            Question {currentQuestionIndex + 1} of {totalQuestions}
          </span>
          <span className="font-medium text-indigo-600 dark:text-indigo-400">
            {Math.round(progressPercentage)}% Complete
          </span>
        </div>
        
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
          <div 
            className="bg-indigo-600 dark:bg-indigo-500 h-2.5 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>
      
      <Card className="mb-6">
        <CardBody>
          <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100 mb-6">
            {currentQuestion.text}
          </h3>
          
          <div className="space-y-3">
            {currentQuestion.options.map((option) => (
              <button
                key={option.id}
                onClick={() => handleOptionSelect(currentQuestion.id, option.id)}
                className={`w-full p-4 text-left rounded-md border transition-all ${
                  selectedOptions[currentQuestion.id] === option.id
                    ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300'
                    : 'border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                }`}
              >
                {option.text}
              </button>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default QuizRunner;