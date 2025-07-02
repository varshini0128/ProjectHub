import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useJobs } from '../contexts/JobsContext';
import JobCard from '../components/jobs/JobCard';
import JobFilter from '../components/jobs/JobFilter';
import { JobFilters } from '../types';

const JobListingsPage: React.FC = () => {
  const { jobs, isLoading, error, fetchJobs } = useJobs();
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentFilters, setCurrentFilters] = useState<JobFilters>({});
  
  // Parse search params into filters
  useEffect(() => {
    const filters: JobFilters = {};
    
    if (searchParams.has('search')) {
      filters.search = searchParams.get('search') || undefined;
    }
    
    if (searchParams.has('location')) {
      filters.location = searchParams.get('location') || undefined;
    }
    
    if (searchParams.has('type')) {
      filters.type = searchParams.getAll('type') as any;
    }
    
    if (searchParams.has('category')) {
      filters.category = searchParams.getAll('category');
    }
    
    if (searchParams.has('is_remote')) {
      filters.is_remote = searchParams.get('is_remote') === 'true';
    }
    
    if (searchParams.has('salary_min')) {
      filters.salary_min = Number(searchParams.get('salary_min'));
    }
    
    if (searchParams.has('salary_max')) {
      filters.salary_max = Number(searchParams.get('salary_max'));
    }
    
    setCurrentFilters(filters);
    fetchJobs(filters);
  }, [searchParams]);
  
  const handleApplyFilters = (filters: JobFilters) => {
    // Convert filters to search params
    const params = new URLSearchParams();
    
    if (filters.search) {
      params.set('search', filters.search);
    }
    
    if (filters.location) {
      params.set('location', filters.location);
    }
    
    if (filters.type && filters.type.length > 0) {
      filters.type.forEach(type => {
        params.append('type', type);
      });
    }
    
    if (filters.category && filters.category.length > 0) {
      filters.category.forEach(category => {
        params.append('category', category);
      });
    }
    
    if (filters.is_remote !== undefined) {
      params.set('is_remote', String(filters.is_remote));
    }
    
    if (filters.salary_min !== undefined) {
      params.set('salary_min', String(filters.salary_min));
    }
    
    if (filters.salary_max !== undefined) {
      params.set('salary_max', String(filters.salary_max));
    }
    
    setSearchParams(params);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Find Your Perfect Job</h1>
          <p className="mt-4 text-lg text-gray-500">
            Browse through our extensive list of job opportunities
          </p>
        </div>
        
        <JobFilter onApplyFilters={handleApplyFilters} currentFilters={currentFilters} />
        
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
            {error}
          </div>
        ) : jobs.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1">
            {jobs.map(job => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <h3 className="text-lg font-medium text-gray-900">No jobs found</h3>
            <p className="mt-1 text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobListingsPage;