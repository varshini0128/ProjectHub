import React, { useState } from 'react';
import { PlusCircle, Save, Trash2, HelpCircle } from 'lucide-react';
import { Question, Option, Quiz } from '../types';
import { useQuiz } from '../context/QuizContext';
import { useAuth } from '../context/AuthContext';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Card, { CardHeader, CardBody, CardFooter } from '../ui/Card';

const QuizCreator: React.FC = () => {
  const { createQuiz } = useQuiz();
  const { user } = useAuth();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [questions, setQuestions] = useState<Partial<Question>[]>([createEmptyQuestion()]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function createEmptyQuestion(): Partial<Question> {
    return {
      id: `temp-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      text: '',
      options: [
        { id: `opt-1-${Date.now()}`, text: '' },
        { id: `opt-2-${Date.now()}`, text: '' },
        { id: `opt-3-${Date.now()}`, text: '' },
        { id: `opt-4-${Date.now()}`, text: '' }
      ],
      correctOptionId: ''
    };
  }

  const handleQuestionChange = (questionIndex: number, field: string, value: string) => {
    const newQuestions = [...questions];
    (newQuestions[questionIndex] as any)[field] = value;
    setQuestions(newQuestions);
    
    // Clear error when field is corrected
    if (errors[`question_${questionIndex}_${field}`]) {
      const newErrors = { ...errors };
      delete newErrors[`question_${questionIndex}_${field}`];
      setErrors(newErrors);
    }
  };

  const handleOptionChange = (questionIndex: number, optionIndex: number, value: string) => {
    const newQuestions = [...questions];
    if (newQuestions[questionIndex].options) {
      newQuestions[questionIndex].options![optionIndex].text = value;
      setQuestions(newQuestions);
      
      // Clear error when field is corrected
      if (errors[`question_${questionIndex}_option_${optionIndex}`]) {
        const newErrors = { ...errors };
        delete newErrors[`question_${questionIndex}_option_${optionIndex}`];
        setErrors(newErrors);
      }
    }
  };

  const handleCorrectOptionChange = (questionIndex: number, optionId: string) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].correctOptionId = optionId;
    setQuestions(newQuestions);
    
    // Clear error when field is corrected
    if (errors[`question_${questionIndex}_correctOption`]) {
      const newErrors = { ...errors };
      delete newErrors[`question_${questionIndex}_correctOption`];
      setErrors(newErrors);
    }
  };

  const addQuestion = () => {
    setQuestions([...questions, createEmptyQuestion()]);
  };

  const removeQuestion = (index: number) => {
    if (questions.length === 1) {
      return; // Keep at least one question
    }
    
    const newQuestions = [...questions];
    newQuestions.splice(index, 1);
    setQuestions(newQuestions);
    
    // Remove errors for this question
    const newErrors = { ...errors };
    Object.keys(newErrors).forEach(key => {
      if (key.startsWith(`question_${index}_`)) {
        delete newErrors[key];
      }
    });
    setErrors(newErrors);
  };

  const validateQuiz = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    questions.forEach((question, qIndex) => {
      if (!question.text?.trim()) {
        newErrors[`question_${qIndex}_text`] = 'Question text is required';
      }
      
      question.options?.forEach((option, oIndex) => {
        if (!option.text.trim()) {
          newErrors[`question_${qIndex}_option_${oIndex}`] = 'Option text is required';
        }
      });
      
      if (!question.correctOptionId) {
        newErrors[`question_${qIndex}_correctOption`] = 'Please select a correct answer';
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateQuiz()) {
      return;
    }
    
    if (!user) {
      return;
    }
    
    const formattedQuestions = questions.map(q => ({
      id: q.id!,
      text: q.text!,
      options: q.options!,
      correctOptionId: q.correctOptionId!
    }));
    
    createQuiz({
      title,
      description,
      createdBy: user.id,
      questions: formattedQuestions,
      published: false
    });
    
    // Redirect to dashboard
    window.location.href = '/dashboard';
  };

  return (
    <div className="max-w-3xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-8">
        <Card>
          <CardHeader>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Quiz Details</h2>
          </CardHeader>
          <CardBody className="space-y-4">
            <Input
              label="Quiz Title"
              placeholder="Enter quiz title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              error={errors.title}
              fullWidth
            />
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Description
              </label>
              <textarea
                placeholder="Enter a description for your quiz"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className={`w-full bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-md shadow-sm border ${
                  errors.description
                    ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
                    : 'border-gray-300 dark:border-gray-700 focus:ring-indigo-500 focus:border-indigo-500'
                } px-4 py-2 focus:outline-none focus:ring-2 min-h-[100px]`}
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.description}</p>
              )}
            </div>
          </CardBody>
        </Card>
        
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Questions</h2>
            <Button 
              variant="outline" 
              onClick={addQuestion}
              leftIcon={<PlusCircle size={16} />}
            >
              Add Question
            </Button>
          </div>
          
          {questions.map((question, questionIndex) => (
            <Card key={question.id} className="relative">
              <CardHeader className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  Question {questionIndex + 1}
                </h3>
                <button 
                  type="button" 
                  onClick={() => removeQuestion(questionIndex)}
                  className="text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 transition-colors"
                  aria-label="Remove question"
                >
                  <Trash2 size={18} />
                </button>
              </CardHeader>
              
              <CardBody className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Question Text
                  </label>
                  <Input
                    placeholder="Enter your question"
                    value={question.text || ''}
                    onChange={(e) => handleQuestionChange(questionIndex, 'text', e.target.value)}
                    error={errors[`question_${questionIndex}_text`]}
                    fullWidth
                  />
                </div>
                
                <div className="space-y-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Answer Options
                  </label>
                  
                  {question.options?.map((option, optionIndex) => (
                    <div key={option.id} className="flex items-center space-x-3">
                      <input
                        type="radio"
                        name={`correct_${question.id}`}
                        checked={question.correctOptionId === option.id}
                        onChange={() => handleCorrectOptionChange(questionIndex, option.id)}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                      />
                      <Input
                        placeholder={`Option ${optionIndex + 1}`}
                        value={option.text}
                        onChange={(e) => handleOptionChange(questionIndex, optionIndex, e.target.value)}
                        error={errors[`question_${questionIndex}_option_${optionIndex}`]}
                        fullWidth
                      />
                    </div>
                  ))}
                  
                  {errors[`question_${questionIndex}_correctOption`] && (
                    <p className="text-sm text-red-600 dark:text-red-400 flex items-center">
                      <HelpCircle size={16} className="mr-1" />
                      {errors[`question_${questionIndex}_correctOption`]}
                    </p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Explanation (Optional)
                  </label>
                  <textarea
                    placeholder="Provide an explanation for the correct answer (optional)"
                    value={question.explanation || ''}
                    onChange={(e) => handleQuestionChange(questionIndex, 'explanation', e.target.value)}
                    className="w-full bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-md shadow-sm border border-gray-300 dark:border-gray-700 focus:ring-indigo-500 focus:border-indigo-500 px-4 py-2 focus:outline-none focus:ring-2 min-h-[80px]"
                  />
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
        
        <div className="flex justify-end">
          <Button 
            type="submit" 
            variant="primary"
            leftIcon={<Save size={18} />}
            size="lg"
          >
            Save Quiz
          </Button>
        </div>
      </form>
    </div>
  );
};

export default QuizCreator;