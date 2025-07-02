import React from 'react';
import { User, Mail, PenLine } from 'lucide-react';
import Layout from '../layout/Layout';
import Card, { CardHeader, CardBody } from '../ui/Card';
import Button from '../ui/Button';
import { useAuth } from '../context/AuthContext';

const ProfilePage: React.FC = () => {
  const { user } = useAuth();

  if (!user?.isAuthenticated) {
    window.location.href = '/login';
    return null;
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto py-8">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Profile</h1>
              <Button
                variant="outline"
                size="sm"
                leftIcon={<PenLine size={16} />}
                onClick={() => {/* Add edit functionality */}}
              >
                Edit Profile
              </Button>
            </div>
          </CardHeader>
          <CardBody>
            <div className="flex items-center mb-8">
              <div className="w-24 h-24 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center mr-6">
                <User size={40} className="text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{user.name}</h2>
                <div className="flex items-center text-gray-600 dark:text-gray-400 mt-1">
                  <Mail size={16} className="mr-2" />
                  <span>{user.email}</span>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">About</h3>
              <p className="text-gray-600 dark:text-gray-400">
                {user.bio || 'No bio added yet.'}
              </p>
            </div>
          </CardBody>
        </Card>
      </div>
    </Layout>
  );
};

export default ProfilePage;