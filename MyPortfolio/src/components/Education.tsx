import React from 'react';
import { GraduationCap, Award, Calendar } from 'lucide-react';

const Education = () => {
  const education = [
    {
      degree: "BTech Computer Science Engineering (AI & ML)",
      institution: "Sri Indu Institute of Engineering and Technology",
      period: "2021 - 2025",
      score: "CGPA: 7.0/10",
      description: "Specializing in Artificial Intelligence and Machine Learning with focus on practical applications and research.",
      status: "current"
    },
    {
      degree: "Intermediate (12th Grade)",
      institution: "Narayana Junior College",
      period: "2019 - 2021",
      score: "968/1000 Marks",
      description: "Completed with distinction in Mathematics, Physics, and Chemistry stream.",
      status: "completed"
    },
    {
      degree: "Secondary School Certificate (10th Grade)",
      institution: "Bhashyam High School",
      period: "2018 - 2019",
      score: "CGPA: 9.8/10",
      description: "Achieved excellent academic performance with strong foundation in core subjects.",
      status: "completed"
    }
  ];

  return (
    <section id="education" className="py-20 bg-slate-800">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-16">
          <span className="bg-gradient-to-r from-blue-400 to-green-500 bg-clip-text text-transparent">
            Education
          </span>
        </h2>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            {education.map((edu, index) => (
              <div 
                key={index}
                className="relative bg-slate-600 rounded-xl border border-slate-500 hover:border-green-400/50 transition-all duration-300 p-6 group"
              >
                {/* Status indicator */}
                <div className={`absolute top-6 right-6 px-3 py-1 rounded-full text-xs font-medium ${
                  edu.status === 'current' 
                    ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                    : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                }`}>
                  {edu.status === 'current' ? 'Current' : 'Completed'}
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-violet-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <GraduationCap className="text-white" size={24} />
                    </div>
                  </div>

                  <div className="flex-grow">
                    <h3 className="text-xl font-bold text-blue-400 mb-2 group-hover:text-green-400 transition-colors duration-300">
                      {edu.degree}
                    </h3>
                    
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 mb-3">
                      <div className="flex items-center gap-2 text-slate-300">
                        <GraduationCap size={16} className="text-blue-400" />
                        <span className="font-medium">{edu.institution}</span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-slate-400">
                        <Calendar size={16} className="text-green-400" />
                        <span>{edu.period}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mb-4">
                      <Award size={16} className="text-green-400" />
                      <span className="text-green-400 font-semibold">{edu.score}</span>
                    </div>

                    <p className="text-slate-300 leading-relaxed">
                      {edu.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Additional achievements */}
          <div className="mt-12 bg-gradient-to-r from-slate-600 to-slate-700 rounded-xl border border-slate-500 p-6">
            <h3 className="text-xl font-semibold text-blue-400 mb-4 flex items-center gap-2">
              <Award className="text-green-400" size={20} />
              Academic Highlights
            </h3>
            <div className="grid md:grid-cols-2 gap-4 text-slate-300">
              <div>
                • Strong academic performance with consistent high grades
              </div>
              <div>
                • Specialized focus on AI & Machine Learning technologies
              </div>
              <div>
                • Active participation in coding competitions and hackathons
              </div>
              <div>
                • Completed multiple industry-relevant projects
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;