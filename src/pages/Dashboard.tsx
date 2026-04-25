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
        <section className="lg:col-span-2 vibrant-card p-8 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 bg-gradient-to-br from-white to-slate-50 border-l-8 border-l-primary">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10 animate-pulse"></div>
          <div className="z-10 flex-1">
            <h2 className="text-3xl font-display font-black text-slate-900 mb-2 tracking-tight">Welcome back, {profile?.displayName?.split(' ')[0] || 'Scholar'}!</h2>
            <p className="text-lg text-slate-500 font-medium mb-6">Your next official Scholar Mock Test is in <span className="text-primary font-bold underline underline-offset-4 decoration-primary/30">2 days</span>.</p>
            <div className="flex gap-4">
              <Link to="/scholar-series">
                <button className="btn-primary px-8 py-3.5 flex items-center gap-2">
                    Scholar Series
                    <Trophy size={16} />
                </button>
              </Link>
              <Link to="/results">
                <button className="btn-secondary px-8 py-3.5">
                    View Results
                </button>
              </Link>
            </div>
          </div>
          <div className="hidden lg:block z-10">
             <div className="w-40 h-40 bg-primary/5 rounded-[40px] flex items-center justify-center relative overflow-hidden group border border-primary/10 shadow-inner">
                <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <Trophy size={64} className="text-primary group-hover:scale-110 transition-all duration-500" />
             </div>
          </div>
        </section>

        <section className="vibrant-card p-8 border-t-8 border-t-green-500 flex flex-col justify-between">
           <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Scholar Standing</p>
              <h3 className="text-4xl font-display font-black text-slate-900 tracking-tight">Global <span className="text-green-500">#45</span></h3>
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-2">Top 2% of Cypher Scholars</p>
           </div>
           <div className="flex items-center gap-4 mt-6">
              <div className="flex -space-x-3">
                 {[1,2,3].map(i => (
                    <img key={i} src={`https://i.pravatar.cc/40?u=${i}`} className="w-8 h-8 rounded-full border-2 border-white bg-slate-100" alt="" />
                 ))}
                 <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-[8px] font-bold text-slate-500">+12</div>
              </div>
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Compete with friends</span>
           </div>
        </section>
      </div>

      {/* Stats Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Study Streak", value: "7", unit: "days", icon: <Flame className="text-orange-500" />, color: "bg-orange-500" },
          { label: "Tests Taken", value: "12", unit: "", icon: <CheckCircle className="text-cyan-500" />, color: "bg-cyan-500" },
          { label: "Time Studied", value: "24h 35m", unit: "", icon: <Timer className="text-primary" />, color: "bg-primary" },
          { label: "Questions Solved", value: "456", unit: "", icon: <Brain className="text-green-500" />, color: "bg-green-500" },
        ].map((stat, i) => (
          <div key={i} className="vibrant-card rounded-xl p-6 flex flex-col gap-4 group">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</span>
              <div className="group-hover:rotate-12 transition-transform">
                {stat.icon}
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-display font-black text-slate-900 tracking-tight">{stat.value}</span>
              <span className="text-xs font-bold text-slate-400 uppercase">{stat.unit}</span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden shadow-inner">
              <div className={`${stat.color} h-full w-1/2 rounded-full`}></div>
            </div>
          </div>
        ))}
      </section>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Left Col: Learning & Tasks */}
        <div className="xl:col-span-2 flex flex-col gap-8">
          {/* Continue Learning */}
          <section className="vibrant-card rounded-xl p-6 flex flex-col gap-6">
            <div className="flex justify-between items-center border-b border-slate-100 pb-4">
              <h3 className="text-lg font-bold text-slate-900 uppercase tracking-tight">Continue Learning</h3>
              <Link to="/subjects/grades" className="text-xs font-bold text-primary hover:underline uppercase tracking-widest">View All</Link>
            </div>
            <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
              {[
                { subject: "Physics", title: "Electromagnetic Induction - Core Concepts", progress: 65, color: "text-blue-500", bg: "bg-blue-50" },
                { subject: "Mathematics", title: "Integral Calculus: Advanced Practice Set", progress: 30, color: "text-violet-500", bg: "bg-violet-50" },
                { subject: "Chemistry", title: "Organic Reactions: Mechanisms Part 2", progress: 15, color: "text-green-500", bg: "bg-green-50" },
              ].map((item, i) => (
                <div key={i} className="min-w-[300px] bg-white border border-slate-100 rounded-xl p-5 flex flex-col gap-4 hover:border-primary/20 hover:shadow-md transition-all cursor-pointer group">
                  <div className="flex justify-between items-start">
                    <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${item.bg} ${item.color}`}>{item.subject}</span>
                    <Bookmark size={14} className="text-slate-300 group-hover:text-primary transition-colors" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-800 line-clamp-2 leading-snug">{item.title}</h4>
                  <div className="mt-auto">
                    <div className="flex justify-between items-center mb-2">
                       <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{item.progress}% Complete</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full transition-all duration-1000 ${item.color.replace('text-', 'bg-')}`} style={{ width: `${item.progress}%` }}></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Today's Focus */}
          <section className="vibrant-card rounded-xl p-6 flex flex-col gap-4">
            <h3 className="text-lg font-bold text-slate-900 uppercase tracking-tight border-b border-slate-100 pb-4">Today's Focus</h3>
            <ul className="flex flex-col gap-3">
              {[
                { title: "Review Chemistry Chapter 3 Notes", time: "8:00 PM", priority: false },
                { title: "Take Physics Mock Test #4", time: "High Priority", priority: true },
                { title: "Watch Math Integral Calculus Video", time: "9:30 PM", priority: false },
              ].map((task, i) => (
                <li key={i} className="flex items-center gap-4 bg-slate-50/50 border border-slate-100 rounded-xl p-4 hover:bg-slate-50 hover:border-primary/20 transition-all group">
                  <div className="w-5 h-5 rounded border border-slate-200 flex items-center justify-center cursor-pointer hover:border-primary transition-colors">
                    <div className="w-2.5 h-2.5 bg-primary rounded-sm opacity-0 group-hover:opacity-30 transition-opacity" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-slate-700 group-hover:text-slate-900 transition-colors">{task.title}</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">{task.time}</p>
                  </div>
                  {task.priority && (
                    <span className="bg-primary/10 text-primary px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest border border-primary/20 animate-pulse">Mock</span>
                  )}
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Right Col: Performance & Calendar */}
        <div className="flex flex-col gap-8">
          {/* Subject Mastery Visual */}
          <section className="vibrant-card rounded-xl p-6 flex flex-col items-center justify-center min-h-[320px] border-t-8 border-t-primary">
            <h3 className="text-lg font-bold text-slate-900 uppercase tracking-tight w-full text-left mb-6 flex items-center gap-2">
              <TrendingUp size={20} className="text-primary" />
              Subject Mastery
            </h3>
            <div className="relative w-44 h-44 flex items-center justify-center">
              {/* Radar Chart Background */}
              <div className="absolute inset-0 border border-slate-100 rounded-full"></div>
              <div className="absolute inset-8 border border-slate-100 rounded-full"></div>
              <div className="absolute inset-16 border border-slate-100 rounded-full"></div>
              
              {/* Data Polygon Approximation */}
              <svg className="w-full h-full -rotate-90 scale-110 drop-shadow-lg">
                <polygon 
                  points="100,20 160,80 140,160 60,150 30,70" 
                  className="fill-primary/20 stroke-primary stroke-2"
                />
              </svg>
              
              <div className="absolute top-0 -mt-6 text-[10px] font-bold text-blue-500 uppercase tracking-widest">Physics</div>
              <div className="absolute bottom-0 -mb-6 text-[10px] font-bold text-green-500 uppercase tracking-widest">Chemistry</div>
              <div className="absolute right-0 -mr-10 text-[10px] font-bold text-violet-500 uppercase tracking-widest">Math</div>
            </div>
            <div className="mt-10 flex gap-4">
               <div className="flex flex-col items-center">
                  <span className="text-xl font-bold text-slate-900">84%</span>
                  <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Overall</span>
               </div>
               <div className="w-px h-8 bg-slate-100" />
               <div className="flex flex-col items-center">
                  <span className="text-xl font-bold text-primary">+12%</span>
                  <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Progress</span>
               </div>
            </div>
          </section>

          {/* Upcoming Tests */}
          <section className="vibrant-card rounded-xl p-6 flex flex-col gap-4">
            <div className="flex justify-between items-center border-b border-slate-100 pb-4">
              <h3 className="text-lg font-bold text-slate-900 uppercase tracking-tight">Upcoming Tests</h3>
              <Calendar size={18} className="text-slate-300" />
            </div>
            <div className="flex flex-col gap-4">
              {[
                { date: "15", month: "OCT", title: "JEE Mock Exam - Full Syllabus", time: "9:00 AM - 12:00 PM", color: "border-primary", label: "Mock" },
                { date: "22", month: "OCT", title: "Unit Test: Mathematics", time: "10:00 AM - 11:30 AM", color: "border-secondary", label: "Unit" },
              ].map((test, i) => (
                <div key={i} className={`flex items-center gap-4 border-l-4 ${test.color} pl-4 group cursor-pointer`}>
                  <div className="flex flex-col items-center bg-slate-50 px-3 py-2 rounded-xl border border-slate-100 group-hover:bg-primary/5 transition-all">
                    <span className="text-[10px] text-primary font-bold tracking-widest">{test.month}</span>
                    <span className="text-xl font-display font-black text-slate-900">{test.date}</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-700 group-hover:text-primary transition-colors">{test.title}</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none mt-1">{test.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* Achievements Section */}
      <section className="vibrant-card rounded-xl p-6 mb-8">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
          <h3 className="text-lg font-bold text-slate-900 uppercase tracking-tight">Unlocked Achievements</h3>
          <Trophy size={18} className="text-amber-500" />
        </div>
        <div className="flex gap-8 overflow-x-auto no-scrollbar py-2">
          {[
            { label: "First 100 Qs", icon: <CheckCircle className="text-amber-500" size={32} />, unlocked: true, color: "from-amber-50 to-orange-50 border-amber-200 shadow-sm" },
            { label: "Physics Pro", icon: <Brain className="text-primary" size={32} />, unlocked: true, color: "from-blue-50 to-indigo-50 border-primary/20 shadow-sm" },
            { label: "10 Day Streak", icon: <Flame className="text-orange-500" size={32} />, unlocked: true, color: "from-orange-50 to-red-50 border-orange-200 shadow-sm" },
            { label: "Math Wizard", icon: <Zap className="text-slate-300" size={32} />, unlocked: false, color: "bg-slate-50 border-slate-100" },
            { label: "Library Scout", icon: <Bookmark className="text-slate-300" size={32} />, unlocked: false, color: "bg-slate-50 border-slate-100" },
          ].map((achievement, i) => (
            <div key={i} className={`flex flex-col items-center gap-3 min-w-[120px] transition-all ${achievement.unlocked ? 'opacity-100' : 'opacity-40 grayscale'}`}>
              <div className={`w-16 h-16 rounded-full bg-gradient-to-br flex items-center justify-center border transition-transform hover:scale-110 ${achievement.color}`}>
                {achievement.icon}
              </div>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest text-center whitespace-nowrap">{achievement.label}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
