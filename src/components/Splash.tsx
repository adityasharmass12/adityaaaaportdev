import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';

const bootSequence = [
  '> initializing portfolio...',
  '> loading modules [██████████] 100%',
  '> welcome, Explorer ✦',
];

export const Splash: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [lines, setLines] = useState<string[]>([]);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const startedAt = performance.now();
    let loadReady = document.readyState === 'complete';
    let fontsReady = false;
    let imageReady = false;
    let finished = false;
    let exitTimer: number | undefined;
    let maxTimer: number | undefined;

    const finishWhenReady = () => {
      if (finished || !loadReady || !fontsReady || !imageReady) return;
      const wait = Math.max(0, 2000 - (performance.now() - startedAt));
      window.setTimeout(() => {
        if (finished) return;
        finished = true;
        setExiting(true);
        exitTimer = window.setTimeout(() => {
          sessionStorage.setItem('portfolio-preloader-seen', 'true');
          document.body.style.overflow = '';
          onComplete();
        }, reducedMotion ? 300 : 700);
      }, wait);
    };

    const handleLoad = () => {
      loadReady = true;
      finishWhenReady();
    };
    if (!loadReady) window.addEventListener('load', handleLoad, { once: true });

    document.fonts.ready.then(() => {
      fontsReady = true;
      finishWhenReady();
    });

    const image = new Image();
    image.onload = () => {
      imageReady = true;
      finishWhenReady();
    };
    image.onerror = () => {
      imageReady = true;
      finishWhenReady();
    };
    image.src = '/assets/hero-cutout.png';

    maxTimer = window.setTimeout(() => {
      loadReady = true;
      fontsReady = true;
      imageReady = true;
      finishWhenReady();
    }, 4000);

    if (reducedMotion) {
      setLines(bootSequence);
    } else {
      bootSequence.forEach((_, index) => {
        window.setTimeout(() => setLines((current) => [...current, bootSequence[index]]), index * 450);
      });
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('load', handleLoad);
      if (exitTimer) window.clearTimeout(exitTimer);
      if (maxTimer) window.clearTimeout(maxTimer);
    };
  }, [onComplete]);

  return (
    <motion.div
      className={`preloader fixed inset-0 z-[9999] flex flex-col items-start justify-end p-8 font-mono text-sm sm:text-base ${exiting ? 'preloader-exiting' : ''}`}
      initial={{ opacity: 1 }}
      animate={exiting ? { opacity: 0, y: -20 } : { opacity: 1, y: 0 }}
      transition={{ duration: exiting ? 0.7 : 0, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="w-full max-w-3xl mx-auto flex flex-col justify-end h-full pb-20">
        {lines.map((line, index) => (
          <div key={index} className="text-sky-400 mb-2">{line}</div>
        ))}
        <motion.div
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.8, repeat: Infinity, ease: 'easeInOut' }}
          className="w-3 h-5 bg-blue-400 mt-2"
        />
        <div className="mt-6 h-px w-full max-w-sm overflow-hidden bg-blue-500/20">
          <div className="preloader-progress h-full bg-sky-400" />
        </div>
      </div>
    </motion.div>
  );
};
