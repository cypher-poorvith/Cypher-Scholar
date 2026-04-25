import React from 'react';
import { motion } from 'motion/react';
import { Shield, Sparkles, Heart, Rocket, Github, Linkedin, Twitter, GraduationCap } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="p-8 space-y-12 max-w-5xl mx-auto animate-in fade-in duration-700">
      <header className="space-y-6 text-center md:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/5 border border-primary/10 rounded-full text-[10px] font-bold text-primary uppercase tracking-widest">
           Platform Info // V4.2
        </div>
        <h1 className="text-5xl md:text-7xl font-display font-black text-slate-900 leading-none uppercase tracking-tighter">
          ABOUT<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">CYPHER SCHOLAR</span>
        </h1>
        <p className="text-slate-500 font-medium max-w-xl mx-auto md:mx-0">Empowering Indian students with high-quality, accessible, and interactive educational resources.</p>
      </header>

      <div className="vibrant-card p-10 bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/10 shadow-xl shadow-primary/5">
        <h3 className="text-xl font-bold text-slate-900 uppercase tracking-tight mb-4">Our Mission</h3>
        <p className="text-lg text-slate-600 leading-relaxed font-medium">
          Making high-quality education accessible to everyone. 
          Cypher Scholar provides top-tier study materials and interactive 
          learning tools to every student striving for excellence, completely free.
          We believe that knowledge should be the baseline, not a luxury.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="vibrant-card p-8 bg-white shadow-sm border-slate-100">
          <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-6 border-b border-slate-50 pb-4">Technology Focus</h3>
          <ul className="space-y-4 text-[11px] font-bold">
             <li className="flex items-center gap-3 text-slate-500">
                <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_#FB2576]"></div>
                ULTRA-SECURE INFRASTRUCTURE
             </li>
             <li className="flex items-center gap-3 text-slate-500">
                <div className="w-2 h-2 rounded-full bg-secondary shadow-[0_0_8px_#332FD0]"></div>
                ADAPTIVE USER INTERFACE
             </li>
             <li className="flex items-center gap-3 text-slate-500">
                <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]"></div>
                HIGH PERFORMANCE SEARCH ENGINE
             </li>
          </ul>
        </div>

        <div className="vibrant-card p-8 bg-white shadow-sm border-slate-100">
          <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-6 border-b border-slate-50 pb-4">Platform Stats</h3>
          <div className="space-y-6">
             <div className="flex items-center justify-between">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Version</span>
                <span className="vibrant-badge bg-primary/10 text-primary px-3 py-1">4.2.0-STABLE</span>
             </div>
             <div className="flex items-center justify-between">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Security Status</span>
                <span className="vibrant-badge bg-emerald-50 text-emerald-600 px-3 py-1">ENCRYPTED SHIELD ON</span>
             </div>
          </div>
        </div>
      </div>

      {/* Creator Detail */}
      <section className="vibrant-card p-10 flex flex-col md:flex-row items-center gap-12 bg-white shadow-xl shadow-slate-200/50 border-slate-100">
        <div className="w-40 h-40 bg-slate-50 border border-slate-100 rounded-[32px] flex items-center justify-center relative group shadow-inner">
           <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-colors rounded-[32px]" />
           <GraduationCap size={64} className="text-primary opacity-20 group-hover:opacity-60 transition-all group-hover:scale-110" />
        </div>
        <div className="flex-1 text-center md:text-left">
           <span className="text-[10px] text-primary font-bold tracking-[0.3em] uppercase">Project Founder</span>
           <h2 className="text-4xl font-display font-black text-slate-900 leading-none uppercase tracking-tight mt-2">Poorvith M P</h2>
           <p className="text-lg text-slate-500 font-medium mt-4 italic leading-relaxed">
             "Knowledge should be the baseline, not the privilege. Cypher is the bridge to universal mastery."
           </p>
           <div className="flex justify-center md:justify-start gap-6 mt-8">
              <a href="https://github.com/poorvith519" target="_blank" className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 hover:text-primary transition-all border border-slate-100 shadow-sm">
                <Github size={24} />
              </a>
           </div>
        </div>
      </section>
    </div>
  );
};

export default About;
