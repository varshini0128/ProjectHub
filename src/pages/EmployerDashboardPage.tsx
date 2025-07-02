import React, { useState } from 'react';
import { Routes, Route, Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useJobs } from '../contexts/JobsContext';
import { UserRole, Job, ApplicationStatus } from '../types';
import { formatDate } from '../utils/dateUtils';
import { Briefcase, Users, PlusCircle, Eye, MapPin, FileText } from 'lucide-react';

// Applications List Component
const ApplicationsList: React.FC = () => {
  const { currentUser } = useAuth();
  const { jobs, getJobApplications } = useJobs();
  const [searchParams] = useSearchParams();
  const statusFilter = searchParams.get('status');
  
  // Get all jobs for this employer
  const employerJobs = jobs.filter(job => job.employer_id === currentUser?.id);
  
  // Get all applications for all jobs
  const applications = employerJobs.flatMap(job => 
    getJobApplications(job.id)
      .filter(app => !statusFilter || app.status === statusFilter)
      .map(app => ({
        ...app,
        job: job
      }))
  );

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Job Applications</h1>
        <p className="mt-1 text-sm text-gray-500">
          Review and manage applications for your job postings
        </p>
      </div>

      {applications.length > 0 ? (
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {applications.map((application) => (
              <li key={application.id}>
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-lg font-medium text-gray-900">
                        {application.job.title}
                      </h4>
                      <p className="mt-1 text-sm text-gray-500">
                        Application ID: {application.id}
                      </p>
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
                        {application.job.location}
                      </p>
                      <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                        <Briefcase className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                        {application.job.type}
                      </p>
                    </div>
                    <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                      <p>
                        Applied on{' '}
                        <time dateTime={application.applied_at}>
                          {formatDate(new Date(application.applied_at))}
                        </time>
                      </p>
                    </div>
                  </div>
                  {application.cover_letter && (
                    <div className="mt-4">
                      <p className="text-sm text-gray-500">{application.cover_letter}</p>
                    </div>
                  )}
                  <div className="mt-4 flex space-x-4">
                    <a
                      href={application.resume}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                    >
                      View Resume
                    </a>
                    <button
                      type="button"
                      className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700"
                    >
                      Update Status
                    </button>
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
              : "You haven't received any applications yet"}
          </p>
        </div>
      )}
    </div>
  );
};

// Employer Dashboard Home
const EmployerDashboardHome: React.FC = () => {
  const { currentUser } = useAuth();
  const { jobs, applications } = useJobs();
  
  // Filter jobs posted by this employer
  const employerJobs = jobs.filter(job => job.employer_id === currentUser?.id);
  
  // Get all applications for this employer's jobs
  const employerApplications = applications.filter(app => 
    employerJobs.some(job => job.id === app.job_id)
  );
  
  // Count applications by status
  const pendingApplications = employerApplications.filter(app => app.status === ApplicationStatus.PENDING).length;
  const ReviewingApplications = employerApplications.filter(app => app.status === ApplicationStatus.REVIEWING).length;
  const interviewApplications = employerApplications.filter(app => app.status === ApplicationStatus.INTERVIEW).length;
  
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Employer Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">
          Welcome back, {currentUser?.name}! Manage your job postings and applications.
        </p>
      </div>
      
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
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
                    <div className="text-lg font-medium text-gray-900">
                      {employerJobs.filter(job => job.status === 'active').length}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <div className="text-sm">
              <Link to="/employer/jobs" className="font-medium text-primary-600 hover:text-primary-500">
                View all jobs
              </Link>
            </div>
          </div>
        </div>
        
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Users className="h-6 w-6 text-primary-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Total Applications
                  </dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">
                      {employerApplications.length}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <div className="text-sm">
              <Link to="/employer/applications" className="font-medium text-primary-600 hover:text-primary-500">
                Review applications
              </Link>
            </div>
          </div>
        </div>
        
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Eye className="h-6 w-6 text-primary-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Pending Review
                  </dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">
                      {pendingApplications}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <div className="text-sm">
              <Link to="/employer/applications?status=pending" className="font-medium text-primary-600 hover:text-primary-500">
                Review pending
              </Link>
            </div>
          </div>
        </div>
        
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Users className="h-6 w-6 text-primary-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Interviews Scheduled
                  </dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">
                      {interviewApplications}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <div className="text-sm">
              <Link to="/employer/applications?status=interview" className="font-medium text-primary-600 hover:text-primary-500">
                View interviews
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 bg-white shadow rounded-lg overflow-hidden">
        <div className="p-6">
          <h2 className="text-lg font-medium text-gray-900">Recent Job Postings</h2>
          
          {employerJobs.length > 0 ? (
            <div className="mt-6 flow-root">
              <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead>
                      <tr>
                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                          Title
                        </th>
                        <th scope="col" className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900">
                          Posted On
                        </th>
                        <th scope="col" className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900">
                          Status
                        </th>
                        <th scope="col" className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900">
                          Applications
                        </th>
                        <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                          <span className="sr-only">Actions</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {employerJobs.slice(0, 5).map((job) => (
                        <tr key={job.id}>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                            {job.title}
                          </td>
                          <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500">
                            {formatDate(new Date(job.posted_at))}
                          </td>
                          <td className="whitespace-nowrap py-4 px-3 text-sm">
                            <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                              job.status === 'active'
                                ? 'bg-green-100 text-green-800'
                                : job.status === 'closed'
                                ? 'bg-red-100 text-red-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                            </span>
                          </td>
                          <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500">
                            {job.applications_count}
                          </td>
                          <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                            <Link to={`/employer/jobs/${job.id}`} className="text-primary-600 hover:text-primary-900 mr-4">
                              View
                            </Link>
                            <Link to={`/employer/jobs/${job.id}/edit`} className="text-primary-600 hover:text-primary-900">
                              Edit
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  
                  {employerJobs.length > 5 && (
                    <div className="mt-4 text-center">
                      <Link to="/employer/jobs" className="text-sm font-medium text-primary-600 hover:text-primary-500">
                        View all jobs
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="mt-6 text-center py-8">
              <h3 className="text-lg font-medium text-gray-900">No jobs posted yet</h3>
              <p className="mt-1 text-sm text-gray-500">
                Get started by posting your first job opening
              </p>
              <div className="mt-6">
                <Link
                  to="/employer/post-job"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700"
                >
                  <PlusCircle className="h-5 w-5 mr-2" />
                  Post a Job
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Post Job Form
const PostJobForm: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { createJob, isLoading } = useJobs();
  
  const [jobData, setJobData] = useState<Partial<Job>>({
    title: '',
    
    
    location: '',
    type: 'Full-time' as any,
    salary_range: '',
    description: '',
    requirements: [''],
    responsibilities: [''],
    benefits: [''],
    is_remote: false,
    category: '',
    employer_id: currentUser?.id,
    
    status: 'active' as any,
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setJobData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setJobData(prev => ({ ...prev, [name]: checked }));
  };
  
  const handleArrayItemChange = (field: 'requirements' | 'responsibilities' | 'benefits', index: number, value: string) => {
    setJobData(prev => {
      const newArray = [...(prev[field] || [])];
      newArray[index] = value;
      return { ...prev, [field]: newArray };
    });
  };
  
  const addArrayItem = (field: 'requirements' | 'responsibilities' | 'benefits') => {
    setJobData(prev => {
      const newArray = [...(prev[field] || []), ''];
      return { ...prev, [field]: newArray };
    });
  };
  
  const removeArrayItem = (field: 'requirements' | 'responsibilities' | 'benefits', index: number) => {
    setJobData(prev => {
      const newArray = [...(prev[field] || [])];
      newArray.splice(index, 1);
      return { ...prev, [field]: newArray };
    });
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Filter out empty array items
      const filteredData = {
        ...jobData,
        requirements: jobData.requirements?.filter(req => req.trim() !== '') || [],
        responsibilities: jobData.responsibilities?.filter(resp => resp.trim() !== '') || [],
        benefits: jobData.benefits?.filter(ben => ben.trim() !== '') || [],
      };
      
      const newJob = await createJob(filteredData);
      navigate(`/employer/jobs/${newJob.id}`);
    } catch (error) {
      console.error('Error creating job:', error);
    }
  };
  
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Post a New Job</h1>
        <p className="mt-1 text-sm text-gray-500">
          Create a job posting to attract qualified candidates.
        </p>
      </div>
      
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-6">
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div className="border-b border-gray-900/10 pb-6">
                <h2 className="text-lg font-semibold leading-7 text-gray-900">Job Details</h2>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  Provide basic information about the job.
                </p>

                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-6">
                  <div className="sm:col-span-4">
                    <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
                      Job Title*
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="title"
                        id="title"
                        required
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                        value={jobData.title}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-4">
                    <label htmlFor="company" className="block text-sm font-medium leading-6 text-gray-900">
                      Company Name*
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="company"
                        id="company"
                        required
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                        value={jobData.company}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label htmlFor="type" className="block text-sm font-medium leading-6 text-gray-900">
                      Job Type*
                    </label>
                    <div className="mt-2">
                      <select
                        id="type"
                        name="type"
                        required
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:max-w-xs sm:text-sm sm:leading-6"
                        value={jobData.type}
                        onChange={handleInputChange}
                      >
                        <option value="Full-time">Full-time</option>
                        <option value="Part-time">Part-time</option>
                        <option value="Contract">Contract</option>
                        <option value="Freelance">Freelance</option>
                        <option value="Internship">Internship</option>
                      </select>
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label htmlFor="category" className="block text-sm font-medium leading-6 text-gray-900">
                      Category*
                    </label>
                    <div className="mt-2">
                      <select
                        id="category"
                        name="category"
                        required
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:max-w-xs sm:text-sm sm:leading-6"
                        value={jobData.category}
                        onChange={handleInputChange}
                      >
                        <option value="">Select a category</option>
                        <option value="Software Development">Software Development</option>
                        <option value="Design">Design</option>
                        <option value="Marketing">Marketing</option>
                        <option value="Sales">Sales</option>
                        <option value="Customer Service">Customer Service</option>
                        <option value="Data Science">Data Science</option>
                        <option value="Product Management">Product Management</option>
                        <option value="DevOps">DevOps</option>
                      </select>
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label htmlFor="location" className="block text-sm font-medium leading-6 text-gray-900">
                      Location*
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="location"
                        id="location"
                        required
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                        placeholder="e.g. San Francisco, CA"
                        value={jobData.location}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label htmlFor="salary_range" className="block text-sm font-medium leading-6 text-gray-900">
                      Salary Range*
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="salary_range"
                        id="salary_range"
                        required
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                        placeholder="e.g. $50,000 - $70,000"
                        value={jobData.salary_range}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-6">
                    <div className="flex items-center gap-x-3">
                      <input
                        id="is_remote"
                        name="is_remote"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-600"
                        checked={jobData.is_remote}
                        onChange={handleCheckboxChange}
                      />
                      <label htmlFor="is_remote" className="block text-sm font-medium leading-6 text-gray-900">
                        This is a remote position
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-b border-gray-900/10 pb-6">
                <h2 className="text-lg font-semibold leading-7 text-gray-900">Job Description</h2>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  Provide a detailed description of the job.
                </p>

                <div className="mt-6">
                  <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                    Job Description*
                  </label>
                  <div className="mt-2">
                    <textarea
                      id="description"
                      name="description"
                      rows={4}
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                      value={jobData.description}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>

              <div className="border-b border-gray-900/10 pb-6">
                <h2 className="text-lg font-semibold leading-7 text-gray-900">Requirements</h2>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  List the key requirements for this position.
                </p>

                <div className="mt-6 space-y-4">
                  {jobData.requirements?.map((req, index) => (
                    <div key={index} className="flex items-center gap-x-3">
                      <div className="flex-grow">
                        <input
                          type="text"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                          placeholder={`Requirement #${index + 1}`}
                          value={req}
                          onChange={(e) => handleArrayItemChange('requirements', index, e.target.value)}
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => removeArrayItem('requirements', index)}
                        className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addArrayItem('requirements')}
                    className="inline-flex items-center gap-x-1.5 rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500"
                  >
                    <PlusCircle className="-ml-0.5 h-5 w-5" aria-hidden="true" />
                    Add Requirement
                  </button>
                </div>
              </div>

              <div className="border-b border-gray-900/10 pb-6">
                <h2 className="text-lg font-semibold leading-7 text-gray-900">Responsibilities</h2>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  List the key responsibilities for this position.
                </p>

                <div className="mt-6 space-y-4">
                  {jobData.responsibilities?.map((resp, index) => (
                    <div key={index} className="flex items-center gap-x-3">
                      <div className="flex-grow">
                        <input
                          type="text"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                          placeholder={`Responsibility #${index + 1}`}
                          value={resp}
                          onChange={(e) => handleArrayItemChange('responsibilities', index, e.target.value)}
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => removeArrayItem('responsibilities', index)}
                        className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addArrayItem('responsibilities')}
                    className="inline-flex items-center gap-x-1.5 rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500"
                  >
                    <PlusCircle className="-ml-0.5 h-5 w-5" aria-hidden="true" />
                    Add Responsibility
                  </button>
                </div>
              </div>

              <div className="border-b border-gray-900/10 pb-6">
                <h2 className="text-lg font-semibold leading-7 text-gray-900">Benefits</h2>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  List the benefits offered with this position.
                </p>

                <div className="mt-6 space-y-4">
                  {jobData.benefits?.map((benefit, index) => (
                    <div key={index} className="flex items-center gap-x-3">
                      <div className="flex-grow">
                        <input
                          type="text"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                          placeholder={`Benefit #${index + 1}`}
                          value={benefit}
                          onChange={(e) => handleArrayItemChange('benefits', index, e.target.value)}
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => removeArrayItem('benefits', index)}
                        className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addArrayItem('benefits')}
                    className="inline-flex items-center gap-x-1.5 rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500"
                  >
                    <PlusCircle className="-ml-0.5 h-5 w-5" aria-hidden="true" />
                    Add Benefit
                  </button>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-end gap-x-6">
                <Link
                  to="/employer"
                  className="text-sm font-semibold leading-6 text-gray-900"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="inline-flex items-center rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    'Post Job'
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// Main Employer Dashboard Component
const EmployerDashboardPage: React.FC = () => {
  const { hasRole } = useAuth();
  
  if (!hasRole([UserRole.EMPLOYER, UserRole.ADMIN])) {
    return <div>Unauthorized</div>;
  }
  
  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <Routes>
        <Route index element={<EmployerDashboardHome />} />
        <Route path="post-job" element={<PostJobForm />} />
        <Route path="applications" element={<ApplicationsList />} />
      </Routes>
    </div>
  );
};

export default EmployerDashboardPage;