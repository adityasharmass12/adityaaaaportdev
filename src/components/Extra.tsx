import React from 'react';
import { motion } from 'motion/react';
import { resumeData } from '../data';
import { Sparkles } from 'lucide-react';

export const Extra: React.FC = () => {
  return (
    <section id="extra" className="py-16 px-6 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
        className="mb-10 text-center"
      >
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-fuchsia-300 font-display sm:text-4xl mb-4">Additional Info</h2>
        <div className="w-24 h-1 bg-purple-500/30 mx-auto rounded-full" />
      </motion.div>

      <div className="space-y-4">
        {resumeData.achievements.map((item, index) => {
          const text = typeof item === 'string' ? item : Object.values(item as Record<string, unknown>)
            .filter((value) => typeof value === 'string' && value.trim().length > 0)
            .join(' • ');

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              whileHover={{ scale: 1.02, x: 10, backgroundColor: "rgba(168,85,247,0.1)" }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: index * 0.15, type: "spring", stiffness: 250, damping: 20 }}
              className="flex items-start gap-4 p-5 rounded-xl transition-all border border-purple-500/20 bg-purple-900/10 backdrop-blur-xl hover:border-purple-500/40 shadow-[0_4px_24px_rgba(168,85,247,0.1)] hover:shadow-[0_8px_32px_rgba(168,85,247,0.2)]"
            >
              <div className="mt-1 text-emerald-400">
                <Sparkles size={24} />
              </div>
              <p className="text-purple-50 leading-loose font-medium tracking-wide text-lg">{text}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
