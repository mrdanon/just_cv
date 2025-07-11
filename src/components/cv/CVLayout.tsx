import React from 'react';
import Image from 'next/image';
import { CVData } from '@/types/cv';

interface CVLayoutProps {
  data: CVData;
}

export default function CVLayout({ data }: CVLayoutProps) {
  return (
    <div 
      id="cv-container" 
      className="cv-container max-w-4xl mx-auto p-8 bg-white text-black"
      style={{ fontFamily: 'Arial, Helvetica, sans-serif' }}
    >
      {/* Header Section - ATS Optimized Linear Layout */}
      <header className="mb-8">
        {/* Professional Photo */}
        <div className="text-center mb-6">
          <Image
            src={data.personalInfo.photo}
            alt={`${data.personalInfo.name} - Professional Photo`}
            width={150}
            height={150}
            className="rounded-lg object-cover border-2 border-gray-200 mx-auto"
            priority
            quality={95}
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
            onError={(e) => {
              console.error('Image failed to load:', e);
              // Fallback to a default image or hide the image
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
            unoptimized={false}
          />
        </div>
        
        {/* Personal Information - Linear Layout */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold mb-2 text-gray-900">
            {data.personalInfo.name}
          </h1>
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            {data.personalInfo.title}
          </h2>
        </div>
        
        {/* Contact Information - ATS Friendly Linear */}
        <div className="text-center space-y-1 text-sm text-gray-600 mb-4">
          <div>Email: {data.personalInfo.email}</div>
          <div>Phone: {data.personalInfo.phone}</div>
          <div>Location: {data.personalInfo.location}</div>
        </div>
        
        {/* Professional Links - ATS Friendly Linear */}
        <div className="text-center space-y-1 text-sm text-blue-600">
          <div>Portfolio: {data.personalInfo.links.portfolio}</div>
          <div>LinkedIn: {data.personalInfo.links.linkedin}</div>
          <div>GitHub: {data.personalInfo.links.github}</div>
          <div>YouTube: {data.personalInfo.links.youtube}</div>
          <div>Instagram: {data.personalInfo.links.instagram}</div>
          <div>ArtStation: {data.personalInfo.links.artstation}</div>
        </div>
      </header>

      {/* Professional Summary */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 border-b-2 border-gray-300 pb-2">
          Professional Summary
        </h2>
        <p className="text-gray-700 leading-relaxed">
          {data.personalInfo.summary}
        </p>
      </section>

      {/* Work Experience - ATS Optimized */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 border-b-2 border-gray-300 pb-2">
          Work Experience
        </h2>
        <div className="space-y-6">
          {data.workExperience.map((job) => (
            <div key={job.id} className="border-l-4 border-blue-500 pl-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {job.position}
              </h3>
              <h4 className="text-md font-medium text-gray-700 mb-2">
                {job.company} • {job.startDate} - {job.endDate}
              </h4>
              
              {/* Responsibilities */}
              <div className="mb-3">
                <h5 className="font-medium text-gray-800 mb-1">Key Responsibilities:</h5>
                <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
                  {job.responsibilities.map((responsibility, index) => (
                    <li key={index}>{responsibility}</li>
                  ))}
                </ul>
              </div>
              
              {/* Achievements */}
              <div>
                <h5 className="font-medium text-gray-800 mb-1">Key Achievements:</h5>
                <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
                  {job.achievements.map((achievement, index) => (
                    <li key={index}>{achievement}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Skills Section - ATS Optimized Single Column */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 border-b-2 border-gray-300 pb-2">
          Technical Skills
        </h2>
        <div className="space-y-6">
          {data.skills.map((category) => (
            <div key={category.id}>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {category.category}
              </h3>
              <div className="space-y-1">
                {category.skills.map((skill, index) => (
                  <div key={index} className="text-sm text-gray-700">
                    <span className="font-medium">{skill.name}</span>
                    <span className="text-gray-500"> - {skill.level}</span>
                    {skill.years && (
                      <span className="text-gray-500"> ({skill.years} years)</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Projects Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 border-b-2 border-gray-300 pb-2">
          Key Projects
        </h2>
        <div className="space-y-6">
          {data.projects.map((project) => (
            <div key={project.id} className="border-l-4 border-green-500 pl-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {project.name}
              </h3>
              <p className="text-sm text-gray-600 mb-2">
                {project.startDate} - {project.endDate || 'Present'}
              </p>
              <p className="text-gray-700 mb-2">{project.description}</p>
              
              <div className="mb-2">
                <span className="font-medium text-gray-800">Technologies: </span>
                <span className="text-gray-700">{project.technologies.join(', ')}</span>
              </div>
              
              <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
                {project.achievements.map((achievement, index) => (
                  <li key={index}>{achievement}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Education Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 border-b-2 border-gray-300 pb-2">
          Education
        </h2>
        <div className="space-y-4">
          {data.education.map((edu) => (
            <div key={edu.id} className="border-l-4 border-purple-500 pl-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {edu.degree}
              </h3>
              <h4 className="text-md font-medium text-gray-700">
                {edu.institution} • {edu.startDate} - {edu.endDate}
              </h4>
              {edu.description && (
                <p className="text-gray-700 text-sm mt-1">{edu.description}</p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Courses & Certifications - ATS Optimized Single Column */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 border-b-2 border-gray-300 pb-2">
          Courses & Certifications
        </h2>
        <div className="space-y-4">
          {data.courses.map((course) => (
            <div key={course.id} className="border-l-4 border-orange-500 pl-4">
              <h3 className="text-lg font-semibold text-gray-900">{course.name}</h3>
              <h4 className="text-md font-medium text-gray-700">{course.provider}</h4>
              <p className="text-sm text-gray-600">Completed: {course.completedDate}</p>
              {course.description && (
                <p className="text-gray-700 text-sm mt-1">{course.description}</p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Languages - ATS Optimized Single Column */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 border-b-2 border-gray-300 pb-2">
          Languages
        </h2>
        <div className="space-y-2">
          {data.languages.map((language) => (
            <div key={language.id} className="flex items-center">
              <span className="font-semibold text-gray-900 mr-2">{language.name}:</span>
              <span className="text-gray-600">{language.level}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
} 