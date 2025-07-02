import React, { useState } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { JobFilters, JobType } from '../../types';

interface JobFilterProps {
  onApplyFilters: (filters: JobFilters) => void;
  currentFilters: JobFilters;
}

const JobFilter: React.FC<JobFilterProps> = ({ onApplyFilters, currentFilters }) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState<JobFilters>(currentFilters);
  const [search, setSearch] = useState(currentFilters.search || '');
  
  const jobTypes = Object.values(JobType);
  const jobCategories = [
    'Software Development',
    'Design',
    'Marketing',
    'Sales',
    'Customer Service',
    'Data Science',
    'Product Management',
    'DevOps',
  ];
  
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onApplyFilters({ ...filters, search });
  };
  
  const handleToggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };
  
  const handleFilterChange = <K extends keyof JobFilters>(key: K, value: JobFilters[K]) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };
  
  const handleCheckboxChange = (key: 'type' | 'category', value: string) => {
    setFilters(prev => {
      const currentValues = prev[key] || [];
      
      if (Array.isArray(currentValues)) {
        // @ts-ignore
        if (currentValues.includes(value)) {
          // @ts-ignore
          return { ...prev, [key]: currentValues.filter(v => v !== value) };
        } else {
          // @ts-ignore
          return { ...prev, [key]: [...currentValues, value] };
        }
      }
      
      return prev;
    });
  };
  
  const handleApplyFilters = () => {
    onApplyFilters({ ...filters, search });
    setIsFilterOpen(false);
  };
  
  const handleResetFilters = () => {
    const resetFilters: JobFilters = {};
    setFilters(resetFilters);
    setSearch('');
    onApplyFilters(resetFilters);
    setIsFilterOpen(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <form onSubmit={handleSearchSubmit} className="mb-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search for jobs, companies, or skills..."
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </form>
      
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={handleToggleFilter}
          className="flex items-center text-sm font-medium text-gray-700 hover:text-primary-600 transition-colors duration-200"
        >
          <Filter className="h-4 w-4 mr-1" />
          {isFilterOpen ? 'Hide Filters' : 'Show Filters'}
        </button>
        
        {Object.keys(currentFilters).length > 0 && (
          <button
            type="button"
            onClick={handleResetFilters}
            className="flex items-center text-sm font-medium text-red-600 hover:text-red-700 transition-colors duration-200"
          >
            <X className="h-4 w-4 mr-1" />
            Clear Filters
          </button>
        )}
      </div>
      
      {isFilterOpen && (
        <div className="mt-4 pt-4 border-t border-gray-200 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Location</label>
              <input
                type="text"
                placeholder="e.g. San Francisco, CA"
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                value={filters.location || ''}
                onChange={(e) => handleFilterChange('location', e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Remote Only</label>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remote"
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  checked={filters.is_remote || false}
                  onChange={(e) => handleFilterChange('is_remote', e.target.checked)}
                />
                <label htmlFor="remote" className="ml-2 block text-sm text-gray-700">
                  Remote Jobs Only
                </label>
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Salary Range</label>
              <div className="flex space-x-2">
                <input
                  type="number"
                  placeholder="Min"
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  value={filters.salary_min || ''}
                  onChange={(e) => handleFilterChange('salary_min', e.target.value ? Number(e.target.value) : undefined)}
                />
                <span className="flex items-center text-gray-500">to</span>
                <input
                  type="number"
                  placeholder="Max"
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  value={filters.salary_max || ''}
                  onChange={(e) => handleFilterChange('salary_max', e.target.value ? Number(e.target.value) : undefined)}
                />
              </div>
            </div>
          </div>
          
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Job Type</label>
              <div className="space-y-1">
                {jobTypes.map(type => (
                  <div key={type} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`type-${type}`}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      checked={filters.type?.includes(type as JobType) || false}
                      onChange={() => handleCheckboxChange('type', type)}
                    />
                    <label htmlFor={`type-${type}`} className="ml-2 block text-sm text-gray-700">
                      {type}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <div className="space-y-1 max-h-40 overflow-y-auto">
                {jobCategories.map(category => (
                  <div key={category} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`category-${category}`}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      checked={filters.category?.includes(category) || false}
                      onChange={() => handleCheckboxChange('category', category)}
                    />
                    <label htmlFor={`category-${category}`} className="ml-2 block text-sm text-gray-700">
                      {category}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="mt-4 flex justify-end space-x-2">
            <button
              type="button"
              onClick={handleResetFilters}
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Reset
            </button>
            <button
              type="button"
              onClick={handleApplyFilters}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobFilter;