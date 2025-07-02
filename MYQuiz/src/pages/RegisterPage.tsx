import React from 'react';
import Layout from '../layout/Layout';
import RegisterForm from '../auth/RegisterForm';
import Card, { CardHeader, CardBody } from '../ui/Card';
import { useAuth } from '../context/AuthContext';

const RegisterPage: React.FC = () => {
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
              Create an Account
            </h1>
          </CardHeader>
          <CardBody>
            <RegisterForm />
          </CardBody>
        </Card>
      </div>
    </Layout>
  );
};

export default RegisterPage;