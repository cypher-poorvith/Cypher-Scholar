import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Mail, ShieldCheck, Trophy, Target, Clock, 
  Settings, LogOut, CheckCircle2, TrendingUp,
  Briefcase, GraduationCap, MapPin, Zap, Flame,
  ArrowRight
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { motion } from 'motion/react';

const Profile: React.FC = () => {
  const { profile, signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate('/login');
  };

  const performanceMetrics = [
    { label: "Global Accuracy", value: "87.4%", sub: "Top 5% of scholars", color: "text-emerald-500", bg: "bg-emerald-500/10", icon: <CheckCircle2 size={20} /> },
    { label: "Questions Solved", value: "3,420", sub: "128 this week", color: "text-ig-purple", bg: "bg-ig-purple/10", icon: <Zap size={20} /> },
    { label: "Day Streak", value: "42", sub: "Personal Best: 56", color: "text-orange-500", bg: "bg-orange-500/10", icon: <Flame size={20} /> },
  ];

  const achievementTimeline = [
    { date: "Nov 2024", title: "Cypher Physics Olympiad (CPO)", desc: "Ranked in top 1% nationally among grade 11 candidates.", status: "active" },
    { date: "Aug 2024", title: "Advanced Calculus Certification", desc: "Completed rigorous pre-university curriculum with distinction.", status: "completed" },
    { date: "Mar 2024", title: "Grade 10 Board Examinations", desc: "Achieved 98.6% aggregate score.", status: "completed" },
  ];

  return (
    <div className="max-w-[1440px] mx-auto p-6 md:p-12 space-y-12 animate-fade-up">
      {/* Profile Header Hero */}
      <header className="flex flex-col md:flex-row items-center md:items-start gap-10">
        <div className="relative group shrink-0">
          <div className="absolute -inset-1 bg-gradient-to-tr from-pr to-sec rounded-[2.5rem] blur opacity-25 group-hover:opacity-40 transition duration-500" />
          <img 
            src={profile?.photoURL || `https://ui-avatars.com/api/?name=${profile?.displayName}&background=primary&color=fff&size=256`} 
            alt="ScholarProfile" 
            className="w-44 h-44 rounded-[2.2rem] object-cover border-[6px] border-white dark:border-slate-800 relative z-10 shadow-xl"
          />
          <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center text-white border-4 border-white dark:border-slate-800 z-20 shadow-lg">
             <ShieldCheck size={22} className="fill-white/20" />
          </div>
        </div>

        <div className="flex-1 text-center md:text-left pt-4">
          <div className="flex flex-col md:flex-row md:items-center gap-2 mb-3">
             <div className="flex items-center justify-center md:justify-start gap-2">
                <ShieldCheck size={18} className="text-pr" />
                <span className="text-[0.7rem] font-black uppercase tracking-[0.3em] text-pr leading-none">Verified Scholar</span>
             </div>
          </div>
          <h1 className="text-[3.5rem] md:text-[4.5rem] font-black text-tx-main dark:text-white leading-[0.9] uppercase tracking-tighter mb-4">
            {profile?.displayName || 'Poorvith M P'}
          </h1>
          <p className="text-[1.2rem] font-black text-tx-muted uppercase tracking-tight opacity-70">
            Candidate for Engineering Excellence
          </p>

          <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-8">
             <button className="h-12 px-8 bg-surface-subtle border border-border-subtle rounded-xl text-[0.7rem] font-black uppercase tracking-widest hover:border-pr/50 transition-all flex items-center gap-2">
                <Settings size={14} />
                Portal Config
             </button>
             <button onClick={handleLogout} className="h-12 px-8 bg-red-50 text-red-500 rounded-xl text-[0.7rem] font-black uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all flex items-center gap-2">
                <LogOut size={14} />
                Exit Gate
             </button>
          </div>
        </div>
      </header>

      {/* Profile Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Card 1: Objective */}
        <div className="md:col-span-4 glass-panel nh p-10 flex flex-col justify-between group overflow-hidden relative border-2 border-transparent hover:border-pr/20 transition-all">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-pr/5 rounded-full blur-[40px] pointer-events-none group-hover:scale-150 transition-transform duration-700" />
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <Target className="text-pr" size={18} />
              <span className="text-[0.65rem] font-black uppercase tracking-[0.2em] text-tx-dim">Primary Objective</span>
            </div>
            <div className="text-[4rem] font-black leading-none gradient-text uppercase tracking-tighter group-hover:scale-[1.02] transition-transform origin-left">JEE 2026</div>
          </div>

          <div className="relative z-10 border-t border-border-subtle pt-8 mt-8">
            <p className="text-[0.65rem] font-black uppercase tracking-[0.2em] text-pr mb-2">Target Percentile</p>
            <div className="flex items-end justify-between">
              <span className="text-[2.2rem] font-black tracking-tighter leading-none text-tx-main dark:text-white">99.9<span className="text-xl opacity-40 ml-1">%</span></span>
              <button className="w-12 h-12 rounded-full border-2 border-border-strong flex items-center justify-center text-tx-dim group-hover:bg-pr group-hover:text-white group-hover:border-pr transition-all">
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Card 2: Performance Analytics */}
        <div className="md:col-span-8 glass-panel nh p-10 relative overflow-hidden group">
          <div className="flex items-center gap-3 mb-10">
            <TrendingUp size={18} className="text-pr" />
            <span className="text-[0.65rem] font-black uppercase tracking-[0.2em] text-tx-dim">Performance Analytics</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {performanceMetrics.map((metric, i) => (
              <div key={i} className="space-y-6">
                <div className={`w-14 h-14 rounded-2xl ${metric.bg} flex items-center justify-center ${metric.color}`}>
                  {metric.icon}
                </div>
                <div>
                  <div className="text-[2.5rem] font-black leading-none tracking-tighter text-tx-main dark:text-white mb-2">{metric.value}</div>
                  <p className="text-[0.7rem] font-black uppercase tracking-widest text-tx-dim">{metric.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Card 3: Biography */}
        <div className="md:col-span-7 glass-panel nh p-10 space-y-8">
          <div className="flex items-center gap-3">
             <Briefcase size={18} className="text-pr" />
             <span className="text-[0.65rem] font-black uppercase tracking-[0.2em] text-tx-dim">Biography</span>
          </div>
          <div className="space-y-6 text-[1.05rem] text-tx-muted leading-relaxed font-medium">
            <p>
              A highly motivated and analytical student currently preparing for the Joint Entrance Examination (JEE) Advanced 2026. Possesses a deep foundational interest in quantum mechanics and advanced computational algorithms.
            </p>
            <p>
              Consistently demonstrates rigorous academic discipline, dedicating substantial hours to mastering complex problem-solving techniques and abstract mathematical concepts. Goal-oriented approach with a proven track record of maintaining top-tier performance across regular mock assessments.
            </p>
          </div>
        </div>

        {/* Card 4: Academic Trajectory */}
        <div className="md:col-span-5 glass-panel nh p-10 space-y-8">
          <div className="flex items-center gap-3">
             <GraduationCap size={18} className="text-pr" />
             <span className="text-[0.65rem] font-black uppercase tracking-[0.2em] text-tx-dim">Academic Trajectory</span>
          </div>
          <div className="space-y-8">
            {achievementTimeline.map((item, i) => (
              <div key={i} className="flex gap-6 group">
                <div className="flex flex-col items-center">
                  <div className={`w-3.5 h-3.5 rounded-full border-2 ${item.status === 'active' ? 'bg-pr border-pr shadow-[0_0_12px_rgba(225,48,108,0.5)]' : 'bg-surface-subtle border-border-strong'} transition-all`} />
                  {i < achievementTimeline.length - 1 && <div className="w-[2px] flex-1 bg-border-subtle my-2" />}
                </div>
                <div className="pb-2">
                   <p className={`text-[0.6rem] font-black uppercase tracking-[0.2em] mb-1 ${item.status === 'active' ? 'text-pr' : 'text-tx-dim'}`}>{item.date}</p>
                   <h4 className="text-[0.95rem] font-black text-tx-main dark:text-white mb-2 leading-tight group-hover:text-pr transition-colors">{item.title}</h4>
                   <p className="text-[0.75rem] text-tx-muted leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

