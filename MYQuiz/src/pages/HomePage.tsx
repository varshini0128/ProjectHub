import React from 'react';
import { BookOpen, BrainCircuit, Award, BarChart3 } from 'lucide-react';
import Layout from '../layout/Layout';
import Card, { CardBody } from '../ui/Card';
import Button from '../ui/Button';
import { useQuiz } from '../context/QuizContext';

const HomePage: React.FC = () => {
  const { quizzes } = useQuiz();
  const featuredQuizzes = quizzes.filter(quiz => quiz.published).slice(0, 3);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-12 md:py-20">
        <div className="text-center max-w-3xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            Create and Take <span className="text-indigo-600 dark:text-indigo-400">Interactive Quizzes</span> with Ease
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Perfect for education, training, or just testing your knowledge. Create, share, and track progress all in one place.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="/explore">
              <Button variant="primary" size="lg">
                Explore Quizzes
              </Button>
            </a>
            <a href="/create-quiz">
              <Button variant="outline" size="lg">
                Create a Quiz
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-gray-50 dark:bg-gray-800 rounded-lg my-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">
            Everything You Need for Effective Quizzes
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-indigo-100 dark:bg-indigo-900/30 rounded-full p-4 inline-flex mb-4">
                <BookOpen size={32} className="text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Easy Quiz Creation
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Intuitive tools to build quizzes with multiple-choice questions in minutes.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-indigo-100 dark:bg-indigo-900/30 rounded-full p-4 inline-flex mb-4">
                <BrainCircuit size={32} className="text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Engaging Experience
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Interactive quiz-taking with immediate feedback and explanations.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-indigo-100 dark:bg-indigo-900/30 rounded-full p-4 inline-flex mb-4">
                <Award size={32} className="text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Competitive Leaderboards
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Track and showcase top performers with our detailed leaderboards.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-indigo-100 dark:bg-indigo-900/30 rounded-full p-4 inline-flex mb-4">
                <BarChart3 size={32} className="text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Insightful Analytics
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Detailed data on quiz performance to help improve knowledge gaps.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Quizzes Section */}
      {featuredQuizzes.length > 0 && (
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Featured Quizzes
              </h2>
              <a 
                href="/explore" 
                className="text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 font-medium"
              >
                View All
              </a>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredQuizzes.map((quiz) => (
                <Card key={quiz.id} hoverable>
                  <CardBody>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {quiz.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                      {quiz.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {quiz.questions.length} questions
                      </span>
                      <a href={`/quiz/${quiz.id}`}>
                        <Button variant="outline" size="sm">
                          Take Quiz
                        </Button>
                      </a>
                    </div>
                  </CardBody>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-12 bg-indigo-600 dark:bg-indigo-700 rounded-lg my-12 text-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-4">Ready to create your first quiz?</h2>
          <p className="text-lg opacity-90 mb-8">
            Join thousands of educators, trainers, and knowledge enthusiasts who are creating engaging quizzes today.
          </p>
          <a href="/register">
            <Button 
              variant="outline" 
              size="lg" 
              className="bg-white text-indigo-600 hover:bg-gray-100 border-white hover:border-gray-100"
            >
              Get Started for Free
            </Button>
          </a>
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;