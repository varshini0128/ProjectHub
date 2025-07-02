import React from 'react';
import Layout from '../layout/Layout';
import Card, { CardHeader, CardBody } from '../ui/Card';

const PrivacyPolicyPage: React.FC = () => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto py-8">
        <Card>
          <CardHeader>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Privacy Policy</h1>
          </CardHeader>
          <CardBody className="prose dark:prose-invert max-w-none">
            <p className="text-gray-600 dark:text-gray-400">
              Last updated: March 2024
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-4">1. Information We Collect</h2>
            <p>We collect information that you provide directly to us, including:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Name and email address when you create an account</li>
              <li>Quiz responses and scores</li>
              <li>Profile information you choose to add</li>
            </ul>

            <h2 className="text-xl font-semibold mt-6 mb-4">2. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Provide and maintain the QuizCraft service</li>
              <li>Track your progress and quiz scores</li>
              <li>Improve our platform and user experience</li>
            </ul>

            <h2 className="text-xl font-semibold mt-6 mb-4">3. Information Sharing</h2>
            <p>
              We do not sell or share your personal information with third parties except as described in this policy.
              Your quiz results may be displayed on public leaderboards unless you opt out.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-4">4. Data Security</h2>
            <p>
              We implement appropriate security measures to protect your personal information.
              However, no method of transmission over the Internet is 100% secure.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-4">5. Your Rights</h2>
            <p>You have the right to:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Access your personal information</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of your information</li>
              <li>Opt out of leaderboard displays</li>
            </ul>

            <h2 className="text-xl font-semibold mt-6 mb-4">6. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at:
              <br />
              <a href="mailto:privacy@quizcraft.com" className="text-indigo-600 dark:text-indigo-400">
                privacy@quizcraft.com
              </a>
            </p>
          </CardBody>
        </Card>
      </div>
    </Layout>
  );
};

export default PrivacyPolicyPage;