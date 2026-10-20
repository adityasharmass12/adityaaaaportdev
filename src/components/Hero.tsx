import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { resumeData } from '../data';
import { Download, ChevronDown } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const FIRST_NAME = 'Aditya'.split('');
const LAST_NAME = 'Sharma'.split('');

export const Hero: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [hasEntered, setHasEntered] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

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
    const defaultColor = isDark ? '#f5f8ff' : '#0a1633';
    const hoverColor = isDark ? '#93c5fd' : '#2563eb';
    const color = isHovered ? hoverColor : defaultColor;
    const textShadow = isHovered 
      ? (isDark ? '0 0 16px rgba(59, 130, 246, 0.35)' : '0 0 16px rgba(37, 99, 235, 0.25)') 
      : 'none';
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
            ? { color: hoverColor }
            : {
                scale: 1.08,
                y: -10,
                rotate: [-4, 4, 0],
                color: hoverColor,
                transition: { duration: 0.3 },
              }
        }
        className="inline-block cursor-pointer select-none"
        style={{
          fontFamily,
          fontStyle,
          fontWeight,
          WebkitTextStroke: isHovered ? 'none' : (isDark ? '0.04em #f5f8ff' : '0.04em #0a1633'),
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
            className="mb-6 text-[10px] sm:text-sm font-mono text-[#475569] dark:text-blue-400/60 break-words"
          >
            <span className="text-[#1d4ed8] dark:text-sky-400 font-semibold">import</span> {'{'} Developer {'}'} <span className="text-[#1d4ed8] dark:text-sky-400 font-semibold">from</span> <span className="text-[#0f766e] dark:text-emerald-400 font-medium">'@adityaaaportdev'</span>;
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
              color: isDark ? '#f5f8ff' : '#0a1633',
              fontStyle: 'italic',
              fontWeight: 400,
              WebkitTextStroke: isDark ? '0.04em #f5f8ff' : '0.04em #0a1633',
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
            className="mb-10 font-normal text-left text-[#334155] dark:text-[#a3b0cc]"
            style={{
              fontFamily: "'Inter', sans-serif",
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
              whileHover={{ scale: 1.05, boxShadow: "0px 0px 24px rgba(59,130,246,0.35)", transition: { type: "spring", stiffness: 400, damping: 17 } }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center gap-2 px-8 py-4 text-sm font-semibold text-white transition-all duration-200 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 rounded-full shadow-[0_8px_24px_rgba(37,99,235,0.28)] border border-blue-400/30 cursor-pointer"
            >
              About Me
              <ChevronDown size={18} />
            </motion.a>
            <motion.a
              href="/Aditya_Sharma_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, boxShadow: isDark ? "0px 0px 20px rgba(59,130,246,0.25)" : "0 12px 32px rgba(37,99,235,0.18)", transition: { type: "spring", stiffness: 400, damping: 17 } }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center gap-2 px-8 py-4 text-sm font-semibold text-[#1d4ed8] dark:text-[#dbe7ff] transition-colors duration-200 rounded-full border border-[rgba(37,99,235,0.35)] dark:border-[rgba(59,130,246,0.22)] bg-white dark:bg-[rgba(8,12,22,0.7)] hover:bg-[#f1f5fb] dark:hover:bg-[rgba(15,27,61,0.85)] shadow-[0_1px_2px_rgba(15,23,42,0.06),0_6px_20px_rgba(15,23,42,0.08),0_16px_40px_rgba(37,99,235,0.08)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.6)] group cursor-pointer"
            >
              My Resume
              <Download size={18} />
              <span className="hidden sm:flex items-center gap-1 ml-2 text-[10px] text-blue-600 dark:text-blue-300/60 font-mono opacity-0 group-hover:opacity-100 transition-opacity">
                Press <kbd className="px-1.5 py-0.5 rounded-md bg-[#f1f5fb] dark:bg-blue-500/10 border border-[rgba(15,23,42,0.08)] dark:border-blue-500/30 text-[#1d4ed8] dark:text-sky-400">R</kbd>
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
            <div className="hidden dark:block absolute inset-0 bg-gradient-to-tr from-blue-600/20 via-sky-500/10 to-blue-500/20 rounded-3xl blur-xl transform rotate-6 scale-105 pointer-events-none" />
            <div className="relative aspect-[3/4] rounded-3xl overflow-hidden border border-[rgba(37,99,235,0.20)] dark:border-[rgba(59,130,246,0.18)] shadow-[0_12px_40px_rgba(37,99,235,0.22)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.8)] group backdrop-blur-xl bg-transparent">
              <div className="hidden dark:block absolute inset-0 bg-gradient-to-t from-[#020305]/80 via-[#020305]/20 to-transparent z-10 transition-opacity duration-500 group-hover:opacity-30 pointer-events-none" />
              <img
                src="/my-image.jpg.jpeg"
                alt="Aditya Sharma — AI/ML Developer and Full-Stack Engineer based in Delhi, India"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
                itemProp="image"
                loading="eager"
                width="320"
                height="427"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 z-20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out flex items-center justify-between">
                <p className="text-blue-600 dark:text-sky-400 font-mono text-sm font-semibold bg-white dark:bg-[#020305]/90 px-3 py-1.5 rounded-lg border border-[rgba(15,23,42,0.10)] dark:border-[rgba(59,130,246,0.14)] shadow-[0_1px_2px_rgba(15,23,42,0.06),0_6px_20px_rgba(15,23,42,0.08),0_16px_40px_rgba(37,99,235,0.08)]">Hello World 👋</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
