import React from 'react';
import { Heart, Code } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-200 py-8">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center gap-2 text-slate-400 mb-4 md:mb-0">
            <span>Made with</span>
            <Heart className="text-red-400" size={16} fill="currentColor" />
            <span>and</span>
            <Code className="text-green-400" size={16} />
            <span>by Varshini Siliveri</span>
          </div>
          
          <div className="text-slate-400 text-sm">
            © {new Date().getFullYear()} Portfolio. All rights reserved.
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-slate-700 text-center">
          <p className="text-slate-500 text-sm">
            Built with React, TypeScript, and Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;