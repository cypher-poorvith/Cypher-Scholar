import React from 'react';
import { 
  FileQuestion, Zap, ClipboardList, CheckCircle2, 
  Play, Clock, Star, School, Plus, ChevronRight, 
  Target, BarChart3, TrendingUp, Users 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { useAuth } from '../context/AuthContext';

const PracticeZone: React.FC = () => {
  const { user } = useAuth();

  const options = [
    { label: "Create Custom Test", desc: "Configure your own mock scenario", icon: <Plus />, color: "text-indigo-400", bg: "bg-indigo-400/20", borderColor: "border-indigo-500" },
    { label: "Topic Practice", desc: "Solve questions by specific topics", icon: <FileQuestion />, color: "text-cyan-400", bg: "bg-cyan-400/20", borderColor: "border-cyan-500" },
    { label: "Quick Quizzes", desc: "10-15 qs, instant marks", icon: <Zap />, color: "text-rose-400", bg: "bg-rose-400/20", borderColor: "border-rose-500" },
    { label: "Saved Drafts", desc: "Resume your created tests", icon: <ClipboardList />, color: "text-amber-400", bg: "bg-amber-400/20", borderColor: "border-amber-500" },
  ];

  const recentTests = [
    { title: "My Physics Practice - Dec 15", exam: "Practice", time: "2 hours ago", score: "28/30", percent: 93, color: "text-indigo-400" },
    { title: "Mixed Concept Test", exam: "Quizzes", time: "Yesterday", score: "12/15", percent: 80, color: "text-emerald-400" },
  ];

  return (
    <div className="space-y-12 pb-20">
      <header className="flex flex-col md:flex-row items-end justify-between gap-6 overflow-hidden">
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-indigo-400 font-bold uppercase tracking-widest text-[10px]">
             <FileQuestion size={16} /> Student Practice Zone
          </div>
          <h1 className="text-4xl md:text-6xl font-display font-black text-white uppercase tracking-tighter italic leading-none">
            Self-Paced <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Practice</span>
          </h1>
          <p className="text-lg text-slate-400 font-medium max-w-2xl">
            Create custom mocks, solve topic-wise questions, and track your accuracy without the pressure of official rankings.
          </p>
        </div>
        <Link to="/tests/configure">
           <button className="h-16 px-10 bg-indigo-600 text-white rounded-2xl font-black text-xs uppercase tracking-[0.3em] shadow-2xl shadow-indigo-600/20 hover:scale-105 transition-all flex items-center gap-3 group">
              <Plus size={20} className="group-hover:rotate-90 transition-transform" /> Create Custom Test
           </button>
        </Link>
      </header>

      {/* Main Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {options.map((opt, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className={`glass-panel p-8 text-center hover-lift cursor-pointer flex flex-col items-center gap-6 border-t-4 ${opt.borderColor} group`}
          >
            <div className={`w-20 h-20 rounded-3xl ${opt.bg} ${opt.color} flex items-center justify-center text-3xl shadow-inner border border-white/5 group-hover:rotate-12 transition-transform`}>
              {opt.icon}
            </div>
            <div>
              <h3 className="text-xl font-black text-white uppercase tracking-tight italic">{opt.label}</h3>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">{opt.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recent Activity: Logged In Only */}
      {user ? (
        <section className="space-y-8 animate-in fade-in slide-in-from-left-8 duration-700">
           <div className="flex justify-between items-center border-b border-white/5 pb-4">
            <h2 className="text-2xl font-black text-white uppercase tracking-tighter italic">Your Practice Tests</h2>
            <Link to="/results" className="text-xs font-black text-indigo-400 hover:text-indigo-300 transition-colors uppercase tracking-widest">Full History →</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentTests.map((test, i) => (
              <div key={i} className="glass-panel p-8 flex flex-col gap-6 group hover:border-white/20 transition-all">
                <div className="flex justify-between items-center">
                  <span className={`px-3 py-1 bg-white/5 ${test.color} rounded-full text-[10px] font-black uppercase tracking-widest border border-white/5`}>{test.exam}</span>
                  <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">{test.time}</span>
                </div>
                <h3 className="text-lg font-bold text-white leading-tight group-hover:text-indigo-400 transition-colors">{test.title}</h3>
                <div className="flex items-center justify-between border-y border-white/5 py-4 my-2">
                   <div>
                      <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Last Score</p>
                      <p className="text-2xl font-black text-white">{test.score}</p>
                   </div>
                   <div className="text-right">
                      <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Accuracy</p>
                      <p className={`text-2xl font-black ${test.percent > 80 ? 'text-emerald-400' : 'text-indigo-400'}`}>{test.percent}%</p>
                   </div>
                </div>
                <button className="w-full h-12 bg-white/5 hover:bg-indigo-500 hover:text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">Review Results</button>
              </div>
            ))}
          </div>
        </section>
      ) : (
        <section className="relative overflow-hidden p-1 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-indigo-500/20 rounded-[40px]">
          <div className="bg-[#0D0A1F] rounded-[38px] p-12 md:p-20 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.1),transparent_70%)] pointer-events-none" />
            
            <div className="max-w-3xl mx-auto relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-8">
                Premium Content Locked
              </div>
              
              <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-8 italic leading-none">
                Unlock Your Full<br/>Testing Potential
              </h2>
              
              <p className="text-lg text-slate-400 font-medium mb-12">
                Join 100,000+ students who use our high-fidelity mock tests to simulate real exam environments and track their growth.
              </p>
              
              <div className="flex flex-wrap items-center justify-center gap-6">
                <Link to="/auth">
                  <button className="h-16 px-12 bg-white text-[#0D0A1F] rounded-full font-black text-xs uppercase tracking-[0.3em] flex items-center gap-3 hover:scale-105 transition-all shadow-xl">
                    Login to Start Testing
                    <Play size={18} fill="currentColor" />
                  </button>
                </Link>
                
                <button className="h-16 px-12 bg-white/5 border border-white/10 text-white rounded-full font-black text-xs uppercase tracking-[0.3em] flex items-center gap-3 hover:bg-white/10 transition-all opacity-50 cursor-not-allowed">
                  Sample Test (Coming Soon)
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-24">
                {[
                  { label: "NTA Pattern", icon: <School size={20} /> },
                  { label: "Speed Tracking", icon: <Clock size={20} /> },
                  { label: "AI Analysis", icon: <CheckCircle2 size={20} /> },
                  { label: "Rank Predictor", icon: <Star size={20} /> },
                ].map((f, i) => (
                  <div key={i} className="flex flex-col items-center gap-4 group">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-indigo-400 border border-white/10 group-hover:scale-110 group-hover:bg-indigo-500 group-hover:text-white transition-all">
                      {f.icon}
                    </div>
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{f.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Categories for Practice */}
      <section className="space-y-8">
        <div className="flex justify-between items-center border-b border-white/5 pb-4">
            <h2 className="text-2xl font-black text-white uppercase tracking-tighter italic">Practice by Category</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           {['Physics', 'Chemistry', 'Mathematics'].map(sub => (
              <div key={sub} className="glass-panel p-8 border-white/5 space-y-6">
                 <h3 className="text-xl font-black text-white uppercase italic tracking-tight">{sub}</h3>
                 <div className="space-y-3">
                    {['Chapter Wise', 'Topic Wise', 'PYQs'].map(type => (
                       <button key={type} className="w-full flex items-center justify-between p-4 bg-white/5 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white hover:bg-white/10 transition-all">
                          {type} <ChevronRight size={14} />
                       </button>
                    ))}
                 </div>
              </div>
           ))}
        </div>
      </section>
    </div>
  );
};

export default PracticeZone;
