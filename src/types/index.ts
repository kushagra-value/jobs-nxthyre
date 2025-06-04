export type JobType = 'Full-Time' | 'Part-Time' | 'Contract' | 'Internship' | 'Freelance';
export type WorkMode = 'Remote' | 'On-site' | 'Hybrid';
export type Department = 'Engineering' | 'IT' | 'Sales' | 'Marketing' | 'Design' | 'Finance' | 'HR';
export type JobFeature = 'Actively Hiring' | 'Good Job Culture' | 'Visa Sponsorship' | 'Flexible Hours' | 'Benefits Package';

export interface Job {
  id: string;
  title: string;
  company: string;
  experience: string;
  location: string;
  jobType: JobType;
  workMode: WorkMode;
  salary: string | null;
  department: Department;
  companyLogo: string | null;
  postedTime: string;
  rating: number | null;
  badges: string[];
  category: string[];
  isUrgent: boolean;
  applicants: number | null;
  totalOpenings: number | null;
  description: string;
  skills: string[];
  requirements: string[];
  responsibilities: string[];
  education: string;
  mustHaveSkills: string[];
  goodToHaveSkills: string[];
  benefits: string[];
  jobFeatures: JobFeature[];
  companyInfo: {
    name: string;
    description: string | null;
    address: string | null;
    type: string | null;
    industry: string | null;
  };
  reviews: any[];
}

export interface Company {
  id: string;
  name: string;
  logo: string;
  jobCount: number;
}

export interface FilterState {
  jobType: string[];
  location: string[];
  company: string[];
  department: string[];
  jobFeatures: string[];
  experience: string[];
}

export interface SortOption {
  label: string;
  value: string;
}