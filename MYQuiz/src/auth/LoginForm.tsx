import React, { useState } from 'react';
import { Mail, Lock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Input from '../ui/Input';
import Button from '../ui/Button';

const LoginForm: React.FC = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError('Email and password are required');
      return;
    }
    
    setError('');
    setIsLoading(true);
    
    try {
      await login(email, password);
      window.location.href = '/dashboard';
    } catch (err) {
      setError('Failed to login. Please check your credentials.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-400 p-3 rounded-md text-sm">
          {error}
        </div>
      )}
      
      <Input
        type="email"
        label="Email Address"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        required
        icon={<Mail size={18} />}
      />
      
      <Input
        type="password"
        label="Password"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        required
        icon={<Lock size={18} />}
      />
      
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            id="remember_me"
            name="remember_me"
            type="checkbox"
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
            Remember me
          </label>
        </div>
        
        <div className="text-sm">
          <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">
            Forgot your password?
          </a>
        </div>
      </div>
      
      <Button
        type="submit"
        variant="primary"
        fullWidth
        isLoading={isLoading}
      >
        Sign In
      </Button>
      
      <div className="text-center mt-4">
        <span className="text-gray-600 dark:text-gray-400 text-sm">
          Don't have an account?{' '}
          <a href="/register" className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">
            Sign up
          </a>
        </span>
      </div>
    </form>
  );
};

export default LoginForm;