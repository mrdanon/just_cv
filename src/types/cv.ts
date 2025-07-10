// Personal Information Types
export interface PersonalInfo {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  photo: string;
  summary: string;
  links: SocialLinks;
}

export interface SocialLinks {
  portfolio: string;
  linkedin: string;
  github: string;
  youtube: string;
  instagram: string;
  artstation: string;
}

// Work Experience Types
export interface WorkExperience {
  id: string;
  position: string;
  company: string;
  startDate: string;
  endDate: string;
  responsibilities: string[];
  achievements: string[];
}

// Education Types
export interface Education {
  id: string;
  degree: string;
  institution: string;
  startDate: string;
  endDate: string;
  description?: string;
}

// Skills Types
export interface SkillCategory {
  id: string;
  category: string;
  skills: Skill[];
}

export interface Skill {
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  years?: number;
}

// Projects Types
export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  url?: string;
  github?: string;
  startDate: string;
  endDate?: string;
  achievements: string[];
}

// Courses Types
export interface Course {
  id: string;
  name: string;
  provider: string;
  completedDate: string;
  certificateUrl?: string;
  description?: string;
}

// Languages Types
export interface Language {
  id: string;
  name: string;
  level: 'Basic' | 'Conversational' | 'Fluent' | 'Native';
}

// Main CV Data Interface
export interface CVData {
  personalInfo: PersonalInfo;
  workExperience: WorkExperience[];
  education: Education[];
  skills: SkillCategory[];
  projects: Project[];
  courses: Course[];
  languages: Language[];
}

// Database CV Model (matches Prisma schema)
export interface CVModel {
  id: string;
  personalInfo: PersonalInfo;
  workExperience: WorkExperience[];
  education: Education[];
  skills: SkillCategory[];
  projects: Project[];
  courses: Course[];
  languages: Language[];
  createdAt: Date;
  updatedAt: Date;
}

// API Response Types
export interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// PDF Generation Types
export interface PDFOptions {
  filename: string;
  format: 'A4' | 'Letter';
  quality: number;
} 