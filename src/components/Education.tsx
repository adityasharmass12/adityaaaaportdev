import React from 'react';
import { motion } from 'motion/react';
import { resumeData } from '../data';
import { GraduationCap, Calendar, Award } from 'lucide-react';
import { SpotlightCard } from './SpotlightCard';

export const Education: React.FC = () => {
  return (
    <section id="education" aria-label="Education Background" className="py-16 px-6 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
        className="mb-10 text-center"
      >
        <h2 className="section-heading heading-gradient mb-4">Education</h2>
        <div className="w-24 h-1 bg-blue-500/30 dark:bg-blue-400/30 mx-auto rounded-full" />
      </motion.div>

      <div className="space-y-6">
        {resumeData.education.map((edu, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          >
            <SpotlightCard className="p-6 sm:p-8 border border-[rgba(15,23,42,0.10)] dark:border-[rgba(59,130,246,0.14)] bg-white dark:bg-[rgba(8,12,22,0.7)] dark:backdrop-blur-2xl rounded-2xl overflow-hidden shadow-[0_1px_2px_rgba(15,23,42,0.06),0_6px_20px_rgba(15,23,42,0.08),0_16px_40px_rgba(37,99,235,0.08)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.6)] hover:border-[rgba(37,99,235,0.35)] dark:hover:border-blue-500/40 hover:shadow-[0_12px_32px_rgba(37,99,235,0.18)] transition-all">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <motion.div 
                    whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                    className="p-3 bg-[#f1f5fb] border border-[rgba(15,23,42,0.08)] dark:border-transparent dark:bg-blue-500/20 rounded-xl text-blue-600 dark:text-sky-300 shrink-0"
                  >
                    <GraduationCap size={24} />
                  </motion.div>
                  <div>
                    <h3 className="section-subheading text-xl text-[#0a1633] dark:text-[#dbe7ff]">{edu.institution}</h3>
                    {edu.degree && <p className="text-[#334155] dark:text-[#a3b0cc] mt-1">{edu.degree}</p>}
                    
                    <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-[#64748b] dark:text-[#7585a8]">
                      {edu.dates && (
                        <div className="flex items-center gap-1.5 bg-[#f1f5fb] dark:bg-transparent border border-[rgba(15,23,42,0.08)] dark:border-transparent px-3 py-1 rounded-full text-xs font-medium text-[#334155] dark:text-[#7585a8]">
                          <Calendar size={14} className="text-blue-600 dark:text-sky-400" />
                          <span>{edu.dates}</span>
                        </div>
                      )}
                      {(edu as any).score && (
                        <div className="flex items-center gap-1.5 bg-[#f1f5fb] dark:bg-transparent border border-[rgba(15,23,42,0.08)] dark:border-transparent px-3 py-1 rounded-full text-xs font-medium text-[#334155] dark:text-[#7585a8]">
                          <Award size={14} className="text-blue-600 dark:text-sky-400" />
                          <span>{(edu as any).score}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </SpotlightCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
