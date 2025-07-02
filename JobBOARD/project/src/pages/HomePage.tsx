import React from 'react';
import { Link } from 'react-router-dom';
import { useJobs } from '../contexts/JobsContext';
import { Briefcase, Search, Users, Building2, MapPin } from 'lucide-react';

const HomePage: React.FC = () => {
  const { jobs } = useJobs();
  
  // Get 3 featured jobs
  const featuredJobs = jobs.slice(0, 3);
  
  // Get unique categories
  const categories = [...new Set(jobs.map(job => job.category))];
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Find Your Dream Job
            </h1>
            <p className="mt-4 text-xl text-primary-100 max-w-3xl mx-auto">
              Connect with top companies and unlock your career potential. Thousands of jobs are waiting for you.
            </p>
            <div className="mt-8 flex justify-center">
              <div className="inline-flex rounded-md shadow">
                <Link
                  to="/jobs"
                  className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-primary-700 bg-white hover:bg-gray-50"
                >
                  <Search className="h-5 w-5 mr-2" />
                  Browse Jobs
                </Link>
              </div>
              <div className="ml-3 inline-flex">
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-700 hover:bg-primary-800"
                >
                  <Briefcase className="h-5 w-5 mr-2" />
                  Post a Job
                </Link>
              </div>
            </div>
          </div>
          
          <div className="mt-16 bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg p-8 rounded-lg">
            <form action="/jobs" className="sm:flex">
              <div className="flex-1 min-w-0">
                <label htmlFor="search" className="sr-only">Search Jobs</label>
                <input
                  id="search"
                  type="text"
                  placeholder="Job title, company, or keywords"
                  className="block w-full px-4 py-3 rounded-md border-0 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-300"
                />
              </div>
              <div className="mt-4 sm:mt-0 sm:ml-3">
                <button
                  type="submit"
                  className="block w-full px-4 py-3 rounded-md border border-transparent bg-primary-500 text-white font-medium hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:px-8"
                >
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            <div className="bg-gray-50 overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-primary-100 rounded-md p-3">
                    <Briefcase className="h-6 w-6 text-primary-600" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Available Jobs
                      </dt>
                      <dd>
                        <div className="text-lg font-semibold text-gray-900">
                          {jobs.length}+
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-secondary-100 rounded-md p-3">
                    <Building2 className="h-6 w-6 text-secondary-600" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Hiring Companies
                      </dt>
                      <dd>
                        <div className="text-lg font-semibold text-gray-900">
                          500+
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-success-100 rounded-md p-3">
                    <Users className="h-6 w-6 text-success-600" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Happy Job Seekers
                      </dt>
                      <dd>
                        <div className="text-lg font-semibold text-gray-900">
                          10,000+
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Jobs Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Featured Jobs</h2>
            <p className="mt-3 max-w-2xl mx-auto text-lg text-gray-500">
              Discover opportunities from top companies looking for talented professionals like you.
            </p>
          </div>
          
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {featuredJobs.map(job => (
              <Link key={job.id} to={`/jobs/${job.id}`} className="block">
                <div className="h-full flex flex-col bg-white overflow-hidden shadow-lg rounded-lg transition-all duration-300 hover:shadow-xl hover:translate-y-[-5px]">
                  <div className="p-6">
                    <div className="flex items-center">
                      {job.company_logo ? (
                        <img 
                          src={job.company_logo} 
                          alt={`${job.company} logo`} 
                          className="h-12 w-12 rounded-md object-cover"
                        />
                      ) : (
                        <div className="h-12 w-12 rounded-md bg-primary-100 flex items-center justify-center">
                          <Briefcase className="h-6 w-6 text-primary-600" />
                        </div>
                      )}
                      <div className="ml-4">
                        <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
                        <p className="text-sm text-gray-500">{job.company}</p>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <div className="flex items-center text-sm text-gray-500">
                        <MapPin className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                        <p>{job.location}</p>
                      </div>
                      <div className="mt-2 flex items-center text-sm text-gray-500">
                        <Briefcase className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                        <p>{job.type}</p>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {job.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="p-6 mt-auto border-t border-gray-200">
                    <div className="flex items-center justify-between">
                      <span className="text-primary-600">{job.salary_range}</span>
                      <span className="text-sm font-medium text-primary-600 hover:text-primary-700">
                        View Details
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          <div className="mt-10 text-center">
            <Link
              to="/jobs"
              className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700"
            >
              View All Jobs
            </Link>
          </div>
        </div>
      </section>
      
      {/* Categories Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Browse by Category</h2>
            <p className="mt-3 max-w-2xl mx-auto text-lg text-gray-500">
              Find jobs in your area of expertise from a wide range of categories.
            </p>
          </div>
          
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {categories.slice(0, 8).map((category, index) => (
              <Link
                key={index}
                to={`/jobs?category=${category}`}
                className="flex flex-col items-center p-6 bg-gray-50 rounded-lg shadow-sm transition-all duration-300 hover:shadow-md hover:bg-primary-50"
              >
                <div className="p-3 rounded-full bg-primary-100">
                  <Briefcase className="h-6 w-6 text-primary-600" />
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-900">{category}</h3>
                <p className="mt-1 text-sm text-gray-500">
                  {jobs.filter(job => job.category === category).length} jobs
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-primary-700">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">Ready to dive in?</span>
            <span className="block text-primary-200">Start your job search today.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <Link
                to="/jobs"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-primary-600 bg-white hover:bg-primary-50"
              >
                Search Jobs
              </Link>
            </div>
            <div className="ml-3 inline-flex rounded-md shadow">
              <Link
                to="/register"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
              >
                Post a Job
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;