import React, { useState, useEffect } from 'react';
import { AnimatedBackground } from './components/AnimatedBackground';
import { Splash } from './components/Splash';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Experience } from './components/Experience';
import { Education } from './components/Education';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Achievements } from './components/Achievements';
import { Extra } from './components/Extra';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { CustomCursor } from './components/CustomCursor';
import { SEOHead } from './components/SEOHead';
import { CommandPalette } from './components/CommandPalette';
import { AnimatePresence, motion, useScroll, useSpring } from 'motion/react';
import { ArrowUp } from 'lucide-react';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [showBackToTop, setShowBackToTop] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 500);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen text-[var(--foreground)] selection:bg-blue-600/30 relative">
      <SEOHead />
      <CommandPalette />
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-600 via-sky-400 to-blue-500 origin-left z-[100]"
        style={{ scaleX }}
      />
      <CustomCursor />
      <AnimatedBackground />
      <div 
        className="fixed inset-[-24px] z-[-1] pointer-events-none animate-grid"
        style={{
          backgroundImage: 'linear-gradient(to right, var(--grid-line) 1px, transparent 1px), linear-gradient(to bottom, var(--grid-line) 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}
      />
      <div className="fixed top-4 left-4 text-[var(--code-tag)] font-mono text-xl pointer-events-none z-[-1] hidden md:block">&lt;html&gt;</div>
      <div className="fixed top-12 left-8 text-[var(--code-tag)] font-mono text-xl pointer-events-none z-[-1] hidden md:block">&lt;body&gt;</div>
      <div className="fixed bottom-12 left-8 text-[var(--code-tag)] font-mono text-xl pointer-events-none z-[-1] hidden md:block">&lt;/body&gt;</div>
      <div className="fixed bottom-4 left-4 text-[var(--code-tag)] font-mono text-xl pointer-events-none z-[-1] hidden md:block">&lt;/html&gt;</div>

      <AnimatePresence>
        {showSplash && <Splash onComplete={() => setShowSplash(false)} />}
      </AnimatePresence>

      {!showSplash && (
        <main className="relative z-10" role="main">
          <header role="banner">
            <Navbar />
          </header>
          <article itemScope itemType="https://schema.org/Person">
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Education />
          <Achievements />
          <Extra />
          <Contact />
          </article>

          <Footer />

          <AnimatePresence>
            {showBackToTop && (
              <motion.button
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.8 }}
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="fixed bottom-8 right-8 p-3 bg-white dark:bg-[rgba(8,12,22,0.85)] dark:backdrop-blur-2xl text-blue-600 dark:text-blue-300 rounded-full shadow-[0_1px_2px_rgba(15,23,42,0.06),0_6px_20px_rgba(15,23,42,0.08),0_16px_40px_rgba(37,99,235,0.08)] dark:shadow-[0_0_20px_rgba(59,130,246,0.2)] z-50 hover:bg-[#f1f5fb] dark:hover:bg-[rgba(15,27,61,0.85)] transition-colors border border-[rgba(15,23,42,0.10)] dark:border-blue-500/20 cursor-pointer"
              >
                <ArrowUp size={20} />
              </motion.button>
            )}
          </AnimatePresence>
        </main>
      )}
    </div>
  );
}
