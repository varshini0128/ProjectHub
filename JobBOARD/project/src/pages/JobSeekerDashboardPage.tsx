import React, { useState } from 'react';
import { Routes, Route, Link, useSearchParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useJobs } from '../contexts/JobsContext';
import { UserRole, ApplicationStatus } from '../types';
import { Briefcase, FileText, User, ChevronRight, Calendar, Clock, CheckCircle, XCircle, MapPin } from 'lucide-react';
import { formatDate } from '../utils/dateUtils';

const SavedJobs: React.FC = () => {
  const { currentUser, unsaveJob } = useAuth();
  const { jobs } = useJobs();
  
  const savedJobs = jobs.filter(job => currentUser?.saved_jobs?.includes(job.id));
  
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Saved Jobs</h1>
        <p className="mt-1 text-sm text-gray-500">
          Jobs you've bookmarked for later
        </p>
      </div>

      {savedJobs.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1">
          {savedJobs.map(job => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <Briefcase className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No saved jobs</h3>
          <p className="mt-1 text-sm text-gray-500">
            Start saving jobs you're interested in to view them later
          </p>
          <div className="mt-6">
            <Link
              to="/jobs"
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
            >
              <Briefcase className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
              Browse Jobs
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

const ApplicationsList: React.FC = () => {
  const { currentUser } = useAuth();
  const { getUserApplications, jobs } = useJobs();
  const [searchParams] = useSearchParams();
  const statusFilter = searchParams.get('status');
  
  const applications = currentUser ? getUserApplications(currentUser.id) : [];
  
  const applicationsWithJobs = applications
    .map(app => ({
      ...app,
      job: jobs.find(j => j.id === app.job_id)
    }))
    .filter(app => !statusFilter || app.status === statusFilter);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">My Applications</h1>
        <p className="mt-1 text-sm text-gray-500">
          Track and manage your job applications
        </p>
      </div>

      {applicationsWithJobs.length > 0 ? (
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {applicationsWithJobs.map((application) => (
              <li key={application.id}>
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      {application.job?.company_logo ? (
                        <img
                          className="h-12 w-12 rounded-lg object-cover"
                          src={application.job.company_logo}
                          alt={application.job?.company}
                        />
                      ) : (
                        <div className="h-12 w-12 rounded-lg bg-primary-100 flex items-center justify-center">
                          <Briefcase className="h-6 w-6 text-primary-600" />
                        </div>
                      )}
                      <div className="ml-4">
                        <h4 className="text-lg font-medium text-gray-900">
                          {application.job?.title}
                        </h4>
                        <p className="text-sm text-gray-500">
                          {application.job?.company}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          application.status === ApplicationStatus.PENDING
                            ? 'bg-yellow-100 text-yellow-800'
                            : application.status === ApplicationStatus.REVIEWING
                            ? 'bg-blue-100 text-blue-800'
                            : application.status === ApplicationStatus.INTERVIEW
                            ? 'bg-green-100 text-green-800'
                            : application.status === ApplicationStatus.ACCEPTED
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {application.status}
                      </span>
                    </div>
                  </div>
                  <div className="mt-2 sm:flex sm:justify-between">
                    <div className="sm:flex">
                      <p className="flex items-center text-sm text-gray-500">
                        <MapPin className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                        {application.job?.location}
                      </p>
                      <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                        <Briefcase className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                        {application.job?.type}
                      </p>
                    </div>
                    <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                      <Calendar className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                      <p>
                        Applied on{' '}
                        <time dateTime={application.applied_at}>
                          {formatDate(new Date(application.applied_at))}
                        </time>
                      </p>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <FileText className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No applications found</h3>
          <p className="mt-1 text-sm text-gray-500">
            {statusFilter
              ? `You don't have any ${statusFilter} applications`
              : "You haven't applied to any jobs yet"}
          </p>
          <div className="mt-6">
            <Link
              to="/jobs"
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
            >
              <Briefcase className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
              Browse Jobs
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

const JobSeekerDashboardHome: React.FC = () => {
  const { currentUser } = useAuth();
  const { jobs, getUserApplications } = useJobs();
  
  const applications = currentUser ? getUserApplications(currentUser.id) : [];
  
  const applicationsWithJobs = applications.map(app => {
    const job = jobs.find(j => j.id === app.job_id);
    return { ...app, job };
  });
  
  const pendingApplications = applicationsWithJobs.filter(app => app.status === ApplicationStatus.PENDING);
  const interviewApplications = applicationsWithJobs.filter(app => app.status === ApplicationStatus.INTERVIEW);
  const rejectedApplications = applicationsWithJobs.filter(app => app.status === ApplicationStatus.REJECTED);
  
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Job Seeker Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">
          Welcome back, {currentUser?.name}! Track your job applications and find new opportunities.
        </p>
      </div>
      
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <FileText className="h-6 w-6 text-primary-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Total Applications
                  </dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">
                      {applications.length}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <div className="text-sm">
              <Link to="/job-seeker/applications" className="font-medium text-primary-600 hover:text-primary-500">
                View all applications
              </Link>
            </div>
          </div>
        </div>
        
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Pending Applications
                  </dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">
                      {pendingApplications.length}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <div className="text-sm">
              <Link to="/job-seeker/applications?status=pending" className="font-medium text-primary-600 hover:text-primary-500">
                View pending
              </Link>
            </div>
          </div>
        </div>
        
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Calendar className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Interviews Scheduled
                  </dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">
                      {interviewApplications.length}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <div className="text-sm">
              <Link to="/job-seeker/applications?status=interview" className="font-medium text-primary-600 hover:text-primary-500">
                View interviews
              </Link>
            </div>
          </div>
        </div>
        
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <XCircle className="h-6 w-6 text-red-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Rejected Applications
                  </dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">
                      {rejectedApplications.length}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <div className="text-sm">
              <Link to="/job-seeker/applications?status=rejected" className="font-medium text-primary-600 hover:text-primary-500">
                View rejected
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 bg-white shadow rounded-lg overflow-hidden">
        <div className="p-6">
          <h2 className="text-lg font-medium text-gray-900">Recent Applications</h2>
          
          {applications.length > 0 ? (
            <div className="mt-6 flow-root">
              <ul className="divide-y divide-gray-200">
                {applicationsWithJobs.slice(0, 5).map((application) => (
                  <li key={application.id} className="py-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        {application.job?.company_logo ? (
                          <img className="h-12 w-12 rounded-md object-cover" src={application.job.company_logo} alt={application.job?.company} />
                        ) : (
                          <div className="h-12 w-12 rounded-md bg-primary-100 flex items-center justify-center">
                            <Briefcase className="h-6 w-6 text-primary-600" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {application.job?.title}
                        </p>
                        <p className="text-sm text-gray-500 truncate">
                          {application.job?.company} • {application.job?.location}
                        </p>
                        <div className="mt-1 flex items-center">
                          <span className="text-xs text-gray-500">Applied on {formatDate(new Date(application.applied_at))}</span>
                          <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize" 
                            style={{
                              backgroundColor: 
                                application.status === ApplicationStatus.PENDING ? '#FEF3C7' :
                                application.status === ApplicationStatus.REVIEWING ? '#DBEAFE' :
                                application.status === ApplicationStatus.INTERVIEW ? '#D1FAE5' :
                                application.status === ApplicationStatus.ACCEPTED ? '#ECFDF5' : '#FEE2E2',
                              color: 
                                application.status === ApplicationStatus.PENDING ? '#92400E' :
                                application.status === ApplicationStatus.REVIEWING ? '#1E40AF' :
                                application.status === ApplicationStatus.INTERVIEW ? '#065F46' :
                                application.status === ApplicationStatus.ACCEPTED ? '#064E3B' : '#991B1B',
                            }}
                          >
                            {application.status}
                          </span>
                        </div>
                      </div>
                      <div>
                        <ChevronRight className="h-5 w-5 text-gray-400" />
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              
              {applications.length > 5 && (
                <div className="mt-6 text-center">
                  <Link to="/job-seeker/applications" className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                    View all applications
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <div className="mt-6 text-center py-8">
              <h3 className="text-lg font-medium text-gray-900">No applications yet</h3>
              <p className="mt-1 text-sm text-gray-500">
                Start applying to jobs to see your applications here
              </p>
              <div className="mt-6">
                <Link
                  to="/jobs"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700"
                >
                  <Briefcase className="h-5 w-5 mr-2" />
                  Browse Jobs
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-8 bg-white shadow rounded-lg overflow-hidden">
        <div className="p-6">
          <h2 className="text-lg font-medium text-gray-900">Recommended Jobs</h2>
          
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {jobs.slice(0, 3).map((job) => (
              <Link key={job.id} to={`/jobs/${job.id}`} className="block">
                <div className="h-full flex flex-col border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-300">
                  <div className="p-6 flex-grow">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-base font-semibold text-gray-900">{job.title}</h3>
                        <p className="mt-1 text-sm text-gray-500">{job.company}</p>
                      </div>
                      {job.company_logo ? (
                        <img className="h-10 w-10 rounded-md object-cover" src={job.company_logo} alt={job.company} />
                      ) : (
                        <div className="h-10 w-10 rounded-md bg-primary-100 flex items-center justify-center">
                          <Briefcase className="h-6 w-6 text-primary-600" />
                        </div>
                      )}
                    </div>
                    <div className="mt-4 flex items-center text-sm text-gray-500">
                      <MapPin className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                      <p>{job.location}</p>
                    </div>
                  </div>
                  <div className="border-t border-gray-200 px-6 py-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-primary-600">{job.salary_range}</span>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                        {job.type}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          <div className="mt-6 text-center">
            <Link
              to="/jobs"
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Browse all jobs
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const JobSeekerProfile: React.FC = () => {
  const { currentUser } = useAuth();
  
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage your personal information and resume.
        </p>
      </div>
      
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="p-6">
          <div className="flex items-center">
            <div className="h-24 w-24 rounded-full bg-primary-100 flex items-center justify-center">
              <User className="h-12 w-12 text-primary-600" />
            </div>
            <div className="ml-6">
              <h2 className="text-xl font-semibold text-gray-900">{currentUser?.name}</h2>
              <p className="text-sm text-gray-500">{currentUser?.email}</p>
              <button
                type="button"
                className="mt-2 inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Edit Profile
              </button>
            </div>
          </div>
          
          <div className="mt-8 border-t border-gray-200 pt-8">
            <h3 className="text-lg font-medium text-gray-900">Professional Information</h3>
            
            <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
              <div>
                <h4 className="text-sm font-medium text-gray-500">Skills</h4>
                <div className="mt-2 flex flex-wrap gap-2">
                  {(currentUser as any)?.skills?.map((skill: string, index: number) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-primary-100 text-primary-800"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-500">Experience</h4>
                <p className="mt-2 text-sm text-gray-900">{(currentUser as any)?.experience}</p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-500">Education</h4>
                <p className="mt-2 text-sm text-gray-900">{(currentUser as any)?.education}</p>
              </div>
            </div>
          </div>
          
          <div className="mt-8 border-t border-gray-200 pt-8">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">Resume</h3>
              <button
                type="button"
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700"
              >
                Upload New Resume
              </button>
            </div>
            
            <div className="mt-4 border border-gray-200 rounded-md p-4">
              <div className="flex items-center">
                <FileText className="h-8 w-8 text-gray-400" />
                <div className="ml-4 flex-1">
                  <h4 className="text-sm font-medium text-gray-900">resume.pdf</h4>
                  <p className="text-xs text-gray-500">Uploaded on Apr 15, 2023</p>
                </div>
                <button
                  type="button"
                  className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50"
                >
                  Download
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const JobSeekerDashboardPage: React.FC = () => {
  const { hasRole } = useAuth();
  
  if (!hasRole([UserRole.JOB_SEEKER, UserRole.ADMIN])) {
    return <div>Unauthorized</div>;
  }
  
  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <Routes>
        <Route index element={<JobSeekerDashboardHome />} />
        <Route path="profile" element={<JobSeekerProfile />} />
        <Route path="applications" element={<ApplicationsList />} />
        <Route path="saved-jobs" element={<SavedJobs />} />
      </Routes>
    </div>
  );
};

export default JobSeekerDashboardPage;