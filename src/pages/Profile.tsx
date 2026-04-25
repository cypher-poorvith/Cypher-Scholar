import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Phone, Calendar, ShieldCheck, Trophy, Target, Clock, TrendingUp, Download, Settings, LogOut, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { motion } from 'motion/react';

const Profile: React.FC = () => {
  const { profile, signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate('/login');
  };

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
      <header className="vibrant-card p-10 flex flex-col md:flex-row items-center gap-10 bg-white border-slate-100 relative overflow-hidden shadow-xl shadow-slate-200/50">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] -mr-32 -mt-32" />
        
        <div className="relative group">
           <div className="absolute -inset-2 bg-gradient-to-tr from-primary to-secondary rounded-[3rem] blur opacity-20 group-hover:opacity-40 transition duration-500" />
           <img 
            src={profile?.photoURL || `https://ui-avatars.com/api/?name=${profile?.displayName}&background=primary&color=fff&size=256`} 
            alt="ProfileLarge" 
            className="w-40 h-40 rounded-[2.5rem] object-cover border-4 border-white relative z-10 shadow-2xl"
          />
          <button className="absolute bottom-4 right-4 w-10 h-10 bg-primary rounded-2xl flex items-center justify-center text-white border-4 border-white z-20 hover:scale-110 transition-transform shadow-lg">
             <Settings size={16} />
          </button>
        </div>

        <div className="flex-1 text-center md:text-left space-y-6">
          <div className="space-y-1">
             <h1 className="text-4xl md:text-5xl font-display font-black text-slate-900 leading-none uppercase tracking-tight">{profile?.displayName}</h1>
             <p className="text-[10px] font-bold text-primary uppercase tracking-[0.4em]">IIT JEE aspirant • Class 12</p>
          </div>
          
          <div className="flex flex-wrap justify-center md:justify-start gap-6">
             <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest border-r border-slate-100 pr-6">
                <Mail size={14} className="text-primary" />
                {profile?.email}
             </div>
             <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
                <ShieldCheck size={14} className="text-emerald-500" />
                Verified Student
             </div>
          </div>

          <div className="flex flex-wrap justify-center md:justify-start gap-4">
             <button className="px-8 py-3 bg-slate-50 border border-slate-100 rounded-xl text-[10px] font-bold text-slate-600 uppercase tracking-widest hover:bg-white hover:border-primary/20 transition-all shadow-sm">Edit Profile</button>
             <button onClick={handleLogout} className="px-8 py-3 bg-rose-50 border border-rose-100 text-rose-500 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-rose-500 hover:text-white transition-all flex items-center gap-2 shadow-sm">
                <LogOut size={14} />
                Exit Portal
             </button>
          </div>
        </div>
      </header>

      {/* Stats Dashboard */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="vibrant-card p-8 bg-white border-slate-100 flex flex-col gap-4 group hover:border-primary/20 transition-all shadow-sm">
             <div className="flex justify-between items-center">
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</span>
                <div className="group-hover:scale-125 transition-transform duration-500 shadow-sm rounded-lg p-1">
                   {stat.icon}
                </div>
             </div>
             <p className="text-3xl font-black text-slate-900 leading-none">{stat.value}</p>
             <div className="w-full bg-slate-50 h-1.5 rounded-full overflow-hidden mt-2">
                <div className="bg-primary h-full w-[60%] rounded-full shadow-sm" />
             </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         {/* Subject Mastery */}
         <div className="lg:col-span-2 vibrant-card p-10 bg-white border-slate-100 space-y-10 shadow-sm">
            <div className="flex justify-between items-center border-b border-slate-50 pb-6">
               <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Subject Mastery</h2>
               <TrendingUp size={20} className="text-primary" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
               {subjects.map((sub, i) => (
                  <div key={i} className="space-y-4">
                     <div className="flex justify-between items-center">
                        <p className="text-sm font-bold text-slate-600 uppercase tracking-widest">{sub.name}</p>
                        <p className="text-lg font-black text-slate-900">{sub.progress}%</p>
                     </div>
                     <div className="h-3 rounded-full bg-slate-50 overflow-hidden p-0.5 border border-slate-100 shadow-inner">
                        <div 
                          className={`h-full ${sub.color.replace('indigo', 'primary').replace('cyan', 'secondary')} rounded-full transition-all duration-1000 shadow-sm`} 
                          style={{ width: `${sub.progress}%` }} 
                        />
                     </div>
                  </div>
               ))}
            </div>
         </div>

         {/* Achievement Progress */}
         <div className="vibrant-card p-10 bg-white border-slate-100 space-y-8 flex flex-col shadow-sm">
            <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight border-b border-slate-50 pb-6">Next Badge</h2>
            <div className="flex-1 flex flex-col items-center justify-center gap-8 py-10">
               <div className="relative">
                  <div className="absolute inset-0 bg-primary/20 blur-[40px] rounded-full animate-pulse" />
                  <div className="w-32 h-32 rounded-full border-4 border-slate-50 flex items-center justify-center relative z-10 p-2 shadow-inner bg-white">
                     <div className="w-full h-full rounded-full bg-primary/5 border border-primary/10 flex items-center justify-center text-primary">
                        <Trophy size={48} className="fill-current opacity-80" />
                     </div>
                     <svg className="absolute -inset-2 w-[144px] h-[144px] -rotate-90">
                        <circle cx="72" cy="72" r="68" fill="none" stroke="currentColor" strokeWidth="6" className="text-slate-100" />
                        <circle cx="72" cy="72" r="68" fill="none" stroke="currentColor" strokeWidth="6" className="text-primary" strokeDasharray="320, 427" strokeLinecap="round" />
                     </svg>
                  </div>
               </div>
               <div className="text-center space-y-2">
                  <p className="text-sm font-black text-slate-900 uppercase tracking-widest">Logic Architect</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Solve 500 questions (456/500)</p>
               </div>
            </div>
            <button className="btn-secondary w-full h-12 text-[10px]">View All Badges</button>
         </div>
      </div>
    </div>
  );
};

export default Profile;
