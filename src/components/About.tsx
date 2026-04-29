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
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-fuchsia-300 font-display sm:text-4xl mb-4">
          <span className="text-emerald-500/50 font-mono text-2xl sm:text-3xl mr-2">&lt;</span>
          About adityaaaportdev
          <span className="text-emerald-500/50 font-mono text-2xl sm:text-3xl ml-2">/&gt;</span>
        </h2>
        <div className="w-24 h-1 bg-purple-500/30 mx-auto rounded-full" />
      </motion.div>
      <SpotlightCard
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        whileHover={{ scale: 1.01, boxShadow: "0px 10px 40px rgba(139,92,246,0.15)", transition: { type: "spring", stiffness: 400, damping: 17 } }}
        className="p-8 sm:p-10 border border-purple-500/30 bg-purple-900/10 backdrop-blur-2xl rounded-2xl shadow-[0_8px_32px_0_rgba(139,92,246,0.1)] relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-fuchsia-500/10 rounded-full blur-3xl -ml-32 -mb-32 pointer-events-none" />
        
        <div className="relative z-10 flex flex-col items-center w-full">
          <div className="w-full bg-[#090414]/80 rounded-xl border border-purple-500/30 overflow-hidden mb-10 shadow-2xl backdrop-blur-sm">
            <div className="flex items-center px-4 py-3 bg-purple-900/40 border-b border-purple-500/30">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
              </div>
              <div className="mx-auto text-xs text-purple-300/60 font-mono">about.txt</div>
            </div>
            <div className="p-6 text-left font-mono text-sm sm:text-base leading-relaxed text-purple-200/90">
              <div className="mb-4">
                <span className="text-fuchsia-400">aditya</span>
                <span className="text-purple-400">@portfolio</span>
                <span className="text-white">:</span>
                <span className="text-blue-400">~/about</span>
                <span className="text-white">$ </span>
                <span className="text-purple-100">cat summary.txt</span>
              </div>
              <p className="text-purple-100/80 leading-relaxed" itemProp="description">
                {resumeData.basics.summary}
              </p>
              <div className="mt-4 flex items-center">
                <span className="text-fuchsia-400">aditya</span>
                <span className="text-purple-400">@portfolio</span>
                <span className="text-white">:</span>
                <span className="text-blue-400">~/about</span>
                <span className="text-white">$ </span>
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
                  className="inline-block w-2.5 h-5 ml-2 bg-purple-400/80 align-middle"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full mt-4">
            <motion.div 
              whileHover={{ scale: 1.05, y: -5, transition: { type: "spring", stiffness: 400, damping: 17 } }}
              className="flex flex-col items-center justify-center p-6 bg-purple-900/20 backdrop-blur-xl border border-purple-500/30 rounded-2xl shadow-lg hover:shadow-[0_8px_32px_rgba(168,85,247,0.2)] hover:bg-purple-900/30 transition-all"
            >
              <span className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300 mb-2">5+</span>
              <span className="text-sm sm:text-base text-purple-200/80 font-medium text-center">Hackathons</span>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05, y: -5, transition: { type: "spring", stiffness: 400, damping: 17 } }}
              className="flex flex-col items-center justify-center p-6 bg-purple-900/20 backdrop-blur-xl border border-purple-500/30 rounded-2xl shadow-lg hover:shadow-[0_8px_32px_rgba(168,85,247,0.2)] hover:bg-purple-900/30 transition-all"
            >
              <span className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300 mb-2">10+</span>
              <span className="text-sm sm:text-base text-purple-200/80 font-medium text-center">Events Attended & Volunteered</span>
            </motion.div>
          </div>
        </div>
      </SpotlightCard>
    </section>
  );
};
