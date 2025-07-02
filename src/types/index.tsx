// User types
export enum UserRole {
  JOB_SEEKER = 'job_seeker',
  EMPLOYER = 'employer',
  ADMIN = 'admin',
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  created_at: string;
  saved_jobs?: string[]; // Array of saved job IDs
}

export interface JobSeeker extends User {
  resume?: string;
  skills: string[];
  experience: string;
  education: string;
  applications: JobApplication[];
  saved_jobs: string[];
}

export interface Employer extends User {
  company_name: string;
  company_size: string;
  industry: string;
  company_description: string;
  logo?: string;
  jobs: Job[];
}

// Job types
export enum JobType {
  FULL_TIME = 'Full-time',
  PART_TIME = 'Part-time',
  CONTRACT = 'Contract',
  FREELANCE = 'Freelance',
  INTERNSHIP = 'Internship',
}

export interface Job {
  id: string;
  title: string;
  company: string;
  company_logo?: string;
  location: string;
  type: JobType;
  salary_range: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  benefits: string[];
  posted_at: string;
  expires_at: string;
  is_remote: boolean;
  category: string;
  employer_id: string;
  status: 'active' | 'closed' | 'draft';
  applications_count: number;
}

// Application types
export enum ApplicationStatus {
  PENDING = 'pending',
  REVIEWING = 'reviewing',
  INTERVIEW = 'interview',
  REJECTED = 'rejected',
  ACCEPTED = 'accepted',
}

export interface JobApplication {
  id: string;
  job_id: string;
  job_seeker_id: string;
  resume: string;
  cover_letter?: string;
  status: ApplicationStatus;
  applied_at: string;
  updated_at: string;
}

// Filter types
export interface JobFilters {
  search?: string;
  location?: string;
  type?: JobType[];
  category?: string[];
  is_remote?: boolean;
  salary_min?: number;
  salary_max?: number;
}