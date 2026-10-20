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
    case 'css': return <span className="text-sky-500"><SiCss /></span>;
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
        <h2 className="section-heading heading-gradient mb-4">
          <span className="text-sky-500 dark:text-sky-400 font-mono text-2xl sm:text-3xl mr-2">&lt;</span>
          Skills & Expertise
          <span className="text-sky-500 dark:text-sky-400 font-mono text-2xl sm:text-3xl ml-2">/&gt;</span>
        </h2>
        <div className="w-24 h-1 bg-blue-500/30 dark:bg-blue-400/30 mx-auto rounded-full" />
      </motion.div>

      <div className="grid gap-8 md:grid-cols-3">
        {resumeData.skills.map((skillGroup, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05, y: -5, transition: { type: "spring", stiffness: 400, damping: 17 } }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: index * 0.15, duration: 0.5 }}
            className="p-6 border border-[rgba(15,23,42,0.10)] dark:border-[rgba(59,130,246,0.14)] bg-white dark:bg-[rgba(8,12,22,0.7)] dark:backdrop-blur-xl rounded-2xl shadow-[0_1px_2px_rgba(15,23,42,0.06),0_6px_20px_rgba(15,23,42,0.08),0_16px_40px_rgba(37,99,235,0.08)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.6)] hover:border-[rgba(37,99,235,0.35)] dark:hover:border-blue-500/40 hover:shadow-[0_12px_32px_rgba(37,99,235,0.18)] transition-all"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-[#f1f5fb] border border-[rgba(15,23,42,0.08)] dark:border-transparent dark:bg-blue-500/20 rounded-lg text-blue-600 dark:text-sky-300">
                <Code2 size={20} />
              </div>
              <h3 className="section-subheading text-lg text-[#0a1633] dark:text-[#dbe7ff]">{skillGroup.group}</h3>
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
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-2 px-3 py-1.5 text-sm text-[#0a1633] dark:text-[#dbe7ff] bg-[#f1f5fb] dark:bg-[rgba(8,12,22,0.85)] border border-[rgba(15,23,42,0.08)] dark:border-[rgba(59,130,246,0.14)] rounded-full hover:border-[rgba(37,99,235,0.35)] hover:bg-[#e6eef9] dark:hover:bg-blue-500/15 transition-all cursor-default"
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
