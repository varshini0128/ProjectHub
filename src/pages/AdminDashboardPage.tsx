import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useJobs } from '../contexts/JobsContext';
import { UserRole } from '../types';
import { Users, Briefcase, FileText, Settings, UserPlus } from 'lucide-react';

const AdminDashboardHome: React.FC = () => {
  const { jobs, applications } = useJobs();
  
  // Stats
  const activeJobs = jobs.filter(job => job.status === 'active').length;
  const totalApplications = applications.length;
  
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage the entire job board platform from here.
        </p>
      </div>
      
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Users className="h-6 w-6 text-primary-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Total Users
                  </dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">3</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <div className="text-sm">
              <Link to="/admin/users" className="font-medium text-primary-600 hover:text-primary-500">
                Manage users
              </Link>
            </div>
          </div>
        </div>
        
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Briefcase className="h-6 w-6 text-primary-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Active Jobs
                  </dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">{activeJobs}</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <div className="text-sm">
              <Link to="/admin/jobs" className="font-medium text-primary-600 hover:text-primary-500">
                Manage jobs
              </Link>
            </div>
          </div>
        </div>
        
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <FileText className="h-6 w-6 text-primary-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Applications
                  </dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">{totalApplications}</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <div className="text-sm">
              <Link to="/admin/applications" className="font-medium text-primary-600 hover:text-primary-500">
                View all
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 bg-white shadow rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <h3 className="text-lg font-medium leading-6 text-gray-900">Quick Actions</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Link to="/admin/users/new" className="block">
              <div className="border border-gray-200 rounded-lg p-6 hover:border-primary-500 hover:bg-primary-50 transition-colors duration-200">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <UserPlus className="h-8 w-8 text-primary-600" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium text-gray-900">Add New User</h4>
                    <p className="mt-1 text-sm text-gray-500">Create a new employer or job seeker account</p>
                  </div>
                </div>
              </div>
            </Link>
            
            <Link to="/employer/post-job" className="block">
              <div className="border border-gray-200 rounded-lg p-6 hover:border-primary-500 hover:bg-primary-50 transition-colors duration-200">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Briefcase className="h-8 w-8 text-primary-600" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium text-gray-900">Post New Job</h4>
                    <p className="mt-1 text-sm text-gray-500">Create a new job listing on the platform</p>
                  </div>
                </div>
              </div>
            </Link>
            
            <Link to="/admin/settings" className="block">
              <div className="border border-gray-200 rounded-lg p-6 hover:border-primary-500 hover:bg-primary-50 transition-colors duration-200">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Settings className="h-8 w-8 text-primary-600" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium text-gray-900">Platform Settings</h4>
                    <p className="mt-1 text-sm text-gray-500">Configure job board settings and options</p>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Admin Dashboard Component
const AdminDashboardPage: React.FC = () => {
  const { hasRole } = useAuth();
  
  if (!hasRole([UserRole.ADMIN])) {
    return <div>Unauthorized</div>;
  }
  
  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <Routes>
        <Route index element={<AdminDashboardHome />} />
        {/* Add more routes as needed */}
      </Routes>
    </div>
  );
};

export default AdminDashboardPage;