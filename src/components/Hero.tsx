import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { resumeData } from '../data';
import { Download, ChevronDown } from 'lucide-react';

const FIRST_NAME = 'Aditya'.split('');
const LAST_NAME = 'Sharma'.split('');

export const Hero: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [hasEntered, setHasEntered] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const timer = setTimeout(() => setHasEntered(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'r' && !e.ctrlKey && !e.metaKey && !e.altKey) {
        window.open('/Aditya_Sharma_Resume.pdf', '_blank');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const renderLetter = (char: string, index: number) => {
    const isHovered = hoveredIndex === index;
    const isNeighbour =
      !shouldReduceMotion &&
      hoveredIndex !== null &&
      Math.abs(hoveredIndex - index) === 1;

    const y = shouldReduceMotion ? 0 : isHovered ? -10 : isNeighbour ? -4 : 0;
    const scale = shouldReduceMotion ? 1 : isHovered ? 1.08 : 1;
    const color = isHovered ? '#c4b5fd' : '#f5f3ff';
    const textShadow = isHovered ? '0 0 20px rgba(168, 85, 247, 0.45)' : 'none';
    const fontFamily = isHovered
      ? "'Inter', sans-serif"
      : "'Instrument Serif', 'Playfair Display', Georgia, serif";
    const fontStyle = isHovered ? 'normal' : 'italic';
    const fontWeight = isHovered ? 700 : 400;

    return (
      <motion.span
        key={index}
        onMouseEnter={() => setHoveredIndex(index)}
        onMouseLeave={() => setHoveredIndex(null)}
        initial={
          shouldReduceMotion
            ? { opacity: 1, y: 0, filter: 'blur(0px)' }
            : { opacity: 0, y: 40, filter: 'blur(8px)' }
        }
        animate={{
          opacity: 1,
          filter: 'blur(0px)',
          y,
          scale,
          color,
          textShadow,
        }}
        transition={
          !hasEntered && !shouldReduceMotion
            ? { duration: 0.5, delay: 0.1 + index * 0.04, ease: 'easeOut' }
            : isHovered
            ? { type: 'spring', stiffness: 300, damping: 18 }
            : { duration: 0.4, ease: 'easeOut' }
        }
        whileTap={
          shouldReduceMotion
            ? { color: '#c4b5fd' }
            : {
                scale: 1.08,
                y: -10,
                rotate: [-4, 4, 0],
                color: '#c4b5fd',
                transition: { duration: 0.3 },
              }
        }
        className="inline-block cursor-pointer select-none"
        style={{
          fontFamily,
          fontStyle,
          fontWeight,
          WebkitTextStroke: isHovered ? 'none' : '0.04em currentColor',
          paintOrder: 'stroke fill',
          willChange: 'transform',
          transformOrigin: 'bottom center',
        }}
      >
        {char}
      </motion.span>
    );
  };

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
            aria-label="Aditya Sharma"
            className="mb-4 text-left cursor-default block"
            style={{
              fontFamily: "'Instrument Serif', 'Playfair Display', Georgia, serif",
              fontSize: 'clamp(3rem, 8vw, 6.5rem)',
              lineHeight: 1,
              letterSpacing: '-0.02em',
              color: '#f5f3ff',
              fontStyle: 'italic',
              fontWeight: 400,
              WebkitTextStroke: '0.04em #f5f3ff',
              paintOrder: 'stroke fill',
              background: 'none',
              WebkitTextFillColor: 'initial',
              textShadow: 'none',
              filter: 'none',
            }}
          >
            <span aria-hidden="true" className="inline-block">
              <span className="inline-block whitespace-nowrap">
                {FIRST_NAME.map((char, i) => renderLetter(char, i))}
              </span>
              <span className="inline-block w-[0.28em]">&nbsp;</span>
              <span className="inline-block whitespace-nowrap">
                {LAST_NAME.map((char, i) => renderLetter(char, FIRST_NAME.length + 1 + i))}
              </span>
            </span>
          </motion.h1>

          <meta itemProp="name" content="Aditya Sharma" />
          <meta itemProp="url" content="https://adityaaaaportdev.vercel.app/" />
          <span itemProp="address" itemScope itemType="https://schema.org/PostalAddress" className="hidden">
            <meta itemProp="addressLocality" content="Delhi" />
            <meta itemProp="addressCountry" content="IN" />
          </span>

          <motion.p 
            className="mb-10 font-normal text-left"
            style={{
              fontFamily: "'Inter', sans-serif",
              color: '#9a93ad',
              fontSize: 'clamp(1rem, 1.5vw, 1.1rem)',
              maxWidth: '32rem',
              lineHeight: 1.6,
            }}
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            itemProp="jobTitle"
          >
            {resumeData.basics.title}
          </motion.p>

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
              href="/Aditya_Sharma_Resume.pdf"
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
