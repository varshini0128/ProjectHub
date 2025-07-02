import React, { createContext, useContext, useState, useEffect } from 'react';
import { Job, JobFilters, JobType, JobApplication, ApplicationStatus } from '../types';

interface JobsContextType {
  jobs: Job[];
  applications: JobApplication[];
  isLoading: boolean;
  error: string | null;
  fetchJobs: (filters?: JobFilters) => Promise<void>;
  getJobById: (id: string) => Job | undefined;
  createJob: (jobData: Partial<Job>) => Promise<Job>;
  updateJob: (id: string, jobData: Partial<Job>) => Promise<Job>;
  deleteJob: (id: string) => Promise<void>;
  applyToJob: (jobId: string, applicationData: Partial<JobApplication>) => Promise<JobApplication>;
  getUserApplications: (userId: string) => JobApplication[];
  getJobApplications: (jobId: string) => JobApplication[];
  updateApplicationStatus: (applicationId: string, status: ApplicationStatus) => Promise<void>;
}

const JobsContext = createContext<JobsContextType | null>(null);

// Mock job data for demo purposes
const MOCK_JOBS: Job[] = [
  {
    id: '1',
    title: 'Senior React Developer',
    company: 'Tech Solutions Inc.',
    company_logo: 'https://images.pexels.com/photos/6633920/pexels-photo-6633920.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    location: 'San Francisco, CA',
    type: JobType.FULL_TIME,
    salary_range: '$120,000 - $150,000',
    description: 'We are looking for an experienced React developer to join our team.',
    requirements: [
      '5+ years of experience with React',
      'Strong knowledge of JavaScript and TypeScript',
      'Experience with state management libraries',
      'Bachelor\'s degree in Computer Science or related field',
    ],
    responsibilities: [
      'Develop and maintain web applications using React',
      'Collaborate with team members to design and implement features',
      'Write clean, maintainable, and efficient code',
      'Participate in code reviews and provide feedback',
    ],
    benefits: [
      'Competitive salary',
      'Health, dental, and vision insurance',
      'Flexible work hours',
      '401(k) matching',
      'Unlimited PTO',
    ],
    posted_at: '2023-03-01T00:00:00Z',
    expires_at: '2023-05-01T00:00:00Z',
    is_remote: true,
    category: 'Software Development',
    employer_id: '1',
    status: 'active',
    applications_count: 12,
  },
  {
    id: '2',
    title: 'UX/UI Designer',
    company: 'Creative Designs Co.',
    company_logo: 'https://images.pexels.com/photos/3987066/pexels-photo-3987066.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    location: 'New York, NY',
    type: JobType.FULL_TIME,
    salary_range: '$90,000 - $110,000',
    description: 'We need a talented UX/UI designer to create beautiful interfaces.',
    requirements: [
      '3+ years of experience in UX/UI design',
      'Proficiency with design tools like Figma and Adobe XD',
      'Portfolio showcasing previous work',
      'Good understanding of user-centered design principles',
    ],
    responsibilities: [
      'Create wireframes, mockups, and prototypes',
      'Conduct user research and usability testing',
      'Collaborate with developers to implement designs',
      'Maintain design systems and style guides',
    ],
    benefits: [
      'Competitive salary',
      'Health insurance',
      'Flexible work arrangements',
      'Professional development budget',
    ],
    posted_at: '2023-03-05T00:00:00Z',
    expires_at: '2023-05-05T00:00:00Z',
    is_remote: false,
    category: 'Design',
    employer_id: '1',
    status: 'active',
    applications_count: 8,
  },
  {
    id: '3',
    title: 'Product Manager',
    company: 'Innovative Solutions',
    company_logo: 'https://images.pexels.com/photos/326503/pexels-photo-326503.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    location: 'Austin, TX',
    type: JobType.FULL_TIME,
    salary_range: '$100,000 - $130,000',
    description: 'Join our product team to shape the future of our software.',
    requirements: [
      '4+ years of product management experience',
      'Experience with agile methodologies',
      'Strong analytical and problem-solving skills',
      'Excellent communication skills',
    ],
    responsibilities: [
      'Define product vision and strategy',
      'Gather and prioritize requirements',
      'Work with design and engineering teams',
      'Track and measure product success metrics',
    ],
    benefits: [
      'Competitive salary',
      'Health and wellness benefits',
      'Remote work options',
      'Stock options',
      'Paid parental leave',
    ],
    posted_at: '2023-03-10T00:00:00Z',
    expires_at: '2023-05-10T00:00:00Z',
    is_remote: true,
    category: 'Product Management',
    employer_id: '2',
    status: 'active',
    applications_count: 15,
  },
  {
    id: '4',
    title: 'DevOps Engineer',
    company: 'Cloud Technologies',
    company_logo: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    location: 'Seattle, WA',
    type: JobType.FULL_TIME,
    salary_range: '$110,000 - $140,000',
    description: 'Help us build and maintain our cloud infrastructure.',
    requirements: [
      'Experience with AWS, Azure, or GCP',
      'Knowledge of containerization technologies',
      'Experience with CI/CD pipelines',
      'Understanding of infrastructure as code',
    ],
    responsibilities: [
      'Design and implement cloud infrastructure',
      'Set up and maintain CI/CD pipelines',
      'Monitor system performance and security',
      'Collaborate with development teams',
    ],
    benefits: [
      'Competitive salary',
      'Comprehensive benefits package',
      'Flexible work schedule',
      'Professional development opportunities',
    ],
    posted_at: '2023-03-15T00:00:00Z',
    expires_at: '2023-05-15T00:00:00Z',
    is_remote: true,
    category: 'DevOps',
    employer_id: '2',
    status: 'active',
    applications_count: 5,
  },
  {
    id: '5',
    title: 'Marketing Specialist',
    company: 'Growth Marketing Agency',
    company_logo: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    location: 'Chicago, IL',
    type: JobType.FULL_TIME,
    salary_range: '$70,000 - $90,000',
    description: 'Join our marketing team to help clients grow their businesses.',
    requirements: [
      '2+ years of digital marketing experience',
      'Experience with SEO, SEM, and social media marketing',
      'Familiarity with marketing analytics tools',
      'Excellent written and verbal communication skills',
    ],
    responsibilities: [
      'Develop and execute marketing campaigns',
      'Create content for various channels',
      'Analyze campaign performance',
      'Collaborate with clients to understand their needs',
    ],
    benefits: [
      'Competitive salary',
      'Health and dental insurance',
      'Flexible work arrangements',
      'Company events and team building activities',
    ],
    posted_at: '2023-03-20T00:00:00Z',
    expires_at: '2023-05-20T00:00:00Z',
    is_remote: false,
    category: 'Marketing',
    employer_id: '1',
    status: 'active',
    applications_count: 10,
  },
  {
    id: '6',
    title: 'Data Scientist',
    company: 'Data Insights Inc.',
    company_logo: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    location: 'Boston, MA',
    type: JobType.FULL_TIME,
    salary_range: '$100,000 - $130,000',
    description: 'Help us extract insights from data to drive business decisions.',
    requirements: [
      'MS or PhD in Computer Science, Statistics, or related field',
      'Experience with machine learning and statistical modeling',
      'Proficiency in Python, R, or similar languages',
      'Experience with data visualization tools',
    ],
    responsibilities: [
      'Develop and implement machine learning models',
      'Clean and preprocess data for analysis',
      'Collaborate with stakeholders to understand business needs',
      'Present findings and recommendations',
    ],
    benefits: [
      'Competitive salary',
      'Comprehensive benefits package',
      'Flexible work schedule',
      'Professional development opportunities',
      'Wellness program',
    ],
    posted_at: '2023-03-25T00:00:00Z',
    expires_at: '2023-05-25T00:00:00Z',
    is_remote: true,
    category: 'Data Science',
    employer_id: '2',
    status: 'active',
    applications_count: 7,
  },
];

