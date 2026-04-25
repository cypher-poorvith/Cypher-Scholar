import React from 'react';
import { motion } from 'motion/react';
import { useAuth } from '../context/AuthContext';
import { 
  Flame, 
  ClipboardList, 
  Timer, 
  CheckCircle, 
  Play, 
  Bookmark, 
  Calendar,
  ChevronRight,
  TrendingUp,
  Trophy,
  Brain,
  Search,
  Zap
} from 'lucide-react';
import { UserRole } from '../types';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const { user, profile } = useAuth();

  // If user is admin/editor, we might show different things, but for now focus on the requested Student Design
  // as Dashboard.tsx is primarily for students in many LMS apps.
  
  return (
    <div className="flex-1 w-full max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Top Banner & Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <section className="lg:col-span-2 glass-panel rounded-xl p-8 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 border-l-4 border-l-indigo-400">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl -z-10 animate-pulse"></div>
          <div className="z-10 flex-1">
            <h2 className="text-3xl font-black text-white mb-2 uppercase tracking-tight">Welcome back, {profile?.displayName?.split(' ')[0] || user?.displayName?.split(' ')[0] || 'Scholar'}!</h2>
            <p className="text-lg text-slate-400 font-medium mb-6">Your next official Scholar Mock Test is in <span className="text-white font-black underline underline-offset-4 decoration-indigo-500">2 days</span>.</p>
            <div className="flex gap-4">
              <Link to="/scholar-series">
                <button className="bg-white text-indigo-900 font-black px-8 py-3.5 rounded-xl shadow-2xl hover:scale-105 transition-all flex items-center gap-2 uppercase text-xs tracking-widest">
                    Scholar Series
                    <Trophy size={16} />
                </button>
              </Link>
              <Link to="/results">
                <button className="bg-white/5 text-white border border-white/10 font-bold px-8 py-3.5 rounded-xl hover:bg-white/10 transition-all text-xs uppercase tracking-widest">
                    View Results
                </button>
              </Link>
            </div>
          </div>
          <div className="hidden lg:block z-10">
             <div className="w-40 h-40 bg-indigo-600/20 rounded-[32px] border border-indigo-500/20 flex items-center justify-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <Trophy size={64} className="text-indigo-400 group-hover:scale-110 group-hover:text-white transition-all duration-500" />
             </div>
          </div>
        </section>

        <section className="glass-panel p-8 border-white/5 border-t-4 border-t-emerald-500 flex flex-col justify-between">
           <div>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Scholar Standing</p>
              <h3 className="text-4xl font-black text-white tracking-tighter">Global <span className="text-emerald-400">#45</span></h3>
              <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-2">Top 2% of Cypher Scholars</p>
           </div>
           <div className="flex items-center gap-4 mt-6">
              <div className="flex -space-x-3">
                 {[1,2,3].map(i => (
                    <img key={i} src={`https://i.pravatar.cc/40?u=${i}`} className="w-8 h-8 rounded-full border-2 border-[#121021] bg-slate-800" alt="" />
                 ))}
                 <div className="w-8 h-8 rounded-full border-2 border-[#121021] bg-slate-800 flex items-center justify-center text-[8px] font-bold text-white">+12</div>
              </div>
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Compete with friends</span>
           </div>
        </section>
      </div>

      {/* Stats Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Study Streak", value: "7", unit: "days", icon: <Flame className="text-orange-400" />, color: "bg-orange-400" },
          { label: "Tests Taken", value: "12", unit: "", icon: <CheckCircle className="text-cyan-400" />, color: "bg-cyan-400" },
          { label: "Time Studied", value: "24h 35m", unit: "", icon: <Timer className="text-indigo-400" />, color: "bg-indigo-400" },
          { label: "Questions Solved", value: "456", unit: "", icon: <Brain className="text-emerald-400" />, color: "bg-emerald-400" },
        ].map((stat, i) => (
          <div key={i} className="glass-panel rounded-xl p-6 flex flex-col gap-4 border border-white/5 hover:border-white/20 transition-all group">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{stat.label}</span>
              <div className="group-hover:scale-110 transition-transform">
                {stat.icon}
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-black text-white uppercase tracking-tight">{stat.value}</span>
              <span className="text-xs font-bold text-slate-500 uppercase">{stat.unit}</span>
            </div>
            <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
              <div className={`${stat.color} h-full w-1/2 rounded-full shadow-[0_0_10px_rgba(255,255,255,0.2)]`}></div>
            </div>
          </div>
        ))}
      </section>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Left Col: Learning & Tasks */}
        <div className="xl:col-span-2 flex flex-col gap-8">
          {/* Continue Learning */}
          <section className="glass-panel rounded-xl p-6 flex flex-col gap-6">
            <div className="flex justify-between items-center border-b border-white/5 pb-4">
              <h3 className="text-lg font-black text-white uppercase tracking-tight">Continue Learning</h3>
              <Link to="/subjects/grades" className="text-xs font-bold text-indigo-400 hover:text-indigo-300 transition-colors uppercase tracking-widest">View All</Link>
            </div>
            <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
              {[
                { subject: "Physics", title: "Electromagnetic Induction - Core Concepts", progress: 65, color: "text-indigo-400", bg: "bg-indigo-400/20" },
                { subject: "Mathematics", title: "Integral Calculus: Advanced Practice Set", progress: 30, color: "text-cyan-400", bg: "bg-cyan-400/20" },
                { subject: "Chemistry", title: "Organic Reactions: Mechanisms Part 2", progress: 15, color: "text-emerald-400", bg: "bg-emerald-400/20" },
              ].map((item, i) => (
                <div key={i} className="min-w-[300px] bg-white/[0.03] border border-white/5 rounded-xl p-5 flex flex-col gap-4 hover:bg-white/[0.05] hover:border-white/10 transition-all cursor-pointer group">
                  <div className="flex justify-between items-start">
                    <span className={`px-2 py-1 rounded text-[10px] font-black uppercase tracking-wider ${item.bg} ${item.color}`}>{item.subject}</span>
                    <Bookmark size={14} className="text-slate-600 group-hover:text-white transition-colors" />
                  </div>
                  <h4 className="text-sm font-bold text-white line-clamp-2 leading-snug">{item.title}</h4>
                  <div className="mt-auto">
                    <div className="flex justify-between items-center mb-2">
                       <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{item.progress}% Complete</span>
                    </div>
                    <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full transition-all duration-1000 ${item.color.replace('text-', 'bg-')}`} style={{ width: `${item.progress}%` }}></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Today's Focus */}
          <section className="glass-panel rounded-xl p-6 flex flex-col gap-4">
            <h3 className="text-lg font-black text-white uppercase tracking-tight border-b border-white/5 pb-4">Today's Focus</h3>
            <ul className="flex flex-col gap-3">
              {[
                { title: "Review Chemistry Chapter 3 Notes", time: "8:00 PM", priority: false },
                { title: "Take Physics Mock Test #4", time: "High Priority", priority: true },
                { title: "Watch Math Integral Calculus Video", time: "9:30 PM", priority: false },
              ].map((task, i) => (
                <li key={i} className="flex items-center gap-4 bg-white/[0.02] border border-white/5 rounded-xl p-4 hover:border-white/10 transition-colors group">
                  <div className="w-5 h-5 rounded border border-white/20 flex items-center justify-center cursor-pointer hover:border-indigo-500 transition-colors">
                    <div className="w-2.5 h-2.5 bg-indigo-500 rounded-sm opacity-0 group-hover:opacity-30 transition-opacity" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors">{task.title}</p>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">{task.time}</p>
                  </div>
                  {task.priority && (
                    <span className="bg-rose-500/10 text-rose-500 px-2 py-1 rounded text-[10px] font-black uppercase tracking-widest border border-rose-500/20 animate-pulse">Mock</span>
                  )}
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Right Col: Performance & Calendar */}
        <div className="flex flex-col gap-8">
          {/* Subject Mastery Visual */}
          <section className="glass-panel rounded-xl p-6 flex flex-col items-center justify-center min-h-[320px] border-t-4 border-t-indigo-600">
            <h3 className="text-lg font-black text-white uppercase tracking-tight w-full text-left mb-6 flex items-center gap-2">
              <TrendingUp size={20} className="text-indigo-400" />
              Subject Mastery
            </h3>
            <div className="relative w-44 h-44 flex items-center justify-center">
              {/* Radar Chart Background */}
              <div className="absolute inset-0 border border-white/5 rounded-full"></div>
              <div className="absolute inset-8 border border-white/5 rounded-full"></div>
              <div className="absolute inset-16 border border-white/5 rounded-full"></div>
              
              {/* Data Polygon Approximation */}
              <svg className="w-full h-full -rotate-90 scale-110 drop-shadow-[0_0_15px_rgba(99,102,241,0.3)]">
                <polygon 
                  points="100,20 160,80 140,160 60,150 30,70" 
                  className="fill-indigo-500/20 stroke-indigo-500 stroke-2"
                />
              </svg>
              
              <div className="absolute top-0 -mt-6 text-[10px] font-black text-indigo-400 uppercase tracking-widest">Physics</div>
              <div className="absolute bottom-0 -mb-6 text-[10px] font-black text-cyan-400 uppercase tracking-widest">Chemistry</div>
              <div className="absolute right-0 -mr-10 text-[10px] font-black text-emerald-400 uppercase tracking-widest">Math</div>
            </div>
            <div className="mt-10 flex gap-4">
               <div className="flex flex-col items-center">
                  <span className="text-xl font-black text-white">84%</span>
                  <span className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">Overall</span>
               </div>
               <div className="w-px h-8 bg-white/10" />
               <div className="flex flex-col items-center">
                  <span className="text-xl font-black text-indigo-400">+12%</span>
                  <span className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">Progress</span>
               </div>
            </div>
          </section>

          {/* Upcoming Tests */}
          <section className="glass-panel rounded-xl p-6 flex flex-col gap-4">
            <div className="flex justify-between items-center border-b border-white/5 pb-4">
              <h3 className="text-lg font-black text-white uppercase tracking-tight">Upcoming Tests</h3>
              <Calendar size={18} className="text-slate-500" />
            </div>
            <div className="flex flex-col gap-4">
              {[
                { date: "15", month: "OCT", title: "JEE Mock Exam - Full Syllabus", time: "9:00 AM - 12:00 PM", color: "border-rose-500", label: "Mock" },
                { date: "22", month: "OCT", title: "Unit Test: Mathematics", time: "10:00 AM - 11:30 AM", color: "border-cyan-500", label: "Unit" },
              ].map((test, i) => (
                <div key={i} className={`flex items-center gap-4 border-l-4 ${test.color} pl-4 group cursor-pointer`}>
                  <div className="flex flex-col items-center bg-white/5 px-3 py-2 rounded-xl border border-white/5 group-hover:border-white/20 transition-all">
                    <span className="text-[10px] text-rose-400 font-black tracking-widest">{test.month}</span>
                    <span className="text-xl font-black text-white">{test.date}</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white group-hover:text-indigo-400 transition-colors">{test.title}</p>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest leading-none mt-1">{test.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* Achievements Section */}
      <section className="glass-panel rounded-xl p-6 mb-8">
        <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
          <h3 className="text-lg font-black text-white uppercase tracking-tight">Unlocked Achievements</h3>
          <Trophy size={18} className="text-amber-400" />
        </div>
        <div className="flex gap-8 overflow-x-auto no-scrollbar py-2">
          {[
            { label: "First 100 Qs", icon: <CheckCircle className="text-amber-500" size={32} />, unlocked: true, color: "from-amber-400/20 to-orange-500/20 border-amber-500/50" },
            { label: "Physics Pro", icon: <Brain className="text-indigo-400" size={32} />, unlocked: true, color: "from-indigo-400/20 to-indigo-600/20 border-indigo-500/50" },
            { label: "10 Day Streak", icon: <Flame className="text-rose-500" size={32} />, unlocked: true, color: "from-rose-400/20 to-rose-600/20 border-rose-500/50" },
            { label: "Math Wizard", icon: <Zap className="text-slate-600" size={32} />, unlocked: false, color: "bg-white/5 border-white/10" },
            { label: "Library Scout", icon: <Bookmark className="text-slate-600" size={32} />, unlocked: false, color: "bg-white/5 border-white/10" },
          ].map((achievement, i) => (
            <div key={i} className={`flex flex-col items-center gap-3 min-w-[120px] transition-all ${achievement.unlocked ? 'opacity-100' : 'opacity-30 grayscale'}`}>
              <div className={`w-16 h-16 rounded-full bg-gradient-to-br flex items-center justify-center border shadow-lg transition-transform hover:scale-110 ${achievement.color}`}>
                {achievement.icon}
              </div>
              <span className="text-[10px] font-black text-white uppercase tracking-widest text-center whitespace-nowrap">{achievement.label}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
