import React from 'react';
import { Eye, Edit, Trash2, Check, AlertCircle } from 'lucide-react';
import { Quiz } from '../types';
import { useQuiz } from '../context/QuizContext';
import Card, { CardHeader, CardBody } from '../ui/Card';
import Button from '../ui/Button';

interface QuizListProps {
  quizzes: Quiz[];
}

const QuizList: React.FC<QuizListProps> = ({ quizzes }) => {
  const { deleteQuiz, publishQuiz } = useQuiz();

  const handleDelete = (quizId: string) => {
    if (window.confirm('Are you sure you want to delete this quiz?')) {
      deleteQuiz(quizId);
    }
  };

  const handlePublish = (quizId: string) => {
    if (window.confirm('Are you sure you want to publish this quiz? Published quizzes will be visible to all users.')) {
      publishQuiz(quizId);
    }
  };

  if (quizzes.length === 0) {
    return (
      <div className="p-8 text-center">
        <AlertCircle size={40} className="text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">No quizzes found</h3>
        <p className="text-gray-500 dark:text-gray-400 mb-4">You haven't created any quizzes yet.</p>
        <a href="/create-quiz">
          <Button variant="primary">Create Your First Quiz</Button>
        </a>
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Your Quizzes</h2>
      </CardHeader>
      <CardBody className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-800 text-left">
              <tr>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Questions</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Created</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {quizzes.map((quiz) => (
                <tr key={quiz.id} className="bg-white dark:bg-gray-800">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    {quiz.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {quiz.questions.length}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {new Date(quiz.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {quiz.published ? (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300">
                        Published
                      </span>
                    ) : (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-300">
                        Draft
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex space-x-2">
                      <a 
                        href={`/quiz/${quiz.id}`}
                        className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300" 
                        title="View"
                      >
                        <Eye size={18} />
                      </a>
                      <a 
                        href={`/edit-quiz/${quiz.id}`}
                        className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300" 
                        title="Edit"
                      >
                        <Edit size={18} />
                      </a>
                      {!quiz.published && (
                        <button 
                          onClick={() => handlePublish(quiz.id)}
                          className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300" 
                          title="Publish"
                        >
                          <Check size={18} />
                        </button>
                      )}
                      <button 
                        onClick={() => handleDelete(quiz.id)}
                        className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300" 
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardBody>
    </Card>
  );
};

export default QuizList;