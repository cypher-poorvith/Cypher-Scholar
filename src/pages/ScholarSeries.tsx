import React, { useState } from 'react';
import { 
  Trophy, Filter, ChevronRight, Clock, ShieldCheck, 
  Search, Lock, CheckCircle2, Timer 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ScholarSeries: React.FC = () => {
  const { profile } = useAuth();
  const navigate = useNavigate();
  const [filter, setFilter] = useState('All');

  // Mock data for test series
  const testSeries = [
    {
      id: 'scholar_jee_5',
      title: 'Scholar JEE Main Test Series #5',
      exam: 'JEE Main',
      syllabus: 'Full Syllabus',
      questions: 90,
      duration: 180,
      status: 'available', // available, under_review, published, locked
      expert: 'Dr. Rajesh Sharma',
      date: 'Dec 15, 2024'
    },
    {
      id: 'scholar_jee_4',
      title: 'Scholar JEE Main Test Series #4',
      exam: 'JEE Main',
      syllabus: 'Full Syllabus',
      questions: 90,
      duration: 180,
      status: 'published',
      expert: 'Dr. Rajesh Sharma',
      score: 234,
      total: 300,
      date: 'Dec 10, 2024'
    },
    {
      id: 'scholar_jee_3',
      title: 'Scholar JEE Main Test Series #3',
      exam: 'JEE Main',
      syllabus: 'Full Syllabus',
      questions: 90,
      duration: 180,
      status: 'under_review',
      expert: 'Dr. Rajesh Sharma',
      date: 'Dec 05, 2024'
    }
  ];

  const filteredTests = filter === 'All' ? testSeries : testSeries.filter(t => t.exam === filter);

  return (
    <div className="space-y-12 pb-20">
      {/* Header Section */}
      <section className="relative overflow-hidden rounded-[40px] bg-gradient-to-br from-indigo-900/40 to-black border border-white/5 p-12">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[100px] -mr-20 -mt-20" />
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="space-y-6 max-w-2xl">
            <div className="flex items-center gap-3 bg-indigo-500/10 w-fit px-4 py-2 rounded-xl border border-indigo-500/20">
              <Trophy size={16} className="text-indigo-400" />
              <span className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.3em]">Official Test Series</span>
            </div>
            <h1 className="text-5xl font-black text-white uppercase italic tracking-tighter leading-none">
              Scholar <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Test Series</span>
            </h1>
            <p className="text-slate-400 text-lg font-medium leading-relaxed">
              Experience the highest quality mock tests curated by subject experts. Every attempt is personally verified by teachers to give you the most accurate feedback.
            </p>
          </div>
          <div className="shrink-0">
             <div className="w-48 h-48 bg-white/5 rounded-[40px] border border-white/10 flex items-center justify-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <Trophy size={80} className="text-indigo-500 group-hover:scale-110 transition-transform duration-500" />
             </div>
          </div>
        </div>
      </section>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3 bg-white/[0.03] p-1.5 rounded-2xl border border-white/5">
          {['All', 'JEE Main', 'NEET', 'Advanced'].map(cat => (
            <button 
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                filter === cat ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:text-white hover:bg-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        
        <div className="relative w-full md:w-80">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
          <input 
            type="text" 
            placeholder="Search Series..." 
            className="w-full h-14 bg-white/[0.03] border border-white/10 rounded-2xl pl-12 pr-4 text-white font-bold focus:outline-none focus:border-indigo-500 transition-all"
          />
        </div>
      </div>

      {/* Test List */}
      <div className="grid gap-6">
        {filteredTests.map((test, index) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            key={test.id}
            className="group relative overflow-hidden bg-white/[0.02] border border-white/5 hover:border-white/10 rounded-[32px] p-10 flex flex-col md:flex-row items-center justify-between gap-8 transition-all"
          >
             <div className="flex items-center gap-8 flex-1">
                <div className="w-20 h-20 bg-indigo-600/10 rounded-2xl flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform">
                   {test.status === 'published' ? <CheckCircle2 size={32} /> : test.status === 'locked' ? <Lock size={32} /> : <Timer size={32} />}
                </div>
                <div className="space-y-2">
                   <div className="flex items-center gap-3">
                      <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{test.exam} • {test.date}</span>
                      {test.status === 'published' && <span className="bg-emerald-500/10 text-emerald-500 text-[8px] font-black uppercase tracking-[0.2em] px-2 py-1 rounded">Result Published</span>}
                      {test.status === 'under_review' && <span className="bg-amber-500/10 text-amber-500 text-[8px] font-black uppercase tracking-[0.2em] px-2 py-1 rounded">Under Review</span>}
                   </div>
                   <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter group-hover:text-indigo-400 transition-colors">{test.title}</h3>
                   <div className="flex items-center gap-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      <span className="flex items-center gap-1"><Timer size={12} /> {test.duration} MINS</span>
                      <span className="flex items-center gap-1"><ShieldCheck size={12} /> Verified by {test.expert}</span>
                   </div>
                </div>
             </div>

             <div className="flex items-center gap-6">
                {test.status === 'published' ? (
                  <div className="text-right space-y-1">
                     <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Your Score</p>
                     <p className="text-2xl font-black text-white italic tracking-tighter">{test.score}<span className="text-slate-500 text-sm">/{test.total}</span></p>
                  </div>
                ) : test.status === 'under_review' ? (
                  <div className="px-6 py-3 bg-white/5 rounded-2xl border border-white/5 text-slate-500 text-[10px] font-black uppercase tracking-widest italic">
                    Awaiting Verification
                  </div>
                ) : null}

                <button 
                  onClick={() => test.status === 'available' ? navigate('/tests/configure') : navigate('/results')}
                  className={`h-14 px-8 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all flex items-center gap-3 ${
                    test.status === 'available' || test.status === 'published' 
                    ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-600/20 hover:scale-105' 
                    : 'bg-white/5 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  {test.status === 'available' ? 'Start Test' : test.status === 'published' ? 'View Results' : 'System Locked'} <ChevronRight size={16} />
                </button>
             </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ScholarSeries;
