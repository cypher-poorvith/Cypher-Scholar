import React, { useState } from 'react';
import { 
  ClipboardList, BarChart3, BookOpen, ChevronRight, 
  Search, Filter, Calendar, Trophy, CheckCircle2,
  Clock, ArrowUpRight, ArrowDownRight, Edit3, Image as ImageIcon, Link as LinkIcon, Tag, Save, X, Target
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../context/AuthContext';
import { cn } from '../lib/utils';

const ResultsHub: React.FC = () => {
  const { profile } = useAuth();
  const [activeTab, setActiveTab] = useState<'tests' | 'analysis' | 'notes'>('tests');
  const [selectedTestId, setSelectedTestId] = useState<string | null>(null);

  // Mock data for test results
  const results = [
    {
      id: 'r1',
      name: 'Scholar JEE Main Test Series #5',
      type: 'scholar',
      date: 'Dec 15, 2024',
      score: 234,
      total: 300,
      percentile: 98.1,
      rank: 45,
      totalStudents: 234,
      verifiedBy: 'Dr. Rajesh Sharma',
      publishedAt: 'Dec 16, 2024',
      status: 'published'
    },
    {
      id: 'r2',
      name: 'My Physics Practice',
      type: 'practice',
      date: 'Dec 14, 2024',
      score: 28,
      total: 30,
      status: 'auto-graded'
    }
  ];

  const handleViewAnalysis = (id: string) => {
    setSelectedTestId(id);
    setActiveTab('analysis');
  };

  // --- RENDERING TABS ---

  const renderTestsList = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <h2 className="text-3xl font-black text-slate-900 tracking-tight leading-none uppercase">Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Test History</span></h2>
        <div className="flex items-center gap-4 w-full md:w-auto">
           <div className="relative flex-1 md:w-64">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input type="text" placeholder="Search tests..." className="vibrant-input pl-11 h-12" />
           </div>
           <button className="h-12 w-12 bg-white border border-slate-100 rounded-xl flex items-center justify-center text-slate-400 hover:text-primary transition-colors shadow-sm">
              <Filter size={18} />
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {results.map((res, idx) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            key={res.id}
            className="group vibrant-card p-8 border-slate-100 hover:border-primary/20 flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm bg-white"
          >
            <div className="flex items-center gap-6 flex-1 w-full">
               <div className={cn(
                 "w-16 h-16 rounded-2xl flex items-center justify-center shadow-sm border",
                 res.type === 'scholar' ? 'bg-primary/5 text-primary border-primary/10' : 'bg-emerald-50 text-emerald-600 border-emerald-100'
               )}>
                  {res.type === 'scholar' ? <Trophy size={28} /> : <ClipboardList size={28} />}
               </div>
               <div className="space-y-1">
                  <div className="flex items-center gap-3">
                     <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{res.date}</span>
                     {res.type === 'scholar' ? (
                        <span className="vibrant-badge bg-primary/10 text-primary text-[8px] px-2 py-1">Scholar Series Verified</span>
                     ) : (
                        <span className="vibrant-badge bg-emerald-50 text-emerald-600 text-[8px] px-2 py-1">Practice Test</span>
                     )}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 tracking-tight group-hover:text-primary transition-colors">{res.name}</h3>
                  {res.type === 'scholar' && (
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Verified by {res.verifiedBy}</p>
                  )}
               </div>
            </div>

            <div className="flex items-center justify-between md:justify-end gap-12 w-full md:w-auto mt-4 md:mt-0 border-t md:border-t-0 md:border-l border-slate-50 pt-4 md:pt-0 md:pl-12">
               <div className="text-right space-y-1">
                  <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Final Score</p>
                  <p className="text-2xl font-black text-slate-900">{res.score}<span className="text-slate-400 text-sm">/{res.total}</span></p>
               </div>
               {res.percentile && (
                 <div className="text-right space-y-1 hidden sm:block border-l border-slate-50 pl-12">
                    <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Percentile</p>
                    <p className="text-2xl font-black text-primary">{res.percentile}</p>
                 </div>
               )}
               <button 
                onClick={() => handleViewAnalysis(res.id)}
                className="h-12 w-12 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-center text-slate-400 hover:text-white hover:bg-primary transition-all group-hover:translate-x-1 shadow-sm"
               >
                  <ChevronRight size={20} />
               </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderAnalysis = () => {
    const test = results.find(r => r.id === selectedTestId) || results[0];
    return (
      <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-32">
        <button onClick={() => setActiveTab('tests')} className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:text-primary transition-colors">
          ← Back to All Tests
        </button>

        <div className="space-y-2">
           <h2 className="text-4xl font-black text-slate-900 leading-none uppercase tracking-tight">{test.name}</h2>
           <p className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">{test.type === 'scholar' ? 'Expert-Verified Analysis' : 'Auto-Generated Analysis'}</p>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
           <div className="vibrant-card p-8 bg-white border-slate-100 space-y-4 shadow-sm">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Score Overview</p>
              <div className="flex items-end gap-3 font-display">
                 <span className="text-5xl font-black text-slate-900">{test.score}</span>
                 <span className="text-slate-400 font-bold mb-1">/ {test.total}</span>
              </div>
              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                 <div className="h-full bg-primary" style={{ width: `${(test.score / test.total) * 100}%` }} />
              </div>
           </div>
           
           <div className="vibrant-card p-8 bg-white border-slate-100 space-y-4 shadow-sm">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Overall Rank</p>
              <div className="flex items-end gap-3 font-display">
                 <span className="text-5xl font-black text-slate-900">#{test.rank || 'N/A'}</span>
                 <span className="text-slate-400 font-bold mb-1">/ {test.totalStudents || 'N/A'}</span>
              </div>
           </div>

           <div className="vibrant-card p-8 bg-white border-slate-100 space-y-4 shadow-sm">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Percentile</p>
              <div className="text-5xl font-black text-primary font-display">{test.percentile || 'N/A'}</div>
           </div>

           <div className="vibrant-card p-8 bg-white border-slate-100 space-y-4 shadow-sm">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Accuracy</p>
              <div className="flex items-center gap-3">
                 <span className="text-5xl font-black text-slate-900 font-display">82%</span>
                 <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500 shadow-sm">
                    <ArrowUpRight size={20} />
                 </div>
              </div>
           </div>
        </div>

        {/* Expert Feedback */}
        {test.type === 'scholar' && (
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-[36px] blur opacity-25 group-hover:opacity-40 transition-opacity" />
            <div className="relative vibrant-card p-10 bg-white border-primary/10 shadow-xl">
               <div className="flex flex-col md:flex-row gap-10 items-start">
                  <div className="shrink-0 space-y-4 text-center md:text-left">
                     <img 
                       src={`https://ui-avatars.com/api/?name=${test.verifiedBy}&background=primary&color=fff`} 
                       alt="Expert" 
                       className="w-24 h-24 rounded-[32px] border-4 border-primary/10 shadow-sm"
                     />
                     <div>
                        <p className="text-sm font-bold text-slate-900 uppercase tracking-tight">{test.verifiedBy}</p>
                        <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">IIT Delhi • 15 Years Exp.</p>
                     </div>
                  </div>
                  <div className="space-y-6 flex-1">
                     <p className="text-[10px] font-bold text-primary uppercase tracking-widest flex items-center gap-2">
                         <Trophy size={14} className="fill-current" /> Expert Analysis & Feedback
                     </p>
                     <p className="text-lg font-medium text-slate-600 leading-relaxed italic">
                        "Excellent performance in Physics and Mathematics. You have shown strong conceptual clarity in Calculus and Mechanics. However, I noticed some weaknesses in Electromagnetic Induction where you struggled with direction conventions. Focus on improving these areas and continue your current practice rhythm."
                     </p>
                     <div className="flex flex-wrap gap-8 pt-6 border-t border-slate-50">
                        <div className="space-y-1">
                           <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Verdict</p>
                           <p className="text-xs font-bold text-slate-900 uppercase tracking-tight">Exceptional Performance</p>
                        </div>
                        <div className="hidden sm:block h-8 w-px bg-slate-100 mx-4" />
                        <div className="space-y-1">
                           <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Recommendation</p>
                           <p className="text-xs font-bold text-slate-900 uppercase tracking-tight">Intensive Topic Revision</p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
          </div>
        )}

        {/* Topic Wise Analysis */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <div className="vibrant-card p-10 bg-white border-slate-100 space-y-8 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 uppercase tracking-tight">Strengths</h3>
              <div className="space-y-6">
                 {[
                   { topic: 'Thermodynamics', acc: 95, color: 'primary' },
                   { topic: 'Calculus', acc: 92, color: 'primary' },
                   { topic: 'Organic Chemistry', acc: 88, color: 'primary' }
                 ].map(t => (
                   <div key={t.topic} className="space-y-2">
                      <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
                         <span className="text-slate-900">{t.topic}</span>
                         <span className="text-primary">{t.acc}%</span>
                      </div>
                      <div className="h-1 bg-slate-50 rounded-full overflow-hidden">
                         <div className="h-full bg-primary" style={{ width: `${t.acc}%` }} />
                      </div>
                   </div>
                 ))}
              </div>
           </div>

           <div className="vibrant-card p-10 bg-white border-slate-100 space-y-8 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 uppercase tracking-tight">Improvement Areas</h3>
              <div className="space-y-6">
                 {[
                   { topic: 'EM Induction', acc: 45, color: 'rose' },
                   { topic: 'Trigonometry', acc: 52, color: 'rose' },
                   { topic: 'Chemical Bonding', acc: 58, color: 'rose' }
                 ].map(t => (
                   <div key={t.topic} className="space-y-2">
                      <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
                         <span className="text-slate-900">{t.topic}</span>
                         <span className="text-rose-500">{t.acc}%</span>
                      </div>
                      <div className="h-1 bg-slate-50 rounded-full overflow-hidden">
                         <div className="h-full bg-rose-500" style={{ width: `${t.acc}%` }} />
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </div>

        {/* Actionable Recommendations */}
        <div className="vibrant-card p-10 bg-white border-slate-100 space-y-8 shadow-sm">
           <div className="flex flex-wrap items-center justify-between gap-4">
              <h3 className="text-xl font-bold text-slate-900 uppercase tracking-tight leading-none">Recommended Actions</h3>
              <span className="vibrant-badge bg-primary/5 text-primary text-[8px] px-3">Based on your performance</span>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: 'Practice Weak Topics', desc: 'Attempt 30 questions on EM Induction', icon: <Target />, color: 'bg-rose-50 text-rose-500 border-rose-100' },
                { title: 'Formula Revision', desc: 'Review Trigonometry Cheat Sheet', icon: <BookOpen />, color: 'bg-primary/5 text-primary border-primary/10' },
                { title: 'Topic Test', desc: 'Attempt Grade 12 Topic Test Series', icon: <Trophy />, color: 'bg-amber-50 text-amber-500 border-amber-100' }
              ].map((rec, i) => (
                <button key={i} className="group p-6 bg-slate-50 border border-slate-100 rounded-2xl text-left hover:bg-white hover:border-primary/20 transition-all shadow-sm">
                   <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-sm border", rec.color)}>
                      {rec.icon}
                   </div>
                   <p className="text-xs font-bold text-slate-900 uppercase tracking-tight mb-1">{rec.title}</p>
                   <p className="text-[10px] font-medium text-slate-500">{rec.desc}</p>
                </button>
              ))}
           </div>
        </div>
      </div>
    );
  };

  const renderNotes = () => (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-32">
       <button onClick={() => setActiveTab('tests')} className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:text-primary transition-colors">
          ← Back to All Tests
       </button>

       <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
             <h2 className="text-3xl font-black text-slate-900 leading-none uppercase tracking-tight">My <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Notes & Reflections</span></h2>
             <p className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">Scholar JEE Main Series #5</p>
          </div>
          <div className="flex items-center gap-4 w-full md:w-auto">
             <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest hidden sm:block">Last saved: 2 mins ago</span>
             <button className="btn-primary flex-1 md:flex-initial h-12 px-6 text-xs flex items-center justify-center gap-2">
                <Save size={16} /> Save Notes
             </button>
          </div>
       </div>

       <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 items-start">
          {/* Sidebar Nav for Notes */}
          <div className="lg:col-span-1 space-y-2">
             {['mistakes', 'learning', 'strategy', 'custom'].map(t => (
               <button 
                 key={t}
                 className={`w-full flex items-center justify-between p-4 rounded-xl text-[10px] font-bold uppercase tracking-widest border transition-all ${
                   t === 'mistakes' ? 'bg-white border-primary text-primary shadow-sm' : 'bg-slate-50 border-transparent text-slate-400 hover:text-slate-900 hover:bg-white'
                 }`}
               >
                  {t}
                  <ChevronRight size={14} className={t === 'mistakes' ? 'opacity-100' : 'opacity-0'} />
               </button>
             ))}
          </div>

          <div className="lg:col-span-3 space-y-8">
             <div className="vibrant-card p-10 bg-white border-slate-100 min-h-[500px] relative shadow-sm flex flex-col">
                <div className="flex flex-wrap items-center gap-4 mb-8 pb-4 border-b border-slate-50">
                   <button className="p-2 text-slate-400 hover:text-primary transition-colors"><Edit3 size={18} /></button>
                   <button className="p-2 text-slate-400 hover:text-primary transition-colors"><ImageIcon size={18} /></button>
                   <button className="p-2 text-slate-400 hover:text-primary transition-colors"><LinkIcon size={18} /></button>
                   <button className="p-2 text-slate-400 hover:text-primary transition-colors"><Tag size={18} /></button>
                   <div className="flex-1" />
                   <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">234 Words</span>
                </div>
                <textarea 
                  className="flex-1 bg-transparent border-none text-slate-600 font-medium leading-loose resize-none focus:outline-none custom-scrollbar"
                  placeholder="Document your mistakes to avoid them next time..."
                  defaultValue={`Mistake 1: EM Induction Q42
• Confused Lenz's law direction twice during calculation.
• Need to practice Right Hand Rule more intuitively.
• Watch advanced video on flux change rate problems.

Mistake 2: Integration by Parts
• Forgot to apply limits correctly in the second term.
• Review basic formula sheet for definite integration.

Strategy Reflection:
• I spent too much time on Q4-10. Need to skip harder questions early on.`}
                />
             </div>

             <div className="flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em]">
                <span>💡 Tip: Link specific questions to your notes for faster review</span>
                <span className="flex items-center gap-2 pr-4">Focus Mode <Clock size={12} /></span>
             </div>
          </div>
       </div>
    </div>
  );

  return (
    <div className="relative min-h-[800px]">
      <AnimatePresence mode="wait">
        {activeTab === 'tests' && renderTestsList()}
        {activeTab === 'analysis' && renderAnalysis()}
        {activeTab === 'notes' && renderNotes()}
      </AnimatePresence>

      {/* Floating Bottom Nav */}
      <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-[100] w-fit">
        <motion.div 
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white/80 backdrop-blur-2xl border border-slate-200/50 rounded-full p-2 px-3 flex items-center gap-1 shadow-2xl shadow-primary/10"
        >
          <button 
            onClick={() => setActiveTab('tests')}
            className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all ${
              activeTab === 'tests' ? 'bg-primary/10 text-primary shadow-sm' : 'text-slate-400 hover:bg-slate-50'
            }`}
          >
            <ClipboardList size={22} className={activeTab === 'tests' ? 'fill-current' : ''} />
            <span className="text-[13px] font-bold uppercase tracking-widest hidden sm:block">Tests</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('analysis')}
            className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all ${
              activeTab === 'analysis' ? 'bg-primary/10 text-primary shadow-sm' : 'text-slate-400 hover:bg-slate-50'
            }`}
          >
            <BarChart3 size={22} className={activeTab === 'analysis' ? 'fill-current' : ''} />
            <span className="text-[13px] font-bold uppercase tracking-widest hidden sm:block">Analysis</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('notes')}
            className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all ${
              activeTab === 'notes' ? 'bg-primary/10 text-primary shadow-sm' : 'text-slate-400 hover:bg-slate-50'
            }`}
          >
            <Edit3 size={22} className={activeTab === 'notes' ? 'fill-current' : ''} />
            <span className="text-[13px] font-bold uppercase tracking-widest hidden sm:block">Notes</span>
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default ResultsHub;
