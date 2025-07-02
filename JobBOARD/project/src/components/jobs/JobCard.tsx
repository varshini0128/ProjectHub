import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Clock, Briefcase, BookmarkPlus } from 'lucide-react';
import { Job } from '../../types';
import { formatDistanceToNow } from '../../utils/dateUtils';
import { useAuth } from '../../contexts/AuthContext';

interface JobCardProps {
  job: Job;
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  const { isAuthenticated, hasSavedJob, saveJob, unsaveJob } = useAuth();
  
  const handleSaveJob = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation
    if (!isAuthenticated) {
      // Redirect to login if not authenticated
      window.location.href = '/login';
      return;
    }
    
    if (hasSavedJob(job.id)) {
      unsaveJob(job.id);
    } else {
      saveJob(job.id);
    }
  };

  return (
    <Link 
      to={`/jobs/${job.id}`}
      className="block rounded-lg overflow-hidden bg-white shadow-md hover:shadow-lg transition-shadow duration-300 animate-slide-up"
    >
      <div className="p-5 border-b border-gray-100">
        <div className="flex items-start justify-between">
          <div className="flex items-center">
            {job.company_logo ? (
              <img 
                src={job.company_logo} 
                alt={`${job.company} logo`} 
                className="w-12 h-12 object-cover rounded-md mr-4"
              />
            ) : (
              <div className="w-12 h-12 bg-gray-200 rounded-md flex items-center justify-center mr-4">
                <Briefcase className="w-6 h-6 text-gray-500" />
              </div>
            )}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 hover:text-primary-600 transition-colors">
                {job.title}
              </h3>
              <p className="text-sm text-gray-600 mt-1">{job.company}</p>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
              {job.type}
            </span>
            {job.is_remote && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary-100 text-secondary-800 mt-1">
                Remote
              </span>
            )}
          </div>
        </div>
      </div>
      
      <div className="p-5">
        <div className="flex flex-wrap text-sm text-gray-500 mb-3">
          <div className="flex items-center mr-4 mb-2">
            <MapPin className="w-4 h-4 mr-1" />
            <span>{job.location}</span>
          </div>
          <div className="flex items-center mr-4 mb-2">
            <Clock className="w-4 h-4 mr-1" />
            <span>Posted {formatDistanceToNow(new Date(job.posted_at))} ago</span>
          </div>
        </div>
        
        <p className="text-gray-600 text-sm line-clamp-2 mb-4">
          {job.description}
        </p>
        
        <div className="flex items-center justify-between mt-4">
          <div className="text-sm font-medium text-gray-900">
            {job.salary_range}
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleSaveJob}
              className="text-primary-600 hover:text-primary-700 focus:outline-none"
              title={hasSavedJob(job.id) ? "Unsave job" : "Save job"}
            >
              <BookmarkPlus className={`h-5 w-5 ${hasSavedJob(job.id) ? 'fill-current' : ''}`} />
            </button>
            <span className="text-primary-600 font-medium text-sm hover:text-primary-700">
              View Details
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default JobCard;