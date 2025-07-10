import { CVData } from '@/types/cv';

export const piotrCVData: CVData = {
  personalInfo: {
    name: "Piotr Dankowiakowski",
    title: "Senior 3D Artist & AI Specialist | Educational Technology Expert",
    email: "piotr12451@gmail.com",
    phone: "+48 505 286 064",
    location: "Warsaw, Poland",
    photo: "/MyPhoto.jpg",
    summary: "Accomplished 100+ projects and $2M+ in client approvals by implementing cutting-edge Blender animations, AI avatars, and educational technologies resulting in 98% client satisfaction, 40% efficiency gains, and recognition as a leading expert in 3D visualization and AI-driven educational content creation.",
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
        "Lead development and management of 100+ complex 3D animation projects using Blender and advanced rendering techniques",
        "Design and implement AI-powered educational avatars using ConvAI and machine learning technologies",
        "Create comprehensive educational content and tutorials for YouTube channel (@dr.blender) reaching 50,000+ subscribers",
        "Manage full project lifecycle from client consultation to final delivery for architectural and product visualization",
        "Develop custom Blender workflows and automation scripts to optimize production efficiency"
      ],
      achievements: [
        "Generated 15+ architectural visualizations by implementing optimized animation pipeline resulting in $2M+ project approvals and 95% client retention rate",
        "Led development of 8 AI avatars by implementing ConvAI integration and natural language processing resulting in 40% reduced response time and enhanced user engagement",
        "Created 100+ educational tutorials by developing systematic content creation workflow resulting in 500,000+ total views and recognition as Blender community expert",
        "Optimized rendering workflows by implementing GPU acceleration and distributed computing resulting in 60% faster project completion and 30% cost reduction for clients",
        "Established professional brand (@doctor.blender) by consistently delivering high-quality content resulting in international recognition and speaking opportunities"
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
        "Delivered 50+ architectural projects by implementing advanced lighting and material systems resulting in 100% on-time delivery and client satisfaction scores above 4.8/5",
        "Reduced project revision cycles by developing efficient client feedback integration system resulting in 35% faster project completion",
        "Enhanced presentation quality by implementing VR visualization capabilities resulting in 25% increase in client approval rates"
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
        { name: "Python", level: "Advanced", years: 4 },
        { name: "JavaScript", level: "Intermediate", years: 3 },
        { name: "React", level: "Intermediate", years: 2 },
        { name: "TypeScript", level: "Intermediate", years: 2 }
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
        { name: "Team Leadership", level: "Advanced", years: 3 }
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
        "Built complete mobile application by implementing React Native and Expo resulting in cross-platform compatibility and optimized performance",
        "Integrated advanced animation systems by developing custom TypeScript components resulting in engaging user experience and 95% user retention in testing",
        "Optimized game mechanics by implementing efficient state management resulting in smooth gameplay and minimal battery consumption"
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
        "Developed professional portfolio by implementing modern web technologies resulting in 300% increase in client inquiries and professional opportunities",
        "Integrated 3D content by optimizing web-based rendering resulting in unique user experience and industry recognition",
        "Achieved 95+ performance scores by implementing advanced optimization techniques resulting in fast loading times and improved SEO ranking"
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
        "Created 8 interactive AI avatars by implementing ConvAI and advanced 3D modeling resulting in 40% improved learning engagement and user satisfaction",
        "Reduced response latency by developing optimized AI conversation flows resulting in natural, real-time interactions",
        "Enhanced educational effectiveness by implementing personalized learning algorithms resulting in 25% improvement in knowledge retention"
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
        "Grew subscriber base to 50,000+ by consistently delivering high-quality educational content resulting in recognition as leading Blender educator",
        "Achieved 500,000+ total views by developing comprehensive tutorial series resulting in significant impact on global 3D community",
        "Established thought leadership by creating industry-first tutorials resulting in collaborations with major 3D software companies"
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