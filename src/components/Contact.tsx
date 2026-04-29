import React, { useState } from 'react';
import { motion } from 'motion/react';
import { resumeData } from '../data';
import { Github, Linkedin, Instagram, Mail, Video, Check, Twitter } from 'lucide-react';
import { SpotlightCard } from './SpotlightCard';

const getIcon = (name: string) => {
  switch (name.toLowerCase()) {
    case 'github': return <Github size={24} />;
    case 'linkedin': return <Linkedin size={24} />;
    case 'instagram': return <Instagram size={24} />;
    case 'video editing': return <Video size={24} />;
    case 'x':
    case 'twitter': return <Twitter size={24} />;
    default: return <Mail size={24} />;
  }
};

export const Contact: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText(resumeData.basics.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" aria-label="Contact and Social Links" className="py-16 px-6 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
        className="mb-10 text-center"
      >
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-fuchsia-300 font-display sm:text-4xl mb-4">Connect With Me</h2>
        <div className="w-24 h-1 bg-purple-500/30 mx-auto rounded-full" />
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {resumeData.basics.links.map((link, index) => (
          <SpotlightCard
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: index * 0.15, duration: 0.5 }}
            whileHover={{ y: -5, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="border border-purple-500/30 bg-purple-900/10 backdrop-blur-2xl rounded-2xl shadow-[0_8px_32px_0_rgba(139,92,246,0.15)] hover:bg-purple-500/20 hover:border-purple-500/50 transition-all group"
          >
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center gap-4 p-8 w-full h-full relative z-10"
              title={`Visit Aditya Sharma on ${link.name}`}
            >
              <div className="p-4 bg-purple-500/20 text-purple-300 rounded-full group-hover:scale-110 group-hover:bg-emerald-500/30 group-hover:text-emerald-300 transition-all duration-300">
                {getIcon(link.name)}
              </div>
              <span className="font-medium text-purple-200">{link.name}</span>
            </a>
          </SpotlightCard>
        ))}
        
        <SpotlightCard
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ delay: resumeData.basics.links.length * 0.15, duration: 0.5 }}
          whileHover={{ y: -5, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="border border-purple-500/20 bg-purple-900/10 backdrop-blur-xl rounded-2xl shadow-[0_8px_32px_0_rgba(139,92,246,0.1)] hover:bg-purple-500/20 hover:border-purple-500/40 transition-all group cursor-pointer"
        >
          <div
            onClick={handleCopyEmail}
            className="flex flex-col items-center justify-center gap-4 p-8 w-full h-full relative z-10"
          >
            <div className="p-4 bg-purple-500/20 text-purple-300 rounded-full group-hover:scale-110 group-hover:bg-emerald-500/30 group-hover:text-emerald-300 transition-all duration-300">
              {copied ? <Check size={24} className="text-green-400" /> : <Mail size={24} />}
            </div>
            <span className="font-medium text-purple-200">
              {copied ? 'Copied!' : 'Email'}
            </span>
          </div>
        </SpotlightCard>
      </div>
    </section>
  );
};
