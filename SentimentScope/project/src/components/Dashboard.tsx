import React from 'react';
import { BarChart3, TrendingUp, Users, Clock } from 'lucide-react';
import { SentimentResult } from '../App';

interface DashboardProps {
  results: SentimentResult[];
}

const Dashboard: React.FC<DashboardProps> = ({ results }) => {
  const totalAnalyses = results.length;
  const positiveCount = results.filter(r => r.sentiment === 'positive').length;
  const negativeCount = results.filter(r => r.sentiment === 'negative').length;
  const neutralCount = results.filter(r => r.sentiment === 'neutral').length;
  
  const avgScore = results.length > 0 ? results.reduce((sum, r) => sum + r.score, 0) / results.length : 0;
  const avgAccuracy = results.length > 0 ? results.reduce((sum, r) => sum + r.confidence, 0) / results.length : 0;

  const recentAnalyses = results.slice(0, 5);

  const stats = [
    {
      label: 'Total Analyses',
      value: totalAnalyses.toString(),
      icon: BarChart3,
      color: 'from-blue-500 to-blue-600'
    },
    {
      label: 'Average Score',
      value: avgScore.toFixed(2),
      icon: TrendingUp,
      color: 'from-green-500 to-green-600'
    },
    {
      label: 'AI Accuracy Rate',
      value: `${Math.round(avgAccuracy * 100)}%`,
      icon: Users,
      color: 'from-purple-500 to-purple-600'
    },
    {
      label: 'System Uptime',
      value: '99.9%',
      icon: Clock,
      color: 'from-orange-500 to-orange-600'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics Dashboard</h1>
        <p className="text-gray-600">Overview of your sentiment analysis activities</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.color}`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Sentiment Distribution */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Sentiment Distribution</h3>
          
          <div className="space-y-4">
            {[
              { label: 'Positive', count: positiveCount, color: 'bg-green-500', percentage: totalAnalyses > 0 ? (positiveCount / totalAnalyses) * 100 : 0 },
              { label: 'Negative', count: negativeCount, color: 'bg-red-500', percentage: totalAnalyses > 0 ? (negativeCount / totalAnalyses) * 100 : 0 },
              { label: 'Neutral', count: neutralCount, color: 'bg-gray-500', percentage: totalAnalyses > 0 ? (neutralCount / totalAnalyses) * 100 : 0 }
            ].map((item, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div className="w-20 text-sm font-medium text-gray-700">{item.label}</div>
                <div className="flex-1 bg-gray-200 rounded-full h-4">
                  <div
                    className={`h-4 rounded-full ${item.color} transition-all duration-1000`}
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
                <div className="w-12 text-sm text-gray-600 text-right">{item.count}</div>
                <div className="w-12 text-sm text-gray-600 text-right">{item.percentage.toFixed(0)}%</div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Analyses */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Recent Analyses</h3>
          
          {recentAnalyses.length > 0 ? (
            <div className="space-y-4">
              {recentAnalyses.map((result, index) => (
                <div key={result.id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-xl">
                  <div className={`w-3 h-3 rounded-full ${
                    result.sentiment === 'positive' ? 'bg-green-500' :
                    result.sentiment === 'negative' ? 'bg-red-500' : 'bg-gray-500'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900 truncate">{result.text}</p>
                    <p className="text-xs text-gray-500">
                      {result.timestamp.toLocaleString()} • AI Accuracy: {Math.round(result.confidence * 100)}%
                    </p>
                  </div>
                  <div className="text-sm font-medium text-gray-700">
                    {result.score.toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No analyses yet</p>
              <p className="text-sm text-gray-500">Start analyzing to see your results here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;