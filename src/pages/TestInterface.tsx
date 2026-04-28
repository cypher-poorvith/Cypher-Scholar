import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Clock, ChevronLeft, ChevronRight, CheckCircle, Info, HelpCircle } from 'lucide-react';

const TestInterface: React.FC = () => {
  const navigate = useNavigate();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [timeLeft, setTimeLeft] = useState(3600); // 1 hour for now
  const [showSolution, setShowSolution] = useState(false);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  
  // Dummy Questions for the demo based on mock
  const questions = [
    {
      id: 1,
      q: "A particle of mass m is released from height h on a smooth inclined plane. Find its velocity at the bottom.",
      options: ["√(2gh)", "√(gh)", "√(2gh sinθ)", "√(2gh cosθ)"],
      ans: "√(2gh)",
      solution: "Using conservation of energy: mgh = 1/2 mv². Thus v = √(2gh)."
    },
    {
       id: 2,
       q: "Which of the following is the strongest acid?",
       options: ["HClO4", "HClO3", "HClO2", "HClO"],
       ans: "HClO4",
       solution: "HClO4 (Perchloric acid) has the highest oxidation state of Chlorine (+7), making the O-H bond most polarized."
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(t => Math.max(0, t - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec < 10 ? '0' : ''}${sec}`;
  };

  const handleSelect = (idx: number, opt: string) => {
    setUserAnswers(prev => ({ ...prev, [idx]: opt }));
  };

  return (
    <div className="fixed inset-0 bg-[#0c0c1e] text-white z-[2000] flex flex-col font-sans selection:bg-purple-500/30 overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-pr/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-sec/10 rounded-full blur-[100px]" />
      </div>

      {/* Top Bar */}
      <header className="h-[75px] bg-[#1a1a3a]/80 backdrop-blur-xl border-b border-white/5 flex items-center justify-between px-8 shrink-0 relative z-10 shadow-2xl">
        <div className="flex items-center gap-6">
           <div className="flex items-center gap-2 group cursor-pointer" onClick={() => navigate('/')}>
             <div className="w-9 h-9 rounded-lg brand-gradient flex items-center justify-center text-white font-black shadow-lg shadow-pr/20 group-hover:scale-105 transition-transform">CP</div>
             <div className="text-[1.2rem] font-black tracking-tighter brand-text-gradient font-display">CYPHER<span className="text-white/40">SCHOLAR</span></div>
           </div>
           <div className="h-6 w-[1px] bg-white/10 hidden md:block" />
           <div className="hidden md:flex flex-col">
              <p className="text-[0.6rem] font-bold text-pr uppercase tracking-[0.2em] leading-none">Dropper Track</p>
              <p className="text-[0.8rem] font-black uppercase tracking-tight text-white/80">Full Mock Practice v4.2</p>
           </div>
        </div>
        
        <div className="flex items-center gap-4">
           <div className="px-6 py-2 bg-slate-900/50 border border-white/10 rounded-2xl font-display font-black text-2xl tabular-nums shadow-inner text-pr-light flex items-center gap-3">
             <Clock className="text-white/20" size={20} />
             {formatTime(timeLeft)}
           </div>
           <button 
             onClick={() => navigate('/results/latest')}
             className="btn-primary !px-8 !py-2.5 !rounded-2xl !text-[0.7rem] bg-red-600 shadow-red-600/20 hover:bg-red-700 h-[48px]"
           >
             Finish Test
           </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex overflow-hidden relative z-10">
        <div className="flex-1 overflow-y-auto p-6 md:p-12 custom-scrollbar">
          <div className="max-w-[800px] mx-auto space-y-12 py-10">
             <motion.div 
               key={`q-head-${currentIdx}`}
               initial={{ opacity: 0, x: -20 }}
               animate={{ opacity: 1, x: 0 }}
               className="space-y-6"
             >
               <div className="flex items-center gap-4">
                  <span className="px-4 py-1.5 rounded-full bg-pr/20 text-pr text-[0.7rem] font-black uppercase tracking-[0.2em] border border-pr/30">Question {currentIdx + 1}</span>
                  <div className="h-px flex-1 bg-white/5" />
               </div>
               <h2 className="text-[1.8rem] md:text-[2.2rem] font-medium leading-[1.4] tracking-tight text-white/90">
                 {questions[currentIdx]?.q}
               </h2>
             </motion.div>

             <div className="grid grid-cols-1 gap-4">
               {questions[currentIdx]?.options.map((opt, i) => (
                 <motion.button 
                   key={`opt-${currentIdx}-${i}`}
                   initial={{ opacity: 0, y: 10 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ delay: i * 0.1 }}
                   onClick={() => handleSelect(currentIdx, opt)}
                   className={`p-6 rounded-[24px] border-2 text-left transition-all flex items-center gap-6 group relative overflow-hidden ${
                     userAnswers[currentIdx] === opt 
                     ? 'border-pr bg-pr/10 shadow-[0_0_30px_rgba(84,0,195,0.2)]' 
                     : 'border-white/5 hover:border-white/10 bg-white/5'
                   }`}
                 >
                   <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-[0.8rem] font-black border-2 transition-all shrink-0 ${
                     userAnswers[currentIdx] === opt 
                     ? 'bg-pr border-pr text-white shadow-lg' 
                     : 'bg-white/5 border-white/10 text-white/40 group-hover:border-white/20 group-hover:text-white'
                   }`}>
                     {String.fromCharCode(65 + i)}
                   </div>
                   <span className={`text-[1.1rem] font-medium transition-colors ${userAnswers[currentIdx] === opt ? 'text-white' : 'text-white/60 group-hover:text-white'}`}>
                     {opt}
                   </span>
                 </motion.button>
               ))}
             </div>

             {userAnswers[currentIdx] && (
               <motion.div 
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 className="pt-8 space-y-6"
               >
                 <button 
                   onClick={() => setShowSolution(!showSolution)}
                   className="flex items-center gap-3 px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-pr font-black text-[0.8rem] uppercase tracking-widest hover:bg-white/10 transition-all shadow-md group"
                 >
                   {showSolution ? 'Conceal' : 'Analyze'} Detailed Solution 
                   <ChevronRight size={16} className={`transition-transform ${showSolution ? 'rotate-90' : 'group-hover:translate-x-1'}`} />
                 </button>
                 <AnimatePresence>
                   {showSolution && (
                     <motion.div 
                       initial={{ opacity: 0, height: 0, y: -10 }}
                       animate={{ opacity: 1, height: 'auto', y: 0 }}
                       exit={{ opacity: 0, height: 0, y: -10 }}
                       className="overflow-hidden"
                     >
                       <div className="p-10 bg-emerald-500/5 border border-emerald-500/20 rounded-[32px] shadow-inner relative overflow-hidden">
                          <div className="absolute top-0 right-0 p-8 opacity-5">
                             <HelpCircle size={120} />
                          </div>
                          <div className="flex items-center gap-3 mb-6">
                             <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                                <CheckCircle size={18} />
                             </div>
                             <p className="text-emerald-400 font-display font-black text-[0.8rem] uppercase tracking-[0.2em]">Socratic derivation</p>
                          </div>
                          <p className="text-[1.1rem] text-emerald-100/90 leading-[1.6] font-medium max-w-2xl">{questions[currentIdx]?.solution}</p>
                       </div>
                     </motion.div>
                   )}
                 </AnimatePresence>
               </motion.div>
             )}
          </div>
        </div>

        {/* Sidebar Palette */}
        <aside className="w-[380px] bg-[#13132B]/50 backdrop-blur-3xl border-l border-white/5 p-10 shrink-0 flex flex-col hidden lg:flex relative overflow-hidden">
          <div className="absolute top-0 right-0 w-full h-full pointer-events-none opacity-5">
             <div className="absolute -top-20 -right-20 w-64 h-64 bg-pr rounded-full blur-[100px]" />
          </div>

          <div className="mb-12 relative z-10">
             <div className="flex items-center gap-3 mb-3">
                <div className="w-2 h-2 rounded-full bg-pr shadow-[0_0_12px_rgba(84,0,195,1)]" />
                <h3 className="font-display font-black text-[0.9rem] uppercase tracking-[0.2em] text-white">Question Navigator</h3>
             </div>
             <p className="text-[0.7rem] text-white/40 uppercase font-bold tracking-[0.1em]">Verify all responses before submission</p>
          </div>
          
          <div className="grid grid-cols-4 gap-4 mb-12 relative z-10">
             {questions.map((_, i) => (
                <button 
                  key={i}
                  onClick={() => { setCurrentIdx(i); setShowSolution(false); }}
                  className={`aspect-square rounded-[20px] flex flex-col items-center justify-center font-black text-[1.1rem] border-2 transition-all relative overflow-hidden group ${
                    currentIdx === i ? 'border-pr bg-pr/20 text-white shadow-[0_0_30px_rgba(84,0,195,0.3)] scale-105' :
                    userAnswers[i] ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400' :
                    'border-white/5 bg-white/5 text-white/20 hover:border-white/20 hover:text-white'
                  }`}
                >
                  <span className="relative z-10">{i + 1}</span>
                  {userAnswers[i] && (
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute bottom-2 right-2 flex items-center justify-center"
                    >
                      <CheckCircle size={12} className="text-emerald-400 shadow-sm" />
                    </motion.div>
                  )}
                  <div className="absolute inset-0 bg-pr/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
             ))}
          </div>

          <div className="mt-auto space-y-8 pt-12 border-t border-white/5 relative z-10">
             <div className="glass-panel nh !p-6 bg-white/[0.02] border-white/5 rounded-[24px]">
                <div className="flex items-center justify-between mb-4">
                   <span className="text-[0.65rem] font-black uppercase tracking-[0.2em] text-white/40">Engagement Index</span>
                   <span className="text-[0.65rem] font-black uppercase tracking-[0.2em] text-pr font-display">88% Optimal</span>
                </div>
                <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                   <motion.div 
                     initial={{ width: 0 }}
                     animate={{ width: '88%' }}
                     className="bg-pr h-full shadow-[0_0_15px_rgba(84,0,195,0.6)]" 
                   />
                </div>
             </div>
             
             <div className="flex gap-4 items-start bg-pr/5 p-5 rounded-[24px] border border-pr/10">
                <Info size={18} className="text-pr shrink-0 mt-0.5" />
                <div className="space-y-2">
                   <p className="text-[0.7rem] font-black text-white uppercase tracking-widest">Protocol Monitor Active</p>
                   <p className="text-[0.75rem] text-white/40 leading-relaxed font-medium">Auto-saving session data to node 4. Sync status: <span className="text-emerald-400">Stable</span></p>
                </div>
             </div>
          </div>
        </aside>
      </main>

      {/* Footer Nav */}
      <footer className="h-[90px] bg-[#1a1a3a]/80 backdrop-blur-xl border-t border-white/5 flex items-center justify-between px-10 shrink-0 relative z-20">
          <button 
            disabled={currentIdx === 0}
            onClick={() => { setCurrentIdx(curr => curr - 1); setShowSolution(false); }}
            className={`font-black text-[0.8rem] uppercase tracking-[0.25em] flex items-center gap-4 transition-all px-6 py-3 rounded-xl border border-transparent ${currentIdx === 0 ? 'opacity-20 cursor-not-allowed text-white/40' : 'hover:border-white/10 text-white hover:text-pr'}`}
          >
             <ChevronLeft size={18} />
             Previous Phase
          </button>
          
          <div className="flex items-center gap-4 px-6 py-2 bg-emerald-500/5 rounded-full border border-emerald-500/10">
             <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
             <span className="text-[0.7rem] font-bold uppercase tracking-[0.2em] text-emerald-400/60">Uplink Verified</span>
          </div>

          <button 
            disabled={currentIdx === questions.length - 1}
            onClick={() => { setCurrentIdx(curr => curr + 1); setShowSolution(false); }}
            className={`font-black text-[0.8rem] uppercase tracking-[0.25em] flex items-center gap-4 transition-all px-6 py-3 rounded-xl border border-transparent ${currentIdx === questions.length - 1 ? 'opacity-20 cursor-not-allowed text-white/40' : 'hover:border-white/10 text-white hover:text-pr'}`}
          >
             Transition Next
             <ChevronRight size={18} />
          </button>
      </footer>
    </div>
  );
};

export default TestInterface;
