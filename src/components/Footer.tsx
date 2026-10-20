import React, { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowUp } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const Footer: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const shouldReduceMotion = useReducedMotion();
  const [time, setTime] = useState(() => formatIndiaTime());

  useEffect(() => {
    const id = setInterval(() => setTime(formatIndiaTime()), 1000);
    return () => clearInterval(id);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: 18 } as const,
    whileInView: { opacity: 1, y: 0 } as const,
    viewport: { once: true, amount: 0.15 as const },
    transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <footer
      role="contentinfo"
      className="relative overflow-hidden"
      style={{ minHeight: 420 }}
    >
      {/* ── Perspective grid floor ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          perspective: 600,
          overflow: 'hidden',
        }}
      >
        <div
          className="footer-grid-floor"
          style={{
            position: 'absolute',
            left: '-20%',
            right: '-20%',
            bottom: 0,
            height: '200%',
            transformOrigin: 'bottom center',
            transform: 'rotateX(60deg)',
            backgroundImage: [
              `repeating-linear-gradient(90deg, ${isDark ? 'rgba(59,130,246,0.35)' : 'rgba(37,99,235,0.18)'} 0 1px, transparent 1px 60px)`,
              `repeating-linear-gradient(0deg, ${isDark ? 'rgba(59,130,246,0.35)' : 'rgba(37,99,235,0.18)'} 0 1px, transparent 1px 60px)`,
            ].join(', '),
            backgroundSize: '60px 60px',
            maskImage:
              'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 75%), radial-gradient(ellipse 80% 90% at 50% 100%, black 30%, transparent 70%)',
            WebkitMaskImage:
              'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 75%), radial-gradient(ellipse 80% 90% at 50% 100%, black 30%, transparent 70%)',
            maskComposite: 'intersect',
            WebkitMaskComposite: 'source-in' as any,
            animation: shouldReduceMotion ? 'none' : 'footerGridScroll 12s linear infinite',
          }}
        />
      </div>

      {/* ── Big watermark ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 flex items-end justify-center pointer-events-none select-none overflow-hidden"
      >
        <span
          style={{
            fontSize: 'clamp(6rem, 22vw, 20rem)',
            fontWeight: 800,
            lineHeight: 0.85,
            color: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(10,22,51,0.05)',
            transform: 'translateY(18%)',
            whiteSpace: 'nowrap',
          }}
        >
          ADITYA
        </span>
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 pt-16 pb-10 flex flex-col min-h-[420px]">
        {/* Top section: status + headline + scroll-to-top */}
        <div className="flex-1 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div className="flex flex-col gap-5">
            {/* Status label */}
            <motion.div {...fadeUp(0)} className="flex items-center gap-2.5">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-60" />
                <span className="relative rounded-full h-2.5 w-2.5 bg-emerald-400" />
              </span>
              <span
                className="font-mono uppercase text-[0.65rem] tracking-[0.3em]"
                style={{ color: 'var(--foreground-subtle)' }}
              >
                STATUS_AVAILABLE
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h2
              {...fadeUp(0.08)}
              className="font-heading"
              style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 600,
                fontSize: 'clamp(1.6rem, 4.5vw, 2.6rem)',
                lineHeight: 1.15,
                maxWidth: '28rem',
                color: 'var(--heading)',
              }}
            >
              Building{' '}
              <em
                style={{
                  fontFamily: "'Instrument Serif', 'Playfair Display', Georgia, serif",
                  fontStyle: 'italic',
                  fontWeight: 400,
                  color: 'var(--foreground-muted)',
                }}
              >
                intelligent
              </em>{' '}
              systems with care.
            </motion.h2>
          </div>

          {/* Scroll-to-top button */}
          <motion.div {...fadeUp(0.16)} className="flex md:justify-end">
            <button
              onClick={scrollToTop}
              aria-label="Scroll to top"
              className="group w-11 h-11 rounded-full flex items-center justify-center border transition-all duration-200 cursor-pointer"
              style={{
                background: isDark ? 'rgba(8,12,22,0.6)' : 'rgba(255,255,255,0.6)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                borderColor: isDark ? 'rgba(59,130,246,0.2)' : 'rgba(15,23,42,0.12)',
                color: isDark ? '#93c5fd' : '#2563eb',
              }}
            >
              <ArrowUp size={18} className="group-hover:-translate-y-[3px] transition-transform duration-200" />
            </button>
          </motion.div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="mt-auto pt-10 flex flex-col md:flex-row items-center md:justify-between gap-4">
          <div className="text-center md:text-left flex flex-col gap-1">
            <motion.p
              {...fadeUp(0.24)}
              className="text-xs"
              style={{ color: 'var(--foreground-subtle)' }}
            >
              © 2026 adityaaaportdev | Aditya Sharma. All rights reserved.
            </motion.p>
            <motion.p
              {...fadeUp(0.32)}
              className="text-xs font-medium"
              style={{ color: isDark ? '#0ea5e9' : '#0369a1' }}
            >
              Designed and Built by Aditya Sharma
            </motion.p>
          </div>

          {/* Local time */}
          <motion.div
            {...fadeUp(0.36)}
            className="font-mono text-[0.65rem] tracking-wide text-center md:text-right"
            style={{ color: 'var(--foreground-subtle)' }}
          >
            LOCAL_TIME:{' '}
            <span style={{ color: '#22c55e' }}>
              {time} UTC+5:30
            </span>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

function formatIndiaTime(): string {
  return new Date().toLocaleTimeString('en-GB', {
    timeZone: 'Asia/Kolkata',
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
}
