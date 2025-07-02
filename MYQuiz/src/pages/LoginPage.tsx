import React from 'react';
import Layout from '../layout/Layout';
import LoginForm from '../auth/LoginForm';
import Card, { CardHeader, CardBody } from '../ui/Card';
import { useAuth } from '../context/AuthContext';

const LoginPage: React.FC = () => {
  const { user } = useAuth();
  
  // Redirect if user is already logged in
  if (user?.isAuthenticated) {
    window.location.href = '/dashboard';
    return null;
  }

  return (
    <Layout>
      <div className="max-w-md mx-auto py-12">
        <Card>
          <CardHeader>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white text-center">
              Welcome Back
            </h1>
          </CardHeader>
          <CardBody>
            <LoginForm />
          </CardBody>
        </Card>
      </div>
    </Layout>
  );
};

export default LoginPage;