import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import Layout from '../layout/Layout';
import QuizCard from '../quiz/QuizCard';
import Input from '../ui/Input';
import { useQuiz } from '../context/QuizContext';
import { Quiz } from '../types';

const ExplorePage: React.FC = () => {
  const { quizzes } = useQuiz();
  
  // Only show published quizzes
  const publishedQuizzes = quizzes.filter(quiz => quiz.published);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filterByQuestionCount, setFilterByQuestionCount] = useState<number | null>(null);

  // Filter quizzes based on search term and question count
  const filteredQuizzes = publishedQuizzes.filter(quiz => {
    const matchesSearchTerm = 
      quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      quiz.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesQuestionCount = 
      filterByQuestionCount === null || 
      (filterByQuestionCount === 5 && quiz.questions.length <= 5) ||
      (filterByQuestionCount === 10 && quiz.questions.length > 5 && quiz.questions.length <= 10) ||
      (filterByQuestionCount === 11 && quiz.questions.length > 10);
    
    return matchesSearchTerm && matchesQuestionCount;
  });

  const handleQuestionCountFilter = (count: number | null) => {
    setFilterByQuestionCount(count === filterByQuestionCount ? null : count);
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Explore Quizzes
        </h1>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex-grow">
              <Input
                placeholder="Search quizzes by title or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                icon={<Search size={18} />}
                fullWidth
              />
            </div>
            
            <div className="flex flex-wrap gap-2 items-center">
              <span className="flex items-center text-sm text-gray-500 dark:text-gray-400 mr-2">
                <Filter size={16} className="mr-1" />
                Questions:
              </span>
              
              <button
                onClick={() => handleQuestionCountFilter(5)}
                className={`px-3 py-1 text-sm rounded-full ${
                  filterByQuestionCount === 5
                    ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300'
                    : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                ≤ 5
              </button>
              
              <button
                onClick={() => handleQuestionCountFilter(10)}
                className={`px-3 py-1 text-sm rounded-full ${
                  filterByQuestionCount === 10
                    ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300'
                    : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                6-10
              </button>
              
              <button
                onClick={() => handleQuestionCountFilter(11)}
                className={`px-3 py-1 text-sm rounded-full ${
                  filterByQuestionCount === 11
                    ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300'
                    : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                10+
              </button>
            </div>
          </div>
        </div>
        
        {filteredQuizzes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredQuizzes.map((quiz: Quiz) => (
              <QuizCard 
                key={quiz.id} 
                quiz={quiz} 
                onClick={() => window.location.href = `/quiz/${quiz.id}`}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 px-4">
            <h3 className="text-xl font-medium text-gray-700 dark:text-gray-300 mb-2">
              No quizzes found
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md mx-auto">
              {publishedQuizzes.length > 0 
                ? "Try adjusting your search or filters to find what you're looking for."
                : "There are no published quizzes yet. Check back later or create your own!"}
            </p>
            <a href="/create-quiz" className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline">
              Create a Quiz
            </a>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ExplorePage;