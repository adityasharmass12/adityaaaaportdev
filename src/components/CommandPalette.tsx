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
            className="absolute inset-0 bg-[#090414]/80 backdrop-blur-sm"
          />
          <motion.div
            initial={{ scale: 0.95, y: -20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: -20 }}
            className="relative z-[101] w-[90%] max-w-lg bg-[#090414]/80 backdrop-blur-2xl border border-purple-500/40 rounded-2xl shadow-[0_0_60px_rgba(168,85,247,0.3)] overflow-hidden"
          >
            <div className="flex items-center px-4 py-3 border-b border-purple-500/20">
              <Search className="text-purple-400 mr-3" size={20} />
              <input
                type="text"
                autoFocus
                placeholder="Type a command or search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-transparent text-purple-100 placeholder-purple-400/50 focus:outline-none font-mono text-sm"
              />
              <div className="text-xs text-purple-400/50 font-mono border border-purple-500/20 px-2 py-1 rounded">ESC</div>
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
                      className="flex items-center px-4 py-3 text-sm text-purple-200 hover:bg-purple-500/20 hover:text-white rounded-xl transition-colors group"
                    >
                      <Icon size={16} className="mr-3 text-purple-400 group-hover:text-purple-300" />
                      {item.name}
                    </a>
                  );
                })
              ) : (
                <div className="px-4 py-8 text-center text-purple-400/50 font-mono text-sm">
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
