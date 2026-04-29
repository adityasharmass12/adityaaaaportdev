import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';

const bootSequence = [
  "Initializing boot sequence...",
  "Loading kernel modules...",
  "Mounting root filesystem...",
  "Starting network interface...",
  "Resolving dependencies...",
  "Starting user interface...",
  "Welcome to Aditya's Portfolio."
];

export const Splash: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [lines, setLines] = useState<string[]>([]);

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < bootSequence.length) {
        setLines(prev => [...prev, bootSequence[currentIndex]]);
        currentIndex++;
      } else {
        clearInterval(interval);
        setTimeout(onComplete, 600);
      }
    }, 250);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-start justify-end bg-[#090414] p-8 font-mono text-sm sm:text-base"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="w-full max-w-3xl mx-auto flex flex-col justify-end h-full pb-20">
        {lines.map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-green-400 mb-2"
          >
            <span className="text-emerald-500 mr-2">[ OK ]</span>
            {line}
          </motion.div>
        ))}
          <motion.div
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
            className="w-3 h-5 bg-purple-400 mt-2"
          />
      </div>
    </motion.div>
  );
};
