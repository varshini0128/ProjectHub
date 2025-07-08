import React from 'react';

const Skills = () => {
  const skills = [
    { name: 'Figma', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' },
    { name: 'Sketch', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sketch/sketch-original.svg' },
    { name: 'Python', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
    { name: 'React', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
    { name: 'HTML5', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
    { name: 'CSS3', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
    { name: 'JavaScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
    { name: 'Go', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg' },
    { name: 'Node.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
    { name: 'MongoDB', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
    { name: 'Git', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
    { name: 'Docker', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
    { name: 'TensorFlow', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg' }
  ];

  // Double the array for seamless infinite scroll
  const scrollingSkills = [...skills, ...skills];

  return (
    <section id="skills" className="py-20 bg-slate-800">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-16">
          <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
            Technical Skills
          </span>
        </h2>

        <div className="mb-12">
          <h3 className="text-2xl font-semibold text-center mb-8 text-slate-300">
            Technologies & Tools
          </h3>
          
          {/* Scrolling logos container */}
          <div className="relative overflow-hidden">
            <div className="flex animate-scroll gap-12 whitespace-nowrap">
              {scrollingSkills.map((skill, index) => (
                <div 
                  key={index}
                  className="flex flex-col items-center justify-center min-w-[120px] group"
                >
                  <div className="w-16 h-16 mb-3 flex items-center justify-center bg-slate-600 rounded-xl border border-slate-500 group-hover:border-green-400/50 group-hover:bg-slate-500 transition-all duration-300 transform group-hover:scale-110">
                    <img 
                      src={skill.logo} 
                      alt={skill.name}
                      className="w-10 h-10 object-contain"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>
                  <span className="text-sm text-slate-400 group-hover:text-green-400 transition-colors duration-300 font-medium">
                    {skill.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-slate-600 p-6 rounded-xl border border-slate-500">
              <h3 className="text-xl font-semibold mb-4 text-green-400">Frontend Development</h3>
              <ul className="space-y-2 text-slate-300">
                <li>• React.js & Modern JavaScript (ES6+)</li>
                <li>• HTML5, CSS3, Tailwind CSS</li>
                <li>• Responsive Web Design</li>
                <li>• UI/UX Design with Figma & Sketch</li>
              </ul>
            </div>

            <div className="bg-slate-600 p-6 rounded-xl border border-slate-500">
              <h3 className="text-xl font-semibold mb-4 text-blue-400">Backend & AI/ML</h3>
              <ul className="space-y-2 text-slate-300">
                <li>• Python, Go Programming</li>
                <li>• Machine Learning & AI Implementation</li>
                <li>• Data Analysis & Blockchain Technology</li>
                <li>• RESTful APIs & Database Design</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;