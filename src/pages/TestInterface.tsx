import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';

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
    <div className="fixed inset-0 bg-[#0c0c1e] text-white z-[2000] flex flex-col font-sans selection:bg-purple-500/30">
      {/* Top Bar */}
      <header className="h-[65px] bg-[#1a1a3a] border-b border-white/5 flex items-center justify-between px-8 shrink-0">
        <div className="flex items-center gap-4">
           <div className="text-[1.2rem] font-black italic tracking-tighter">CYPHER<span className="text-pr">SCHOLAR</span></div>
           <div className="h-5 w-[1px] bg-white/10 hidden md:block" />
           <p className="label-sm opacity-50 hidden md:block">Dropper Track · Practice Session</p>
        </div>
        <div className="flex items-center gap-6">
           <div className="px-5 py-2 bg-black/30 border border-white/10 rounded-full font-display font-black text-xl tabular-nums shadow-inner">
             {formatTime(timeLeft)}
           </div>
           <button 
             onClick={() => navigate('/results/latest')}
             className="bg-red-600 hover:bg-red-700 text-white px-6 h-[40px] rounded-xl font-bold text-[0.75rem] uppercase tracking-widest transition-all shadow-xl shadow-red-600/20"
           >
             End Session
           </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex overflow-hidden">
        <div className="flex-1 overflow-y-auto p-6 md:p-12 custom-scrollbar">
          <div className="max-w-[750px] mx-auto space-y-10 py-10">
             <div className="space-y-4">
               <span className="label-sm text-[0.65rem] bg-pr/20 text-pr px-3 py-1 rounded-full border border-pr/20 uppercase tracking-widest font-black">Question {currentIdx + 1}</span>
               <h2 className="text-[1.5rem] md:text-[1.8rem] font-medium leading-[1.6] tracking-tight">{questions[currentIdx]?.q}</h2>
             </div>

             <div className="grid grid-cols-1 gap-3.5">
               {questions[currentIdx]?.options.map((opt, i) => (
                 <button 
                   key={i}
                   onClick={() => handleSelect(currentIdx, opt)}
                   className={`p-5 rounded-2xl border-2 text-left transition-all flex items-center gap-4 group ${
                     userAnswers[currentIdx] === opt ? 'border-pr bg-pr/5' : 'border-white/5 hover:border-white/10 bg-white/5'
                   }`}
                 >
                   <div className={`w-8 h-8 rounded-[8px] flex items-center justify-center text-[0.75rem] font-black border transition-all ${
                     userAnswers[currentIdx] === opt ? 'bg-pr border-pr text-white' : 'bg-white/5 border-white/10 text-white group-hover:bg-white/10'
                   }`}>{String.fromCharCode(65 + i)}</div>
                   <span className="text-[1rem] font-medium">{opt}</span>
                 </button>
               ))}
             </div>

             {userAnswers[currentIdx] && (
               <div className="pt-6 space-y-4">
                 <button 
                   onClick={() => setShowSolution(!showSolution)}
                   className="text-pr font-bold text-[0.8rem] uppercase tracking-widest hover:underline underline-offset-8"
                 >
                   {showSolution ? 'Hide' : 'Show'} Solution Content →
                 </button>
                 <AnimatePresence>
                   {showSolution && (
                     <motion.div 
                       initial={{ opacity: 0, height: 0 }}
                       animate={{ opacity: 1, height: 'auto' }}
                       exit={{ opacity: 0, height: 0 }}
                       className="overflow-hidden"
                     >
                       <div className="p-8 bg-emerald-500/10 border border-emerald-500/20 rounded-[28px]">
                          <p className="text-emerald-400 font-display font-black text-[0.7rem] uppercase tracking-[0.2em] mb-2">Step-by-Step Explanation</p>
                          <p className="text-[0.95rem] text-emerald-100/80 leading-relaxed font-medium">{questions[currentIdx]?.solution}</p>
                       </div>
                     </motion.div>
                   )}
                 </AnimatePresence>
               </div>
             )}
          </div>
        </div>

        {/* Sidebar Palette */}
        <aside className="w-[340px] bg-[#13132B] border-l border-white/5 p-8 shrink-0 flex flex-col hidden lg:flex">
          <div className="mb-8">
             <h3 className="font-display font-black text-[0.9rem] uppercase tracking-widest">Question Palette</h3>
             <p className="text-[0.65rem] text-white/40 uppercase font-medium tracking-wider mt-1">Select a square to jump</p>
          </div>
          
          <div className="grid grid-cols-4 gap-3.5 mb-10">
             {questions.map((_, i) => (
               <button 
                 key={i}
                 onClick={() => { setCurrentIdx(i); setShowSolution(false); }}
                 className={`aspect-square rounded-[14px] flex items-center justify-center font-black text-[0.9rem] border-2 transition-all ${
                   currentIdx === i ? 'border-pr bg-pr/20 text-white shadow-lg shadow-pr/20 scale-105' :
                   userAnswers[i] ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400' :
                   'border-white/5 bg-white/5 text-white/30 hover:border-white/20'
                 }`}
               >
                 {i + 1}
               </button>
             ))}
          </div>

          <div className="space-y-4 pt-10 border-t border-white/5">
             <div className="flex items-center justify-between text-[0.65rem] font-bold uppercase tracking-widest">
                <span className="text-white/40">Efficiency</span>
                <span className="text-pr">High</span>
             </div>
             <div className="w-full bg-white/5 h-[8px] rounded-full overflow-hidden">
                <div className="bg-pr h-full" style={{ width: '85%' }} />
             </div>
             <p className="text-[0.65rem] text-white/40 leading-relaxed font-medium">Auto-saving session data to cloud sync. All responses are verified against standard JEE solution keys.</p>
          </div>
        </aside>
      </main>

      {/* Footer Nav */}
      <footer className="h-[80px] bg-[#1a1a3a] border-t border-white/5 flex items-center justify-between px-8 shrink-0">
          <button 
            disabled={currentIdx === 0}
            onClick={() => { setCurrentIdx(curr => curr - 1); setShowSolution(false); }}
            className={`font-black text-[0.7rem] uppercase tracking-[0.2em] flex items-center gap-2 transition-all ${currentIdx === 0 ? 'opacity-20 cursor-not-allowed' : 'hover:text-pr'}`}
          >
             ← Previous
          </button>
          
          <div className="flex items-center gap-3">
             <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
             <span className="text-[0.6rem] font-bold uppercase tracking-widest text-white/40">Secure Connection Stable</span>
          </div>

          <button 
            disabled={currentIdx === questions.length - 1}
            onClick={() => { setCurrentIdx(curr => curr + 1); setShowSolution(false); }}
            className={`font-black text-[0.7rem] uppercase tracking-[0.2em] flex items-center gap-2 transition-all ${currentIdx === questions.length - 1 ? 'opacity-20 cursor-not-allowed' : 'hover:text-pr'}`}
          >
             Next Question →
          </button>
      </footer>
    </div>
  );
};

export default TestInterface;
