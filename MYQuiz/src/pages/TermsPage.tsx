import React from 'react';
import Layout from '../layout/Layout';
import Card, { CardHeader, CardBody } from '../ui/Card';

const TermsPage: React.FC = () => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto py-8">
        <Card>
          <CardHeader>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Terms of Service</h1>
          </CardHeader>
          <CardBody className="prose dark:prose-invert max-w-none">
            <p className="text-gray-600 dark:text-gray-400">
              Last updated: March 2024
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-4">1. Acceptance of Terms</h2>
            <p>
              By accessing and using QuizCraft, you agree to be bound by these Terms of Service
              and all applicable laws and regulations.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-4">2. User Accounts</h2>
            <p>You are responsible for:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Maintaining the confidentiality of your account</li>
              <li>All activities that occur under your account</li>
              <li>Providing accurate and complete information</li>
            </ul>

            <h2 className="text-xl font-semibold mt-6 mb-4">3. Content Guidelines</h2>
            <p>When creating quizzes, you agree not to:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Post inappropriate or offensive content</li>
              <li>Violate intellectual property rights</li>
              <li>Share misleading or false information</li>
              <li>Include spam or malicious content</li>
            </ul>

            <h2 className="text-xl font-semibold mt-6 mb-4">4. Intellectual Property</h2>
            <p>
              QuizCraft and its original content are protected by copyright and other intellectual
              property laws. Users retain ownership of their created content while granting
              QuizCraft a license to display and distribute it.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-4">5. Termination</h2>
            <p>
              We reserve the right to terminate or suspend access to our service immediately,
              without prior notice, for any violation of these Terms.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-4">6. Disclaimer</h2>
            <p>
              QuizCraft is provided "as is" without any warranties, expressed or implied.
              We do not guarantee the accuracy of user-created content.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-4">7. Contact</h2>
            <p>
              For any questions about these Terms, please contact us at:
              <br />
              <a href="mailto:terms@quizcraft.com" className="text-indigo-600 dark:text-indigo-400">
                terms@quizcraft.com
              </a>
            </p>
          </CardBody>
        </Card>
      </div>
    </Layout>
  );
};

export default TermsPage;