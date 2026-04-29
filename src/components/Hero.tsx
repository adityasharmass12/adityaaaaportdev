import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { resumeData } from '../data';
import { Download, ChevronDown, Github, Linkedin, Instagram, Terminal } from 'lucide-react';

const getIcon = (name: string) => {
  switch (name.toLowerCase()) {
    case 'github': return <Github size={24} />;
    case 'linkedin': return <Linkedin size={24} />;
    case 'instagram': return <Instagram size={24} />;
    default: return null;
  }
};

export const Hero: React.FC = () => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'r' && !e.ctrlKey && !e.metaKey && !e.altKey) {
        window.open("/My Resume.pdf", "_blank");
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <section id="home" aria-label="Hero — Aditya Sharma" className="relative flex items-center justify-center min-h-screen px-6 pt-28 sm:pt-32 overflow-hidden">
      <div className="max-w-6xl w-full mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex-1 text-center lg:text-left relative z-10"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mb-6 text-[10px] sm:text-sm font-mono text-purple-400/60 break-words"
          >
            <span className="text-fuchsia-400/60">import</span> {'{'} Developer {'}'} <span className="text-fuchsia-400/60">from</span> <span className="text-green-400/60">'@adityaaaportdev'</span>;
            <span className="sr-only">adityaaaportdev | Aditya Sharma Portfolio</span>
          </motion.div>

          <motion.h1 
            className="mb-4 text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-fuchsia-300 to-purple-300 font-display sm:text-7xl lg:text-8xl inline-block cursor-default animate-gradient"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            whileHover={{ 
              scale: 1.1,
              y: -8,
              filter: [
                "drop-shadow(0px 15px 30px rgba(168,85,247,0.6)) hue-rotate(0deg)",
                "drop-shadow(0px 15px 30px rgba(217,70,239,0.6)) hue-rotate(90deg)",
                "drop-shadow(0px 15px 30px rgba(168,85,247,0.6)) hue-rotate(180deg)",
                "drop-shadow(0px 15px 30px rgba(217,70,239,0.6)) hue-rotate(270deg)",
                "drop-shadow(0px 15px 30px rgba(168,85,247,0.6)) hue-rotate(360deg)"
              ],
              transition: { 
                scale: { type: "spring", stiffness: 400, damping: 15 },
                y: { type: "spring", stiffness: 400, damping: 15 },
                filter: { duration: 2.5, repeat: Infinity, ease: "linear" }
              }
            }}
          >
            {resumeData.basics.name}
          </motion.h1>
          <meta itemProp="name" content="Aditya Sharma" />
          <meta itemProp="url" content="https://adityaaaaportdev.vercel.app/" />
          <span itemProp="address" itemScope itemType="https://schema.org/PostalAddress" className="hidden">
            <meta itemProp="addressLocality" content="Delhi" />
            <meta itemProp="addressCountry" content="IN" />
          </span>
          
          <motion.div 
            className="mb-12 flex items-center text-xl font-medium text-purple-200 sm:text-3xl font-display"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <span itemProp="jobTitle">{resumeData.basics.title}</span>
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
              className="inline-block w-3 sm:w-4 h-6 sm:h-8 ml-2 bg-purple-400/80"
            />
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <motion.a
              href="#about"
              whileHover={{ scale: 1.05, boxShadow: "0px 0px 30px rgba(52,211,153,0.5)", transition: { type: "spring", stiffness: 400, damping: 17 } }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center gap-2 px-8 py-4 text-sm font-semibold text-white transition-colors duration-200 bg-emerald-500/90 backdrop-blur-xl rounded-full shadow-[0_8px_32px_rgba(16,185,129,0.4)] border border-emerald-400/30 hover:bg-emerald-500"
            >
              About Me
              <ChevronDown size={18} />
            </motion.a>
            <motion.a
              href="/My Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, boxShadow: "0px 0px 30px rgba(168,85,247,0.4)", transition: { type: "spring", stiffness: 400, damping: 17 } }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center gap-2 px-8 py-4 text-sm font-semibold text-purple-100 transition-colors duration-200 rounded-full border border-purple-400/30 bg-purple-900/40 backdrop-blur-xl shadow-[0_8px_32px_rgba(168,85,247,0.2)] hover:bg-purple-800/50 group"
            >
              My Resume
              <Download size={18} />
              <span className="hidden sm:flex items-center gap-1 ml-2 text-[10px] text-purple-300/60 font-mono opacity-0 group-hover:opacity-100 transition-opacity">
                Press <kbd className="px-1.5 py-0.5 rounded-md bg-emerald-500/20 border border-emerald-500/30 text-emerald-400">R</kbd>
              </span>
            </motion.a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8, x: 40 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex-1 relative max-w-[320px] w-full mt-10 lg:mt-0"
        >
          <motion.div
            animate={{ y: [-10, 10, -10] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/30 via-fuchsia-500/20 to-purple-500/30 rounded-3xl blur-2xl transform rotate-6 scale-110" />
            <div className="relative aspect-[3/4] rounded-3xl overflow-hidden border border-purple-400/30 shadow-[0_0_60px_rgba(168,85,247,0.3)] group backdrop-blur-xl bg-gradient-to-br from-purple-900/40 to-fuchsia-900/30">
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5 rounded-3xl" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#090414]/90 via-[#090414]/40 to-transparent z-10 transition-opacity duration-500 group-hover:opacity-30" />
              <img
                src="/my-image.jpg.jpeg"
                alt="Aditya Sharma — AI/ML Developer and Full-Stack Engineer based in Delhi, India"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                referrerPolicy="no-referrer"
                itemProp="image"
                loading="eager"
                width="320"
                height="427"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 z-20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out flex items-center justify-between">
                <p className="text-emerald-400 font-mono text-sm font-semibold bg-[#090414]/80 px-3 py-1.5 rounded-lg backdrop-blur-xl border border-emerald-500/30 shadow-[0_0_20px_rgba(16,185,129,0.2)]">Hello World 👋</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
