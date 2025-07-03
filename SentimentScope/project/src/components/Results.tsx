import React from 'react';
import { TrendingUp, TrendingDown, Minus, Clock, Target } from 'lucide-react';
import { SentimentResult } from '../App';

interface ResultsProps {
  results: SentimentResult[];
}

const Results: React.FC<ResultsProps> = ({ results }) => {
  if (results.length === 0) {
    return null;
  }

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return <TrendingUp className="h-5 w-5 text-green-600" />;
      case 'negative':
        return <TrendingDown className="h-5 w-5 text-red-600" />;
      default:
        return <Minus className="h-5 w-5 text-gray-600" />;
    }
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return 'from-green-500 to-emerald-500';
      case 'negative':
        return 'from-red-500 to-rose-500';
      default:
        return 'from-gray-500 to-slate-500';
    }
  };

  const getSentimentBg = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return 'bg-green-50 border-green-200';
      case 'negative':
        return 'bg-red-50 border-red-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">Analysis Results</h3>
      
      <div className="space-y-6">
        {results.map((result) => (
          <div
            key={result.id}
            className={`p-6 rounded-2xl border-2 transition-all duration-300 hover:shadow-lg ${getSentimentBg(result.sentiment)}`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                {getSentimentIcon(result.sentiment)}
                <div>
                  <h4 className="font-semibold text-gray-900 capitalize">
                    {result.sentiment} Sentiment
                  </h4>
                  <p className="text-sm text-gray-600 flex items-center space-x-1">
                    <Clock className="h-3 w-3" />
                    <span>{result.timestamp.toLocaleTimeString()}</span>
                  </p>
                </div>
              </div>
              
              <div className="text-right">
                <div className="flex items-center space-x-2 mb-1">
                  <Target className="h-4 w-4 text-gray-600" />
                  <span className="text-sm font-medium text-gray-700">
                    AI Accuracy: {Math.round(result.confidence * 100)}%
                  </span>
                </div>
                <div className="text-lg font-bold text-gray-900">
                  Score: {result.score.toFixed(2)}
                </div>
              </div>
            </div>
            
            <div className="bg-white/60 p-4 rounded-xl mb-4">
              <p className="text-gray-800 leading-relaxed">{result.text}</p>
            </div>
            
            {/* Sentiment Score Visualization */}
            <div className="space-y-3">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Sentiment Score</span>
                <span>{result.score.toFixed(2)} (-1.0 to 1.0)</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className={`h-3 rounded-full bg-gradient-to-r ${getSentimentColor(result.sentiment)} transition-all duration-1000`}
                  style={{
                    width: `${Math.abs(result.score) * 50}%`,
                    marginLeft: result.score < 0 ? `${50 + result.score * 50}%` : '50%'
                  }}
                />
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <span>Very Negative</span>
                <span>Neutral</span>
                <span>Very Positive</span>
              </div>
            </div>
            
            {/* AI Prediction Accuracy Visualization */}
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm text-gray-600">
                <span>AI Prediction Accuracy</span>
                <span>{Math.round(result.confidence * 100)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-teal-500 transition-all duration-1000"
                  style={{ width: `${result.confidence * 100}%` }}
                />
              </div>
              <div className="text-xs text-gray-500 mt-1">
                How certain the AI is about this prediction
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Results;