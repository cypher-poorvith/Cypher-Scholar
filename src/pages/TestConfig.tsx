import React, { useState } from 'react';
import { 
  ArrowLeft, Check, HelpCircle, School, Trophy, Activity, 
  Settings, Clock, Layout, Zap, Filter, ChevronDown, 
  Trash2, Play, Info, Calculator, ShieldCheck, AlertTriangle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface SubjectConfig {
  name: string;
  questions: number;
  marks: number;
  timeLimit: number;
  enabled: boolean;
  topics: string[];
}

const TestConfig: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [exam, setExam] = useState('JEE Main');
  const [selectedInterface, setSelectedInterface] = useState<'pro' | 'simplified'>('simplified');
  const [duration, setDuration] = useState(180);
  const [difficulty, setDifficulty] = useState({ easy: 40, medium: 40, hard: 20 });
  const [showConfirmation, setShowConfirmation] = useState(false);
  
  const [subjects, setSubjects] = useState<SubjectConfig[]>([
    { name: "Physics", questions: 30, marks: 120, timeLimit: 60, enabled: true, topics: ["All"] },
    { name: "Chemistry", questions: 30, marks: 120, timeLimit: 60, enabled: true, topics: ["All"] },
    { name: "Mathematics", questions: 30, marks: 120, timeLimit: 60, enabled: true, topics: ["All"] },
  ]);

  const exams = [
    { name: 'JEE Main', icon: <School size={24} />, qs: 90, marks: 300, time: 180 },
    { name: 'JEE Advanced', icon: <Trophy size={24} />, qs: 54, marks: 180, time: 180 },
    { name: 'NEET UG', icon: <Activity size={24} />, qs: 180, marks: 720, time: 200 },
    { name: 'BITSAT', icon: <Zap size={24} />, qs: 150, marks: 450, time: 180 },
  ];

  const handleStartTest = () => {
    // In a real app, we'd pass this config to state management or URL params
    const config = {
      exam,
      selectedInterface,
      duration,
      difficulty,
      subjects: subjects.filter(s => s.enabled)
    };
    localStorage.setItem('active_test_config', JSON.stringify(config));
    navigate('/tests/active');
  };

  const toggleSubject = (name: string) => {
    setSubjects(prev => prev.map(s => s.name === name ? { ...s, enabled: !s.enabled } : s));
  };

  const updateSubjectQs = (name: string, qs: number) => {
    setSubjects(prev => prev.map(s => s.name === name ? { ...s, questions: qs, marks: qs * 4 } : s));
  };

  const totalQuestions = subjects.filter(s => s.enabled).reduce((acc, s) => acc + s.questions, 0);
  const totalMarks = subjects.filter(s => s.enabled).reduce((acc, s) => acc + s.marks, 0);

  return (
    <div className="min-h-screen bg-[#0A0817] text-white selection:bg-indigo-500/30">
      {/* Header */}
      <header className="h-20 flex items-center justify-between px-8 bg-white/[0.02] backdrop-blur-xl border-b border-white/5 sticky top-0 z-[100] w-full">
         <div className="flex items-center gap-6">
            <button 
              onClick={() => navigate('/practice')}
              className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all group"
            >
               <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            </button>
            <div>
               <h2 className="text-lg font-black uppercase tracking-tighter leading-tight">Configure Mock Test</h2>
               <p className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em]">Personalized Exam Environment</p>
            </div>
         </div>

         <div className="flex items-center gap-4">
            <button className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-500 hover:text-white">
               <HelpCircle size={20} />
            </button>
         </div>
      </header>

      <main className="max-w-[1400px] mx-auto p-12 lg:px-24 grid lg:grid-cols-12 gap-12">
        {/* Left Column: Settings */}
        <div className="lg:col-span-8 space-y-16 pb-24">
          
          {/* Section 1: Test Series Branding */}
          <section>
            <div className="glass-panel p-10 bg-gradient-to-br from-indigo-600/20 via-transparent to-purple-600/20 border-indigo-500/20 relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-[100px] -mr-32 -mt-32 group-hover:scale-110 transition-transform duration-1000" />
               <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                  <div className="w-24 h-24 rounded-3xl bg-white/5 flex items-center justify-center border border-white/10 shadow-2xl text-indigo-400">
                     <School size={48} />
                  </div>
                  <div className="text-center md:text-left">
                     <div className="flex items-center gap-3 mb-2 justify-center md:justify-start">
                        <span className="px-3 py-1 bg-indigo-500/20 text-indigo-400 rounded-full text-[10px] font-black uppercase tracking-widest border border-indigo-500/20">Free</span>
                        <span className="px-3 py-1 bg-white/5 text-slate-400 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/5">Unlimited Attempts</span>
                     </div>
                     <h1 className="text-3xl font-black uppercase tracking-tighter mb-2">Scholar JEE Main Test Series</h1>
                     <p className="text-sm font-medium text-slate-400 leading-relaxed uppercase tracking-widest">Official exam pattern based mock test infrastructure</p>
                  </div>
               </div>
            </div>
          </section>

          {/* Section 2: Exam Selection */}
          <section className="space-y-8">
            <div className="space-y-1">
               <h3 className="text-xl font-black uppercase tracking-tighter">1. Select Exam</h3>
               <p className="text-xs font-medium text-slate-500 uppercase tracking-widest">Choose your target competitive examination</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
               {exams.map((ex, i) => (
                  <button 
                    key={i}
                    onClick={() => setExam(ex.name)}
                    className={`glass-panel p-8 text-left transition-all relative overflow-hidden group ${
                      exam === ex.name 
                      ? 'border-indigo-500 scale-[1.02] bg-indigo-500/[0.03]' 
                      : 'border-white/5 hover:border-white/20'
                    }`}
                  >
                     {exam === ex.name && (
                        <div className="absolute top-4 right-4 w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center text-white shadow-lg">
                           <Check size={14} strokeWidth={4} />
                        </div>
                     )}
                     <div className={`w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6 transition-colors ${exam === ex.name ? 'text-indigo-400' : 'text-slate-500'}`}>
                        {ex.icon}
                     </div>
                     <h4 className="text-xl font-black uppercase tracking-tighter mb-4">{ex.name}</h4>
                     <div className="space-y-2">
                        <div className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                           <Layout size={12} /> {ex.qs} Questions
                        </div>
                        <div className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                           <Trophy size={12} /> {ex.marks} Total Marks
                        </div>
                        <div className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                           <Clock size={12} /> {ex.time} Minutes
                        </div>
                     </div>
                  </button>
               ))}
            </div>
          </section>

          {/* Section 3: Subject Customization */}
          <section className="space-y-8">
            <div className="space-y-1">
               <h3 className="text-xl font-black uppercase tracking-tighter">2. Customize Subjects</h3>
               <p className="text-xs font-medium text-slate-500 uppercase tracking-widest">Fine-tune your question distribution</p>
            </div>
            <div className="space-y-4">
               {subjects.map((sub, i) => (
                  <div key={i} className={`glass-panel p-8 border-l-4 transition-all ${
                     sub.name === 'Physics' ? 'border-l-blue-500' : 
                     sub.name === 'Chemistry' ? 'border-l-emerald-500' : 'border-l-rose-500'
                  } ${!sub.enabled && 'opacity-50 grayscale'}`}>
                     <div className="flex flex-col md:flex-row justify-between gap-8">
                        <div className="space-y-1 flex-1">
                           <h4 className="text-lg font-black uppercase tracking-tighter">{sub.name}</h4>
                           <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Include all chapters or custom topics</p>
                        </div>
                        <div className="flex flex-wrap items-center gap-10">
                           <div className="space-y-2">
                              <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Questions</p>
                              <select 
                                value={sub.questions}
                                onChange={(e) => updateSubjectQs(sub.name, parseInt(e.target.value))}
                                className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm font-bold text-white focus:outline-none focus:border-indigo-500"
                              >
                                 {[10, 20, 30, 40, 50].map(v => <option key={v} value={v} className="bg-[#0A0817]">{v} Qs</option>)}
                              </select>
                           </div>
                           <div className="space-y-2">
                              <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Time (Min)</p>
                              <input 
                                type="number" 
                                value={sub.timeLimit}
                                className="w-20 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm font-bold text-white focus:outline-none focus:border-indigo-500" 
                                onChange={(e) => {
                                   const val = parseInt(e.target.value);
                                   setSubjects(prev => prev.map(s => s.name === sub.name ? { ...s, timeLimit: val } : s));
                                }}
                              />
                           </div>
                           <button 
                             onClick={() => toggleSubject(sub.name)}
                             className={`h-12 w-12 rounded-xl flex items-center justify-center transition-all ${
                                sub.enabled ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/20' : 'bg-white/5 text-slate-600 border border-white/10'
                             }`}
                           >
                              <Play size={20} className={!sub.enabled ? 'grayscale' : ''} />
                           </button>
                        </div>
                     </div>
                  </div>
               ))}
            </div>
          </section>

          {/* Section 4: Interface Selection */}
          <section className="space-y-8">
            <div className="space-y-1">
               <h3 className="text-xl font-black uppercase tracking-tighter">3. Choose Your Interface</h3>
               <p className="text-xs font-medium text-slate-500 uppercase tracking-widest">Select how you want to take the test. This CANNOT be changed later.</p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
               {/* Pro Interface */}
               <button 
                 onClick={() => setSelectedInterface('pro')}
                 className={`glass-panel p-1 border-2 transition-all text-left overflow-hidden group ${
                   selectedInterface === 'pro' ? 'border-indigo-500 bg-indigo-500/[0.02]' : 'border-white/5 hover:border-white/20'
                 }`}
               >
                  <div className="h-48 bg-white overflow-hidden flex flex-col p-4 relative grayscale group-hover:grayscale-0 transition-all">
                     <div className="h-4 bg-slate-100 flex items-center px-2 mb-2">
                        <div className="w-2 h-2 rounded-full bg-slate-400 mr-2" />
                        <div className="w-12 h-1 bg-slate-200" />
                     </div>
                     <div className="flex-1 flex gap-2">
                        <div className="flex-1 bg-slate-50 border border-slate-200" />
                        <div className="w-12 bg-slate-100 border border-slate-200" />
                     </div>
                     <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
                  </div>
                  <div className="p-6 space-y-4">
                     <div className="flex justify-between items-center">
                        <h4 className="text-lg font-black uppercase tracking-tighter text-white">🏛️ Pro Interface</h4>
                        {selectedInterface === 'pro' && <div className="w-5 h-5 bg-indigo-600 rounded-full flex items-center justify-center text-white"><Check size={12} strokeWidth={4} /></div>}
                     </div>
                     <ul className="space-y-2">
                        <li className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                           <Check size={12} className="text-indigo-400" /> Exact Exam Replica
                        </li>
                        <li className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                           <Check size={12} className="text-indigo-400" /> Standard Color Scheme
                        </li>
                     </ul>
                  </div>
               </button>

               {/* Simplified Interface */}
               <button 
                 onClick={() => setSelectedInterface('simplified')}
                 className={`glass-panel p-1 border-2 transition-all text-left overflow-hidden group ${
                   selectedInterface === 'simplified' ? 'border-indigo-500 bg-indigo-500/[0.02]' : 'border-white/5 hover:border-white/20'
                 }`}
               >
                  <div className="h-48 bg-white overflow-hidden flex flex-col p-4 relative group-hover:scale-105 transition-transform duration-1000">
                     <div className="h-full bg-slate-50 rounded-lg border border-slate-200 flex flex-col overflow-hidden">
                        <div className="h-6 bg-slate-100 border-b border-slate-200 px-4" />
                        <div className="p-4 space-y-2">
                           <div className="h-3 w-2/3 bg-slate-200 rounded" />
                           <div className="h-2 w-full bg-slate-100 rounded" />
                           <div className="h-2 w-5/6 bg-slate-100 rounded" />
                        </div>
                     </div>
                  </div>
                  <div className="p-6 space-y-4">
                     <div className="flex justify-between items-center">
                        <h4 className="text-lg font-black uppercase tracking-tighter text-white">⚛️ Simplified Interface</h4>
                        {selectedInterface === 'simplified' && <div className="w-5 h-5 bg-indigo-600 rounded-full flex items-center justify-center text-white"><Check size={12} strokeWidth={4} /></div>}
                     </div>
                     <ul className="space-y-2">
                        <li className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                           <Check size={12} className="text-indigo-400" /> Minimal, Distraction-free
                        </li>
                        <li className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                           <Check size={12} className="text-indigo-400" /> Fully Collapsible Panels
                        </li>
                     </ul>
                  </div>
               </button>
            </div>
            <div className="p-6 bg-amber-500/10 border border-amber-500/20 rounded-2xl space-y-2">
               <p className="text-[10px] font-black text-amber-500 uppercase tracking-[0.2em] flex items-center gap-2">
                  <AlertTriangle size={14} /> Important Notice
               </p>
               <ul className="text-[10px] font-bold text-amber-500/80 uppercase tracking-widest space-y-1">
                  <li>• Once you start the test, the interface CANNOT be changed</li>
                  <li>• No interface switching allowed during the exam</li>
               </ul>
            </div>
          </section>

        </div>

        {/* Right Column: Summary Sidebar */}
        <div className="lg:col-span-4 lg:sticky lg:top-32 h-fit">
           <motion.div 
             initial={{ opacity: 0, x: 20 }}
             animate={{ opacity: 1, x: 0 }}
             className="glass-panel p-8 border-white/5 bg-white/[0.01] space-y-10"
           >
              <div>
                 <h3 className="text-xl font-black uppercase tracking-tighter mb-1">Test Summary</h3>
                 <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Verify session parameters</p>
              </div>

              <div className="space-y-6">
                 <div className="flex justify-between items-center border-b border-white/5 pb-4">
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Target Exam</span>
                    <span className="text-sm font-bold text-white">{exam}</span>
                 </div>
                 <div className="flex justify-between items-center border-b border-white/5 pb-4">
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Interface</span>
                    <span className="text-sm font-bold text-indigo-400 uppercase">{selectedInterface} Style</span>
                 </div>
                 <div className="space-y-4">
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block">Active Subjects</span>
                    <div className="space-y-2">
                       {subjects.filter(s => s.enabled).map((s, i) => (
                          <div key={i} className="flex justify-between items-center p-3 bg-white/5 rounded-xl border border-white/5">
                             <span className="text-xs font-bold text-slate-300">{s.name}</span>
                             <div className="flex items-center gap-3">
                                <span className="text-[10px] font-black text-slate-500">{s.questions} Qs</span>
                                <span className="text-[10px] font-black text-indigo-400">{s.timeLimit}m</span>
                             </div>
                          </div>
                       ))}
                    </div>
                 </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                 <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                    <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Total Qs</p>
                    <p className="text-xl font-black text-white">{totalQuestions}</p>
                 </div>
                 <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                    <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Total Marks</p>
                    <p className="text-xl font-black text-white">{totalMarks}</p>
                 </div>
              </div>

              <div className="space-y-4">
                 <button 
                   onClick={() => setShowConfirmation(true)}
                   className="w-full h-16 bg-gradient-to-r from-indigo-600 to-indigo-800 text-white rounded-2xl font-black text-xs uppercase tracking-[0.3em] flex items-center justify-center gap-3 shadow-2xl shadow-indigo-600/20 hover:scale-[1.02] active:scale-95 transition-all"
                 >
                    Start Test Session <Play size={18} className="fill-current" />
                 </button>
                 <button 
                  onClick={() => navigate('/practice')}
                  className="w-full h-12 bg-white/5 text-slate-500 hover:text-white rounded-xl font-black text-[10px] uppercase tracking-widest transition-all"
                 >
                    Reset All Settings
                 </button>
              </div>
           </motion.div>
        </div>
      </main>

      {/* Confirmation Modal */}
      <AnimatePresence>
         {showConfirmation && (
            <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
               <motion.div 
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 exit={{ opacity: 0 }}
                 onClick={() => setShowConfirmation(false)}
                 className="absolute inset-0 bg-[#0D0A1F]/90 backdrop-blur-xl"
               />
               <motion.div 
                 initial={{ opacity: 0, scale: 0.9, y: 40 }}
                 animate={{ opacity: 1, scale: 1, y: 0 }}
                 exit={{ opacity: 0, scale: 0.9, y: 40 }}
                 className="relative w-full max-w-lg glass-panel p-12 text-center space-y-10 border-indigo-500/20"
               >
                  <div className="w-24 h-24 rounded-[40px] bg-indigo-600/10 border border-indigo-500/20 flex items-center justify-center mx-auto text-indigo-400 animate-pulse">
                     <ShieldCheck size={48} />
                  </div>
                  <div className="space-y-4">
                     <h2 className="text-3xl font-black text-white uppercase tracking-tighter">Ready to Begin?</h2>
                     <div className="space-y-2 text-slate-400 text-sm font-medium leading-relaxed">
                        <p>• Timer will start immediately on entry.</p>
                        <p>• Progress will be auto-saved in real-time.</p>
                        <p>• Interface is locked once you begin.</p>
                     </div>
                  </div>
                  
                  <div className="space-y-4 pt-6 border-t border-white/5">
                     <button 
                       onClick={handleStartTest}
                       className="w-full h-16 bg-indigo-600 text-white rounded-2xl font-black text-xs uppercase tracking-[0.3em] shadow-2xl shadow-indigo-600/30 hover:scale-105 transition-all"
                     >
                        Enter Test Interface →
                     </button>
                     <button 
                       onClick={() => setShowConfirmation(false)}
                       className="h-10 text-[10px] font-black text-slate-500 uppercase tracking-widest hover:text-white transition-all underline underline-offset-8"
                     >
                        Wait, Go Back
                     </button>
                  </div>
               </motion.div>
            </div>
         )}
      </AnimatePresence>
    </div>
  );
};

export default TestConfig;
