import React, { useEffect, useState } from 'react';
import { ChevronDown, CheckCircle } from 'lucide-react';

interface ScrollNotificationProps {
  show: boolean;
  onClose: () => void;
}

const ScrollNotification: React.FC<ScrollNotificationProps> = ({ show, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (show) {
      setIsVisible(true);
      // Auto-hide after 4 seconds
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(onClose, 300); // Wait for fade out animation
      }, 4000);
      
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  const handleScrollToResults = () => {
    const resultsSection = document.getElementById('results-section');
    if (resultsSection) {
      resultsSection.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  if (!show) return null;

  return (
    <div className={`fixed top-24 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 ${
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
    }`}>
      <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-4 rounded-2xl shadow-lg border border-green-400 max-w-sm mx-auto">
        <div className="flex items-center space-x-3">
          <CheckCircle className="h-5 w-5 flex-shrink-0" />
          <div className="flex-1">
            <p className="font-semibold text-sm">Analysis Complete!</p>
            <p className="text-xs text-green-100">Scroll down to see your results</p>
          </div>
          <button
            onClick={handleScrollToResults}
            className="bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors duration-200"
            aria-label="Scroll to results"
          >
            <ChevronDown className="h-4 w-4 animate-bounce" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScrollNotification;