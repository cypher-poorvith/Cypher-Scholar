import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

const Dashboard: React.FC = () => {
  const { profile } = useAuth();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="p-6 sm:p-10 space-y-6"
    >
      {/* Welcome Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-panel nh border-l-[6px] border-l-pr relative overflow-hidden flex justify-between items-center group"
        >
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-pr/5 rounded-full blur-[30px] pointer-events-none group-hover:scale-150 transition-transform duration-700" />
          <div className="relative z-10 flex-1">
            <div className="badge badge-primary mb-3">Dropper · JEE 2026</div>
            <h2 className="text-[1.8rem] font-black mb-2 leading-tight uppercase tracking-tight">
              Welcome back, <span className="gradient-text">{profile?.displayName?.split(' ')[0] || 'Scholar'}</span>!
            </h2>
            <p className="text-tx-muted text-[0.85rem] mb-6 leading-[1.6] font-bold uppercase tracking-wide opacity-80">
              JEE Advanced in <strong className="text-pr">20 days</strong>. You're in the execution sprint. 💪
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/practice" className="btn-primary h-[38px] px-6 text-[0.75rem]">Start Practicing →</Link>
              <Link to="/tests/configure" className="btn-secondary h-[38px] px-6 text-[0.75rem]">Mock Test</Link>
            </div>
          </div>
          <div className="text-[4rem] shrink-0 ml-4 group-hover:rotate-12 transition-transform duration-500">🏆</div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-panel nh border-t-[6px] border-t-sec"
        >
          <p className="label-sm mb-2 opacity-60">Scholar Standing</p>
          <div className="text-[2.2rem] font-black mb-2 leading-none uppercase tracking-tight">Global <span className="text-sec">#45</span></div>
          <p className="label-sm mb-6 leading-none text-tx-dim">Top 2% of Cypher Scholars</p>
          
          <div className="flex gap-6">
            <div className="text-center">
              <div className="font-display text-[1.4rem] font-black text-phy mb-1">78%</div>
              <p className="label-sm text-[0.6rem] opacity-70">Physics</p>
              <div className="w-12 h-1 bg-phy/20 mx-auto rounded-full mt-1" />
            </div>
            <div className="text-center">
              <div className="font-display text-[1.4rem] font-black text-chm mb-1">85%</div>
              <p className="label-sm text-[0.6rem] opacity-70">Chemistry</p>
              <div className="w-12 h-1 bg-chm/20 mx-auto rounded-full mt-1" />
            </div>
            <div className="text-center">
              <div className="font-display text-[1.4rem] font-black text-mth mb-1">62%</div>
              <p className="label-sm text-[0.6rem] opacity-70">Maths</p>
              <div className="w-12 h-1 bg-mth/20 mx-auto rounded-full mt-1" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {[
          { label: 'Tests Taken', value: '12', icon: '✅', color: 'bg-acc', pct: 45 },
          { label: 'Study Hours', value: '24h', icon: '⏱', color: 'bg-pr', pct: 60 },
          { label: 'Qs Solved', value: '456', icon: '🧠', color: 'bg-sec', pct: 55 },
          { label: 'Accuracy', value: '74%', icon: '🎯', color: 'bg-ig-orange', pct: 74 },
        ].map((stat, i) => (
          <motion.div 
            key={i} 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * i + 0.3 }}
            className="glass-panel nh flex flex-col gap-3 p-5 group hover:border-pr/30"
          >
            <div className="flex justify-between items-center">
              <span className="label-sm opacity-60 group-hover:opacity-100 transition-opacity">{stat.label}</span>
              <span className="group-hover:scale-125 transition-transform">{stat.icon}</span>
            </div>
            <div className="text-[2.2rem] font-black leading-none mb-1 group-hover:scale-105 transition-transform origin-left">{stat.value}</div>
            <div className="w-full bg-surface-subtle rounded-full h-[6px] overflow-hidden">
               <motion.div 
                 initial={{ width: 0 }}
                 animate={{ width: `${stat.pct}%` }}
                 transition={{ duration: 1, ease: "easeOut", delay: 0.5 + i * 0.1 }}
                 className={`h-full ${stat.color} shadow-sm shadow-black/10`} 
               />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Grid content */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Left Col */}
        <div className="space-y-6">
          {/* Continue Learning */}
          <div className="glass-panel nh p-8">
            <div className="flex justify-between items-center border-b border-border-subtle pb-4 mb-6">
              <span className="font-display text-[1rem] font-black uppercase tracking-tighter italic">🚀 Continue Learning</span>
              <Link to="/practice" className="text-[0.7rem] font-black uppercase tracking-widest text-pr hover:underline">View Journey</Link>
            </div>
            <div className="flex gap-5 overflow-x-auto pb-2 no-scrollbar">
              {[
                { sub: 'Physics', ch: '1D Kinematics', pct: 65, color: 'bg-phy', badge: 'badge-physics' },
                { sub: 'Maths', ch: 'Limits & Continuity', pct: 30, color: 'bg-mth', badge: 'badge-maths' },
                { sub: 'Chemistry', ch: 'Atomic Structure', pct: 15, color: 'bg-chm', badge: 'badge-chemistry' },
              ].map((item, i) => (
                <div key={i} className="min-w-[280px] bg-surface-subtle border border-border-subtle rounded-[18px] p-5 cursor-pointer hover:border-pr/40 transition-all group relative overflow-hidden">
                   <div className="absolute top-0 right-0 w-16 h-16 bg-[var(--grad)] opacity-[0.02] rounded-bl-full pointer-events-none" />
                   <div className="flex justify-between mb-4">
                     <span className={`badge ${item.badge}`}>{item.sub}</span>
                     <span className="opacity-40 group-hover:opacity-100 transition-opacity">🔖</span>
                   </div>
                   <p className="text-[0.95rem] font-black mb-4 leading-tight group-hover:text-pr tracking-tight">{item.ch}</p>
                   <div className="flex justify-between items-center mb-1.5">
                     <p className="label-sm text-[0.55rem] font-bold opacity-60">{item.pct}% Deep Link</p>
                     <p className="label-sm text-[0.55rem] font-black text-pr">{item.pct}%</p>
                   </div>
                   <div className="w-full bg-surface-card rounded-full h-[6px] overflow-hidden">
                     <motion.div 
                       initial={{ width: 0 }}
                       animate={{ width: `${item.pct}%` }}
                       className={`h-full ${item.color}`} 
                     />
                   </div>
                </div>
              ))}
            </div>
          </div>

          {/* Today's Focus */}
          <div className="glass-panel nh p-8">
            <div className="font-display text-[1rem] font-black uppercase tracking-tighter border-b border-border-subtle pb-4 mb-6 italic">🎯 Today's Focus</div>
            <div className="space-y-3">
               <div className="flex items-center gap-4 px-4 py-4 bg-surface-subtle border border-border-subtle rounded-[14px] hover:border-pr/20 transition-all cursor-default group">
                  <div className="w-[18px] h-[18px] rounded-md border-2 border-border-strong shrink-0 group-hover:border-pr/40 transition-colors" />
                  <div className="flex-1">
                    <p className="text-[0.85rem] font-black leading-tight tracking-tight">Review Inorganic Chemistry — p-Block</p>
                    <p className="label-sm text-[0.6rem] font-bold opacity-60">Your Strength Area</p>
                  </div>
               </div>
               <div className="flex items-center gap-4 px-4 py-4 bg-pr/5 border-2 border-pr/40 rounded-[14px] hover:border-pr transition-all cursor-default relative group">
                  <div className="w-[18px] h-[18px] rounded-md border-2 border-pr shrink-0 bg-pr shadow-sm shadow-pr/30" />
                  <div className="flex-1">
                    <p className="text-[0.85rem] font-black leading-tight tracking-tight text-pr">Math: Integral Calculus (Mathongo)</p>
                    <p className="label-sm text-[0.6rem] text-pr font-black uppercase">Weak Area — High Priority</p>
                  </div>
                  <span className="badge badge-primary scale-90">Focus</span>
               </div>
               <div className="flex items-center gap-4 px-4 py-4 bg-surface-subtle border border-border-subtle rounded-[14px] hover:border-pr/20 transition-all cursor-default group">
                  <div className="w-[18px] h-[18px] rounded-md border-2 border-border-strong shrink-0 group-hover:border-pr/40 transition-colors" />
                  <div className="flex-1">
                    <p className="text-[0.85rem] font-black leading-tight tracking-tight">Physics: EMI Mock (Canvas Classes)</p>
                    <p className="label-sm text-[0.6rem] font-bold opacity-60">Evening session</p>
                  </div>
               </div>
            </div>
          </div>
        </div>

        {/* Right Col */}
        <div className="space-y-6">
           {/* Subject Mastery */}
           <div className="glass-panel nh border-t-[6px] border-t-pr p-8">
              <div className="font-display text-[1rem] font-black uppercase tracking-tighter mb-6 italic">📊 Mastery Dynamics</div>
              <div className="space-y-5">
                 <div>
                    <div className="flex justify-between items-center mb-1.5">
                       <span className="text-[0.85rem] font-black uppercase tracking-widest text-tx-muted">Physics</span>
                       <span className="text-[0.85rem] font-black text-phy">78%</span>
                    </div>
                    <div className="w-full bg-surface-subtle rounded-full h-[6px] overflow-hidden">
                       <motion.div initial={{ width: 0 }} animate={{ width: '78%' }} className="h-full bg-phy" />
                    </div>
                 </div>
                 <div>
                    <div className="flex justify-between items-center mb-1.5">
                       <span className="text-[0.85rem] font-black uppercase tracking-widest text-tx-muted">Chemistry</span>
                       <span className="text-[0.85rem] font-black text-chm">85%</span>
                    </div>
                    <div className="w-full bg-surface-subtle rounded-full h-[6px] overflow-hidden">
                       <motion.div initial={{ width: 0 }} animate={{ width: '85%' }} className="h-full bg-chm" />
                    </div>
                 </div>
                 <div>
                    <div className="flex justify-between items-center mb-1.5">
                       <span className="text-[0.85rem] font-black uppercase tracking-widest text-tx-muted">Mathematics</span>
                       <span className="text-[0.85rem] font-black text-mth">62%</span>
                    </div>
                    <div className="w-full bg-surface-subtle rounded-full h-[6px] overflow-hidden">
                       <motion.div initial={{ width: 0 }} animate={{ width: '62%' }} className="h-full bg-mth" />
                    </div>
                 </div>
              </div>
              <div className="mt-8 pt-8 border-t border-border-subtle flex gap-8">
                 <div className="text-center flex-1">
                    <div className="font-display text-[1.5rem] font-black italic tracking-tighter">84%</div>
                    <p className="label-sm text-[0.6rem] font-bold uppercase opacity-60">Overall IQ</p>
                 </div>
                 <div className="w-[1px] h-10 bg-border-subtle self-center" />
                 <div className="text-center flex-1">
                    <div className="font-display text-[1.5rem] font-black text-pr italic tracking-tighter">+12%</div>
                    <p className="label-sm text-[0.6rem] font-bold uppercase opacity-60">This Week</p>
                 </div>
              </div>
           </div>

           {/* Exam Dates */}
           <div className="glass-panel nh p-8">
              <div className="flex justify-between items-center border-b border-border-subtle pb-4 mb-6">
                 <span className="font-display text-[1rem] font-black uppercase tracking-tighter italic">📅 Calendar</span>
                 <span className="text-sm opacity-40">JEE Tracker</span>
              </div>
              <div className="space-y-5">
                {[
                  { m: 'MAY', d: '17', title: 'JEE Advanced 2026', time: '9:00 AM – 12:00 PM', color: 'border-l-pr' },
                  { m: 'MAY', d: '23', title: 'MET Phase 2', time: '10:00 AM – 11:30 AM', color: 'border-l-chm' },
                  { m: 'APR', d: '30', title: 'VITEEE Entrance', time: 'All day event', color: 'border-l-mth' },
                ].map((exam, i) => (
                  <div key={i} className={`flex gap-4 border-l-[4px] ${exam.color} pl-4 group transition-all items-center`}>
                    <div className="bg-surface-subtle border border-border-subtle rounded-[12px] px-3 py-2 text-center shrink-0 min-w-[58px] shadow-sm">
                      <p className={`text-[0.6rem] font-black ${exam.color.replace('border-l-', 'text-')}`}>{exam.m}</p>
                      <p className="font-display text-[1.4rem] font-black leading-tight tracking-tighter">{exam.d}</p>
                    </div>
                    <div>
                      <p className="text-[0.95rem] font-black leading-tight group-hover:text-pr transition-colors tracking-tight">{exam.title}</p>
                      <p className="label-sm text-[0.65rem] mt-1 font-bold opacity-60 uppercase">{exam.time}</p>
                    </div>
                  </div>
                ))}
              </div>
           </div>
        </div>
      </div>

      {/* Achievements Row */}
      <div className="glass-panel nh p-8">
        <div className="flex justify-between items-center border-b border-border-subtle pb-4 mb-6">
           <span className="font-display text-[1rem] font-black uppercase tracking-tighter italic">🏆 Hall of Fame</span>
           <Link to="/achievements" className="text-[0.7rem] font-black uppercase tracking-widest text-pr hover:underline">Unlocked</Link>
        </div>
        <div className="flex gap-10 overflow-x-auto no-scrollbar pb-2">
           {[
             { icon: '✅', label: 'First 100', color: 'from-[#fef9c3] to-[#fde68a]', unlocked: true },
             { icon: '🧠', label: 'Physics Pro', color: 'from-[#eff6ff] to-[#dbeafe]', unlocked: true },
             { icon: '🔥', label: '7-Day Run', color: 'from-[#fff7ed] to-[#fed7aa]', unlocked: true },
             { icon: '⚡', label: 'Math Wizard', unlocked: false },
             { icon: '🔖', label: 'Scout', unlocked: false },
             { icon: '🏅', label: 'Speed Solver', unlocked: false },
             { icon: '🥇', label: 'Top Ranker', unlocked: false },
           ].map((ach, i) => (
             <div key={i} className={`flex flex-col items-center gap-2 shrink-0 transition-all ${ach.unlocked ? 'hover:scale-110 cursor-pointer' : 'opacity-20 grayscale'}`}>
                <div className={`w-[64px] h-[64px] rounded-full border-2 border-border-subtle flex items-center justify-center text-[1.6rem] shadow-lg ${ach.color ? `bg-gradient-to-br ${ach.color}` : 'bg-surface-subtle'}`}>
                  {ach.icon}
                </div>
                <span className="label-sm text-[0.65rem] font-black uppercase tracking-tighter">{ach.label}</span>
             </div>
           ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
