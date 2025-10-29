import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';
import StarBackground from './components/StarBackground';
import VisitorNameModal from './components/VisitorNameModal';
import { getVisitorIpAndLocation } from './utils/analytics';

function App() {
  const [isDark, setIsDark] = useState(false);
  const [visitorName, setVisitorName] = useState<string>('');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
    
  }, []);

  // Track visitor with name
  const trackVisitorWithName = async (name: string) => {
    try {
      // Get IP and location
      const { ip, location } = await getVisitorIpAndLocation();
      
      const visitorInfo = {
        name: name || 'Anonymous',
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        screenResolution: `${window.screen.width}x${window.screen.height}`,
        language: navigator.language,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        referrer: document.referrer || 'Direct',
        pageUrl: window.location.href,
        ipAddress: ip,
        location: location,
      };

      // Send to API
      await fetch('/api/track-visitor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(visitorInfo),
      });
      
      // Mark as tracked
      sessionStorage.setItem('visitor_tracked', 'true');
    } catch (error) {
      console.error('Failed to track visitor:', error);
    }
  };

  const handleVisitorName = (name: string) => {
    setVisitorName(name);
    trackVisitorWithName(name);
  };

  const toggleTheme = () => {
    setIsDark(!isDark);
    if (!isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300 overflow-x-hidden relative">
      {/* Visitor Name Modal */}
      <VisitorNameModal onSubmit={handleVisitorName} />
      
      {/* Site-wide starfield with meteors - theme adaptive */}
      <StarBackground 
        position="fixed" 
        opacity={isDark ? 0.7 : 0.45} 
        zIndex={5} 
        blendMode="screen"
        isDark={isDark}
      />
      <div className="relative">
        <Navbar isDark={isDark} toggleTheme={toggleTheme} />
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
        <Footer />
      </div>
    </div>
  );
}

export default App;
