import React from 'react';
import { Code, Brain, Palette } from 'lucide-react';

const About = () => {
  const highlights = [
    {
      icon: <Code className="text-green-400" size={32} />,
      title: "Full Stack Development",
      description: "Experienced in building end-to-end applications using modern technologies like React, Python, and Go."
    },
    {
      icon: <Brain className="text-blue-400" size={32} />,
      title: "AI & Machine Learning",
      description: "Passionate about implementing AI solutions and machine learning models for real-world problems."
    },
    {
      icon: <Palette className="text-violet-400" size={32} />,
      title: "UI/UX Design",
      description: "Creating intuitive and visually appealing user interfaces with tools like Figma and Sketch."
    }
  ];

  return (
    <section id="about" className="py-20 bg-slate-700">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-16">
          <span className="bg-gradient-to-r from-blue-400 to-violet-500 bg-clip-text text-transparent">
            About Me
          </span>
        </h2>

        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-lg text-slate-300 leading-relaxed mb-8">
              I'm a dedicated Computer Science student specializing in Artificial Intelligence and Machine Learning, 
              with a passion for creating innovative digital solutions. My journey in technology spans across 
              full-stack development, AI implementation, and user experience design.
            </p>
            <p className="text-lg text-slate-300 leading-relaxed">
              I believe in the power of technology to solve complex problems and improve lives. Through my projects, 
              I strive to combine technical excellence with thoughtful design to create meaningful user experiences.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {highlights.map((item, index) => (
              <div 
                key={index}
                className="bg-slate-600 p-6 rounded-xl border border-slate-500 hover:border-green-400/50 transition-all duration-300 transform hover:scale-105"
              >
                <div className="mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold mb-3 text-blue-400">{item.title}</h3>
                <p className="text-slate-300 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;