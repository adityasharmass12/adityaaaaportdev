import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { resumeData } from '../data';
import { Briefcase, ChevronDown } from 'lucide-react';
import { SpotlightCard } from './SpotlightCard';

export const Experience: React.FC = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  return (
    <section id="experience" aria-label="Professional Experience" className="py-16 px-6 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
        className="mb-10 text-center"
      >
        <h2 className="section-heading heading-gradient mb-4">Experience</h2>
        <div className="w-24 h-1 bg-blue-500/30 dark:bg-blue-400/30 mx-auto rounded-full" />
      </motion.div>

      <div className="space-y-6 relative">
        <div className="absolute left-[2.25rem] top-12 bottom-12 w-px bg-gradient-to-b from-blue-500/50 via-sky-500/50 to-transparent hidden md:block"></div>
        
        {resumeData.experience.map((exp, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: index * 0.15, duration: 0.5 }}
            className="relative flex items-start gap-6"
          >
            <div className="hidden md:flex flex-col items-center mt-10 z-10 ml-7">
              <motion.div 
                animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7], boxShadow: ["0 0 10px rgba(59,130,246,0.5)", "0 0 20px rgba(59,130,246,0.8)", "0 0 10px rgba(59,130,246,0.5)"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: index * 0.2 }}
                className="w-3 h-3 rounded-full bg-white dark:bg-[#020305] border-2 border-blue-500 dark:border-sky-400"
              />
            </div>

            <SpotlightCard
              className="flex-1 border border-[rgba(15,23,42,0.10)] dark:border-[rgba(59,130,246,0.14)] bg-white dark:bg-[rgba(8,12,22,0.7)] dark:backdrop-blur-2xl rounded-2xl overflow-hidden shadow-[0_1px_2px_rgba(15,23,42,0.06),0_6px_20px_rgba(15,23,42,0.08),0_16px_40px_rgba(37,99,235,0.08)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.6)] hover:border-[rgba(37,99,235,0.35)] dark:hover:border-blue-500/40 transition-all"
            >
            <button
              onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
              className="w-full px-6 py-6 flex items-center justify-between text-left hover:bg-[#f1f5fb] dark:hover:bg-blue-500/10 transition-colors relative z-10 cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-[#f1f5fb] border border-[rgba(15,23,42,0.08)] dark:border-transparent dark:bg-blue-500/20 rounded-xl text-blue-600 dark:text-sky-300">
                  <Briefcase size={24} />
                </div>
                <div>
                  <h3 className="section-subheading text-xl text-[#0a1633] dark:text-[#dbe7ff]">{exp.role}</h3>
                  <p className="text-blue-600 dark:text-sky-400 font-medium">{exp.company}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="hidden sm:block text-sm text-[#64748b] dark:text-blue-300/60">{exp.dates}</span>
                <motion.div
                  animate={{ rotate: expandedIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="text-blue-500 dark:text-sky-400" />
                </motion.div>
              </div>
            </button>
            
            <AnimatePresence>
              {expandedIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="relative z-10"
                >
                  <div className="px-6 pb-6 pt-2 border-t border-[rgba(15,23,42,0.08)] dark:border-[rgba(59,130,246,0.14)]">
                    <span className="sm:hidden block text-sm text-[#64748b] dark:text-blue-300/60 mb-4">{exp.dates}</span>
                    {exp.bullets.length > 0 && (
                      <ul className="space-y-2">
                        {exp.bullets.map((bullet, i) => (
                          <li key={i} className="text-[#334155] dark:text-[#a3b0cc] flex items-start gap-2">
                            <span className="text-blue-500 dark:text-sky-400 mt-1.5">•</span>
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </SpotlightCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
