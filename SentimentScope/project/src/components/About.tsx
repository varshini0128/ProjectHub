import React from 'react';
import { Brain, Database, Zap, Shield, Code, Users } from 'lucide-react';

const About: React.FC = () => {
  const features = [
    {
      icon: Brain,
      title: 'Advanced Neural Networks',
      description: 'Deep learning models trained on millions of social media posts for accurate sentiment classification.'
    },
    {
      icon: Database,
      title: 'Big Data Processing',
      description: 'Scalable infrastructure capable of analyzing thousands of tweets per second with real-time results.'
    },
    {
      icon: Zap,
      title: 'Real-time Analysis',
      description: 'Lightning-fast processing with sub-second response times for immediate sentiment insights.'
    },
    {
      icon: Shield,
      title: 'Privacy & Security',
      description: 'Enterprise-grade security with full data privacy compliance and encrypted processing.'
    },
    {
      icon: Code,
      title: 'API Integration',
      description: 'RESTful API endpoints for seamless integration with your existing applications and workflows.'
    },
    {
      icon: Users,
      title: 'English Language Focus',
      description: 'Optimized for English text analysis with plans for multi-language support in future versions.'
    }
  ];

  const methodologySteps = [
    {
      step: '01',
      title: 'Data Collection',
      description: 'Gather tweets and social media posts using official APIs while respecting rate limits and privacy policies.'
    },
    {
      step: '02',
      title: 'Text Preprocessing',
      description: 'Clean and normalize text data, remove noise, handle emojis, and tokenize content for analysis.'
    },
    {
      step: '03',
      title: 'Feature Extraction',
      description: 'Transform text into numerical representations using advanced NLP techniques and embedding models.'
    },
    {
      step: '04',
      title: 'Sentiment Classification',
      description: 'Apply trained machine learning models to classify sentiment and calculate confidence scores.'
    }
  ];

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            About SentimentScope
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We leverage cutting-edge machine learning and natural language processing 
            to decode the emotional landscape of social media, providing actionable 
            insights for businesses and researchers.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-gray-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="p-3 bg-gradient-to-r from-blue-100 to-teal-100 rounded-xl w-fit mb-4">
                <feature.icon className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Methodology */}
        <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-gray-200">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Our Methodology</h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our four-step process ensures accurate and reliable sentiment analysis 
              results across all types of social media content.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {methodologySteps.map((step, index) => (
              <div key={index} className="flex space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-teal-600 rounded-xl flex items-center justify-center">
                    <span className="text-white font-bold text-lg">{step.step}</span>
                  </div>
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h4>
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Technical Specs */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          {[
            { label: 'Accuracy Rate', value: '94.2%', description: 'On English datasets' },
            { label: 'Processing Speed', value: '<100ms', description: 'Average response time' },
            { label: 'Language Support', value: 'English', description: 'Primary language focus' }
          ].map((spec, index) => (
            <div key={index} className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-gray-200">
              <div className="text-3xl font-bold text-blue-600 mb-2">{spec.value}</div>
              <div className="text-lg font-semibold text-gray-900 mb-1">{spec.label}</div>
              <div className="text-sm text-gray-600">{spec.description}</div>
            </div>
          ))}
        </div>

        {/* Language Support Details */}
        <div className="mt-16 bg-white/60 backdrop-blur-sm rounded-3xl p-8 border border-gray-200">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Current Language Support</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              This demo version is optimized for English text analysis. Here's what we currently support:
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-4">✅ Fully Supported</h4>
              <ul className="space-y-2 text-gray-600">
                <li>• <strong>English</strong> - Complete sentiment analysis</li>
                <li>• English hashtags (#happy, #sad, #blessed)</li>
                <li>• English slang and informal text</li>
                <li>• Mixed case and camelCase hashtags</li>
                <li>• Emojis and special characters</li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-4">🔄 Future Roadmap</h4>
              <ul className="space-y-2 text-gray-600">
                <li>• Spanish sentiment analysis</li>
                <li>• French text processing</li>
                <li>• German language support</li>
                <li>• Portuguese and Italian</li>
                <li>• Multi-language hashtag detection</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 p-4 bg-blue-50 rounded-xl border border-blue-200">
            <p className="text-blue-800 text-sm">
              <strong>Note:</strong> While this demo focuses on English, production versions of sentiment analysis 
              systems typically support 12+ languages including Spanish, French, German, Portuguese, Italian, 
              Dutch, Russian, Chinese, Japanese, Korean, Arabic, and Hindi.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;