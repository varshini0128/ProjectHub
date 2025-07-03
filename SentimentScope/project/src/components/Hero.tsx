import React from 'react';
import { ArrowRight, Zap, Shield, TrendingUp } from 'lucide-react';

interface HeroProps {
  onGetStarted: () => void;
  onViewDemo?: () => void;
}

const Hero: React.FC<HeroProps> = ({ onGetStarted, onViewDemo }) => {
  const handleViewDemo = () => {
    if (onViewDemo) {
      onViewDemo();
    }
  };

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Decode Twitter
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-600">
              {' '}Sentiment
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-12 leading-relaxed">
            Advanced machine learning algorithms analyze millions of tweets to reveal 
            public sentiment, trends, and insights in real-time.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <button
              onClick={onGetStarted}
              className="group bg-gradient-to-r from-blue-600 to-teal-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-teal-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center space-x-2"
            >
              <span>Start Analyzing</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
            
            <button 
              onClick={handleViewDemo}
              className="text-gray-700 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-all duration-300 border border-gray-200 hover:shadow-md transform hover:-translate-y-1"
            >
              View Demo
            </button>
          </div>
          
          {/* Feature highlights */}
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                icon: Zap,
                title: 'Real-time Analysis',
                description: 'Process thousands of tweets instantly with our optimized ML pipeline'
              },
              {
                icon: Shield,
                title: '94.2% Accuracy',
                description: 'State-of-the-art neural networks trained on massive datasets'
              },
              {
                icon: TrendingUp,
                title: 'Trend Detection',
                description: 'Identify emerging sentiment patterns and viral content early'
              }
            ].map((feature, index) => (
              <div key={index} className="p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-gray-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="p-3 bg-gradient-to-r from-blue-100 to-teal-100 rounded-xl w-fit mb-4 mx-auto">
                  <feature.icon className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;