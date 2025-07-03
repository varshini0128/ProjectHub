import React from 'react';
import { BarChart3 } from 'lucide-react';

interface FooterProps {
  onViewChange?: (view: 'home' | 'analyze' | 'dashboard' | 'about') => void;
}

const Footer: React.FC<FooterProps> = ({ onViewChange }) => {
  const handleNavigation = (view: 'home' | 'analyze' | 'dashboard' | 'about') => {
    if (onViewChange) {
      onViewChange(view);
    }
  };

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-gradient-to-r from-blue-600 to-teal-600 rounded-lg">
                <BarChart3 className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">SentimentScope</h3>
                <p className="text-gray-400 text-sm">Twitter ML Analysis</p>
              </div>
            </div>
            <p className="text-gray-400 leading-relaxed mb-6 max-w-md">
              Advanced machine learning platform for social media sentiment analysis. 
              Decode public opinion and trends with state-of-the-art AI technology.
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Navigation</h4>
            <ul className="space-y-2">
              {[
                { label: 'Home', view: 'home' as const },
                { label: 'Analyze', view: 'analyze' as const },
                { label: 'Dashboard', view: 'dashboard' as const },
                { label: 'About', view: 'about' as const }
              ].map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => handleNavigation(link.view)}
                    className="text-gray-400 hover:text-white transition-colors duration-200 text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Features */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Features</h4>
            <ul className="space-y-2">
              {[
                'Real-time Analysis',
                'AI Sentiment Detection',
                'Hashtag Processing',
                'Analytics Dashboard',
                'English Language Support',
                'High Accuracy Results'
              ].map((feature, index) => (
                <li key={index} className="text-gray-400">
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-gray-400 text-sm">
            © 2024 SentimentScope. All rights reserved.
          </p>
          <div className="flex items-center space-x-6 mt-4 md:mt-0">
            <span className="text-gray-400 text-sm">Built with React & Machine Learning</span>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-green-400 text-sm">System Operational</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;