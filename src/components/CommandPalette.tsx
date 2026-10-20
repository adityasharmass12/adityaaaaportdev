import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Home, User, Code2, FolderGit2, Trophy, Mail } from 'lucide-react';
const navItems = [
  { name: 'Home', href: '#home', icon: Home },
  { name: 'About', href: '#about', icon: User },
  { name: 'Skills', href: '#skills', icon: Code2 },
  { name: 'Projects', href: '#projects', icon: FolderGit2 },
  { name: 'Achievements', href: '#achievements', icon: Trophy },
  { name: 'Contact', href: '#contact', icon: Mail },
];
export const CommandPalette: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
  const filteredItems = navItems.filter(item => 
    item.name.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          key="command-palette-wrapper" 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-start justify-center pt-[20vh]"
        >
          <div
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-slate-900/40 dark:bg-[#020305]/80 backdrop-blur-sm"
          />
          <motion.div
            initial={{ scale: 0.95, y: -20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: -20 }}
            className="relative z-[101] w-[90%] max-w-lg bg-white dark:bg-[rgba(8,12,22,0.95)] dark:backdrop-blur-2xl border border-[rgba(15,23,42,0.10)] dark:border-[rgba(59,130,246,0.14)] rounded-2xl shadow-[0_1px_2px_rgba(15,23,42,0.06),0_6px_20px_rgba(15,23,42,0.08),0_16px_40px_rgba(37,99,235,0.08)] dark:shadow-[0_8px_32px_rgba(2,3,5,0.7)] overflow-hidden"
          >
            <div className="flex items-center px-4 py-3 border-b border-[rgba(15,23,42,0.08)] dark:border-[rgba(59,130,246,0.14)] bg-[#f1f5fb] dark:bg-transparent">
              <Search className="text-blue-500 dark:text-sky-400 mr-3 shrink-0" size={20} />
              <input
                type="text"
                autoFocus
                placeholder="Type a command or search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-transparent text-[#0a1633] dark:text-[#dbe7ff] placeholder-[#64748b] dark:placeholder-blue-400/40 focus:outline-none font-mono text-sm focus:ring-2 focus:ring-blue-500/40 rounded px-2 py-0.5"
              />
              <div className="text-xs text-[#64748b] dark:text-blue-400/50 font-mono bg-white dark:bg-transparent border border-[rgba(15,23,42,0.08)] dark:border-blue-500/20 px-2 py-1 rounded shadow-xs shrink-0">ESC</div>
            </div>
            <div className="max-h-72 overflow-y-auto p-2">
              {filteredItems.length > 0 ? (
                filteredItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center px-4 py-3 text-sm text-[#334155] dark:text-[#a3b0cc] hover:bg-[#f1f5fb] dark:hover:bg-blue-500/15 hover:text-[#0a1633] dark:hover:text-[#dbe7ff] rounded-xl transition-colors group"
                    >
                      <Icon size={16} className="mr-3 text-blue-500 dark:text-sky-400 group-hover:text-blue-600 dark:group-hover:text-sky-300" />
                      {item.name}
                    </a>
                  );
                })
              ) : (
                <div className="px-4 py-8 text-center text-[#64748b] dark:text-blue-400/50 font-mono text-sm">
                  No results found.
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
