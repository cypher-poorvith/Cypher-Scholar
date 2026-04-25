import React from 'react';
import { motion } from 'motion/react';
import { Shield, Sparkles, Heart, Rocket, Github, Linkedin, Twitter, GraduationCap } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="p-8 space-y-12 max-w-5xl mx-auto">
      <header className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold text-indigo-400 uppercase tracking-widest">
           Platform Info // V4.2
        </div>
        <h1 className="text-5xl font-display font-black text-white uppercase tracking-tighter leading-[0.9]">
          ABOUT<br/>CYPHER SCHOLAR
        </h1>
      </header>

      <div className="immersive-card p-10 bg-gradient-to-br from-indigo-600/10 to-transparent">
        <h3 className="text-xl font-bold text-white uppercase tracking-widest mb-6 font-display">Our Mission</h3>
        <p className="text-lg text-slate-300 leading-relaxed font-medium">
          Making high-quality education accessible to everyone. 
          Cypher Scholar provides top-tier study materials and interactive 
          learning tools to every student striving for excellence, completely free.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="immersive-card p-8">
          <h3 className="text-sm font-black text-white uppercase tracking-widest mb-6 border-b border-white/5 pb-4">Technology Used</h3>
          <ul className="space-y-4 font-mono text-[11px] font-bold">
             <li className="flex items-center gap-3 text-slate-400">
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 shadow-[0_0_8px_#6366f1]"></div>
                SAFE CLOUD STORAGE
             </li>
             <li className="flex items-center gap-3 text-slate-400">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-500 shadow-[0_0_8px_#a855f7]"></div>
                MODERN INTERFACE
             </li>
             <li className="flex items-center gap-3 text-slate-400">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 shadow-[0_0_8px_#06b6d4]"></div>
                HIGH PERFORMANCE ENGINE
             </li>
          </ul>
        </div>

        <div className="immersive-card p-8">
          <h3 className="text-sm font-black text-white uppercase tracking-widest mb-6 border-b border-white/5 pb-4">Platform Stats</h3>
          <div className="space-y-6">
             <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-slate-500 font-bold uppercase tracking-widest">Version</span>
                <span className="immersive-badge text-indigo-400">4.2.0-STABLE</span>
             </div>
             <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-slate-500 font-bold uppercase tracking-widest">Security</span>
                <span className="immersive-badge text-emerald-400">ENCRYPTED LOGIN</span>
             </div>
          </div>
        </div>
      </div>

      {/* Creator Detail */}
      <section className="immersive-card p-10 flex flex-col md:flex-row items-center gap-12 border-indigo-600/20">
        <div className="w-40 h-40 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center relative group">
           <div className="absolute inset-0 bg-indigo-600/5 group-hover:bg-indigo-600/10 transition-colors rounded-2xl" />
           <GraduationCap size={64} className="text-indigo-500 opacity-20 group-hover:opacity-60 transition-all group-hover:scale-110" />
        </div>
        <div>
           <span className="text-[10px] text-indigo-400 font-black font-mono tracking-[0.3em] uppercase">Project Founder</span>
           <h2 className="text-3xl font-display font-black text-white uppercase tracking-tighter mt-2">Poorvith M P</h2>
           <p className="text-base text-slate-400 font-medium mt-4 italic leading-relaxed">
             "Knowledge should be the baseline, not the privilege. Cypher is the bridge to universal mastery."
           </p>
           <div className="flex gap-6 mt-8">
              <a href="https://github.com/poorvith519" target="_blank" className="text-slate-500 hover:text-white transition-all transform hover:scale-110">
                <Github size={24} />
              </a>
           </div>
        </div>
      </section>
    </div>
  );
};

export default About;
