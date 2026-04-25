import React, { useState } from 'react';
import { 
  ClipboardList, BarChart3, BookOpen, ChevronRight, 
  Search, Filter, Calendar, Trophy, CheckCircle2,
  Clock, ArrowUpRight, ArrowDownRight, Edit3, Image as ImageIcon, Link as LinkIcon, Tag, Save, X, Target
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../context/AuthContext';

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
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <h2 className="text-3xl font-black text-white uppercase italic tracking-tighter">Your Test History</h2>
        <div className="flex items-center gap-4">
           <div className="relative w-64">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
              <input type="text" placeholder="Search tests..." className="w-full h-12 bg-white/[0.03] border border-white/10 rounded-xl pl-11 pr-4 text-white text-xs font-bold focus:outline-none focus:border-indigo-500" />
           </div>
           <button className="h-12 w-12 bg-white/[0.03] border border-white/10 rounded-xl flex items-center justify-center text-slate-400 hover:text-white transition-colors">
              <Filter size={18} />
           </button>
        </div>
      </div>

      <div className="space-y-4">
        {results.map((res, idx) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            key={res.id}
            className="group glass-panel p-8 border-white/5 hover:border-white/10 flex flex-col md:flex-row items-center justify-between gap-8"
          >
            <div className="flex items-center gap-6 flex-1">
               <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${res.type === 'scholar' ? 'bg-indigo-600/10 text-indigo-400' : 'bg-emerald-500/10 text-emerald-500'}`}>
                  {res.type === 'scholar' ? <Trophy size={28} /> : <ClipboardList size={28} />}
               </div>
               <div className="space-y-1">
                  <div className="flex items-center gap-3">
                     <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{res.date}</span>
                     {res.type === 'scholar' ? (
                        <span className="bg-indigo-600/10 text-indigo-400 text-[8px] font-black uppercase tracking-[0.2em] px-2 py-1 rounded">Scholar Series Verified</span>
                     ) : (
                        <span className="bg-emerald-500/10 text-emerald-500 text-[8px] font-black uppercase tracking-[0.2em] px-2 py-1 rounded">Practice Test</span>
                     )}
                  </div>
                  <h3 className="text-xl font-black text-white uppercase italic tracking-tighter transition-colors group-hover:text-indigo-400">{res.name}</h3>
                  {res.type === 'scholar' && (
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Verified by {res.verifiedBy} on {res.publishedAt}</p>
                  )}
               </div>
            </div>

            <div className="flex items-center gap-12">
               <div className="text-right space-y-1">
                  <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Final Score</p>
                  <p className="text-2xl font-black text-white italic tracking-tighter">{res.score}<span className="text-slate-500 text-sm">/{res.total}</span></p>
               </div>
               {res.percentile && (
                 <div className="text-right space-y-1 hidden sm:block border-l border-white/10 pl-12">
                    <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Percentile</p>
                    <p className="text-2xl font-black text-indigo-400 italic tracking-tighter">{res.percentile}</p>
                 </div>
               )}
               <button 
                onClick={() => handleViewAnalysis(res.id)}
                className="h-12 w-12 bg-white/5 rounded-xl border border-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-indigo-600 transition-all group-hover:translate-x-1"
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
        <button onClick={() => setActiveTab('tests')} className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-widest hover:text-white transition-colors">
          ← Back to All Tests
        </button>

        <div className="space-y-2">
           <h2 className="text-4xl font-black text-white uppercase italic tracking-tighter">{test.name}</h2>
           <p className="text-xs font-bold text-indigo-400 uppercase tracking-[0.2em]">{test.type === 'scholar' ? 'Expert-Verified Analysis' : 'Auto-Generated Analysis'}</p>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
           <div className="glass-panel p-8 border-white/5 space-y-4">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Score Overview</p>
              <div className="flex items-end gap-3">
                 <span className="text-5xl font-black text-white italic tracking-tighter">{test.score}</span>
                 <span className="text-slate-500 font-bold mb-1">/ {test.total}</span>
              </div>
              <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                 <div className="h-full bg-indigo-500" style={{ width: `${(test.score / test.total) * 100}%` }} />
              </div>
           </div>
           
           <div className="glass-panel p-8 border-white/5 space-y-4">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Overall Rank</p>
              <div className="flex items-end gap-3">
                 <span className="text-5xl font-black text-white italic tracking-tighter">#{test.rank || 'N/A'}</span>
                 <span className="text-slate-500 font-bold mb-1">/ {test.totalStudents || 'N/A'}</span>
              </div>
           </div>

           <div className="glass-panel p-8 border-white/5 space-y-4">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Percentile</p>
              <div className="text-5xl font-black text-indigo-400 italic tracking-tighter">{test.percentile || 'N/A'}</div>
           </div>

           <div className="glass-panel p-8 border-white/5 space-y-4">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Accuracy</p>
              <div className="flex items-center gap-3">
                 <span className="text-5xl font-black text-white italic tracking-tighter">82%</span>
                 <ArrowUpRight className="text-emerald-500 mb-1" size={24} />
              </div>
           </div>
        </div>

        {/* Expert Feedback */}
        {test.type === 'scholar' && (
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-[36px] blur opacity-25 group-hover:opacity-40 transition-opacity" />
            <div className="relative glass-panel p-10 border-white/10 bg-[#0D0A1F]/80">
               <div className="flex flex-col md:flex-row gap-10 items-start">
                  <div className="shrink-0 space-y-4 text-center md:text-left">
                     <img 
                       src={`https://ui-avatars.com/api/?name=${test.verifiedBy}&background=6366f1&color=fff`} 
                       alt="Expert" 
                       className="w-24 h-24 rounded-[32px] border-4 border-indigo-500/20"
                     />
                     <div>
                        <p className="text-sm font-black text-white uppercase italic tracking-tighter">{test.verifiedBy}</p>
                        <p className="text-[8px] font-bold text-slate-500 uppercase tracking-widest">IIT Delhi • 15 Years Exp.</p>
                     </div>
                  </div>
                  <div className="space-y-6 flex-1">
                     <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest flex items-center gap-2">
                         <Trophy size={14} /> Expert Analysis & Feedback
                     </p>
                     <p className="text-lg font-medium text-slate-300 leading-relaxed italic">
                        "Excellent performance in Physics and Mathematics. You have shown strong conceptual clarity in Calculus and Mechanics. However, I noticed some weaknesses in Electromagnetic Induction where you struggled with direction conventions. Focus on improving these small areas and continue your current practice rhythm. Time management was top-tier."
                     </p>
                     <div className="flex gap-4 pt-4 border-t border-white/5">
                        <div className="space-y-1">
                           <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Verdict</p>
                           <p className="text-xs font-black text-white uppercase italic tracking-tighter">Exceptional Performance</p>
                        </div>
                        <div className="h-8 w-px bg-white/10 mx-4" />
                        <div className="space-y-1">
                           <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Recommendation</p>
                           <p className="text-xs font-black text-white uppercase italic tracking-tighter">Intensive Topic Revision</p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
          </div>
        )}

        {/* Topic Wise Analysis */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <div className="glass-panel p-10 border-white/5 space-y-8">
              <h3 className="text-xl font-black text-white uppercase italic tracking-tighter">Strengths</h3>
              <div className="space-y-6">
                 {[
                   { topic: 'Thermodynamics', acc: 95, color: 'indigo' },
                   { topic: 'Calculus', acc: 92, color: 'indigo' },
                   { topic: 'Organic Chemistry', acc: 88, color: 'indigo' }
                 ].map(t => (
                   <div key={t.topic} className="space-y-2">
                      <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                         <span className="text-white">{t.topic}</span>
                         <span className="text-indigo-400">{t.acc}%</span>
                      </div>
                      <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                         <div className="h-full bg-indigo-500" style={{ width: `${t.acc}%` }} />
                      </div>
                   </div>
                 ))}
              </div>
           </div>

           <div className="glass-panel p-10 border-white/5 space-y-8">
              <h3 className="text-xl font-black text-white uppercase italic tracking-tighter">Improvement Areas</h3>
              <div className="space-y-6">
                 {[
                   { topic: 'EM Induction', acc: 45, color: 'rose' },
                   { topic: 'Trigonometry', acc: 52, color: 'rose' },
                   { topic: 'Chemical Bonding', acc: 58, color: 'rose' }
                 ].map(t => (
                   <div key={t.topic} className="space-y-2">
                      <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                         <span className="text-white">{t.topic}</span>
                         <span className="text-rose-500">{t.acc}%</span>
                      </div>
                      <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                         <div className="h-full bg-rose-500" style={{ width: `${t.acc}%` }} />
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </div>

        {/* Actionable Recommendations */}
        <div className="glass-panel p-10 border-white/5 space-y-8">
           <div className="flex items-center justify-between">
              <h3 className="text-xl font-black text-white uppercase italic tracking-tighter leading-none">Recommended Actions</h3>
              <span className="text-[8px] font-bold text-slate-500 uppercase tracking-widest">Based on your performance</span>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: 'Practice Weak Topics', desc: 'Attempt 30 questions on EM Induction', icon: <Target className="text-rose-500" /> },
                { title: 'Formula Revision', desc: 'Review Trigonometry Cheat Sheet', icon: <BookOpen className="text-indigo-400" /> },
                { title: 'Topic Test', desc: 'Attempt Grade 12 Topic Test Series', icon: <Trophy className="text-amber-500" /> }
              ].map((rec, i) => (
                <button key={i} className="group p-6 bg-white/[0.03] border border-white/5 rounded-2xl text-left hover:bg-white/[0.05] transition-all">
                   <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      {rec.icon}
                   </div>
                   <p className="text-xs font-black text-white uppercase italic tracking-tight mb-1">{rec.title}</p>
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
       <button onClick={() => setActiveTab('tests')} className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-widest hover:text-white transition-colors">
          ← Back to All Tests
       </button>

       <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
             <h2 className="text-3xl font-black text-white uppercase italic tracking-tighter">My Notes & Reflections</h2>
             <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-[0.2em] underline underline-offset-8">Scholar JEE Main Series #5</p>
          </div>
          <div className="flex items-center gap-4">
             <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Last saved: 2 mins ago</span>
             <button className="h-12 px-6 bg-indigo-600 text-white rounded-xl text-xs font-black uppercase tracking-widest flex items-center gap-2 shadow-xl shadow-indigo-600/20">
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
                 className={`w-full flex items-center justify-between p-4 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${
                   t === 'mistakes' ? 'bg-white/5 border-indigo-500/50 text-white' : 'bg-transparent border-transparent text-slate-500 hover:text-white hover:bg-white/5'
                 }`}
               >
                  {t}
                  <ChevronRight size={14} className={t === 'mistakes' ? 'opacity-100' : 'opacity-0'} />
               </button>
             ))}
          </div>

          <div className="lg:col-span-3 space-y-8">
             <div className="glass-panel p-10 border-white/5 min-h-[500px] relative bg-[#0D0A1F]/50 flex flex-col">
                <div className="flex items-center gap-4 mb-8 pb-4 border-b border-white/5">
                   <button className="p-2 text-slate-500 hover:text-white transition-colors"><Edit3 size={18} /></button>
                   <button className="p-2 text-slate-500 hover:text-white transition-colors"><ImageIcon size={18} /></button>
                   <button className="p-2 text-slate-500 hover:text-white transition-colors"><LinkIcon size={18} /></button>
                   <button className="p-2 text-slate-500 hover:text-white transition-colors"><Tag size={18} /></button>
                   <div className="flex-1" />
                   <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">234 Words</span>
                </div>
                <textarea 
                  className="flex-1 bg-transparent border-none text-slate-300 font-medium leading-loose resize-none focus:outline-none custom-scrollbar"
                  placeholder="Document your mistakes to avoid them next time..."
                  defaultValue={`Mistake 1: EM Induction Q42\n• Confused Lenz's law direction twice during calculation.\n• Need to practice Right Hand Rule more intuitively.\n• Watch advanced video on flux change rate problems.\n\nMistake 2: Integration by Parts\n• Forgot to apply limits correctly in the second term.\n• Review basic formula sheet for definite integration.\n\nStrategy Reflection:\n• I spent too much time on Q4-10. Need to skip harder questions early on.`}
                />
             </div>

             <div className="flex justify-between items-center text-[10px] font-black text-slate-600 uppercase tracking-[0.3em]">
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
          className="bg-[#1e1b4b]/70 backdrop-blur-2xl border border-white/20 rounded-full p-2 px-3 flex items-center gap-1 shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
        >
          <button 
            onClick={() => setActiveTab('tests')}
            className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all ${
              activeTab === 'tests' ? 'bg-indigo-600/30 text-white' : 'text-slate-400 hover:bg-white/5'
            }`}
          >
            <ClipboardList size={22} className={activeTab === 'tests' ? 'fill-current' : ''} />
            <span className="text-[13px] font-bold uppercase tracking-widest hidden sm:block">Tests</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('analysis')}
            className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all ${
              activeTab === 'analysis' ? 'bg-indigo-600/30 text-white' : 'text-slate-400 hover:bg-white/5'
            }`}
          >
            <BarChart3 size={22} className={activeTab === 'analysis' ? 'fill-current' : ''} />
            <span className="text-[13px] font-bold uppercase tracking-widest hidden sm:block">Analysis</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('notes')}
            className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all ${
              activeTab === 'notes' ? 'bg-indigo-600/30 text-white' : 'text-slate-400 hover:bg-white/5'
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
