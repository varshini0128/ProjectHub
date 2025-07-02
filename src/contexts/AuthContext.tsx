import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types';

interface AuthContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (userData: any, role: UserRole) => Promise<void>;
  logout: () => void;
  hasRole: (roles: UserRole[]) => boolean;
  saveJob: (jobId: string) => void;
  unsaveJob: (jobId: string) => void;
  hasSavedJob: (jobId: string) => boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

// Mock user data for demo purposes
const MOCK_USERS = [
  {
    id: '1',
    email: 'employer@example.com',
    name: 'John Employer',
    role: UserRole.EMPLOYER,
    password: 'password123',
    created_at: '2023-01-01T00:00:00Z',
    company_name: 'Tech Solutions Inc.',
    company_size: '50-100',
    industry: 'Technology',
    company_description: 'Leading provider of innovative tech solutions',
    logo: 'https://via.placeholder.com/150',
    saved_jobs: [],
  },
  {
    id: '2',
    email: 'jobseeker@example.com',
    name: 'Jane Jobseeker',
    role: UserRole.JOB_SEEKER,
    password: 'password123',
    created_at: '2023-01-01T00:00:00Z',
    skills: ['React', 'JavaScript', 'TypeScript'],
    experience: '3 years',
    education: 'BS in Computer Science',
    saved_jobs: [],
  },
  {
    id: '3',
    email: 'admin@example.com',
    name: 'Admin User',
    role: UserRole.ADMIN,
    password: 'password123',
    created_at: '2023-01-01T00:00:00Z',
    saved_jobs: [],
  },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for saved user in localStorage
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const saveJob = (jobId: string) => {
    if (!currentUser) return;

    const updatedUser = {
      ...currentUser,
      saved_jobs: [...(currentUser.saved_jobs || []), jobId],
    };

    setCurrentUser(updatedUser);
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
  };

  const unsaveJob = (jobId: string) => {
    if (!currentUser) return;

    const updatedUser = {
      ...currentUser,
      saved_jobs: (currentUser.saved_jobs || []).filter(id => id !== jobId),
    };

    setCurrentUser(updatedUser);
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
  };

  const hasSavedJob = (jobId: string): boolean => {
    if (!currentUser) return false;
    return (currentUser.saved_jobs || []).includes(jobId);
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Find user with matching email and password
      const user = MOCK_USERS.find(u => u.email === email && u.password === password);
      
      if (!user) {
        return { success: false, error: 'Invalid email or password' };
      }
      
      // Remove password before storing
      const { password: _, ...userWithoutPassword } = user;
      
      // Add saved_jobs array if it doesn't exist
      const userWithSavedJobs = {
        ...userWithoutPassword,
        saved_jobs: userWithoutPassword.saved_jobs || [],
      };
      
      setCurrentUser(userWithSavedJobs as User);
      localStorage.setItem('currentUser', JSON.stringify(userWithSavedJobs));
      
      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'An unexpected error occurred' };
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: any, role: UserRole) => {
    setIsLoading(true);
    try {
      // Check if email already exists
      if (MOCK_USERS.some(u => u.email === userData.email)) {
        throw new Error('Email already in use');
      }
      
      // Create new user
      const newUser = {
        id: String(MOCK_USERS.length + 1),
        ...userData,
        role,
        created_at: new Date().toISOString(),
        saved_jobs: [],
      };
      
      // In a real app, we would send this to an API
      console.log('Registered new user:', newUser);
      
      // Auto login after register
      const { password: _, ...userWithoutPassword } = newUser;
      setCurrentUser(userWithoutPassword as User);
      localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
      
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
  };

  const hasRole = (roles: UserRole[]) => {
    if (!currentUser) return false;
    return roles.includes(currentUser.role);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated: !!currentUser,
        isLoading,
        login,
        register,
        logout,
        hasRole,
        saveJob,
        unsaveJob,
        hasSavedJob,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};