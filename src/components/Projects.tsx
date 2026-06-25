import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Github, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import { resumeData } from '../data';

interface Project {
  title: string;
  description: string;
  technologies: string[];
  github?: string;
  live?: string;
  image?: string;
}

interface ProjectsProps {
  projects?: Project[];
}

export const Projects: React.FC<ProjectsProps> = ({ projects = resumeData.projects }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth - 1);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, [projects]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      const card = scrollRef.current.firstElementChild as HTMLElement;
      // 24px is the gap (gap-6)
      const cardWidth = card ? card.offsetWidth + 24 : clientWidth * 0.8;
      const amount = direction === 'left' ? -cardWidth : cardWidth;
      scrollRef.current.scrollBy({ left: amount, behavior: 'smooth' });
      setTimeout(checkScroll, 400);
    }
  };

  if (!projects || projects.length === 0) return null;

  return (
    <section id="projects" aria-label="Featured Projects" className="py-16 px-6 max-w-6xl mx-auto relative">
      <div className="border border-purple-500/30 bg-purple-900/10 backdrop-blur-2xl rounded-[2rem] p-8 sm:p-10 shadow-[0_8px_32px_0_rgba(139,92,246,0.1)] relative">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-fuchsia-300 font-display sm:text-4xl flex items-center">
            Projects
            <span className="inline-flex items-center justify-center ml-2.5 px-2 py-0.5 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-mono leading-none">
              /&gt;
            </span>
          </h2>
        </motion.div>

        <div className="relative group/carousel">
          {/* Left Arrow */}
          <button
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            className={`absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-purple-900/80 border border-purple-500/30 text-purple-200 backdrop-blur-xl shadow-lg transition-all duration-300 hover:scale-110 hover:bg-purple-800/90 ${!canScrollLeft ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
            aria-label="Scroll Left"
          >
            <ChevronLeft size={24} />
          </button>

          {/* Carousel */}
          <div
            ref={scrollRef}
            onScroll={checkScroll}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-10 pt-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}
          >
            {projects.map((project, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.03, y: -5, transition: { type: "spring", stiffness: 400, damping: 17 } }}
                className="flex-none w-[85vw] sm:w-[340px] md:w-[360px] h-[450px] snap-start bg-purple-900/40 backdrop-blur-xl border border-purple-500/30 rounded-2xl group/card hover:bg-purple-900/50 hover:border-purple-400/50 shadow-[0_8px_32px_rgba(168,85,247,0.15)] hover:shadow-[0_12px_40px_rgba(168,85,247,0.3)] transition-all relative flex flex-col justify-between cursor-default overflow-hidden"
              >
                {/* Top content wrapper to group Image + Title + Description */}
                <div className="flex flex-col flex-grow">
                  {/* Image Container (Glass Frame) - rounded top corners only, flush to top/sides */}
                  <div className="relative w-full aspect-[16/10] bg-purple-900/40 border-b border-purple-500/30 overflow-hidden shrink-0 z-10">
                    {project.image ? (
                      <a href={project.live || '#'} target="_blank" rel="noopener noreferrer" className="block w-full h-full cursor-pointer relative overflow-hidden">
                        <div className="absolute inset-0 bg-purple-900/20 group-hover/card:bg-transparent transition-colors z-10 pointer-events-none" />
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-500 ease-out"
                        />
                      </a>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-purple-300/50 font-mono text-sm bg-purple-900/20">
                        No image available
                      </div>
                    )}
                  </div>

                  {/* Inner Content Padding */}
                  <div className="p-5 flex flex-col flex-grow">
                    <div className="flex justify-between items-start mb-3 gap-3">
                      <a href={project.live || '#'} target="_blank" rel="noopener noreferrer" className="hover:text-fuchsia-300 transition-colors">
                        <h3 className="text-lg font-semibold text-purple-100 tracking-tight leading-tight group-hover/card:text-transparent group-hover/card:bg-clip-text group-hover/card:bg-gradient-to-r group-hover/card:from-purple-300 group-hover/card:to-fuchsia-300 transition-all font-display">
                          {project.title}
                        </h3>
                      </a>
                      {project.technologies && project.technologies.length > 0 && (
                        <span className="px-2.5 py-0.5 bg-teal-500/10 border border-teal-500/20 rounded-full text-[10px] sm:text-xs font-mono text-teal-300 capitalize tracking-wide shrink-0 whitespace-nowrap shadow-sm">
                          {project.technologies[0]}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-purple-200/80 line-clamp-2 leading-relaxed mb-4">
                      {project.description}
                    </p>
                  </div>
                </div>

                {/* Inner subtle gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-30 pointer-events-none" />

                {/* Bottom Action Row (Live Demo + GitHub buttons) */}
                <div className="px-5 pb-5 pt-0 flex gap-3 z-10 shrink-0">
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-semibold text-purple-200 hover:text-white transition-all duration-200 rounded-full border border-purple-400/20 bg-purple-900/40 hover:bg-purple-800/50 backdrop-blur-xl shadow-sm hover:shadow-[0_4px_12px_rgba(168,85,247,0.2)] flex-1"
                    >
                      <ExternalLink size={14} />
                      Live Demo
                    </a>
                  )}
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-semibold text-purple-200 hover:text-white transition-all duration-200 rounded-full border border-purple-400/20 bg-purple-900/40 hover:bg-purple-800/50 backdrop-blur-xl shadow-sm hover:shadow-[0_4px_12px_rgba(168,85,247,0.2)] flex-1"
                    >
                      <Github size={14} />
                      GitHub
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right Arrow */}
          <button
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            className={`absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-purple-900/80 border border-purple-500/30 text-purple-200 backdrop-blur-xl shadow-lg transition-all duration-300 hover:scale-110 hover:bg-purple-800/90 ${!canScrollRight ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
            aria-label="Scroll Right"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: "\n        .hide-scrollbar::-webkit-scrollbar {\n          display: none;\n        }\n      "}} />
    </section>
  );
};
