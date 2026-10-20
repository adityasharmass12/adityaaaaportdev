import React from 'react';
import { motion } from 'motion/react';
import { resumeData } from '../data';
import { SpotlightCard } from './SpotlightCard';

export const About: React.FC = () => {
  return (
    <section id="about" aria-label="About Aditya Sharma" className="py-16 px-6 max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
        className="mb-10 text-center"
      >
        <h2 className="section-heading heading-gradient mb-4">
          <span className="text-sky-500 dark:text-sky-400 font-mono text-2xl sm:text-3xl mr-2">&lt;</span>
          About Aditya Sharma 
          <span className="text-sky-500 dark:text-sky-400 font-mono text-2xl sm:text-3xl ml-2">/&gt;</span>
        </h2>
        <div className="w-24 h-1 bg-blue-500/30 dark:bg-blue-400/30 mx-auto rounded-full" />
      </motion.div>
      <SpotlightCard
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        whileHover={{ scale: 1.01, transition: { type: "spring", stiffness: 400, damping: 17 } }}
        className="p-8 sm:p-10 border border-[rgba(15,23,42,0.10)] dark:border-[rgba(59,130,246,0.14)] bg-white dark:bg-[rgba(8,12,22,0.7)] dark:backdrop-blur-2xl rounded-2xl shadow-[0_1px_2px_rgba(15,23,42,0.06),0_6px_20px_rgba(15,23,42,0.08),0_16px_40px_rgba(37,99,235,0.08)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.6)] hover:border-[rgba(37,99,235,0.35)] dark:hover:border-blue-500/40 hover:shadow-[0_12px_32px_rgba(37,99,235,0.18)] relative overflow-hidden transition-all"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl -ml-32 -mb-32 pointer-events-none" />
        
        <div className="relative z-10 flex flex-col items-center w-full">
          <div className="w-full bg-[#0a1633] dark:bg-[#050811] rounded-xl border border-[rgba(15,23,42,0.1)] dark:border-blue-500/20 overflow-hidden mb-10 shadow-2xl backdrop-blur-sm">
            <div className="flex items-center px-4 py-3 bg-slate-900/60 dark:bg-[#070c18] border-b border-blue-500/15">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
              </div>
              <div className="mx-auto text-xs text-slate-400 dark:text-blue-300/60 font-mono">about.txt</div>
            </div>
            <div className="p-6 text-left font-mono text-sm sm:text-base leading-relaxed text-slate-200 dark:text-blue-100/90">
              <div className="mb-4">
                <span className="text-sky-400 font-semibold">aditya</span>
                <span className="text-blue-400">@portfolio</span>
                <span className="text-white">:</span>
                <span className="text-sky-300">~/about</span>
                <span className="text-white">$ </span>
                <span className="text-blue-100 font-medium">cat summary.txt</span>
              </div>
              <p className="text-slate-200/95 dark:text-blue-100/80 leading-relaxed font-sans text-sm sm:text-base" itemProp="description">
                {resumeData.basics.summary}
              </p>
              <div className="mt-4 flex items-center">
                <span className="text-sky-400 font-semibold">aditya</span>
                <span className="text-blue-400">@portfolio</span>
                <span className="text-white">:</span>
                <span className="text-sky-300">~/about</span>
                <span className="text-white">$ </span>
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
                  className="inline-block w-2.5 h-5 ml-2 bg-sky-400/80 align-middle"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full mt-4">
            <motion.div 
              whileHover={{ scale: 1.05, y: -5, transition: { type: "spring", stiffness: 400, damping: 17 } }}
              className="flex flex-col items-center justify-center p-6 bg-white dark:bg-[rgba(8,12,22,0.7)] dark:backdrop-blur-xl border border-[rgba(15,23,42,0.10)] dark:border-[rgba(59,130,246,0.14)] rounded-2xl shadow-[0_1px_2px_rgba(15,23,42,0.06),0_6px_20px_rgba(15,23,42,0.08),0_16px_40px_rgba(37,99,235,0.08)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.6)] hover:border-[rgba(37,99,235,0.35)] dark:hover:border-blue-500/40 hover:shadow-[0_12px_32px_rgba(37,99,235,0.18)] transition-all"
            >
              <span className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-sky-400 dark:from-sky-300 dark:to-blue-400 mb-2">5+</span>
              <span className="text-sm sm:text-base text-[#334155] dark:text-blue-200/80 font-medium text-center">Hackathons</span>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05, y: -5, transition: { type: "spring", stiffness: 400, damping: 17 } }}
              className="flex flex-col items-center justify-center p-6 bg-white dark:bg-[rgba(8,12,22,0.7)] dark:backdrop-blur-xl border border-[rgba(15,23,42,0.10)] dark:border-[rgba(59,130,246,0.14)] rounded-2xl shadow-[0_1px_2px_rgba(15,23,42,0.06),0_6px_20px_rgba(15,23,42,0.08),0_16px_40px_rgba(37,99,235,0.08)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.6)] hover:border-[rgba(37,99,235,0.35)] dark:hover:border-blue-500/40 hover:shadow-[0_12px_32px_rgba(37,99,235,0.18)] transition-all"
            >
              <span className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-sky-400 dark:from-sky-300 dark:to-blue-400 mb-2">10+</span>
              <span className="text-sm sm:text-base text-[#334155] dark:text-blue-200/80 font-medium text-center">Events Attended & Volunteered</span>
            </motion.div>
          </div>
        </div>
      </SpotlightCard>
    </section>
  );
};
