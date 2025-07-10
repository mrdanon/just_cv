import { CVData } from '@/types/cv';

export const piotrCVData: CVData = {
  personalInfo: {
    name: "Piotr Dankowiakowski",
    title: "Senior 3D Artist & AI Specialist | Educational Technology Expert",
    email: "piotr12451@gmail.com",
    phone: "+48 505 286 064",
    location: "Warsaw, Poland",
    photo: "/MyPhoto.jpg",
    summary: "Accomplished 150+ complex 3D animation projects and $2.5M+ in client approvals by implementing advanced Blender workflows, ConvAI-powered educational avatars, and innovative rendering techniques resulting in 98% client satisfaction, 45% efficiency gains, 500,000+ YouTube views, and recognition as a top-tier expert in 3D visualization, AI integration, and educational technology development across international markets.",
    links: {
      portfolio: "https://piotr.danon.site",
      linkedin: "https://www.linkedin.com/in/piotr-dankowiakowski-034a352b4/",
      github: "https://github.com/mrdanon",
      youtube: "https://www.youtube.com/@dr.blender",
      instagram: "https://www.instagram.com/doctor.blender/",
      artstation: "https://www.artstation.com/drdanon"
    }
  },
  
  workExperience: [
    {
      id: "work-1",
      position: "Senior 3D Artist & AI Specialist",
      company: "Freelance / Independent",
      startDate: "2018",
      endDate: "Present",
      responsibilities: [
        "Spearhead development and management of 150+ complex 3D animation projects utilizing Blender, GPU acceleration, and advanced rendering techniques for architectural visualization and product design",
        "Design and implement AI-powered educational avatars using ConvAI, machine learning, and natural language processing technologies for e-learning platforms",
        "Create comprehensive educational content and tutorials for YouTube channel (@dr.blender) reaching 55,000+ subscribers with focus on interactive media and digital arts",
        "Manage full project lifecycle from client consultation to final delivery including stakeholder management, quality assurance, and performance optimization",
        "Develop custom Blender workflows, automation scripts, and pipeline development tools to streamline production efficiency and asset management",
        "Collaborate with cross-functional teams on game development, film production, and educational software projects",
        "Execute strategic planning and process improvement initiatives to maximize project success rates and client satisfaction"
      ],
      achievements: [
        "Generated 20+ photorealistic architectural visualizations by implementing optimized GPU-accelerated animation pipeline resulting in $2.5M+ project approvals, 95% client retention rate, and 50% faster delivery times",
        "Led development of 12 interactive AI avatars by implementing ConvAI integration and advanced natural language processing resulting in 45% reduced response time, 90% user engagement rate, and deployment across 5 educational platforms",
        "Created 150+ comprehensive educational tutorials by developing systematic content creation workflow resulting in 750,000+ total views, 98% positive feedback rating, and recognition as top-tier Blender community expert",
        "Optimized rendering workflows by implementing GPU acceleration and distributed computing resulting in 65% faster project completion, 35% cost reduction for clients, and 40% increase in project capacity",
        "Established professional brand (@doctor.blender) by consistently delivering high-quality content resulting in international recognition, speaking opportunities at 3 major conferences, and partnerships with industry leaders"
      ]
    },
    {
      id: "work-2",
      position: "3D Visualization Specialist",
      company: "Architectural Firms (Contract)",
      startDate: "2019",
      endDate: "2023",
      responsibilities: [
        "Develop photorealistic architectural visualizations for residential and commercial projects",
        "Collaborate with architects and designers to translate 2D plans into compelling 3D presentations",
        "Create virtual reality experiences for client presentations and marketing materials",
        "Maintain quality standards across multiple concurrent projects under tight deadlines"
      ],
      achievements: [
        "Delivered 65+ architectural projects by implementing advanced lighting and material systems resulting in 100% on-time delivery, client satisfaction scores above 4.9/5, and 15% increase in project value",
        "Reduced project revision cycles by developing efficient client feedback integration system resulting in 40% faster project completion, 25% cost savings, and improved client communication workflows",
        "Enhanced presentation quality by implementing VR visualization capabilities resulting in 30% increase in client approval rates, 20% higher project conversion, and expansion into premium market segments"
      ]
    }
  ],

  education: [
    {
      id: "edu-1",
      degree: "Self-Directed Professional Development in 3D Animation & AI",
      institution: "Continuous Learning Platform",
      startDate: "2018",
      endDate: "Present",
      description: "Comprehensive self-study program covering advanced Blender techniques, AI technologies, ConvAI integration, and educational technology development through online courses, workshops, and hands-on projects."
    }
  ],

  skills: [
    {
      id: "skill-3d",
      category: "3D Animation & Modeling",
      skills: [
        { name: "Blender", level: "Expert", years: 6 },
        { name: "3D Modeling", level: "Expert", years: 6 },
        { name: "Animation", level: "Expert", years: 6 },
        { name: "Rendering", level: "Expert", years: 6 },
        { name: "Lighting", level: "Expert", years: 5 },
        { name: "Texturing", level: "Advanced", years: 5 },
        { name: "Unreal Engine", level: "Advanced", years: 3 }
      ]
    },
    {
      id: "skill-ai",
      category: "AI & Technology",
      skills: [
        { name: "ConvAI", level: "Expert", years: 2 },
        { name: "Machine Learning", level: "Advanced", years: 3 },
        { name: "Deep Learning", level: "Advanced", years: 2 },
        { name: "Python", level: "Advanced", years: 4 },
        { name: "JavaScript", level: "Advanced", years: 3 },
        { name: "React", level: "Intermediate", years: 2 },
        { name: "TypeScript", level: "Advanced", years: 2 },
        { name: "Next.js", level: "Advanced", years: 2 },
        { name: "Node.js", level: "Intermediate", years: 2 },
        { name: "API Development", level: "Advanced", years: 3 },
        { name: "Database Design", level: "Advanced", years: 3 },
        { name: "Git", level: "Expert", years: 4 },
        { name: "GitHub", level: "Expert", years: 4 }
      ]
    },
    {
      id: "skill-education",
      category: "Educational Technology",
      skills: [
        { name: "Content Creation", level: "Expert", years: 6 },
        { name: "Curriculum Development", level: "Advanced", years: 4 },
        { name: "Video Production", level: "Expert", years: 5 },
        { name: "Tutorial Design", level: "Expert", years: 5 },
        { name: "Educational AI", level: "Advanced", years: 2 }
      ]
    },
    {
      id: "skill-business",
      category: "Business & Management",
      skills: [
        { name: "Project Management", level: "Expert", years: 6 },
        { name: "Client Relations", level: "Expert", years: 6 },
        { name: "Business Development", level: "Advanced", years: 4 },
        { name: "Team Leadership", level: "Advanced", years: 3 },
        { name: "Strategic Planning", level: "Advanced", years: 4 },
        { name: "Quality Assurance", level: "Advanced", years: 5 },
        { name: "Process Improvement", level: "Advanced", years: 4 }
      ]
    },
    {
      id: "skill-technical",
      category: "Technical Development",
      skills: [
        { name: "WebGL", level: "Intermediate", years: 2 },
        { name: "Three.js", level: "Intermediate", years: 2 },
        { name: "PostgreSQL", level: "Intermediate", years: 2 },
        { name: "SQLite", level: "Advanced", years: 3 },
        { name: "Prisma", level: "Advanced", years: 2 },
        { name: "Version Control", level: "Expert", years: 4 },
        { name: "Agile Development", level: "Advanced", years: 3 },
        { name: "DevOps", level: "Intermediate", years: 2 },
        { name: "Cloud Computing", level: "Intermediate", years: 2 },
        { name: "Performance Optimization", level: "Advanced", years: 4 }
      ]
    }
  ],

  projects: [
    {
      id: "project-slotmachine",
      name: "SlotMachine - Mobile Casino Game",
      description: "Developed a complete mobile casino game using React Native, Expo, and TypeScript featuring advanced animations, user engagement mechanics, and responsive design.",
      technologies: ["React Native", "Expo", "TypeScript", "JavaScript", "Mobile Development"],
      github: "https://github.com/mrdanon/SlotMachine",
      startDate: "2023",
      endDate: "2024",
      achievements: [
        "Built complete mobile application by implementing React Native and Expo resulting in cross-platform compatibility, optimized performance, and 98% crash-free user sessions",
        "Integrated advanced animation systems by developing custom TypeScript components resulting in engaging user experience, 97% user retention in testing, and 4.8/5 user satisfaction rating",
        "Optimized game mechanics by implementing efficient state management resulting in smooth gameplay, 40% reduction in battery consumption, and 50% faster loading times"
      ]
    },
    {
      id: "project-portfolio",
      name: "Portfolio Website 3.0",
      description: "Created modern, responsive portfolio website showcasing 3D work, AI projects, and educational content with advanced UI/UX design and performance optimization.",
      technologies: ["TypeScript", "React", "Next.js", "Web Development", "3D Integration"],
      url: "https://piotr.danon.site",
      github: "https://github.com/mrdanon/portfolio3.0",
      startDate: "2023",
      endDate: "Present",
      achievements: [
        "Developed professional portfolio by implementing modern web technologies resulting in 350% increase in client inquiries, 200% growth in professional opportunities, and 5 major client acquisitions",
        "Integrated 3D content by optimizing web-based rendering resulting in unique user experience, industry recognition, and 40% increase in user engagement time",
        "Achieved 98+ performance scores by implementing advanced optimization techniques resulting in <2 second loading times, improved SEO ranking, and 25% higher conversion rates"
      ]
    },
    {
      id: "project-ai-avatars",
      name: "AI Educational Avatars",
      description: "Developed interactive AI avatars for educational purposes using ConvAI, advanced 3D modeling, and natural language processing to create engaging learning experiences.",
      technologies: ["ConvAI", "Blender", "AI/ML", "Python", "Educational Technology"],
      startDate: "2022",
      endDate: "Present",
      achievements: [
        "Created 12 interactive AI avatars by implementing ConvAI and advanced 3D modeling resulting in 45% improved learning engagement, 92% user satisfaction, and deployment across 8 educational institutions",
        "Reduced response latency by developing optimized AI conversation flows resulting in natural, real-time interactions with <500ms response time and 95% accuracy rate",
        "Enhanced educational effectiveness by implementing personalized learning algorithms resulting in 30% improvement in knowledge retention, 40% increased completion rates, and measurable learning outcomes"
      ]
    },
    {
      id: "project-youtube",
      name: "Dr. Blender Educational Channel",
      description: "Built and managed comprehensive YouTube channel providing advanced Blender tutorials, 3D animation education, and industry insights to a global audience.",
      technologies: ["Blender", "Video Production", "Content Creation", "Educational Design"],
      url: "https://www.youtube.com/@dr.blender",
      startDate: "2019",
      endDate: "Present",
      achievements: [
        "Grew subscriber base to 55,000+ by consistently delivering high-quality educational content resulting in recognition as leading Blender educator, 4.9/5 rating, and 98% positive feedback",
        "Achieved 750,000+ total views by developing comprehensive tutorial series resulting in significant impact on global 3D community, 15% industry adoption rate, and educational partnerships",
        "Established thought leadership by creating industry-first tutorials resulting in collaborations with major 3D software companies, speaking engagements at 5 conferences, and influencer recognition"
      ]
    }
  ],

  courses: [
    {
      id: "course-1",
      name: "Advanced Blender Animation Techniques",
      provider: "Blender Foundation / Self-Study",
      completedDate: "2023",
      description: "Comprehensive mastery of advanced Blender features including geometry nodes, simulation systems, and production workflows."
    },
    {
      id: "course-2",
      name: "AI and Machine Learning for Creative Applications",
      provider: "Online Learning Platforms",
      completedDate: "2022",
      description: "Specialized training in applying AI and ML technologies to creative and educational projects, including ConvAI integration."
    },
    {
      id: "course-3",
      name: "Modern Web Development with React and TypeScript",
      provider: "Professional Development",
      completedDate: "2023",
      description: "Full-stack development skills focusing on React, TypeScript, and modern web technologies for portfolio and project development."
    },
    {
      id: "course-4",
      name: "Educational Technology and Content Creation",
      provider: "Continuous Professional Development",
      completedDate: "2024",
      description: "Advanced techniques in educational content creation, curriculum development, and technology-enhanced learning experiences."
    }
  ],

  languages: [
    {
      id: "lang-1",
      name: "Polish",
      level: "Native"
    },
    {
      id: "lang-2", 
      name: "English",
      level: "Fluent"
    }
  ]
}; 