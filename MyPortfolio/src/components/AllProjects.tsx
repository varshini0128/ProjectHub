import React from 'react';
import { ArrowLeft, ExternalLink, Github } from 'lucide-react';

interface AllProjectsProps {
  onBack: () => void;
}

const AllProjects: React.FC<AllProjectsProps> = ({ onBack }) => {
  const allProjects = [
    {
      title: "Job Board Platform",
      description: "A comprehensive job board application connecting employers with job seekers. Features include job posting, application tracking, user authentication, real-time notifications, and advanced search filters.",
      tech: ["React", "Node.js"],
      category: "Full Stack Web Application",
      gradient: "from-blue-500 to-green-500",
      featured: true,
      codeUrl: "https://github.com/varshini0128/ProjectHub/tree/main/JobBOARD/project",
      demoUrl: "https://jobboarddd.netlify.app/"
    },
    {
      title: "Twitter Sentiment Analysis",
      description: "Machine learning project analyzing Twitter data to determine sentiment patterns. Uses natural language processing and advanced ML algorithms to classify tweets and provide insights into public opinion trends.",
      tech: ["Python", "TensorFlow", "NLP", "Data Analysis", "Pandas", "Scikit-learn"],
      category: "Machine Learning Project",
      gradient: "from-green-500 to-violet-500",
      featured: true,
      codeUrl: "https://github.com/varshini0128/ProjectHub/tree/main/SentimentScope/project",
      demoUrl: "https://sentimentscope.netlify.app/"
    },
    {
      title: "Currency Converter",
      description: "Real-time currency conversion application with live exchange rates, historical data visualization, and support for multiple currencies worldwide. Features interactive charts and rate alerts.",
      tech: ["React", "HTML5", "CSS3","JavaScript", "REST APIs"],
      category: "API Integration Project",
      gradient: "from-blue-500 to-green-500",
      featured: false,
      codeUrl: "https://github.com/varshini0128/ProjectHub/tree/main/CurrencyConverterCalculator",
      demoUrl: "https://currency-convertor-calculator.netlify.app/"
    },
    {
      title: "MyQuiz Interactive Platform",
      description: "An engaging quiz application with real-time scoring, multiple categories, progress tracking, and leaderboards. Built with modern web technologies for optimal user experience and responsive design.",
      tech: ["React", "JavaScript", "CSS3", "Local Storage", "Progressive Web App"],
      category: "Frontend Application",
      gradient: "from-green-500 to-blue-500",
      featured: false,
      codeUrl: "https://github.com/varshini0128/ProjectHub/tree/main/MYQuiz",
      demoUrl: "https://quizbizzz.netlify.app/"
    },
    {
      title: "Data Securing using Blockchain & AI",
      description: "Advanced security system combining blockchain technology with AI algorithms to ensure data integrity and protection against cyber threats. Implements smart contracts for secure data storage and AI-powered threat detection.",
      tech: ["Python", "Blockchain", "AI/ML", "Cryptography", "Smart Contracts"],
      category: "Blockchain & AI Project",
      gradient: "from-violet-500 to-blue-500",
      featured: true,
      codeUrl: "https://github.com/varshini0128/ProjectHub/tree/main/DataSecurity",
      demoUrl: "https://drive.google.com/file/d/1Cuy67ZxwZshbRz1C6Lo55hSeNWnHAiQ9/view?usp=drive_link" 
        },
  ];

  return (
    <section className="py-20 bg-slate-800 min-h-screen">
      <div className="container mx-auto px-6">
        {/* Header with back button */}
        <div className="flex items-center mb-12">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-slate-400 hover:text-green-400 transition-colors duration-300 mr-6"
          >
            <ArrowLeft size={20} />
            <span>Back to Home</span>
          </button>
          <h1 className="text-4xl font-bold">
            <span className="bg-gradient-to-r from-violet-400 to-green-500 bg-clip-text text-transparent">
              All Projects
            </span>
          </h1>
        </div>

        {/* Projects grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {allProjects.map((project, index) => (
            <div 
              key={index}
              className={`bg-slate-600 rounded-xl border border-slate-500 hover:border-green-400/50 transition-all duration-300 transform hover:scale-105 group overflow-hidden ${
                project.featured ? 'lg:col-span-1' : ''
              }`}
            >
              {/* Project header with gradient */}
              <div className={`h-2 bg-gradient-to-r ${project.gradient}`}></div>
              
              <div className="p-6">
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs uppercase tracking-wide text-slate-400 font-medium">
                      {project.category}
                    </span>
                    {project.featured && (
                      <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full border border-green-500/30">
                        Featured
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-blue-400 group-hover:text-green-400 transition-colors duration-300">
                    {project.title}
                  </h3>
                </div>

                <p className="text-slate-300 mb-6 leading-relaxed">
                  {project.description}
                </p>

                <div className="mb-6">
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, techIndex) => (
                      <span 
                        key={techIndex}
                        className="px-3 py-1 bg-slate-500 text-green-400 text-sm rounded-full border border-slate-400"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4">
                  <a
                    href={project.codeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-slate-400 hover:text-green-400 transition-colors duration-300"
                  >
                    <Github size={16} />
                    <span className="text-sm">View Code</span>
                  </a>
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-slate-400 hover:text-green-400 transition-colors duration-300"
                    >
                      <ExternalLink size={16} />
                      <span className="text-sm">Live Demo</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional info */}
        <div className="mt-16 text-center">
          <div className="bg-slate-600 rounded-xl border border-slate-500 p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-semibold text-blue-400 mb-4">More Projects Coming Soon</h3>
            <p className="text-slate-300 leading-relaxed">
              I'm constantly working on new projects and exploring emerging technologies. 
              Stay tuned for more innovative solutions in AI, blockchain, and web development.
            </p>
            <button
              onClick={onBack}
              className="mt-6 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-400 hover:to-blue-400 text-white px-6 py-3 rounded-full transition-all duration-300 transform hover:scale-105"
            >
              Get In Touch
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AllProjects;
