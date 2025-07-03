import React from 'react';
import { BarChart3, Home, Search, Activity, Info } from 'lucide-react';

interface HeaderProps {
  currentView: 'home' | 'analyze' | 'dashboard' | 'about';
  onViewChange: (view: 'home' | 'analyze' | 'dashboard' | 'about') => void;
}

const Header: React.FC<HeaderProps> = ({ currentView, onViewChange }) => {
  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'analyze', label: 'Analyze', icon: Search },
    { id: 'dashboard', label: 'Dashboard', icon: Activity },
    { id: 'about', label: 'About', icon: Info },
  ] as const;

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-blue-600 to-teal-600 rounded-lg">
              <BarChart3 className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">SentimentScope</h1>
              <p className="text-sm text-gray-600">Twitter ML Analysis</p>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => onViewChange(id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                  currentView === id
                    ? 'bg-blue-100 text-blue-700 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span className="font-medium">{label}</span>
              </button>
            ))}
          </nav>
          
          {/* Mobile menu */}
          <div className="md:hidden flex items-center space-x-1">
            {navItems.map(({ id, icon: Icon }) => (
              <button
                key={id}
                onClick={() => onViewChange(id)}
                className={`p-2 rounded-lg transition-all duration-200 ${
                  currentView === id
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <Icon className="h-5 w-5" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;