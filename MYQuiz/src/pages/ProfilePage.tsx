import React, { useState } from 'react';
import { User, Mail, PenLine, Save, X } from 'lucide-react';
import Layout from '../layout/Layout';
import Card, { CardHeader, CardBody } from '../ui/Card';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { useAuth } from '../context/AuthContext';

const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    bio: user?.bio || ''
  });

  if (!user?.isAuthenticated) {
    window.location.href = '/login';
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Update user data in localStorage
    const updatedUser = {
      ...user,
      ...formData
    };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setIsEditing(false);
    // Force reload to update the UI
    window.location.reload();
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto py-8">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Profile</h1>
              {!isEditing ? (
                <Button
                  variant="outline"
                  size="sm"
                  leftIcon={<PenLine size={16} />}
                  onClick={() => setIsEditing(true)}
                >
                  Edit Profile
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    leftIcon={<X size={16} />}
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    leftIcon={<Save size={16} />}
                    onClick={handleSubmit}
                  >
                    Save
                  </Button>
                </div>
              )}
            </div>
          </CardHeader>
          <CardBody>
            <div className="flex items-center mb-8">
              <div className="w-24 h-24 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center mr-6">
                <User size={40} className="text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                {isEditing ? (
                  <div className="space-y-4">
                    <Input
                      label="Name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      fullWidth
                    />
                    <Input
                      type="email"
                      label="Email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      fullWidth
                    />
                  </div>
                ) : (
                  <>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{user.name}</h2>
                    <div className="flex items-center text-gray-600 dark:text-gray-400 mt-1">
                      <Mail size={16} className="mr-2" />
                      <span>{user.email}</span>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">About</h3>
              {isEditing ? (
                <textarea
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  className="w-full h-32 px-4 py-2 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Tell us about yourself..."
                />
              ) : (
                <p className="text-gray-600 dark:text-gray-400">
                  {user.bio || 'No bio added yet.'}
                </p>
              )}
            </div>
          </CardBody>
        </Card>
      </div>
    </Layout>
  );
};

export default ProfilePage;