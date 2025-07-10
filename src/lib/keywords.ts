// ATS Keywords Optimization - As specified in PRD
export const ATSKeywords = {
  // Technical Skills Keywords
  technicalSkills: [
    'Blender', 'Unreal Engine', 'Python', 'JavaScript', 'React', 'AI', 'ML',
    'TypeScript', 'Next.js', 'ConvAI', 'Machine Learning', 'Deep Learning',
    '3D Modeling', 'Animation', 'Rendering', 'GPU Acceleration', 'Lighting',
    'Texturing', 'VR', 'Virtual Reality', 'AR', 'Augmented Reality',
    'Node.js', 'Git', 'GitHub', 'API Development', 'Database Design',
    'PostgreSQL', 'SQLite', 'Prisma', 'WebGL', 'Three.js'
  ],

  // Industry Terms Keywords
  industryTerms: [
    '3D Artist', 'AI Specialist', 'Educational Technology', 'Animation',
    'Senior 3D Artist', 'Technical Artist', 'Creative Developer',
    'Educational Content Creator', 'YouTube Creator', 'Content Strategy',
    'Digital Marketing', 'Brand Development', 'Visual Effects',
    'Motion Graphics', 'Architectural Visualization', 'Product Visualization',
    'Game Development', 'Interactive Media', 'User Experience',
    'Educational Technology Expert', 'AI Developer', 'Creative Technologist'
  ],

  // Action Verbs Keywords
  actionVerbs: [
    'Led', 'Developed', 'Managed', 'Created', 'Implemented', 'Optimized',
    'Designed', 'Built', 'Established', 'Generated', 'Achieved', 'Delivered',
    'Enhanced', 'Improved', 'Streamlined', 'Automated', 'Integrated',
    'Collaborated', 'Coordinated', 'Executed', 'Spearheaded', 'Pioneered',
    'Innovated', 'Transformed', 'Accelerated', 'Maximized', 'Scaled'
  ],

  // Soft Skills Keywords
  softSkills: [
    'Project Management', 'Team Leadership', 'Client Relations', 'Communication',
    'Problem Solving', 'Creative Thinking', 'Attention to Detail',
    'Time Management', 'Adaptability', 'Collaboration', 'Innovation',
    'Strategic Planning', 'Quality Assurance', 'Process Improvement',
    'Cross-functional Collaboration', 'Stakeholder Management',
    'Customer Service', 'Training', 'Mentoring', 'Documentation'
  ],

  // Industry-Specific Keywords
  industrySpecific: [
    'Computer Graphics', 'Digital Arts', 'Game Development', 'Film Production',
    'E-Learning', 'Distance Learning', 'Educational Software', 'LMS',
    'Content Management', 'Video Production', 'Post-Production',
    'Real-time Rendering', 'Physics Simulation', 'Particle Systems',
    'Procedural Generation', 'Shader Programming', 'Pipeline Development',
    'Asset Management', 'Version Control', 'Agile Development',
    'Scrum', 'DevOps', 'CI/CD', 'Cloud Computing', 'AWS', 'Vercel'
  ],

  // Educational Keywords
  educationalKeywords: [
    'Curriculum Development', 'Learning Management Systems', 'Educational Design',
    'Instructional Design', 'E-Learning Development', 'Training Materials',
    'Assessment Tools', 'Learning Analytics', 'Student Engagement',
    'Online Education', 'Distance Learning', 'Blended Learning',
    'Microlearning', 'Gamification', 'Interactive Content',
    'Educational Technology Integration', 'Learning Outcomes',
    'Competency-Based Learning', 'Personalized Learning', 'Adaptive Learning'
  ],

  // Performance Metrics Keywords
  performanceMetrics: [
    'ROI', 'KPIs', 'Performance Optimization', 'Efficiency Gains',
    'Cost Reduction', 'Time Savings', 'Quality Improvement',
    'User Satisfaction', 'Client Retention', 'Project Success Rate',
    'Delivery Time', 'Budget Management', 'Resource Allocation',
    'Scalability', 'Performance Benchmarking', 'Conversion Rates',
    'Engagement Metrics', 'User Analytics', 'Growth Metrics'
  ]
};

// Function to get all keywords as a searchable array
export const getAllKeywords = (): string[] => {
  return [
    ...ATSKeywords.technicalSkills,
    ...ATSKeywords.industryTerms,
    ...ATSKeywords.actionVerbs,
    ...ATSKeywords.softSkills,
    ...ATSKeywords.industrySpecific,
    ...ATSKeywords.educationalKeywords,
    ...ATSKeywords.performanceMetrics
  ];
};

// Function to calculate keyword density for ATS optimization
export const calculateKeywordDensity = (text: string, keywords: string[]): number => {
  const words = text.toLowerCase().split(/\s+/);
  const keywordMatches = keywords.filter(keyword => 
    text.toLowerCase().includes(keyword.toLowerCase())
  );
  
  return (keywordMatches.length / words.length) * 100;
};

// Function to suggest keyword improvements
export const suggestKeywordImprovements = (text: string): string[] => {
  const allKeywords = getAllKeywords();
  
  const missingKeywords = allKeywords.filter(keyword => 
    !text.toLowerCase().includes(keyword.toLowerCase())
  );
  
  return missingKeywords.slice(0, 10); // Return top 10 missing keywords
};

// ATS-optimized keyword integration for CV sections
export const enhanceTextWithKeywords = (text: string): string => {
  // This function could be used to enhance text with relevant keywords
  // while maintaining natural language flow
  return text;
}; 