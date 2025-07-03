import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import AnalysisForm from './components/AnalysisForm';
import Results from './components/Results';
import Dashboard from './components/Dashboard';
import About from './components/About';
import Footer from './components/Footer';
import ScrollNotification from './components/ScrollNotification';
import { analyzeSentiment } from './utils/sentimentAnalysis';

export interface SentimentResult {
  id: string;
  text: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  score: number;
  confidence: number;
  timestamp: Date;
  source: string;
}

function App() {
  const [currentView, setCurrentView] = useState<'home' | 'analyze' | 'dashboard' | 'about'>('home');
  const [results, setResults] = useState<SentimentResult[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showScrollNotification, setShowScrollNotification] = useState(false);

  const handleAnalysis = async (text: string, source: string) => {
    setIsAnalyzing(true);
    
    // Simulate API call with realistic delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Use actual sentiment analysis instead of random
    const analysis = analyzeSentiment(text);
    
    const result: SentimentResult = {
      id: Date.now().toString(),
      text: text.length > 100 ? text.substring(0, 100) + '...' : text,
      sentiment: analysis.sentiment,
      score: analysis.score,
      confidence: analysis.confidence,
      timestamp: new Date(),
      source
    };
    
    setResults(prev => [result, ...prev]);
    setIsAnalyzing(false);
    setCurrentView('analyze');
    
    // Show scroll notification after analysis completes
    setShowScrollNotification(true);
  };

  const handleViewDemo = async () => {
    // Run demo analyses automatically
    const demoTexts = [
      { text: "I absolutely love this new product! It's amazing and works perfectly!", source: "text" },
      { text: "#sadlife feeling really down today", source: "hashtag" },
      { text: "This service is terrible and completely useless", source: "text" },
      { text: "#blessed #grateful #happylife", source: "hashtag" },
      { text: "Not sure how I feel about this... maybe it's okay?", source: "text" }
    ];

    setCurrentView('analyze');
    setIsAnalyzing(true);

    // Clear existing results for demo
    setResults([]);

    // Process each demo text with a delay
    for (let i = 0; i < demoTexts.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const analysis = analyzeSentiment(demoTexts[i].text);
      
      const result: SentimentResult = {
        id: `demo-${Date.now()}-${i}`,
        text: demoTexts[i].text,
        sentiment: analysis.sentiment,
        score: analysis.score,
        confidence: analysis.confidence,
        timestamp: new Date(),
        source: demoTexts[i].source
      };
      
      setResults(prev => [result, ...prev]);
    }

    setIsAnalyzing(false);
    
    // Show scroll notification after demo completes
    setShowScrollNotification(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header currentView={currentView} onViewChange={setCurrentView} />
      
      {/* Scroll Notification */}
      <ScrollNotification 
        show={showScrollNotification} 
        onClose={() => setShowScrollNotification(false)} 
      />
      
      {currentView === 'home' && (
        <>
          <Hero 
            onGetStarted={() => setCurrentView('analyze')} 
            onViewDemo={handleViewDemo}
          />
          <About />
        </>
      )}
      
      {currentView === 'analyze' && (
        <div className="container mx-auto px-4 py-8">
          <AnalysisForm onAnalyze={handleAnalysis} isAnalyzing={isAnalyzing} />
          <div id="results-section">
            <Results results={results} />
          </div>
        </div>
      )}
      
      {currentView === 'dashboard' && (
        <Dashboard results={results} />
      )}
      
      {currentView === 'about' && (
        <About />
      )}
      
      <Footer onViewChange={setCurrentView} />
    </div>
  );
}

export default App;