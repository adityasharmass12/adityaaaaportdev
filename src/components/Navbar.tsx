import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Home, User, Code2, FolderGit2, Trophy, Mail } from 'lucide-react';

const navItems = [
  { name: 'Home', href: '#home', icon: Home },
  { name: 'About', href: '#about', icon: User },
  { name: 'Skills', href: '#skills', icon: Code2 },
  { name: 'Projects', href: '#projects', icon: FolderGit2 },
  { name: 'Achievements', href: '#achievements', icon: Trophy },
  { name: 'Contact', href: '#contact', icon: Mail },
];

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed left-1/2 -translate-x-1/2 z-50 transition-all duration-500 w-[95%] sm:w-[90%] max-w-5xl top-4 sm:top-6 rounded-2xl sm:rounded-full ${
        scrolled
          ? 'bg-[#090414]/80 backdrop-blur-2xl border border-purple-500/50 shadow-[0_8px_40px_rgba(168,85,247,0.3)] py-3'
          : 'bg-[#090414]/40 backdrop-blur-xl border border-purple-500/30 shadow-[0_4px_24px_rgba(168,85,247,0.15)] py-4'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <a href="#home" className="group flex items-center gap-2.5 text-sm sm:text-base font-medium text-purple-200/90 tracking-wide font-display hover:text-white transition-colors">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-fuchsia-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-fuchsia-500"></span>
            </span>
            Welcome, Explorer ✦
          </a>
        </div>

        <div className="hidden md:flex items-center gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <motion.a
                key={item.name}
                href={item.href}
                whileHover={{ scale: 1.1, y: -2, transition: { type: "spring", stiffness: 250, damping: 20 } }}
                whileTap={{ scale: 0.95 }}
                className="relative flex items-center justify-center text-sm font-medium text-purple-200/80 hover:text-emerald-400 p-3 rounded-full hover:bg-emerald-500/10 transition-colors duration-300 group"
              >
                <Icon size={18} className="group-hover:text-emerald-400 transition-colors shrink-0" />
                <span className="absolute top-full mt-3 opacity-0 translate-y-[-10px] group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out whitespace-nowrap text-xs bg-[#090414]/90 backdrop-blur-2xl px-3 py-1.5 rounded-lg border border-purple-500/40 shadow-[0_8px_32px_rgba(168,85,247,0.3)] pointer-events-none text-white">
                  {item.name}
                </span>
              </motion.a>
            );
          })}
        </div>

        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg text-purple-200 hover:text-emerald-400 hover:bg-emerald-500/10 transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden mt-4 mx-2 bg-[#090414]/95 backdrop-blur-xl border border-purple-500/30 rounded-2xl overflow-hidden shadow-[0_8px_32px_rgba(168,85,247,0.2)]"
          >
            <div className="px-4 py-4 flex flex-col gap-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 text-base font-medium text-purple-100 hover:text-emerald-400 px-4 py-3 rounded-xl hover:bg-emerald-500/10 transition-colors"
                  >
                    <Icon size={18} className="text-purple-400" />
                    {item.name}
                  </a>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};
