import React from 'react';
import { ChevronDown, Github, Linkedin, Mail } from 'lucide-react';

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-green-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-1/3 w-48 h-48 bg-violet-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            <span className="bg-gradient-to-r from-green-400 via-blue-500 to-violet-500 bg-clip-text text-transparent">
              Varshini Siliveri
            </span>
          </h1>
          
          <h2 className="text-2xl md:text-3xl text-slate-300 mb-8 animate-fade-in-delay-1">
            AI & Machine Learning Enthusiast
          </h2>
          
          <p className="text-lg md:text-xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed animate-fade-in-delay-2">
            Passionate about creating innovative solutions that bridge the gap between artificial intelligence 
            and user-centric design. Completed BTech in Computer Science and Engineering with a specialization in AI & ML.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fade-in-delay-3">
            <a
              href="#projects"
              className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg text-white"
            >
              View My Work
            </a>
            <a
              href="#contact"
              className="border border-green-500 text-green-400 hover:bg-green-500 hover:text-slate-900 px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105"
            >
              Get In Touch
            </a>
          </div>

          <div className="flex justify-center gap-6 animate-fade-in-delay-4">
            <a href="https://github.com/varshini0128" target="_blank"
  rel="noopener noreferrer"className="text-slate-400 hover:text-green-400 transition-colors duration-300 transform hover:scale-110">
              <Github size={24} />
            </a>
            <a href="https://www.linkedin.com/in/varshininetha" target="_blank"
  rel="noopener noreferrer" className="text-slate-400 hover:text-green-400 transition-colors duration-300 transform hover:scale-110">
               
              <Linkedin size={24} />
            </a>
            <a href="mailto:varshinisiliveri22@gmail.com" target="_blank"
  rel="noopener noreferrer" className="text-slate-400 hover:text-green-400 transition-colors duration-300 transform hover:scale-110">
              
              <Mail size={24} />
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown className="text-green-400" size={32} />
      </div>
    </section>
  );
};

export default Hero;