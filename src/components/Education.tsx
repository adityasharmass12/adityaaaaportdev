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
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-fuchsia-300 font-display sm:text-4xl mb-4">Education</h2>
        <div className="w-24 h-1 bg-purple-500/30 mx-auto rounded-full" />
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
            <SpotlightCard className="p-6 sm:p-8 border border-purple-500/30 bg-purple-900/10 backdrop-blur-2xl rounded-2xl overflow-hidden shadow-[0_8px_32px_0_rgba(139,92,246,0.15)] hover:bg-purple-900/20 transition-all">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <motion.div 
                    whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                    className="p-3 bg-purple-500/20 rounded-xl text-purple-300 shrink-0"
                  >
                    <GraduationCap size={24} />
                  </motion.div>
                  <div>
                    <h3 className="text-xl font-semibold text-purple-100">{edu.institution}</h3>
                    {edu.degree && <p className="text-purple-300/80 mt-1">{edu.degree}</p>}
                    
                    <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-purple-300/60">
                      {edu.dates && (
                        <div className="flex items-center gap-1.5">
                          <Calendar size={16} />
                          <span>{edu.dates}</span>
                        </div>
                      )}
                      {(edu as any).score && (
                        <div className="flex items-center gap-1.5">
                          <Award size={16} />
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
