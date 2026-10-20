import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Home, User, Code2, FolderGit2, Trophy, Mail, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

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
  const { theme, toggleTheme } = useTheme();

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
          ? 'bg-white dark:bg-[rgba(8,12,22,0.75)] dark:backdrop-blur-2xl border border-[rgba(15,23,42,0.10)] dark:border-[rgba(59,130,246,0.14)] shadow-[0_1px_2px_rgba(15,23,42,0.06),0_6px_20px_rgba(15,23,42,0.08),0_16px_40px_rgba(37,99,235,0.08)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.7)] py-3'
          : 'bg-white dark:bg-[rgba(8,12,22,0.65)] dark:backdrop-blur-xl border border-[rgba(15,23,42,0.10)] dark:border-[rgba(59,130,246,0.12)] shadow-[0_1px_2px_rgba(15,23,42,0.06),0_6px_20px_rgba(15,23,42,0.08),0_16px_40px_rgba(37,99,235,0.08)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.6)] py-4'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <a href="#home" className="group flex items-center gap-2.5 text-sm sm:text-base font-medium text-[#0a1633] dark:text-blue-200/90 tracking-wide hover:text-blue-600 dark:hover:text-white transition-colors">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
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
                className="relative flex items-center justify-center text-sm font-medium text-[#334155] dark:text-blue-200/80 hover:text-blue-600 dark:hover:text-sky-400 p-3 rounded-full hover:bg-[#f1f5fb] dark:hover:bg-blue-500/10 transition-colors duration-300 group"
              >
                <Icon size={18} className="group-hover:text-blue-600 dark:group-hover:text-sky-400 transition-colors shrink-0" />
                <span className="absolute top-full mt-3 opacity-0 translate-y-[-10px] group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-out whitespace-nowrap text-xs bg-white dark:bg-[rgba(8,12,22,0.95)] px-3 py-1.5 rounded-lg border border-[rgba(15,23,42,0.10)] dark:border-[rgba(59,130,246,0.14)] shadow-[0_1px_2px_rgba(15,23,42,0.06),0_6px_20px_rgba(15,23,42,0.08),0_16px_40px_rgba(37,99,235,0.08)] pointer-events-none text-[#0a1633] dark:text-white">
                  {item.name}
                </span>
              </motion.a>
            );
          })}

          <motion.button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            whileHover={{ scale: 1.1, y: -2, transition: { type: "spring", stiffness: 250, damping: 20 } }}
            whileTap={{ scale: 0.95 }}
            className="relative flex items-center justify-center text-sm font-medium text-[#334155] dark:text-blue-200/80 hover:text-blue-600 dark:hover:text-sky-400 p-3 rounded-full hover:bg-[#f1f5fb] dark:hover:bg-blue-500/10 transition-colors duration-300 group cursor-pointer"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={theme}
                initial={{ rotate: -90, opacity: 0, scale: 0.7 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: 90, opacity: 0, scale: 0.7 }}
                transition={{ duration: 0.2 }}
                className="shrink-0 flex items-center justify-center"
              >
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              </motion.span>
            </AnimatePresence>
            <span className="absolute top-full mt-3 opacity-0 translate-y-[-10px] group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-out whitespace-nowrap text-xs bg-white dark:bg-[rgba(8,12,22,0.95)] px-3 py-1.5 rounded-lg border border-[rgba(15,23,42,0.10)] dark:border-[rgba(59,130,246,0.14)] shadow-[0_1px_2px_rgba(15,23,42,0.06),0_6px_20px_rgba(15,23,42,0.08),0_16px_40px_rgba(37,99,235,0.08)] pointer-events-none text-[#0a1633] dark:text-white">
              {theme === 'dark' ? 'Light mode' : 'Dark mode'}
            </span>
          </motion.button>
        </div>

        <div className="md:hidden flex items-center gap-2">
          <motion.button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            whileTap={{ scale: 0.9 }}
            className="p-2 rounded-lg text-[#0a1633] dark:text-blue-200 hover:text-blue-600 dark:hover:text-sky-400 hover:bg-[#f1f5fb] dark:hover:bg-blue-500/10 transition-colors cursor-pointer"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </motion.button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg text-[#0a1633] dark:text-blue-200 hover:text-blue-600 dark:hover:text-sky-400 hover:bg-[#f1f5fb] dark:hover:bg-blue-500/10 transition-colors"
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
            className="md:hidden mt-4 mx-2 bg-white dark:bg-[rgba(8,12,22,0.95)] dark:backdrop-blur-xl border border-[rgba(15,23,42,0.10)] dark:border-[rgba(59,130,246,0.14)] rounded-2xl overflow-hidden shadow-[0_1px_2px_rgba(15,23,42,0.06),0_6px_20px_rgba(15,23,42,0.08),0_16px_40px_rgba(37,99,235,0.08)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.7)]"
          >
            <div className="px-4 py-4 flex flex-col gap-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 text-base font-medium text-[#0a1633] dark:text-blue-100 hover:text-blue-600 dark:hover:text-sky-400 px-4 py-3 rounded-xl hover:bg-[#f1f5fb] dark:hover:bg-blue-500/10 transition-colors"
                  >
                    <Icon size={18} className="text-blue-600 dark:text-sky-400" />
                    {item.name}
                  </a>
                );
              })}

              <button
                onClick={() => {
                  toggleTheme();
                  setIsOpen(false);
                }}
                className="flex items-center justify-between w-full text-base font-medium text-[#0a1633] dark:text-blue-100 hover:text-blue-600 dark:hover:text-sky-400 px-4 py-3 rounded-xl hover:bg-[#f1f5fb] dark:hover:bg-blue-500/10 transition-colors text-left cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  {theme === 'dark' ? <Sun size={18} className="text-sky-400" /> : <Moon size={18} className="text-blue-600" />}
                  <span>{theme === 'dark' ? 'Switch to Light' : 'Switch to Dark'}</span>
                </div>
                <span className="text-xs font-mono uppercase tracking-wider text-slate-500 bg-[#f1f5fb] border border-[rgba(15,23,42,0.08)] px-2 py-0.5 rounded-full dark:bg-transparent dark:border-none dark:text-blue-300/60">
                  {theme}
                </span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};
