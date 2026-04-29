import React from 'react';
import { motion } from 'motion/react';
import { resumeData } from '../data';
import { Star } from 'lucide-react';
export const Achievements: React.FC = () => {
  if (!resumeData.achievements || resumeData.achievements.length === 0) return null;
  return (
    <section id="achievements" className="py-16 px-6 max-w-6xl mx-auto overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
        className="mb-12 text-center"
      >
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-fuchsia-300 font-display sm:text-4xl mb-4">
          <span className="text-purple-500/50 font-mono text-2xl sm:text-3xl mr-2">&lt;</span>
          Achievements
          <span className="text-purple-500/50 font-mono text-2xl sm:text-3xl ml-2">/&gt;</span>
        </h2>
        <p className="text-purple-200/80 mb-6 font-medium tracking-wide">
          <span className="text-purple-500/50 font-mono mr-2">//</span>
          Highlighting key events, hackathons, and professional milestones.
        </p>
        <div className="w-24 h-1 bg-purple-500/30 mx-auto rounded-full" />
      </motion.div>
      <div className="flex flex-wrap justify-center items-center py-10 px-4 sm:px-10">
        {resumeData.achievements.map((item, index) => {
          const rotation = [-8, 6, -6, 8, -4, 5, -7, 4][index % 8];
          const yOffset = [10, -15, 20, -10, 15, -20, 5, -5][index % 8];
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8, rotate: 0, y: 80 }}
              whileInView={{ opacity: 1, scale: 1, rotate: rotation, y: yOffset }}
              whileHover={{ scale: 1.15, rotate: 0, y: yOffset - 20, zIndex: 50, transition: { type: "spring", stiffness: 400, damping: 17 } }}
              whileTap={{ scale: 1.05, zIndex: 50 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ type: "spring", stiffness: 250, damping: 20, delay: index * 0.05 }}
              className={`relative w-full max-w-[18rem] sm:max-w-none sm:w-72 h-auto sm:h-[22rem] p-4 bg-purple-900/30 backdrop-blur-xl border border-purple-400/40 rounded-2xl shadow-[0_10px_40px_rgba(139,92,246,0.25)] cursor-pointer group flex flex-col mt-6 sm:mt-0 ${index !== 0 ? 'sm:-ml-20' : ''}`}
              style={{ zIndex: index }}
            >
              <div className="w-full h-44 overflow-hidden rounded-xl bg-black/40 relative flex-shrink-0 border border-purple-500/20">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={`${item.title} — ${item.organization} | Aditya Sharma Achievement`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 group-active:scale-110"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    width="288"
                    height="176"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-purple-400">
                    <Star size={40} className="opacity-50" />
                  </div>
                )}
              </div>

              <div className="mt-4 flex flex-col flex-grow px-2">
                <h3 className="text-base font-bold text-purple-100 leading-tight mb-1 sm:line-clamp-2 group-hover:text-fuchsia-300">{item.title}</h3>
                <p className="text-xs font-medium text-purple-300/80 mb-3 sm:line-clamp-1">{item.organization}</p>
                <p className="text-[12px] sm:text-[11px] text-purple-200/80 leading-relaxed sm:line-clamp-3 mt-auto">
                  {item.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