// Mock applications data
const MOCK_APPLICATIONS: JobApplication[] = [
  {
    id: '1',
    job_id: '1',
    job_seeker_id: '2',
    resume: 'https://example.com/resume.pdf',
    cover_letter: 'I am excited to apply for this position...',
    status: ApplicationStatus.REVIEWING,
    applied_at: '2023-03-05T00:00:00Z',
    updated_at: '2023-03-06T00:00:00Z',
  },
  {
    id: '2',
    job_id: '3',
    job_seeker_id: '2',
    resume: 'https://example.com/resume.pdf',
    status: ApplicationStatus.PENDING,
    applied_at: '2023-03-12T00:00:00Z',
    updated_at: '2023-03-12T00:00:00Z',
  },
];

export const JobsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchJobs();
    // Load mock applications
    setApplications(MOCK_APPLICATIONS);
  }, []);

  const fetchJobs = async (filters?: JobFilters) => {
    setIsLoading(true);
    setError(null);
    try {
      // Simulate API request delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      let filteredJobs = [...MOCK_JOBS];
      
      if (filters) {
        // Apply filters
        if (filters.search) {
          const searchLower = filters.search.toLowerCase();
          filteredJobs = filteredJobs.filter(job => 
            job.title.toLowerCase().includes(searchLower) || 
            job.company.toLowerCase().includes(searchLower) ||
            job.description.toLowerCase().includes(searchLower)
          );
        }
        
        if (filters.location) {
          filteredJobs = filteredJobs.filter(job => 
            job.location.toLowerCase().includes(filters.location!.toLowerCase())
          );
        }
        
        if (filters.type && filters.type.length > 0) {
          filteredJobs = filteredJobs.filter(job => 
            filters.type!.includes(job.type)
          );
        }
        
        if (filters.category && filters.category.length > 0) {
          filteredJobs = filteredJobs.filter(job => 
            filters.category!.includes(job.category)
          );
        }
        
        if (filters.is_remote !== undefined) {
          filteredJobs = filteredJobs.filter(job => 
            job.is_remote === filters.is_remote
          );
        }
        
        if (filters.salary_min !== undefined) {
          filteredJobs = filteredJobs.filter(job => {
            const minSalary = parseInt(job.salary_range.split(' - ')[0].replace(/\D/g, ''));
            return minSalary >= filters.salary_min!;
          });
        }
        
        if (filters.salary_max !== undefined) {
          filteredJobs = filteredJobs.filter(job => {
            const maxSalary = parseInt(job.salary_range.split(' - ')[1].replace(/\D/g, ''));
            return maxSalary <= filters.salary_max!;
          });
        }
      }
      
      setJobs(filteredJobs);
    } catch (error) {
      console.error('Error fetching jobs:', error);
      setError('Failed to fetch jobs. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const getJobById = (id: string) => {
    return MOCK_JOBS.find(job => job.id === id);
  };

  const createJob = async (jobData: Partial<Job>): Promise<Job> => {
    setIsLoading(true);
    try {
      // Simulate API request delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newJob: Job = {
        id: String(MOCK_JOBS.length + 1),
        title: jobData.title || '',
        company: jobData.company || '',
        company_logo: jobData.company_logo,
        location: jobData.location || '',
        type: jobData.type || JobType.FULL_TIME,
        salary_range: jobData.salary_range || '',
        description: jobData.description || '',
        requirements: jobData.requirements || [],
        responsibilities: jobData.responsibilities || [],
        benefits: jobData.benefits || [],
        posted_at: new Date().toISOString(),
        expires_at: jobData.expires_at || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        is_remote: jobData.is_remote || false,
        category: jobData.category || '',
        employer_id: jobData.employer_id || '',
        status: jobData.status || 'active',
        applications_count: 0,
      };
      
      // In a real app, we would send this to an API
      console.log('Created new job:', newJob);
      
      // Add to local state
      setJobs(prevJobs => [...prevJobs, newJob]);
      
      return newJob;
    } catch (error) {
      console.error('Error creating job:', error);
      setError('Failed to create job. Please try again later.');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateJob = async (id: string, jobData: Partial<Job>): Promise<Job> => {
    setIsLoading(true);
    try {
      // Simulate API request delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const jobIndex = MOCK_JOBS.findIndex(job => job.id === id);
      if (jobIndex === -1) {
        throw new Error('Job not found');
      }
      
      const updatedJob = {
        ...MOCK_JOBS[jobIndex],
        ...jobData,
        updated_at: new Date().toISOString(),
      };
      
      // In a real app, we would send this to an API
      console.log('Updated job:', updatedJob);
      
      // Update local state
      setJobs(prevJobs => {
        const newJobs = [...prevJobs];
        const index = newJobs.findIndex(job => job.id === id);
        if (index !== -1) {
          newJobs[index] = updatedJob as Job;
        }
        return newJobs;
      });
      
      return updatedJob as Job;
    } catch (error) {
      console.error('Error updating job:', error);
      setError('Failed to update job. Please try again later.');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteJob = async (id: string): Promise<void> => {
    setIsLoading(true);
    try {
      // Simulate API request delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, we would send this to an API
      console.log('Deleted job:', id);
      
      // Update local state
      setJobs(prevJobs => prevJobs.filter(job => job.id !== id));
    } catch (error) {
      console.error('Error deleting job:', error);
      setError('Failed to delete job. Please try again later.');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const applyToJob = async (jobId: string, applicationData: Partial<JobApplication>): Promise<JobApplication> => {
    setIsLoading(true);
    try {
      // Simulate API request delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newApplication: JobApplication = {
        id: String(applications.length + 1),
        job_id: jobId,
        job_seeker_id: applicationData.job_seeker_id || '',
        resume: applicationData.resume || '',
        cover_letter: applicationData.cover_letter,
        status: ApplicationStatus.PENDING,
        applied_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      
      // In a real app, we would send this to an API
      console.log('Created new application:', newApplication);
      
      // Add to local state
      setApplications(prevApplications => [...prevApplications, newApplication]);
      
      // Update job application count
      setJobs(prevJobs => {
        const newJobs = [...prevJobs];
        const jobIndex = newJobs.findIndex(job => job.id === jobId);
        if (jobIndex !== -1) {
          newJobs[jobIndex] = {
            ...newJobs[jobIndex],
            applications_count: newJobs[jobIndex].applications_count + 1,
          };
        }
        return newJobs;
      });
      
      return newApplication;
    } catch (error) {
      console.error('Error applying to job:', error);
      setError('Failed to apply to job. Please try again later.');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const getUserApplications = (userId: string) => {
    return applications.filter(app => app.job_seeker_id === userId);
  };

  const getJobApplications = (jobId: string) => {
    return applications.filter(app => app.job_id === jobId);
  };

  const updateApplicationStatus = async (applicationId: string, status: ApplicationStatus): Promise<void> => {
    setIsLoading(true);
    try {
      // Simulate API request delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update local state
      setApplications(prevApplications => {
        const newApplications = [...prevApplications];
        const appIndex = newApplications.findIndex(app => app.id === applicationId);
        if (appIndex !== -1) {
          newApplications[appIndex] = {
            ...newApplications[appIndex],
            status,
            updated_at: new Date().toISOString(),
          };
        }
        return newApplications;
      });
      
      console.log(`Updated application ${applicationId} status to ${status}`);
    } catch (error) {
      console.error('Error updating application status:', error);
      setError('Failed to update application status. Please try again later.');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <JobsContext.Provider
      value={{
        jobs,
        applications,
        isLoading,
        error,
        fetchJobs,
        getJobById,
        createJob,
        updateJob,
        deleteJob,
        applyToJob,
        getUserApplications,
        getJobApplications,
        updateApplicationStatus,
      }}
    >
      {children}
    </JobsContext.Provider>
  );
};

export const useJobs = () => {
  const context = useContext(JobsContext);
  if (!context) {
    throw new Error('useJobs must be used within a JobsProvider');
  }
  return context;
};