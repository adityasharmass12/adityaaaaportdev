import React from 'react';
import { motion } from 'motion/react';
import { resumeData } from '../data';
import { FolderGit2, Github, Code2, ExternalLink, BrainCircuit, ScanFace, LayoutDashboard, Globe, Shield } from 'lucide-react';
import { SpotlightCard } from './SpotlightCard';

const getProjectIcon = (type?: string) => {
  switch (type) {
    case 'ai': return <BrainCircuit size={28} />;
    case 'vision': return <ScanFace size={28} />;
    case 'dashboard': return <LayoutDashboard size={28} />;
    case 'shield': return <Shield size={28} />;
    case 'web':
    default: return <Code2 size={28} />;
  }
};

export const Projects: React.FC = () => {
  return (
    <section id="projects" aria-label="Featured Projects by Aditya Sharma" className="py-12 px-6 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
        className="mb-10 text-center"
      >
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-fuchsia-300 font-display sm:text-4xl mb-4">
          <span className="text-emerald-500/50 font-mono text-2xl sm:text-3xl mr-2">&lt;</span>
          Featured Projects
          <span className="text-emerald-500/50 font-mono text-2xl sm:text-3xl ml-2">/&gt;</span>
        </h2>
        <div className="w-24 h-1 bg-purple-500/30 mx-auto rounded-full" />
      </motion.div>

      {resumeData.projects.length > 0 ? (
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
          {resumeData.projects.map((project: any, index: number) => (
            <SpotlightCard
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
              className="flex flex-col border border-purple-500/30 bg-purple-900/10 backdrop-blur-2xl rounded-xl overflow-hidden shadow-[0_8px_32px_0_rgba(139,92,246,0.15)] hover:bg-purple-500/20 hover:border-purple-500/50 transition-all group"
            >
              {project.image && (
                <div className="w-full aspect-video overflow-hidden relative border-b border-purple-500/20 shrink-0 bg-black/40">
                  <div className="absolute inset-0 bg-purple-900/10 group-hover:bg-transparent transition-colors z-10 pointer-events-none" />
                  <img 
                    src={project.image} 
                    alt={`${project.title} — ${project.description.substring(0, 80)} | Built by Aditya Sharma`} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    width="480"
                    height="270"
                  />
                </div>
              )}
              <div className="w-full p-4 sm:p-5 flex flex-col h-full relative z-10">
                <div className="flex justify-between items-start mb-3">
                  <div className="p-2.5 bg-purple-500/20 rounded-lg text-purple-300 group-hover:scale-110 group-hover:bg-purple-500/30 group-hover:text-fuchsia-300 transition-all duration-300 shadow-inner">
                    {getProjectIcon(project.iconType)}
                  </div>
                </div>
                
                <h3 className="text-lg font-bold text-purple-100 mb-1.5 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-300 group-hover:to-fuchsia-300 transition-all">
                  {project.title}
                </h3>
                
                <p className="text-purple-300/70 mb-4 flex-grow leading-relaxed text-[11px] sm:text-xs line-clamp-3">
                  {project.description}
                </p>
                
                <div className="flex flex-col gap-3 mt-auto">
                  <div className="flex flex-wrap gap-1">
                    {project.technologies.map((tech: string, i: number) => (
                      <span key={i} className="px-1.5 py-0.5 text-[9px] font-semibold text-purple-200 bg-purple-500/10 border border-purple-500/20 rounded shadow-sm group-hover:border-purple-500/40 transition-colors">
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="pt-3 border-t border-purple-500/20 flex flex-row gap-2">
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-1 px-2 py-1.5 bg-emerald-500/20 hover:bg-emerald-500/40 text-emerald-100 rounded-md transition-all text-[10px] font-semibold"
                        title={`View live demo of ${project.title}`}
                      >
                        <Globe size={12} /> Demo
                      </a>
                    )}
                    {(project.github || project.link) && (
                      <a
                        href={project.github || project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-1 px-2 py-1.5 bg-purple-900/40 hover:bg-purple-800/60 text-purple-200 rounded-md transition-all border border-purple-500/30 text-[10px] font-semibold"
                        title={`View source code of ${project.title} on GitHub`}
                      >
                        <Github size={12} /> Code
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </SpotlightCard>
          ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 40 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center justify-center p-12 border border-purple-500/30 bg-purple-900/10 backdrop-blur-2xl rounded-2xl shadow-[0_8px_32px_0_rgba(139,92,246,0.15)] text-center"
        >
          <motion.div 
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="p-4 bg-purple-500/20 rounded-full text-purple-300 mb-6"
          >
            <FolderGit2 size={40} />
          </motion.div>
          <h3 className="text-2xl font-semibold text-purple-100 mb-3 flex items-center justify-center gap-2">
            Architecting New Solutions
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
              className="inline-block w-2.5 h-6 bg-purple-400/80"
            />
          </h3>
          <p className="text-purple-300/70 max-w-md mx-auto">
            I am currently building and refining several exciting projects. Check back soon for updates and live demos!
          </p>
        </motion.div>
      )}
    </section>
  );
};
