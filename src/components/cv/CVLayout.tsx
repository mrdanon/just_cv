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
      {/* Header Section */}
      <header className="border-b-2 border-gray-300 pb-6 mb-8">
        <div className="flex items-start gap-6">
          {/* Professional Photo */}
          <div className="flex-shrink-0">
            <div className="w-24 h-24 rounded-lg overflow-hidden border-2 border-gray-300">
              <Image
                src={data.personalInfo.photo}
                alt={`${data.personalInfo.name} - Professional Photo`}
                width={96}
                height={96}
                className="w-full h-full object-cover"
                priority
                unoptimized={true}
              />
            </div>
          </div>
          
          {/* Personal Information */}
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-black mb-2">
              {data.personalInfo.name.toUpperCase()}
            </h1>
            <h2 className="text-lg text-blue-600 font-semibold mb-4">
              {data.personalInfo.title}
            </h2>
            
            {/* Contact Information */}
            <div className="text-sm text-gray-700 space-y-1">
              <div>📞 {data.personalInfo.phone}</div>
              <div>✉️ {data.personalInfo.email}</div>
              <div>🔗 {data.personalInfo.links.linkedin}</div>
              <div>📍 {data.personalInfo.location}</div>
            </div>
          </div>
          
          {/* Profile Circle */}
          <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
            PD
          </div>
        </div>
      </header>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Experience Section */}
          <section>
            <h2 className="text-xl font-bold text-black mb-4 pb-2 border-b border-gray-300">
              EXPERIENCE
            </h2>
            
            <div className="space-y-6">
              {data.workExperience.map((job) => (
                <div key={job.id}>
                  <h3 className="font-bold text-black">{job.position}</h3>
                  <h4 className="text-blue-600 font-semibold">{job.company}</h4>
                  <p className="text-sm text-gray-600 mb-2">
                    📅 {job.startDate} - {job.endDate} 📍 Location
                  </p>
                  
                  <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                    {job.responsibilities.map((responsibility, index) => (
                      <li key={index}>{responsibility}</li>
                    ))}
                    {job.achievements.map((achievement, index) => (
                      <li key={index} className="font-medium">{achievement}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Education/Training Section */}
          <section>
            <h2 className="text-xl font-bold text-black mb-4 pb-2 border-b border-gray-300">
              TRAINING / COURSES
            </h2>
            
            <div className="space-y-4">
              {data.courses.map((course) => (
                <div key={course.id}>
                  <h3 className="font-bold text-blue-600">{course.name}</h3>
                  <p className="text-sm text-gray-700">{course.provider}</p>
                </div>
              ))}
              
              {data.education.map((edu) => (
                <div key={edu.id}>
                  <h3 className="font-bold text-blue-600">{edu.degree}</h3>
                  <p className="text-sm text-gray-700">{edu.institution}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          
          {/* Summary Section */}
          <section>
            <h2 className="text-xl font-bold text-black mb-4 pb-2 border-b border-gray-300">
              SUMMARY
            </h2>
            <p className="text-sm text-gray-700 leading-relaxed">
              {data.personalInfo.summary}
            </p>
          </section>

          {/* Languages Section */}
          <section>
            <h2 className="text-xl font-bold text-black mb-4 pb-2 border-b border-gray-300">
              LANGUAGES
            </h2>
            
            <div className="space-y-3">
              {data.languages.map((language) => (
                <div key={language.id}>
                  <h3 className="font-bold text-black">{language.name}</h3>
                  <p className="text-sm text-gray-600">{language.level}</p>
                  {/* Visual level indicator */}
                                     <div className="flex space-x-1 mt-1">
                     {[1,2,3,4,5].map((level) => (
                       <div 
                         key={level}
                         className={`w-4 h-2 rounded ${
                           level <= (language.level === 'Native' ? 5 : language.level === 'Fluent' ? 4 : language.level === 'Conversational' ? 3 : 2) 
                             ? 'bg-blue-500' : 'bg-gray-300'
                         }`}
                       />
                     ))}
                   </div>
                </div>
              ))}
            </div>
          </section>

          {/* Skills Section */}
          <section>
            <h2 className="text-xl font-bold text-black mb-4 pb-2 border-b border-gray-300">
              SKILLS
            </h2>
            
            <div className="space-y-4">
              {data.skills.map((category) => (
                <div key={category.id}>
                  <h3 className="font-bold text-black text-sm mb-2">{category.category}</h3>
                  <div className="space-y-2">
                    {category.skills.map((skill, index) => (
                      <div key={index} className="text-sm">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-700">{skill.name}</span>
                          <span className="text-xs text-gray-500">{skill.level}</span>
                        </div>
                        {/* Skill level bar */}
                        <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                          <div 
                            className="bg-blue-500 h-1.5 rounded-full" 
                            style={{
                              width: skill.level === 'Expert' ? '90%' : 
                                     skill.level === 'Advanced' ? '75%' : 
                                     skill.level === 'Intermediate' ? '60%' : '40%'
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
        </div>
      </div>
    </div>
  );
} 