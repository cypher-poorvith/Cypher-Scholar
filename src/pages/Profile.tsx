import React from 'react';
import { User, Mail, Phone, Calendar, ShieldCheck, Trophy, Target, Clock, TrendingUp, Download, Settings, LogOut, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { motion } from 'motion/react';

const Profile: React.FC = () => {
  const { profile, logout } = useAuth();

  const stats = [
    { label: "Tests Attempted", value: "12", icon: <Target className="text-indigo-400" /> },
    { label: "Questions Solved", value: "456", icon: <CheckCircle2 className="text-emerald-400" /> },
    { label: "Study Hours", value: "24.5h", icon: <Clock className="text-cyan-400" /> },
    { label: "Best Score", value: "98%", icon: <Trophy className="text-amber-400" /> },
  ];

  const subjects = [
    { name: "Physics", progress: 85, color: "bg-indigo-500" },
    { name: "Chemistry", progress: 72, color: "bg-cyan-400" },
    { name: "Math", progress: 68, color: "bg-purple-500" },
    { name: "Biology", progress: 90, color: "bg-emerald-500" },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-12 animate-in fade-in duration-700">
      {/* Profile Header */}
      <header className="glass-panel p-10 flex flex-col md:flex-row items-center gap-10 border-indigo-500/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/5 rounded-full blur-[80px] -mr-32 -mt-32" />
        
        <div className="relative group">
           <div className="absolute -inset-2 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-500" />
           <img 
            src={profile?.photoURL || `https://ui-avatars.com/api/?name=${profile?.displayName}&background=6366f1&color=fff&size=256`} 
            alt="ProfileLarge" 
            className="w-40 h-40 rounded-[2.5rem] object-cover border-4 border-[#13131b] relative z-10 shadow-2xl"
          />
          <button className="absolute bottom-4 right-4 w-10 h-10 bg-indigo-600 rounded-2xl flex items-center justify-center text-white border-4 border-[#13131b] z-20 hover:scale-110 transition-transform">
             <Settings size={16} />
          </button>
        </div>

        <div className="flex-1 text-center md:text-left space-y-6">
          <div className="space-y-1">
             <h1 className="text-4xl font-black text-white uppercase italic tracking-tighter">{profile?.displayName}</h1>
             <p className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.4em]">JEE aspirant • Grade 12</p>
          </div>
          
          <div className="flex flex-wrap justify-center md:justify-start gap-6">
             <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-widest border-r border-white/5 pr-6">
                <Mail size={14} />
                {profile?.email}
             </div>
             <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-widest">
                <ShieldCheck size={14} className="text-emerald-500" />
                Verified Student
             </div>
          </div>

          <div className="flex gap-4">
             <button className="px-8 py-3 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all">Edit Bio</button>
             <button onClick={() => logout()} className="px-8 py-3 bg-rose-500/10 border border-rose-500/20 text-rose-500 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-rose-500/20 transition-all flex items-center gap-2">
                <LogOut size={14} />
                Exit Portal
             </button>
          </div>
        </div>
      </header>

      {/* Stats Dashboard */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="glass-panel p-8 flex flex-col gap-4 group hover:border-white/20 transition-all">
             <div className="flex justify-between items-center">
                <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">{stat.label}</span>
                <div className="group-hover:scale-125 transition-transform duration-500">{stat.icon}</div>
             </div>
             <p className="text-3xl font-black text-white leading-none">{stat.value}</p>
             <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden mt-2">
                <div className="bg-indigo-500 h-full w-[60%] rounded-full opacity-50" />
             </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         {/* Subject Mastery */}
         <div className="lg:col-span-2 glass-panel p-10 space-y-10">
            <div className="flex justify-between items-center border-b border-white/5 pb-6">
               <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">Subject Mastery</h2>
               <TrendingUp size={20} className="text-indigo-400" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
               {subjects.map((sub, i) => (
                  <div key={i} className="space-y-4">
                     <div className="flex justify-between items-center">
                        <p className="text-sm font-bold text-slate-300 uppercase tracking-widest">{sub.name}</p>
                        <p className="text-lg font-black text-white">{sub.progress}%</p>
                     </div>
                     <div className="h-2 rounded-full bg-white/5 overflow-hidden p-0.5 border border-white/5">
                        <div 
                          className={`h-full ${sub.color} rounded-full transition-all duration-1000 shadow-[0_0_15px_rgba(255,255,255,0.1)]`} 
                          style={{ width: `${sub.progress}%` }} 
                        />
                     </div>
                  </div>
               ))}
            </div>
         </div>

         {/* Achievement Progress */}
         <div className="glass-panel p-10 space-y-8 flex flex-col">
            <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter border-b border-white/5 pb-6">Next Badge</h2>
            <div className="flex-1 flex flex-col items-center justify-center gap-8 py-10">
               <div className="relative">
                  <div className="absolute inset-0 bg-indigo-500 blur-[40px] opacity-10 rounded-full animate-pulse" />
                  <div className="w-32 h-32 rounded-full border-4 border-white/5 flex items-center justify-center relative z-10 p-2">
                     <div className="w-full h-full rounded-full bg-white/5 border border-indigo-500/30 flex items-center justify-center text-slate-700">
                        <Trophy size={48} />
                     </div>
                     <svg className="absolute -inset-2 w-[144px] h-[144px] -rotate-90">
                        <circle cx="72" cy="72" r="68" fill="none" stroke="currentColor" strokeWidth="4" className="text-white/5" />
                        <circle cx="72" cy="72" r="68" fill="none" stroke="currentColor" strokeWidth="4" className="text-indigo-500" strokeDasharray="214, 427" strokeLinecap="round" />
                     </svg>
                  </div>
               </div>
               <div className="text-center space-y-2">
                  <p className="text-sm font-bold text-white uppercase tracking-widest">Logic Architect</p>
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Solve 500 questions (456/500)</p>
               </div>
            </div>
            <button className="w-full h-12 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-white transition-all">View All Badges</button>
         </div>
      </div>
    </div>
  );
};

export default Profile;
