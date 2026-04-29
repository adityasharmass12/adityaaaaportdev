import React from 'react';
import { motion } from 'motion/react';
import { resumeData } from '../data';
import { Code2 } from 'lucide-react';
import { SiC, SiCplusplus, SiPython, SiHtml5, SiCss, SiJavascript } from 'react-icons/si';

const getSkillIcon = (skillName: string) => {
  switch (skillName.toLowerCase()) {
    case 'c': return <span className="text-blue-500"><SiC /></span>;
    case 'c++': return <span className="text-blue-600"><SiCplusplus /></span>;
    case 'python': return <span className="text-yellow-500"><SiPython /></span>;
    case 'html': return <span className="text-orange-500"><SiHtml5 /></span>;
    case 'css': return <span className="text-blue-400"><SiCss /></span>;
    case 'javascript': return <span className="text-yellow-400"><SiJavascript /></span>;
    default: return null;
  }
};

export const Skills: React.FC = () => {
  return (
    <section id="skills" aria-label="Technical Skills and Expertise" className="py-16 px-6 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
        className="mb-10 text-center"
      >
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-fuchsia-300 font-display sm:text-4xl mb-4">
          <span className="text-emerald-500/50 font-mono text-2xl sm:text-3xl mr-2">&lt;</span>
          Skills & Expertise
          <span className="text-emerald-500/50 font-mono text-2xl sm:text-3xl ml-2">/&gt;</span>
        </h2>
        <div className="w-24 h-1 bg-purple-500/30 mx-auto rounded-full" />
      </motion.div>

      <div className="grid gap-8 md:grid-cols-3">
        {resumeData.skills.map((skillGroup, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05, y: -5, boxShadow: "0px 10px 30px rgba(139,92,246,0.15)", transition: { type: "spring", stiffness: 400, damping: 17 } }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: index * 0.15, duration: 0.5 }}
            className="p-6 border border-purple-500/30 bg-purple-900/10 backdrop-blur-xl rounded-2xl shadow-[0_8px_32px_0_rgba(139,92,246,0.15)] hover:bg-purple-900/20 hover:shadow-[0_12px_40px_rgba(139,92,246,0.25)] transition-all"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-purple-500/20 rounded-lg text-purple-300">
                <Code2 size={20} />
              </div>
              <h3 className="text-lg font-semibold text-purple-100">{skillGroup.group}</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {skillGroup.items.map((skill, i) => {
                const icon = getSkillIcon(skill);
                return (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15 + i * 0.05, duration: 0.3 }}
                    whileHover={{ scale: 1.05, backgroundColor: "rgba(168,85,247,0.2)", borderColor: "rgba(168,85,247,0.4)" }}
                    className="flex items-center gap-2 px-3 py-1.5 text-sm text-purple-200 bg-purple-500/10 border border-purple-500/20 rounded-full cursor-default"
                  >
                    {icon && <span className="text-base">{icon}</span>}
                    {skill}
                  </motion.span>
                );
              })}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
