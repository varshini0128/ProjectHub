import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useJobs } from '../contexts/JobsContext';
import { useAuth } from '../contexts/AuthContext';
import { MapPin, Clock, Briefcase, ChevronLeft, ExternalLink, Share2, Heart, BookmarkPlus, Building2 } from 'lucide-react';
import { formatDate } from '../utils/dateUtils';
import { UserRole } from '../types';

const JobDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getJobById, isLoading, applyToJob } = useJobs();
  const { currentUser, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const [isApplying, setIsApplying] = useState(false);
  const [applicationSuccess, setApplicationSuccess] = useState(false);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [coverLetter, setCoverLetter] = useState('');
  const [shareUrl, setShareUrl] = useState('');
  const [showShareSuccess, setShowShareSuccess] = useState(false);
  
  const job = id ? getJobById(id) : undefined;

  const handleShare = async () => {
    const url = window.location.href;
    
    try {
      if (navigator.share) {
        await navigator.share({
          title: `${job?.title} at ${job?.company}`,
          text: `Check out this job: ${job?.title} at ${job?.company}`,
          url: url
        });
      } else {
        await navigator.clipboard.writeText(url);
        setShareUrl(url);
        setShowShareSuccess(true);
        setTimeout(() => setShowShareSuccess(false), 3000);
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };
  
  const handleApplyClick = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: `/jobs/${id}` } });
      return;
    }
    
    if (currentUser?.role === UserRole.EMPLOYER) {
      return; // Employers can't apply
    }
    
    setIsApplying(true);
  };
  
  const handleApplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentUser || !job) return;
    
    try {
      // In a real app, we would upload the resume file
      const resumeUrl = 'https://example.com/resume.pdf';
      
      await applyToJob(job.id, {
        job_seeker_id: currentUser.id,
        resume: resumeUrl,
        cover_letter: coverLetter,
      });
      
      setApplicationSuccess(true);
    } catch (error) {
      console.error('Error applying for job:', error);
    }
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setResumeFile(e.target.files[0]);
    }
  };
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }
  
  if (!job) {
    return (
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-gray-900">Job Not Found</h2>
        <p className="mt-4 text-lg text-gray-500">The job you're looking for doesn't exist or has been removed.</p>
        <div className="mt-8">
          <Link
            to="/jobs"
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700"
          >
            <ChevronLeft className="h-5 w-5 mr-2" />
            Back to Jobs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link
            to="/jobs"
            className="inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-700"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Jobs
          </Link>
        </div>
        
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          {/* Job Header */}
          <div className="bg-primary-700 text-white p-6 sm:p-8">
            <div className="flex flex-col md:flex-row md:items-center">
              <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
                {job.company_logo ? (
                  <img 
                    src={job.company_logo} 
                    alt={`${job.company} logo`} 
                    className="h-16 w-16 rounded-lg object-cover bg-white p-2"
                  />
                ) : (
                  <div className="h-16 w-16 rounded-lg bg-white flex items-center justify-center">
                    <Building2 className="h-8 w-8 text-primary-600" />
                  </div>
                )}
              </div>
              
              <div className="flex-1">
                <h1 className="text-2xl sm:text-3xl font-bold">{job.title}</h1>
                <div className="mt-2 flex flex-wrap items-center text-primary-100">
                  <span className="flex items-center mr-4 mb-2">
                    <Building2 className="h-4 w-4 mr-1" />
                    {job.company}
                  </span>
                  <span className="flex items-center mr-4 mb-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    {job.location}
                  </span>
                  <span className="flex items-center mr-4 mb-2">
                    <Clock className="h-4 w-4 mr-1" />
                    Posted on {formatDate(new Date(job.posted_at))}
                  </span>
                </div>
              </div>
              
              <div className="mt-4 md:mt-0 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                <button
                  type="button"
                  onClick={handleShare}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  <Share2 className="h-4 w-4 mr-1.5" />
                  Share
                </button>
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-white text-sm font-medium rounded-md shadow-sm text-white hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  <BookmarkPlus className="h-4 w-4 mr-1.5" />
                  Save
                </button>
              </div>
            </div>
            
            {/* Share success message */}
            {showShareSuccess && (
              <div className="mt-4 p-4 bg-green-100 text-green-800 rounded-md animate-fade-in">
                <p className="text-sm">
                  Job URL copied to clipboard! Share it with your network.
                </p>
              </div>
            )}
          </div>
          
          <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="space-y-8">
                {/* Job Overview */}
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Job Overview</h2>
                  <div className="flex flex-wrap -mx-4">
                    <div className="w-full sm:w-1/2 px-4 mb-4">
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-start">
                          <div className="flex-shrink-0">
                            <Briefcase className="h-5 w-5 text-primary-600" />
                          </div>
                          <div className="ml-3">
                            <h3 className="text-sm font-medium text-gray-900">Job Type</h3>
                            <p className="text-sm text-gray-500">{job.type}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="w-full sm:w-1/2 px-4 mb-4">
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-start">
                          <div className="flex-shrink-0">
                            <MapPin className="h-5 w-5 text-primary-600" />
                          </div>
                          <div className="ml-3">
                            <h3 className="text-sm font-medium text-gray-900">Location</h3>
                            <p className="text-sm text-gray-500">
                              {job.location} {job.is_remote && '(Remote)'}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="w-full sm:w-1/2 px-4 mb-4">
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-start">
                          <div className="flex-shrink-0">
                            <Clock className="h-5 w-5 text-primary-600" />
                          </div>
                          <div className="ml-3">
                            <h3 className="text-sm font-medium text-gray-900">Expires</h3>
                            <p className="text-sm text-gray-500">{formatDate(new Date(job.expires_at))}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="w-full sm:w-1/2 px-4 mb-4">
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-start">
                          <div className="flex-shrink-0">
                            <Building2 className="h-5 w-5 text-primary-600" />
                          </div>
                          <div className="ml-3">
                            <h3 className="text-sm font-medium text-gray-900">Company</h3>
                            <p className="text-sm text-gray-500">{job.company}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Job Description */}
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Job Description</h2>
                  <div className="prose max-w-none text-gray-500">
                    <p>{job.description}</p>
                  </div>
                </div>
                
                {/* Requirements */}
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Requirements</h2>
                  <ul className="list-disc pl-5 space-y-2 text-gray-500">
                    {job.requirements.map((requirement, index) => (
                      <li key={index}>{requirement}</li>
                    ))}
                  </ul>
                </div>
                
                {/* Responsibilities */}
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Responsibilities</h2>
                  <ul className="list-disc pl-5 space-y-2 text-gray-500">
                    {job.responsibilities.map((responsibility, index) => (
                      <li key={index}>{responsibility}</li>
                    ))}
                  </ul>
                </div>
                
                {/* Benefits */}
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Benefits</h2>
                  <ul className="list-disc pl-5 space-y-2 text-gray-500">
                    {job.benefits.map((benefit, index) => (
                      <li key={index}>{benefit}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <div className="bg-gray-50 rounded-lg p-6 shadow-sm mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Job Summary</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Salary Range:</span>
                      <span className="font-medium text-gray-900">{job.salary_range}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Job Type:</span>
                      <span className="font-medium text-gray-900">{job.type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Category:</span>
                      <span className="font-medium text-gray-900">{job.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Location:</span>
                      <span className="font-medium text-gray-900">
                        {job.location} {job.is_remote && '(Remote)'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Posted:</span>
                      <span className="font-medium text-gray-900">{formatDate(new Date(job.posted_at))}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Expires:</span>
                      <span className="font-medium text-gray-900">{formatDate(new Date(job.expires_at))}</span>
                    </div>
                  </div>
                </div>
                
                {isApplying ? (
                  <div className="bg-white rounded-lg p-6 shadow-md animate-fade-in">
                    {applicationSuccess ? (
                      <div className="text-center">
                        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                          <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <h3 className="mt-3 text-lg font-medium text-gray-900">Application Submitted!</h3>
                        <p className="mt-2 text-sm text-gray-500">
                          Your application has been successfully submitted. You can check the status in your dashboard.
                        </p>
                        <div className="mt-4">
                          <Link
                            to="/job-seeker"
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700"
                          >
                            Go to Dashboard
                          </Link>
                        </div>
                      </div>
                    ) : (
                      <>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Apply for this Job</h3>
                        <form onSubmit={handleApplySubmit}>
                          <div className="space-y-4">
                            <div>
                              <label htmlFor="resume" className="block text-sm font-medium text-gray-700">Resume *</label>
                              <div className="mt-1">
                                <input
                                  id="resume"
                                  name="resume"
                                  type="file"
                                  accept=".pdf,.doc,.docx"
                                  required
                                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-primary-50 file:text-primary-600 hover:file:bg-primary-100"
                                  onChange={handleFileChange}
                                />
                              </div>
                              <p className="mt-1 text-xs text-gray-500">PDF, DOC, DOCX (Max 3MB)</p>
                            </div>
                            
                            <div>
                              <label htmlFor="cover-letter" className="block text-sm font-medium text-gray-700">Cover Letter (Optional)</label>
                              <div className="mt-1">
                                <textarea
                                  id="cover-letter"
                                  name="cover-letter"
                                  rows={4}
                                  className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                  placeholder="Why are you a good fit for this position?"
                                  value={coverLetter}
                                  onChange={(e) => setCoverLetter(e.target.value)}
                                />
                              </div>
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <button
                                type="button"
                                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                                onClick={() => setIsApplying(false)}
                              >
                                Cancel
                              </button>
                              <button
                                type="submit"
                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700"
                              >
                                Submit Application
                              </button>
                            </div>
                          </div>
                        </form>
                      </>
                    )}
                  </div>
                ) : (
                  <div className="bg-white rounded-lg p-6 shadow-md">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Interested in this Job?</h3>
                    <div className="space-y-4">
                      <button
                        type="button"
                        onClick={handleApplyClick}
                        className={`w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${
                          currentUser?.role === UserRole.EMPLOYER
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-primary-600 hover:bg-primary-700'
                        }`}
                        disabled={currentUser?.role === UserRole.EMPLOYER}
                      >
                        {currentUser?.role === UserRole.EMPLOYER ? 'Employers Cannot Apply' : 'Apply Now'}
                      </button>
                      
                      <button
                        type="button"
                        onClick={handleShare}
                        className="w-full inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                      >
                        <Share2 className="h-4 w-4 mr-1.5" />
                        Share Job
                      </button>
                      
                      <button
                        type="button"
                        className="w-full inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                      >
                        <BookmarkPlus className="h-4 w-4 mr-1.5" />
                        Save Job
                      </button>
                      
                      <div className="pt-4 border-t border-gray-200 text-center">
                        <div className="text-sm text-gray-500">
                          Application closes on {formatDate(new Date(job.expires_at))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailPage;