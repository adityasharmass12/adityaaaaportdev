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
    <div className="min-h-screen text-slate-50 selection:bg-purple-500/30 relative">
      <SEOHead />
      <CommandPalette />
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-purple-400 to-fuchsia-400 origin-left z-[100]"
        style={{ scaleX }}
      />
      <CustomCursor />
      <AnimatedBackground />
      <div className="fixed inset-[-24px] z-[-1] bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none animate-grid"></div>
      <div className="fixed top-4 left-4 text-purple-500/10 font-mono text-xl pointer-events-none z-[-1] hidden md:block">&lt;html&gt;</div>
      <div className="fixed top-12 left-8 text-purple-500/10 font-mono text-xl pointer-events-none z-[-1] hidden md:block">&lt;body&gt;</div>
      <div className="fixed bottom-12 left-8 text-purple-500/10 font-mono text-xl pointer-events-none z-[-1] hidden md:block">&lt;/body&gt;</div>
      <div className="fixed bottom-4 left-4 text-purple-500/10 font-mono text-xl pointer-events-none z-[-1] hidden md:block">&lt;/html&gt;</div>

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

          <footer role="contentinfo" className="py-12 text-center text-purple-300/50 border-t border-purple-500/20 mt-24 flex flex-col gap-2 bg-purple-900/10 backdrop-blur-xl">
            <p>© {new Date().getFullYear()} adityaaaportdev | Aditya Sharma. All rights reserved.</p>
            <p className="text-emerald-400 font-medium tracking-wide">Designed and Built by Aditya sharma</p>
            <nav aria-label="Footer navigation" className="flex justify-center gap-4 mt-4 text-sm text-purple-400/60">
              <a href="#home" className="hover:text-purple-300 transition-colors">Home</a>
              <a href="#about" className="hover:text-purple-300 transition-colors">About</a>
              <a href="#projects" className="hover:text-purple-300 transition-colors">Projects</a>
              <a href="#contact" className="hover:text-purple-300 transition-colors">Contact</a>
            </nav>
          </footer>

          <AnimatePresence>
            {showBackToTop && (
              <motion.button
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.8 }}
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="fixed bottom-8 right-8 p-3 bg-purple-900/80 backdrop-blur-2xl text-white rounded-full shadow-[0_0_30px_rgba(147,51,234,0.5)] z-50 hover:bg-purple-800 transition-colors border border-purple-400/40"
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
