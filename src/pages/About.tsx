import React from 'react';
import { useAuth } from '../context/AuthContext';

const About: React.FC = () => {
  const { profile } = useAuth();
  
  return (
    <div className="p-6 md:p-10 max-w-[960px] mx-auto space-y-6">
      {/* Hero Banner */}
      <div className="rounded-[28px] bg-[var(--grad)] p-12 text-white relative overflow-hidden shadow-xl">
        <div className="absolute -top-10 -right-10 w-[200px] h-[200px] bg-white/10 rounded-full blur-[40px] pointer-events-none" />
        <div className="absolute -bottom-15 -left-10 w-[180px] h-[180px] bg-white/5 rounded-full blur-[30px] pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
          <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-md border-[3px] border-white/50 flex items-center justify-center font-display text-[1.8rem] font-black shrink-0">
            {profile?.displayName ? profile.displayName.substring(0, 2).toUpperCase() : 'PB'}
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-[2.2rem] font-black leading-tight tracking-tight mb-1">{profile?.displayName || 'Poorvith M P'}</h1>
            <p className="opacity-85 text-[0.9rem] font-medium">JEE Aspirant · Dropper Year · Karnataka, India</p>
            <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-3">
              <span className="bg-white/20 border border-white/35 rounded-full px-3 py-1 text-[0.62rem] font-bold uppercase tracking-widest">🎯 JEE Main + Advanced 2026</span>
              <span className="bg-white/20 border border-white/35 rounded-full px-3 py-1 text-[0.62rem] font-bold uppercase tracking-widest">📍 Karnataka</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { val: '90.14%', lbl: 'JEE Main Jan', sub: 'Percentile', color: 'border-t-pr', text: 'text-pr' },
          { val: '1.52L', lbl: 'JEE Main Apr', sub: 'Rank', color: 'border-t-ig1', text: 'text-ig1' },
          { val: '85%', lbl: 'Chemistry', sub: 'Strongest subject', color: 'border-t-chm', text: 'text-chm' },
          { val: '62%', lbl: 'Mathematics', sub: 'Active focus area', color: 'border-t-mth', text: 'text-mth' },
        ].map((stat, i) => (
          <div key={i} className={`glass-panel nh text-center border-t-[3px] ${stat.color}`}>
            <div className={`font-display text-[1.8rem] font-black ${stat.text}`}>{stat.val}</div>
            <p className="label-sm text-[0.65rem] truncate">{stat.lbl}</p>
            <p className="text-[0.72rem] text-tx-muted mt-0.5">{stat.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Academic Journey */}
        <div className="glass-panel nh">
          <div className="flex items-center gap-2.5 border-b border-border-subtle pb-3.5 mb-4">
            <div className="w-9 h-9 rounded-[10px] bg-pr/10 flex items-center justify-center text-[1.1rem]">📚</div>
            <span className="font-display font-black text-[0.95rem] uppercase tracking-widest">Academic Journey</span>
          </div>
          <div className="space-y-4">
            {[
              { title: 'Dropper Year — 2025/26', desc: 'Full focus on JEE Main & Advanced. Studying with Canvas Classes (Inorganic Chemistry), Mathongo and Neha Agrawal (Mathematics).', color: 'bg-[var(--grad)]' },
              { title: 'JEE Main April 2025', desc: 'Rank ~1,52,000. Identified Math application as primary weak area to address in dropper year.', color: 'bg-pr/30' },
              { title: 'JEE Main January 2025', desc: '~90.14 Percentile — a strong start. Inorganic Chemistry emerged as a relative strength.', color: 'bg-pr/20' }
            ].map((j, i) => (
              <div key={i} className="flex gap-3">
                <div className={`w-2 shrink-0 ${j.color} rounded-full`} />
                <div>
                  <p className="text-[0.82rem] font-bold mb-0.5">{j.title}</p>
                  <p className="text-[0.75rem] text-tx-muted leading-relaxed">{j.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Subject Performance */}
        <div className="glass-panel nh">
          <div className="flex items-center gap-2.5 border-b border-border-subtle pb-3.5 mb-4">
            <div className="w-9 h-9 rounded-[10px] bg-ig1/10 flex items-center justify-center text-[1.1rem]">📊</div>
            <span className="font-display font-black text-[0.95rem] uppercase tracking-widest">Subject Performance</span>
          </div>
          <div className="space-y-4">
             {[
               { sub: 'Physics', tag: 'Improving', pct: 78, color: 'bg-phy', tcolor: 'text-phy' },
               { sub: 'Chemistry', tag: 'Strength', pct: 85, color: 'bg-chm', tcolor: 'text-chm' },
               { sub: 'Mathematics', tag: 'Focus', pct: 62, color: 'bg-mth', tcolor: 'text-mth' }
             ].map((s, i) => (
               <div key={i}>
                  <div className="flex justify-between items-center mb-1.5">
                    <div className="flex items-center gap-2">
                       <span className="text-[0.82rem] font-bold">⚡ {s.sub}</span>
                       <span className={`badge ${s.sub === 'Physics' ? 'badge-physics' : s.sub === 'Chemistry' ? 'badge-chemistry' : 'badge-maths'}`}>{s.tag}</span>
                    </div>
                    <span className={`text-[0.78rem] font-bold ${s.tcolor}`}>{s.pct}%</span>
                  </div>
                  <div className="w-full bg-surface-subtle h-[5px] rounded-full overflow-hidden">
                    <div className={`h-full ${s.color}`} style={{ width: `${s.pct}%` }} />
                  </div>
               </div>
             ))}
          </div>
        </div>
      </div>

      {/* Platform Info */}
      <div className="glass-panel nh border-t-[4px] border-pr" style={{ borderImage: 'var(--grad) 1' }}>
        <div className="flex items-center gap-2.5 border-b border-border-subtle pb-3.5 mb-4">
          <div className="w-9 h-9 rounded-[10px] bg-pr/10 flex items-center justify-center text-[1.1rem]">ℹ️</div>
          <span className="font-display font-black text-[0.95rem] uppercase tracking-widest">About Cypher Scholar</span>
        </div>
        <p className="text-tx-muted text-[0.88rem] leading-[1.75] max-w-[700px] mb-5 font-medium">The ultimate JEE preparation platform. 3200+ precision questions across Physics, Chemistry, and Mathematics. Chapter-wise question banks with detailed solutions, real-time performance analytics — built for serious aspirants aiming for IITs and NITs.</p>
        <div className="grid grid-cols-3 gap-3">
          <div className="glass-panel nh p-3 text-center bg-surface-subtle border-border-subtle flex flex-col justify-center">
            <div className="font-display font-black text-[1.6rem] text-pr">3200+</div>
            <p className="label-sm text-[0.55rem]">Questions</p>
          </div>
          <div className="glass-panel nh p-3 text-center bg-surface-subtle border-border-subtle flex flex-col justify-center">
            <div className="font-display font-black text-[1.6rem] text-ig1">82</div>
            <p className="label-sm text-[0.55rem]">Chapters</p>
          </div>
          <div className="glass-panel nh p-3 text-center bg-surface-subtle border-border-subtle flex flex-col justify-center">
            <div className="font-display font-black text-[1.6rem] text-sec">50k+</div>
            <p className="label-sm text-[0.55rem]">Students</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
