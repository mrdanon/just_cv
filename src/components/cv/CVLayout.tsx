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
      className="cv-container max-w-4xl mx-auto p-8 bg-white text-black shadow-lg"
      style={{ fontFamily: 'Arial, Helvetica, sans-serif' }}
    >
      {/* Header Section - Modern Design with Gradient */}
      <header className="mb-8 bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 text-white p-6 rounded-lg shadow-lg">
        <div className="flex flex-col md:flex-row items-center gap-6">
          {/* Professional Photo - Fixed for PDF */}
          <div className="flex-shrink-0">
            <div className="photo-container w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
              <Image
                src={data.personalInfo.photo}
                alt={`${data.personalInfo.name} - Professional Photo`}
                width={128}
                height={128}
                className="w-full h-full object-cover"
                priority
                quality={95}
                unoptimized={true}
                onError={(e) => {
                  console.error('Image failed to load:', e);
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
            </div>
          </div>
          
          {/* Personal Information - Modern Layout */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl font-bold mb-2 text-white">
              {data.personalInfo.name}
            </h1>
            <h2 className="text-xl font-semibold mb-4 text-blue-100">
              {data.personalInfo.title}
            </h2>
            
            {/* Contact Information - Modern Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-2 text-sm">
                <div className="font-medium text-blue-100">Email</div>
                <div className="text-white">{data.personalInfo.email}</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-2 text-sm">
                <div className="font-medium text-blue-100">Phone</div>
                <div className="text-white">{data.personalInfo.phone}</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-2 text-sm">
                <div className="font-medium text-blue-100">Location</div>
                <div className="text-white">{data.personalInfo.location}</div>
              </div>
            </div>
            
            {/* Professional Links - Modern Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs">
              <div className="bg-white/15 backdrop-blur-sm rounded p-1">
                <span className="font-medium text-blue-100">Portfolio:</span>
                <br />
                <span className="text-white">{data.personalInfo.links.portfolio}</span>
              </div>
              <div className="bg-white/15 backdrop-blur-sm rounded p-1">
                <span className="font-medium text-blue-100">LinkedIn:</span>
                <br />
                <span className="text-white">{data.personalInfo.links.linkedin}</span>
              </div>
              <div className="bg-white/15 backdrop-blur-sm rounded p-1">
                <span className="font-medium text-blue-100">GitHub:</span>
                <br />
                <span className="text-white">{data.personalInfo.links.github}</span>
              </div>
              <div className="bg-white/15 backdrop-blur-sm rounded p-1">
                <span className="font-medium text-blue-100">YouTube:</span>
                <br />
                <span className="text-white">{data.personalInfo.links.youtube}</span>
              </div>
              <div className="bg-white/15 backdrop-blur-sm rounded p-1">
                <span className="font-medium text-blue-100">Instagram:</span>
                <br />
                <span className="text-white">{data.personalInfo.links.instagram}</span>
              </div>
              <div className="bg-white/15 backdrop-blur-sm rounded p-1">
                <span className="font-medium text-blue-100">ArtStation:</span>
                <br />
                <span className="text-white">{data.personalInfo.links.artstation}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Professional Summary - Modern Card */}
      <section className="mb-8">
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 border-l-4 border-blue-500">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 flex items-center gap-2">
            <span className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">S</span>
            Professional Summary
          </h2>
          <p className="text-gray-700 leading-relaxed text-lg">
            {data.personalInfo.summary}
          </p>
        </div>
      </section>

      {/* Work Experience - Modern Cards */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 flex items-center gap-2">
          <span className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">W</span>
          Work Experience
        </h2>
        <div className="space-y-6">
          {data.workExperience.map((job, index) => (
            <div key={job.id} className="bg-gradient-to-r from-green-50 to-teal-50 rounded-lg p-6 border-l-4 border-green-500 shadow-sm">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {job.position}
                  </h3>
                  <h4 className="text-lg font-medium text-gray-700 mb-2">
                    {job.company}
                  </h4>
                </div>
                <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                  {job.startDate} - {job.endDate}
                </div>
              </div>
              
              {/* Responsibilities */}
              <div className="mb-4">
                <h5 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                  <span className="w-4 h-4 bg-blue-400 rounded-full"></span>
                  Key Responsibilities:
                </h5>
                <ul className="list-disc list-inside space-y-1 text-gray-700 ml-6">
                  {job.responsibilities.map((responsibility, index) => (
                    <li key={index}>{responsibility}</li>
                  ))}
                </ul>
              </div>
              
              {/* Achievements */}
              <div>
                <h5 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                  <span className="w-4 h-4 bg-gold-400 rounded-full bg-yellow-400"></span>
                  Key Achievements:
                </h5>
                <ul className="list-disc list-inside space-y-1 text-gray-700 ml-6">
                  {job.achievements.map((achievement, index) => (
                    <li key={index}>{achievement}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Skills Section - Modern Grid */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 flex items-center gap-2">
          <span className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">S</span>
          Technical Skills
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.skills.map((category, index) => (
            <div key={category.id} className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6 border-l-4 border-purple-500">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-6 h-6 bg-purple-400 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {category.category.charAt(0)}
                </span>
                {category.category}
              </h3>
              <div className="space-y-2">
                {category.skills.map((skill, index) => (
                  <div key={index} className="flex items-center justify-between bg-white/50 rounded p-2">
                    <span className="font-medium text-gray-900">{skill.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-600 text-sm">{skill.level}</span>
                      {skill.years && (
                        <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs">
                          {skill.years}y
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Projects Section - Modern Cards */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 flex items-center gap-2">
          <span className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold">P</span>
          Key Projects
        </h2>
        <div className="space-y-6">
          {data.projects.map((project, index) => (
            <div key={project.id} className="bg-gradient-to-r from-orange-50 to-red-50 rounded-lg p-6 border-l-4 border-orange-500 shadow-sm">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-900">
                  {project.name}
                </h3>
                <div className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
                  {project.startDate} - {project.endDate || 'Present'}
                </div>
              </div>
              
              <p className="text-gray-700 mb-4">{project.description}</p>
              
              <div className="mb-4">
                <h5 className="font-semibold text-gray-800 mb-2">Technologies:</h5>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, techIndex) => (
                    <span key={techIndex} className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-sm">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <h5 className="font-semibold text-gray-800 mb-2">Achievements:</h5>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  {project.achievements.map((achievement, index) => (
                    <li key={index}>{achievement}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Education Section - Modern Cards */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 flex items-center gap-2">
          <span className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold">E</span>
          Education
        </h2>
        <div className="space-y-4">
          {data.education.map((edu, index) => (
            <div key={edu.id} className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg p-6 border-l-4 border-indigo-500">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {edu.degree}
                  </h3>
                  <h4 className="text-md font-medium text-gray-700">
                    {edu.institution}
                  </h4>
                </div>
                <div className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium">
                  {edu.startDate} - {edu.endDate}
                </div>
              </div>
              {edu.description && (
                <p className="text-gray-700 text-sm mt-2">{edu.description}</p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Courses & Certifications - Modern Grid */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 flex items-center gap-2">
          <span className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center text-white font-bold">C</span>
          Courses & Certifications
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.courses.map((course, index) => (
            <div key={course.id} className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-lg p-4 border-l-4 border-teal-500">
              <h3 className="text-lg font-semibold text-gray-900">{course.name}</h3>
              <h4 className="text-md font-medium text-gray-700">{course.provider}</h4>
              <div className="bg-teal-100 text-teal-800 px-2 py-1 rounded-full text-xs font-medium inline-block mt-2">
                Completed: {course.completedDate}
              </div>
              {course.description && (
                <p className="text-gray-700 text-sm mt-2">{course.description}</p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Languages - Modern Cards */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 flex items-center gap-2">
          <span className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center text-white font-bold">L</span>
          Languages
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.languages.map((language, index) => (
            <div key={language.id} className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-lg p-4 border-l-4 border-pink-500">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-gray-900">{language.name}</span>
                <span className="bg-pink-100 text-pink-800 px-2 py-1 rounded-full text-sm font-medium">
                  {language.level}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
} 