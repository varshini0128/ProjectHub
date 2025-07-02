import React, { useState } from 'react';
import { User, Mail, Lock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Input from '../ui/Input';
import Button from '../ui/Button';

const RegisterForm: React.FC = () => {
  const { register } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!name || !email || !password || !confirmPassword) {
      setError('All fields are required');
      return;
    }
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }
    
    setError('');
    setIsLoading(true);
    
    try {
      await register(name, email, password);
      window.location.href = '/dashboard';
    } catch (err) {
      setError('Registration failed. Please try again.');
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
        type="text"
        label="Full Name"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
        required
        icon={<User size={18} />}
      />
      
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
        placeholder="Create a password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        required
        icon={<Lock size={18} />}
      />
      
      <Input
        type="password"
        label="Confirm Password"
        placeholder="Confirm your password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        fullWidth
        required
        icon={<Lock size={18} />}
      />
      
      <div className="flex items-center">
        <input
          id="terms"
          name="terms"
          type="checkbox"
          required
          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
        />
        <label htmlFor="terms" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
          I agree to the{' '}
          <a href="#" className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="#" className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">
            Privacy Policy
          </a>
        </label>
      </div>
      
      <Button
        type="submit"
        variant="primary"
        fullWidth
        isLoading={isLoading}
      >
        Create Account
      </Button>
      
      <div className="text-center mt-4">
        <span className="text-gray-600 dark:text-gray-400 text-sm">
          Already have an account?{' '}
          <a href="/login" className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">
            Sign in
          </a>
        </span>
      </div>
    </form>
  );
};

export default RegisterForm;