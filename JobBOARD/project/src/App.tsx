import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import JobListingsPage from './pages/JobListingsPage';
import JobDetailPage from './pages/JobDetailPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import EmployerDashboardPage from './pages/EmployerDashboardPage';
import JobSeekerDashboardPage from './pages/JobSeekerDashboardPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import NotFoundPage from './pages/NotFoundPage';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { UserRole } from './types';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="jobs" element={<JobListingsPage />} />
        <Route path="jobs/:id" element={<JobDetailPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        
        {/* Protected routes */}
        <Route
          path="employer/*"
          element={
            <ProtectedRoute allowedRoles={[UserRole.EMPLOYER, UserRole.ADMIN]}>
              <EmployerDashboardPage />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="job-seeker/*"
          element={
            <ProtectedRoute allowedRoles={[UserRole.JOB_SEEKER, UserRole.ADMIN]}>
              <JobSeekerDashboardPage />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="admin/*"
          element={
            <ProtectedRoute allowedRoles={[UserRole.ADMIN]}>
              <AdminDashboardPage />
            </ProtectedRoute>
          }
        />
        
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;