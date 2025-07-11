import { z } from 'zod';

// Base validation schemas
const EmailSchema = z.string().email('Invalid email format');
const PhoneSchema = z.string().min(10, 'Phone number must be at least 10 digits');
const UrlSchema = z.string().url('Invalid URL format');

// Social Links validation
const SocialLinksSchema = z.object({
  portfolio: UrlSchema,
  linkedin: UrlSchema,
  github: UrlSchema,
  youtube: UrlSchema,
  instagram: UrlSchema,
  artstation: UrlSchema,
});

// Personal Information validation
const PersonalInfoSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  title: z.string().min(5, 'Title must be at least 5 characters'),
  email: EmailSchema,
  phone: PhoneSchema,
  location: z.string().min(3, 'Location must be at least 3 characters'),
  photo: z.string().url('Photo must be a valid URL'),
  summary: z.string().min(50, 'Summary must be at least 50 characters'),
  links: SocialLinksSchema,
});

// Work Experience validation
const WorkExperienceSchema = z.object({
  id: z.string().min(1, 'ID is required'),
  position: z.string().min(3, 'Position must be at least 3 characters'),
  company: z.string().min(2, 'Company must be at least 2 characters'),
  startDate: z.string().min(4, 'Start date is required'),
  endDate: z.string().min(4, 'End date is required'),
  responsibilities: z.array(z.string().min(10, 'Responsibility must be at least 10 characters')),
  achievements: z.array(z.string().min(10, 'Achievement must be at least 10 characters')),
});

// Education validation
const EducationSchema = z.object({
  id: z.string().min(1, 'ID is required'),
  degree: z.string().min(5, 'Degree must be at least 5 characters'),
  institution: z.string().min(3, 'Institution must be at least 3 characters'),
  startDate: z.string().min(4, 'Start date is required'),
  endDate: z.string().min(4, 'End date is required'),
  description: z.string().optional(),
});

// Skills validation
const SkillSchema = z.object({
  name: z.string().min(2, 'Skill name must be at least 2 characters'),
  level: z.enum(['Beginner', 'Intermediate', 'Advanced', 'Expert'], {
    message: 'Level must be one of: Beginner, Intermediate, Advanced, Expert'
  }),
  years: z.number().min(0, 'Years must be non-negative').optional(),
});

const SkillCategorySchema = z.object({
  id: z.string().min(1, 'ID is required'),
  category: z.string().min(3, 'Category must be at least 3 characters'),
  skills: z.array(SkillSchema).min(1, 'At least one skill is required'),
});

// Projects validation
const ProjectSchema = z.object({
  id: z.string().min(1, 'ID is required'),
  name: z.string().min(3, 'Project name must be at least 3 characters'),
  description: z.string().min(20, 'Description must be at least 20 characters'),
  technologies: z.array(z.string().min(2, 'Technology must be at least 2 characters')),
  github: z.string().url('GitHub must be a valid URL').optional(),
  url: z.string().url('URL must be a valid URL').optional(),
  startDate: z.string().min(4, 'Start date is required'),
  endDate: z.string().min(4, 'End date is required').optional(),
  achievements: z.array(z.string().min(10, 'Achievement must be at least 10 characters')),
});

// Courses validation
const CourseSchema = z.object({
  id: z.string().min(1, 'ID is required'),
  name: z.string().min(5, 'Course name must be at least 5 characters'),
  provider: z.string().min(3, 'Provider must be at least 3 characters'),
  completedDate: z.string().min(4, 'Completed date is required'),
  description: z.string().optional(),
});

// Languages validation
const LanguageSchema = z.object({
  id: z.string().min(1, 'ID is required'),
  name: z.string().min(2, 'Language name must be at least 2 characters'),
  level: z.enum(['Beginner', 'Intermediate', 'Advanced', 'Native'], {
    message: 'Level must be one of: Beginner, Intermediate, Advanced, Native'
  }),
});

// Complete CV data validation
export const CVDataSchema = z.object({
  personalInfo: PersonalInfoSchema,
  workExperience: z.array(WorkExperienceSchema).min(1, 'At least one work experience is required'),
  education: z.array(EducationSchema).min(1, 'At least one education entry is required'),
  skills: z.array(SkillCategorySchema).min(1, 'At least one skill category is required'),
  projects: z.array(ProjectSchema).min(1, 'At least one project is required'),
  courses: z.array(CourseSchema).min(1, 'At least one course is required'),
  languages: z.array(LanguageSchema).min(1, 'At least one language is required'),
});

// Webhook update validation
export const CVUpdateSchema = z.object({
  section: z.enum(['personalInfo', 'workExperience', 'education', 'skills', 'projects', 'courses', 'languages'], {
    message: 'Section must be one of: personalInfo, workExperience, education, skills, projects, courses, languages'
  }),
  data: z.any(), // Will be validated based on section
});

// Section-specific validation
export const validateSectionData = (section: string, data: any) => {
  try {
    switch (section) {
      case 'personalInfo':
        return PersonalInfoSchema.parse(data);
      case 'workExperience':
        return z.array(WorkExperienceSchema).parse(data);
      case 'education':
        return z.array(EducationSchema).parse(data);
      case 'skills':
        return z.array(SkillCategorySchema).parse(data);
      case 'projects':
        return z.array(ProjectSchema).parse(data);
      case 'courses':
        return z.array(CourseSchema).parse(data);
      case 'languages':
        return z.array(LanguageSchema).parse(data);
      default:
        throw new Error(`Unknown section: ${section}`);
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    throw new Error(`Validation failed for section ${section}: ${errorMessage}`);
  }
};

// API request validation
export const APIRequestSchema = z.object({
  method: z.enum(['GET', 'POST', 'PUT', 'DELETE']),
  headers: z.record(z.string(), z.string()),
  body: z.any().optional(),
});

// Authentication validation
export const AuthSchema = z.object({
  email: EmailSchema,
  role: z.enum(['admin', 'user'], {
    message: 'Role must be either admin or user'
  }).default('user'),
});

// Webhook signature validation
export const WebhookSignatureSchema = z.object({
  signature: z.string().regex(/^sha256=/, 'Signature must start with sha256='),
  timestamp: z.string().regex(/^\d+$/, 'Timestamp must be a valid Unix timestamp'),
  payload: z.string().min(1, 'Payload cannot be empty'),
});

// Rate limiting validation
export const RateLimitSchema = z.object({
  ip: z.string().min(7, 'Invalid IP address'),
  endpoint: z.string().min(1, 'Endpoint is required'),
  timestamp: z.number().int('Timestamp must be an integer'),
});

// Export individual schemas for specific validation needs
export {
  PersonalInfoSchema,
  WorkExperienceSchema,
  EducationSchema,
  SkillCategorySchema,
  ProjectSchema,
  CourseSchema,
  LanguageSchema,
  SocialLinksSchema,
  EmailSchema,
  PhoneSchema,
  UrlSchema,
}; 