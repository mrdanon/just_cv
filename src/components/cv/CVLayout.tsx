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
      className="cv-container max-w-5xl mx-auto bg-gray-50 min-h-screen"
      style={{ fontFamily: 'Inter, Arial, Helvetica, sans-serif' }}
    >
      {/* Modern Header with Gradient */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800"></div>
        <div className="relative z-10 px-8 py-12">
          <div className="flex items-center gap-8">
            {/* Professional Photo with Modern Frame */}
            <div className="flex-shrink-0">
              <div className="relative">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-2xl">
                  <Image
                    src={data.personalInfo.photo}
                    alt={`${data.personalInfo.name} - Professional Photo`}
                    width={128}
                    height={128}
                    className="w-full h-full object-cover"
                    priority
                    unoptimized={true}
                  />
                </div>
                <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center text-blue-900 font-bold text-sm shadow-lg">
                  PD
                </div>
              </div>
            </div>
            
            {/* Personal Information */}
            <div className="flex-1 text-white">
              <h1 className="text-4xl font-bold mb-2 tracking-wide">
                {data.personalInfo.name.toUpperCase()}
              </h1>
              <h2 className="text-xl font-light mb-6 text-blue-100">
                {data.personalInfo.title}
              </h2>
              
              {/* Contact Information - Modern Cards */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-3">
                  <div className="text-blue-100 text-sm">📞 Phone</div>
                  <div className="font-medium">{data.personalInfo.phone}</div>
                </div>
                <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-3">
                  <div className="text-blue-100 text-sm">✉️ Email</div>
                  <div className="font-medium">{data.personalInfo.email}</div>
                </div>
                <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-3">
                  <div className="text-blue-100 text-sm">🔗 LinkedIn</div>
                  <div className="font-medium text-sm">{data.personalInfo.links.linkedin}</div>
                </div>
                <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-3">
                  <div className="text-blue-100 text-sm">📍 Location</div>
                  <div className="font-medium">{data.personalInfo.location}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Professional Summary */}
            <section className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">S</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Professional Summary</h2>
              </div>
              <p className="text-gray-700 leading-relaxed text-lg">
                {data.personalInfo.summary}
              </p>
            </section>

            {/* Experience Section */}
            <section className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">E</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Professional Experience</h2>
              </div>
              
              <div className="space-y-8">
                {data.workExperience.map((job, index) => (
                  <div key={job.id} className="relative">
                    {index !== data.workExperience.length - 1 && (
                      <div className="absolute left-4 top-16 bottom-0 w-0.5 bg-gradient-to-b from-blue-400 to-purple-400"></div>
                    )}
                    
                    <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg p-6 ml-8 relative">
                      <div className="absolute -left-10 top-6 w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-bold">{index + 1}</span>
                      </div>
                      
                      <h3 className="text-xl font-bold text-gray-800 mb-1">{job.position}</h3>
                      <h4 className="text-lg font-semibold text-blue-600 mb-2">{job.company}</h4>
                      <p className="text-sm text-gray-600 mb-4 font-medium">
                        📅 {job.startDate} - {job.endDate}
                      </p>
                      
                      <div className="space-y-2">
                        <h5 className="font-semibold text-gray-700">Key Responsibilities:</h5>
                        <ul className="grid grid-cols-1 gap-2">
                          {job.responsibilities.map((responsibility, i) => (
                            <li key={i} className="flex items-start gap-2 text-gray-700">
                              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                              <span className="text-sm">{responsibility}</span>
                            </li>
                          ))}
                        </ul>
                        
                        {job.achievements.length > 0 && (
                          <>
                            <h5 className="font-semibold text-gray-700 mt-4">Key Achievements:</h5>
                            <ul className="grid grid-cols-1 gap-2">
                              {job.achievements.map((achievement, i) => (
                                <li key={i} className="flex items-start gap-2 text-gray-700">
                                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                                  <span className="text-sm font-medium">{achievement}</span>
                                </li>
                              ))}
                            </ul>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            
            {/* Skills Section */}
            <section className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">S</span>
                </div>
                <h2 className="text-xl font-bold text-gray-800">Skills</h2>
              </div>
              
              <div className="space-y-6">
                {data.skills.map((category) => (
                  <div key={category.id}>
                    <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                      <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                      {category.category}
                    </h3>
                    <div className="space-y-3">
                      {category.skills.map((skill, index) => (
                        <div key={index} className="bg-gray-50 rounded-lg p-3">
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-medium text-gray-700">{skill.name}</span>
                            <span className="text-xs font-semibold text-purple-600 bg-purple-100 px-2 py-1 rounded-full">
                              {skill.level}
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300" 
                              style={{
                                width: skill.level === 'Expert' ? '95%' : 
                                       skill.level === 'Advanced' ? '80%' : 
                                       skill.level === 'Intermediate' ? '65%' : '45%'
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Languages Section */}
            <section className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-orange-500">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">L</span>
                </div>
                <h2 className="text-xl font-bold text-gray-800">Languages</h2>
              </div>
              
              <div className="space-y-4">
                {data.languages.map((language) => (
                  <div key={language.id} className="bg-gradient-to-r from-orange-50 to-red-50 rounded-lg p-4">
                    <h3 className="font-bold text-gray-800 mb-1">{language.name}</h3>
                    <p className="text-sm text-gray-600 mb-3">{language.level}</p>
                    <div className="flex space-x-1">
                      {[1,2,3,4,5].map((level) => (
                        <div 
                          key={level}
                          className={`w-6 h-2 rounded-full ${
                            level <= (language.level === 'Native' ? 5 : 
                                     language.level === 'Fluent' ? 4 : 
                                     language.level === 'Conversational' ? 3 : 2) 
                              ? 'bg-gradient-to-r from-orange-400 to-red-400' : 'bg-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Education & Training */}
            <section className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-teal-500">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">E</span>
                </div>
                <h2 className="text-xl font-bold text-gray-800">Education & Training</h2>
              </div>
              
              <div className="space-y-4">
                                 {data.education.map((edu) => (
                   <div key={edu.id} className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-lg p-4">
                     <h3 className="font-bold text-teal-700">{edu.degree}</h3>
                     <p className="text-sm text-gray-600">{edu.institution}</p>
                   </div>
                 ))}
                 
                 {data.courses.map((course) => (
                   <div key={course.id} className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-lg p-4">
                     <h3 className="font-bold text-teal-700">{course.name}</h3>
                     <p className="text-sm text-gray-600">{course.provider}</p>
                   </div>
                 ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
} 