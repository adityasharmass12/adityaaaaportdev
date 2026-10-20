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
        <h2 className="section-heading heading-gradient mb-4">Additional Info</h2>
        <div className="w-24 h-1 bg-blue-500/30 dark:bg-blue-400/30 mx-auto rounded-full" />
      </motion.div>

      <div className="space-y-4">
        {resumeData.extra.map((item, index) => {
          const text = typeof item === 'string' ? item : Object.values(item as Record<string, unknown>)
            .filter((value) => typeof value === 'string' && value.trim().length > 0)
            .join(' • ');

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              whileHover={{ scale: 1.02, x: 10 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: index * 0.15, type: "spring", stiffness: 250, damping: 20 }}
              className="flex items-start gap-4 p-5 rounded-xl transition-all border border-[rgba(15,23,42,0.10)] dark:border-[rgba(59,130,246,0.14)] bg-white dark:bg-[rgba(8,12,22,0.7)] dark:backdrop-blur-xl hover:border-[rgba(37,99,235,0.35)] dark:hover:border-blue-500/30 shadow-[0_1px_2px_rgba(15,23,42,0.06),0_6px_20px_rgba(15,23,42,0.08),0_16px_40px_rgba(37,99,235,0.08)] dark:shadow-[0_8px_32px_rgba(2,3,5,0.6)] hover:shadow-[0_12px_32px_rgba(37,99,235,0.18)]"
            >
              <div className="mt-1 text-blue-600 dark:text-sky-400">
                <Sparkles size={24} />
              </div>
              <p className="text-[#334155] dark:text-[#dbe7ff] leading-loose font-medium tracking-wide text-lg">{text}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
