import React from 'react';
import { ExternalLink, Github } from 'lucide-react';

interface ProjectsProps {
  onViewAll: () => void;
}

const Projects: React.FC<ProjectsProps> = ({ onViewAll }) => {
  const projects = [
    {
      title: "Data Securing using Blockchain & AI",
      description:
        "Advanced security system combining blockchain technology with AI algorithms to ensure data integrity and protection against cyber threats.",
      tech: ["Python", "Blockchain", "AI/ML", "Cryptography"],
      category: "Blockchain & AI Project",
      gradient: "from-violet-500 to-blue-500",
      codeUrl: "https://github.com/varshini0128/ProjectHub/tree/main/DataSecurity",
      demoUrl: "https://drive.google.com/file/d/1Cuy67ZxwZshbRz1C6Lo55hSeNWnHAiQ9/view?usp=drive_link" // You said you'll add this later
    },
    {
      title: "Job Board Platform",
      description:
        "A comprehensive job board application connecting employers with job seekers. Features include job posting, application tracking, and user authentication.",
      tech: ["React", "Node.js", "MongoDB", "Express"],
      category: "Full Stack Web Application",
      gradient: "from-blue-500 to-green-500",
      codeUrl: "https://github.com/varshini0128/ProjectHub/tree/main/JobBOARD/project",
      demoUrl: "https://jobboarddd.netlify.app/"
    },
    {
      title: "Twitter Sentiment Analysis",
      description:
        "Machine learning project analyzing Twitter data to determine sentiment patterns. Uses natural language processing and advanced ML algorithms.",
      tech: ["Python", "TensorFlow", "NLP", "Data Analysis"],
      category: "Machine Learning Project",
      gradient: "from-green-500 to-violet-500",
      codeUrl: "https://github.com/varshini0128/ProjectHub/tree/main/SentimentScope/project",
      demoUrl: "https://sentimentscope.netlify.app/"
    }
  ];

  return (
    <section id="projects" className="py-20 bg-slate-700">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-16">
          <span className="bg-gradient-to-r from-violet-400 to-green-500 bg-clip-text text-transparent">
            Featured Projects
          </span>
        </h2>

        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-slate-600 rounded-xl border border-slate-500 hover:border-green-400/50 transition-all duration-300 transform hover:scale-105 group overflow-hidden"
            >
              {/* Project header with gradient */}
              <div className={`h-2 bg-gradient-to-r ${project.gradient}`}></div>

              <div className="p-6">
                <div className="mb-4">
                  <span className="text-xs uppercase tracking-wide text-slate-400 font-medium">
                    {project.category}
                  </span>
                  <h3 className="text-xl font-bold text-blue-400 mt-1 group-hover:text-green-400 transition-colors duration-300">
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
                    <span className="text-sm">Code</span>
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

        <div className="text-center mt-12">
          <button
            onClick={onViewAll}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-400 hover:to-violet-400 text-white px-6 py-3 rounded-full transition-all duration-300 transform hover:scale-105"
          >
            <span>View All Projects</span>
            <ExternalLink size={16} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Projects;
