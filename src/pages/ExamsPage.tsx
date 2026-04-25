import React from 'react';
import { School, ArrowRight, CheckCircle2, TrendingUp, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { useAuth } from '../context/AuthContext';

const ExamsPage: React.FC = () => {
  const { user } = useAuth();

  const exams = [
    {
      id: 'jee',
      title: 'JEE Main & Advanced',
      desc: 'Engineering Entrance',
      icon: '🎓',
      subjects: 3,
      pdfs: 234,
      videos: 45,
      mocks: 50,
      color: 'border-indigo-500',
      progress: 23
    },
    {
      id: 'neet',
      title: 'NEET UG',
      desc: 'Medical Entrance',
      icon: '🏥',
      subjects: 3,
      pdfs: 180,
      videos: 32,
      mocks: 40,
      color: 'border-cyan-500',
      progress: 15
    },
    {
      id: 'upsc',
      title: 'UPSC CSE',
      desc: 'Civil Services',
      icon: '🏛️',
      subjects: 12,
      pdfs: 500,
      videos: 120,
      mocks: 25,
      color: 'border-purple-500',
      progress: 5
    }
  ];

  return (
    <div className="space-y-12">
      <header>
        <h1 className="text-4xl md:text-6xl font-display font-black text-white uppercase tracking-tighter mb-4 italic">
          Competitive Exams
        </h1>
        <p className="text-lg text-slate-400 font-medium max-w-2xl">
          Prepare for your target exam with comprehensive resources, verified by experts and top rankers.
        </p>
      </header>

      {/* Category Tabs */}
      <div className="overflow-x-auto no-scrollbar pb-2">
        <div className="flex gap-4 border-b border-white/5">
          {['All Exams', 'Engineering', 'Medical', 'Government', 'Defense', 'Olympiads'].map((cat, i) => (
            <button 
              key={i}
              className={`px-8 py-4 text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap
                ${i === 0 ? 'bg-indigo-500/10 text-indigo-400 border-b-2 border-indigo-500' : 'text-slate-500 hover:text-white'}
              `}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Exam Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {exams.map((exam, i) => (
          <motion.div 
            key={exam.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`glass-panel p-8 hover-lift cursor-pointer border-l-4 ${exam.color} flex flex-col gap-6 relative group overflow-hidden`}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700" />
            
            <div className="flex items-center gap-4 relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-3xl shadow-inner border border-white/10 group-hover:scale-110 transition-transform">
                {exam.icon}
              </div>
              <div>
                <h3 className="text-xl font-black text-white uppercase tracking-tight">{exam.title}</h3>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{exam.desc}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 relative z-10">
              <div className="bg-white/5 rounded-xl p-4 text-center border border-white/5 group-hover:border-white/10 transition-colors">
                <p className="text-2xl font-black text-white leading-none">{exam.subjects}</p>
                <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mt-2">Subjects</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4 text-center border border-white/5 group-hover:border-white/10 transition-colors">
                <p className="text-2xl font-black text-white leading-none">{exam.pdfs}</p>
                <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mt-2">PDF Notes</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4 text-center border border-white/5 group-hover:border-white/10 transition-colors text-indigo-400">
                <p className="text-2xl font-black leading-none">{exam.videos}</p>
                <p className="text-[9px] font-black uppercase tracking-widest mt-2">Videos</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4 text-center border border-white/5 group-hover:border-white/10 transition-colors text-orange-400">
                <p className="text-2xl font-black leading-none">{exam.mocks}</p>
                <p className="text-[9px] font-black uppercase tracking-widest mt-2">Mock Tests</p>
              </div>
            </div>

            <ul className="space-y-3 relative z-10">
              {['Previous Year Papers', 'Topic-wise Tests', 'Full-length Mocks'].map((feature, j) => (
                <li key={j} className="flex items-center gap-3 text-xs font-bold text-slate-400">
                  <CheckCircle2 size={16} className="text-indigo-400" />
                  {feature}
                </li>
              ))}
            </ul>

            <div className="mt-auto pt-6 relative z-10">
              <Link to={`/subjects/${exam.id}`}>
                <button className="w-full h-14 bg-gradient-to-r from-indigo-600 to-indigo-800 text-white font-black text-xs uppercase tracking-[0.2em] rounded-xl hover:shadow-lg hover:shadow-indigo-600/30 transition-all flex items-center justify-center gap-2 group/btn">
                  Start Preparation
                  <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </Link>
            </div>

            {user && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/5">
                <div 
                  className="h-full bg-indigo-500 shadow-[0_-4px_12px_rgba(99,102,241,0.5)] transition-all duration-1000"
                  style={{ width: `${exam.progress}%` }}
                />
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Trust Banner */}
      <section className="glass-panel p-12 flex flex-col md:flex-row items-center justify-between gap-8 border-t-2 border-t-indigo-500/30">
        <div className="space-y-4">
          <h2 className="text-3xl font-black text-white uppercase italic tracking-tighter">THE SCHOLAR CIRCLE</h2>
          <p className="text-slate-400 font-medium max-w-md">Join 2,492 other students who are currently preparing for their exams using Cypher Scholar.</p>
        </div>
        <div className="flex -space-x-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="w-16 h-16 rounded-full border-4 border-[#13131b] bg-white/5 flex items-center justify-center overflow-hidden">
              <Users className="text-slate-600" />
            </div>
          ))}
          <div className="w-16 h-16 rounded-full border-4 border-[#13131b] bg-indigo-600 flex items-center justify-center text-white font-black text-xs">
            +2k
          </div>
        </div>
      </section>
    </div>
  );
};

export default ExamsPage;
