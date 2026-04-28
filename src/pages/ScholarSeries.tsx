import React, { useState } from 'react';
import { 
  Trophy, Filter, ChevronRight, Clock, ShieldCheck, 
  Search, Lock, CheckCircle2, Timer 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { cn } from '../lib/utils';

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

  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  const handleStartTest = (testId: string) => {
    if (!profile) {
      setShowLoginPrompt(true);
      return;
    }
    navigate('/tests/configure');
  };

  return (
    <div className="space-y-12 pb-20 animate-in fade-in duration-700">
      {/* Login Prompt Overlay */}
      <AnimatePresence>
        {showLoginPrompt && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-32 left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-lg"
          >
            <div className="vibrant-card bg-slate-900 border-slate-800 p-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/20 rounded-2xl text-primary border border-primary/20">
                  <ShieldCheck size={24} />
                </div>
                <div className="space-y-1">
                  <p className="text-white font-bold text-sm tracking-tight leading-none">Authentication Required</p>
                  <p className="text-slate-400 text-xs font-medium">Sign in to unlock mock tests and save progress</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setShowLoginPrompt(false)}
                  className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-white transition-colors"
                >
                  Dismiss
                </button>
                <button 
                  onClick={() => navigate('/login')}
                  className="px-6 py-3 bg-primary text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all"
                >
                  Sign In
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Header Section */}
      <section className="relative overflow-hidden rounded-[40px] bg-gradient-to-br from-indigo-50 to-primary/5 border border-primary/10 p-12 shadow-sm">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px] -mr-20 -mt-20" />
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="space-y-6 max-w-2xl text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3 bg-white w-fit px-4 py-2 rounded-xl shadow-sm border border-slate-100 mx-auto md:mx-0">
              <Trophy size={16} className="text-primary" />
              <span className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">Official Test Series</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-display font-black text-slate-900 leading-none uppercase tracking-tight">
              Scholar <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Test Series</span>
            </h1>
            <p className="text-slate-500 text-lg font-medium leading-relaxed max-w-xl">
              Experience high-quality mock tests curated by experts. Every attempt is personally verified to provide the most accurate feedback for your growth.
            </p>
          </div>
          <div className="shrink-0 hidden lg:block">
             <div className="w-48 h-48 bg-white rounded-[40px] shadow-xl shadow-primary/10 border border-slate-50 flex items-center justify-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <Trophy size={80} className="text-primary group-hover:scale-110 transition-transform duration-500" />
             </div>
          </div>
        </div>
      </section>

      {/* Filters & Search */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
        <div className="vibrant-card p-1.5 flex flex-wrap gap-2 bg-white border border-slate-100 shadow-sm w-full lg:w-auto overflow-x-auto">
          {['All', 'JEE Main', 'Advanced'].map(cat => (
            <button 
              key={cat}
              onClick={() => setFilter(cat)}
              className={`flex-1 px-8 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all whitespace-nowrap ${
                filter === cat ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-slate-400 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        
        <div className="relative w-full lg:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search Series..." 
            className="vibrant-input pl-12 h-14"
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
            className="group vibrant-card bg-white border-slate-100 hover:border-primary/20 p-8 flex flex-col md:flex-row items-center justify-between gap-8 transition-all shadow-sm"
          >
             <div className="flex items-center gap-8 flex-1 w-full">
                <div className="w-16 h-16 bg-primary/5 rounded-2xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform border border-primary/10">
                   {test.status === 'published' ? <CheckCircle2 size={32} /> : test.status === 'locked' ? <Lock size={32} /> : <Timer size={32} />}
                </div>
                <div className="space-y-1">
                   <div className="flex items-center gap-3">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{test.exam} • {test.date}</span>
                      {test.status === 'published' && <span className="vibrant-badge bg-emerald-50 text-emerald-600 text-[8px] px-2 py-1">Result Published</span>}
                      {test.status === 'under_review' && <span className="vibrant-badge bg-amber-50 text-amber-600 text-[8px] px-2 py-1">Under Review</span>}
                   </div>
                   <h3 className="text-2xl font-bold text-slate-900 tracking-tight group-hover:text-primary transition-colors">{test.title}</h3>
                   <div className="flex flex-wrap items-center gap-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      <span className="flex items-center gap-1.5"><Timer size={14} /> {test.duration} MINS</span>
                      <span className="flex items-center gap-1.5"><ShieldCheck size={14} /> Verified by {test.expert}</span>
                   </div>
                </div>
             </div>

             <div className="flex items-center justify-between md:justify-end gap-8 w-full md:w-auto mt-4 md:mt-0 border-t md:border-t-0 md:border-l border-slate-50 pt-6 md:pt-0 md:pl-10">
                {test.status === 'published' ? (
                  <div className="text-right space-y-1">
                     <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Your Score</p>
                     <p className="text-2xl font-black text-slate-900">{test.score}<span className="text-slate-400 text-sm">/{test.total}</span></p>
                  </div>
                ) : test.status === 'under_review' ? (
                  <div className="px-6 py-3 bg-slate-50 rounded-2xl border border-slate-100 text-slate-400 text-[10px] font-bold uppercase tracking-widest italic shadow-sm">
                    Awaiting Verification
                  </div>
                ) : null}

                <button 
                  onClick={() => test.status === 'available' ? handleStartTest(test.id) : navigate('/results')}
                  className={cn(
                    "h-14 px-10 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all flex items-center gap-3 shadow-lg",
                    test.status === 'available' || test.status === 'published' 
                    ? 'btn-primary shadow-primary/20' 
                    : 'bg-slate-100 text-slate-400 cursor-not-allowed shadow-none border border-slate-200'
                  )}
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
