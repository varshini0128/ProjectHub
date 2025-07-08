import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import AllProjects from './components/AllProjects';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  const [currentView, setCurrentView] = useState('home');

  const renderCurrentView = () => {
    switch (currentView) {
      case 'all-projects':
        return <AllProjects onBack={() => setCurrentView('home')} />;
      default:
        return (
          <>
            <Hero />
            <About />
            <Skills />
            <Projects onViewAll={() => setCurrentView('all-projects')} />
            <Education />
            <Contact />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-800 text-slate-200">
      <Header />
      {renderCurrentView()}
      <Footer />
    </div>
  );
}

export default App;