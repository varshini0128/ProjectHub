import React, { useState } from 'react';
import { Search, Hash, User, Loader2 } from 'lucide-react';

interface AnalysisFormProps {
  onAnalyze: (text: string, source: string) => void;
  isAnalyzing: boolean;
}

const AnalysisForm: React.FC<AnalysisFormProps> = ({ onAnalyze, isAnalyzing }) => {
  const [activeTab, setActiveTab] = useState<'text' | 'username' | 'hashtag'>('text');
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() && !isAnalyzing) {
      onAnalyze(inputValue.trim(), activeTab);
      setInputValue('');
    }
  };

  const tabs = [
    { id: 'text', label: 'Text', icon: Search, placeholder: 'Enter text to analyze sentiment...' },
    { id: 'username', label: 'Username', icon: User, placeholder: 'Enter Twitter username (e.g., @elonmusk)' },
    { id: 'hashtag', label: 'Hashtag', icon: Hash, placeholder: 'Enter hashtag (e.g., #AI)' },
  ] as const;

  return (
    <div className="max-w-4xl mx-auto mb-12">
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200 p-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          Analyze Social Sentiment
        </h2>
        
        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center mb-6 bg-gray-100 rounded-xl p-1">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                activeTab === id
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{label}</span>
            </button>
          ))}
        </div>
        
        {/* Analysis Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={tabs.find(tab => tab.id === activeTab)?.placeholder}
              rows={activeTab === 'text' ? 4 : 2}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-gray-900 placeholder-gray-500"
              disabled={isAnalyzing}
            />
          </div>
          
          <button
            type="submit"
            disabled={!inputValue.trim() || isAnalyzing}
            className="w-full bg-gradient-to-r from-blue-600 to-teal-600 text-white py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-teal-700 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>Analyzing...</span>
              </>
            ) : (
              <>
                <Search className="h-5 w-5" />
                <span>Analyze Sentiment</span>
              </>
            )}
          </button>
        </form>
        
        {/* Quick Examples */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-600 mb-3">Quick examples:</p>
          <div className="flex flex-wrap gap-2">
            {[
              "I love this new product!",
              "This service is terrible",
              "@OpenAI",
              "#ClimateChange"
            ].map((example, index) => (
              <button
                key={index}
                onClick={() => setInputValue(example)}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors duration-200"
                disabled={isAnalyzing}
              >
                {example}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisForm;