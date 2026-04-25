import React, { useState, useEffect, useMemo } from 'react';
import { 
  ChevronLeft, ChevronRight, X, Clock, AlertTriangle, 
  Menu, Grid, Maximize2, Minimize2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// --- TYPES ---
type QuestionStatus = 'unvisited' | 'visited' | 'answered' | 'marked' | 'answered-marked';

interface Question {
  id: string;
  number: number;
  subject: string;
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
  type: 'mcq' | 'numerical';
  text: string;
  options?: string[];
  correctAnswer: string;
  marks: number;
  negativeMarks: number;
}

interface TestState {
  currentQuestionIndex: number;
  answers: Record<string, string | null>;
  statuses: Record<string, QuestionStatus>;
  timeLeft: number;
  interfaceMode: 'pro' | 'simplified';
  isStarted: boolean;
}

const TestInterface: React.FC = () => {
  const { profile } = useAuth();
  const navigate = useNavigate();
  
  // -- Load Config --
  const config = useMemo(() => {
    const saved = localStorage.getItem('active_test_config');
    return saved ? JSON.parse(saved) : null;
  }, []);

  // -- Mock Questions (Simplified Generation) --
  const questions: Question[] = useMemo(() => {
    if (!config) return [];
    let allQs: Question[] = [];
    let qNum = 1;
    config.subjects.forEach((sub: any) => {
      for (let i = 0; i < sub.questions; i++) {
        allQs.push({
          id: `q_${sub.name}_${i}`,
          number: qNum++,
          subject: sub.name,
          topic: "Core Concept",
          difficulty: i % 3 === 0 ? 'hard' : i % 2 === 0 ? 'medium' : 'easy',
          type: 'mcq',
          text: `Evaluate the following problem statement for ${sub.name}: Given the standard conditions and laws of the subject, identify the most accurate conclusion from the options provided below.`,
          options: ["Conclusion A", "Conclusion B", "Conclusion C", "Conclusion D"],
          correctAnswer: "Conclusion B",
          marks: 4,
          negativeMarks: -1
        });
      }
    });
    return allQs;
  }, [config]);

  // -- State --
  const [state, setState] = useState<TestState>(() => {
    const saved = localStorage.getItem('active_test_state');
    if (saved) return JSON.parse(saved);

    const initialStatuses: Record<string, QuestionStatus> = {};
    questions.forEach(q => initialStatuses[q.id] = 'unvisited');
    if (questions.length > 0) initialStatuses[questions[0].id] = 'visited';

    return {
      currentQuestionIndex: 0,
      answers: {},
      statuses: initialStatuses,
      timeLeft: (config?.duration || 180) * 60,
      interfaceMode: config?.selectedInterface || 'simplified',
      isStarted: false
    };
  });

  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [isPaletteVisible, setIsPaletteVisible] = useState(true);
  const [isNavVisible, setIsNavVisible] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // -- Timer & Persistence --
  useEffect(() => {
    if (!config) {
      navigate('/tests/configure');
      return;
    }
  }, [config, navigate]);

  useEffect(() => {
    if (state.timeLeft > 0 && !showSubmitModal) {
      const timer = setInterval(() => {
        setState(prev => {
          const newState = { ...prev, timeLeft: prev.timeLeft - 1 };
          localStorage.setItem('active_test_state', JSON.stringify(newState));
          return newState;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [state.timeLeft, showSubmitModal]);

  // -- Handlers --
  const handleAnswerSelect = (qId: string, answer: string) => {
    setState(prev => ({
      ...prev,
      answers: { ...prev.answers, [qId]: answer },
      statuses: { 
        ...prev.statuses, 
        [qId]: prev.statuses[qId] === 'marked' ? 'answered-marked' : 'answered' 
      }
    }));
  };

  const handleClear = (qId: string) => {
    setState(prev => ({
      ...prev,
      answers: { ...prev.answers, [qId]: null },
      statuses: { ...prev.statuses, [qId]: 'visited' }
    }));
  };

  const handleSaveNext = (qId: string) => {
    setState(prev => {
      const nextIndex = Math.min(prev.currentQuestionIndex + 1, questions.length - 1);
      const nextId = questions[nextIndex].id;
      return {
        ...prev,
        currentQuestionIndex: nextIndex,
        statuses: {
          ...prev.statuses,
          [nextId]: prev.statuses[nextId] === 'unvisited' ? 'visited' : prev.statuses[nextId]
        }
      };
    });
  };

  const handleMarkForReview = (qId: string) => {
    setState(prev => {
      const hasAnswer = !!prev.answers[qId];
      const nextIndex = Math.min(prev.currentQuestionIndex + 1, questions.length - 1);
      const nextId = questions[nextIndex].id;
      return {
        ...prev,
        currentQuestionIndex: nextIndex,
        statuses: { 
          ...prev.statuses, 
          [qId]: hasAnswer ? 'answered-marked' : 'marked',
          [nextId]: prev.statuses[nextId] === 'unvisited' ? 'visited' : prev.statuses[nextId]
        }
      };
    });
  };

  const jumpToQuestion = (index: number) => {
    setState(prev => {
      const qId = questions[index].id;
      return {
        ...prev,
        currentQuestionIndex: index,
        statuses: {
          ...prev.statuses,
          [qId]: prev.statuses[qId] === 'unvisited' ? 'visited' : prev.statuses[qId]
        }
      };
    });
  };

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const calculateSummary = () => {
    const summary = { answered: 0, marked: 0, answeredMarked: 0, unvisited: 0, notAnswered: 0 };
    questions.forEach(q => {
      const status = state.statuses[q.id];
      if (status === 'answered') summary.answered++;
      else if (status === 'marked') summary.marked++;
      else if (status === 'answered-marked') summary.answeredMarked++;
      else if (status === 'unvisited') summary.unvisited++;
      else if (status === 'visited') summary.notAnswered++;
    });
    return summary;
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  const currentQ = questions[state.currentQuestionIndex];
  if (!currentQ) return null;

  // --- PRO INTERFACE RENDERING ---
  const renderPro = () => {
    const summary = calculateSummary();
    return (
      <div className="fixed inset-0 bg-white flex flex-col overflow-hidden font-['Arial',_sans-serif] text-black z-[100]">
        {/* Pro Header */}
        <header className="h-[50px] px-6 border-b border-gray-300 flex items-center justify-between shrink-0 bg-white">
           <span className="text-sm font-bold tracking-tight">Pro Exam Interface</span>
           <div className="flex items-center gap-8">
              <span className={`text-lg font-mono tabular-nums ${state.timeLeft < 600 ? 'text-red-600' : 'text-black'}`}>
                 ⏱️ {formatTime(state.timeLeft)}
              </span>
              <button 
                onClick={() => setShowSubmitModal(true)}
                className="bg-[#f44336] text-white px-6 h-8 text-sm uppercase rounded-[2px] font-bold"
              >
                Submit
              </button>
           </div>
        </header>

        {/* NTA Subject Tabs */}
        <div className="h-10 bg-[#f5f5f5] flex items-center border-b border-gray-300 shrink-0">
           {config?.subjects.map((s: any, i: number) => (
             <button 
               key={i}
               onClick={() => {
                  const firstIdx = questions.findIndex(q => q.subject === s.name);
                  if (firstIdx !== -1) jumpToQuestion(firstIdx);
               }}
               className={`px-8 h-full text-[11px] font-bold uppercase tracking-wider border-r border-gray-300 ${
                 currentQ.subject === s.name ? 'bg-white text-[#1976d2] border-b-2 border-b-[#1976d2]' : 'text-gray-500'
               }`}
             >
                {s.name}
             </button>
           ))}
        </div>

        {/* Main Body */}
        <div className="flex-1 flex overflow-hidden">
           {/* Question Area */}
           <div className="flex-1 flex flex-col overflow-hidden border-r border-gray-300">
              <div className="h-10 bg-[#f5f5f5] border-b border-gray-300 flex items-center justify-between px-6 shrink-0 text-[13px]">
                 <span>Question No. {currentQ.number}</span>
                 <span className="font-bold">{currentQ.subject}</span>
              </div>
              <div className="flex-1 overflow-y-auto p-10 select-none">
                 <div className="max-w-4xl mx-auto space-y-10">
                    <p className="text-lg leading-relaxed">{currentQ.text}</p>
                    <div className="space-y-1">
                       {currentQ.options?.map((opt, i) => (
                          <label key={i} className={`flex items-center gap-4 p-4 border border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${state.answers[currentQ.id] === opt ? 'bg-[#e3f2fd]' : ''}`}>
                             <input 
                               type="radio" 
                               name="nta_q" 
                               className="w-[18px] h-[18px]" 
                               checked={state.answers[currentQ.id] === opt}
                               onChange={() => handleAnswerSelect(currentQ.id, opt)}
                             />
                             <span className="text-[15px]">{String.fromCharCode(65+i)}. {opt}</span>
                          </label>
                       ))}
                    </div>
                 </div>
              </div>
              {/* Bottom Nav */}
              <div className="p-4 bg-white border-t border-gray-200 flex justify-between items-center shrink-0">
                 <button onClick={() => handleMarkForReview(currentQ.id)} className="px-6 h-9 bg-gray-100 border border-gray-300 text-sm">Mark for Review & Next</button>
                 <div className="flex gap-2">
                    <button onClick={() => handleClear(currentQ.id)} className="px-6 h-9 bg-gray-100 border border-gray-300 text-sm">Clear</button>
                    <button onClick={() => jumpToQuestion(Math.max(0, state.currentQuestionIndex - 1))} className="px-6 h-9 bg-white border border-gray-300 text-sm">← Previous</button>
                    <button onClick={() => handleSaveNext(currentQ.id)} className="px-8 h-9 bg-[#1976d2] text-white text-sm">Save & Next →</button>
                 </div>
              </div>
           </div>

           {/* Palette Sidebar */}
           <AnimatePresence>
              {isPaletteVisible && (
                 <motion.aside 
                   initial={{ width: 0 }}
                   animate={{ width: 320 }}
                   exit={{ width: 0 }}
                   className="flex flex-col bg-[#f5f5f5] shrink-0 border-l border-gray-300 overflow-hidden"
                 >
                    <div className="p-4 bg-white border-b border-gray-300 flex justify-between items-center">
                       <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">▼ Question Palette</span>
                       <button onClick={() => setIsPaletteVisible(false)} className="p-1 hover:bg-gray-100"><Minimize2 size={14} /></button>
                    </div>
                    <div className="flex-1 overflow-y-auto p-4 space-y-8">
                       <div className="grid grid-cols-4 gap-2">
                          {questions.map((q, i) => {
                             const status = state.statuses[q.id];
                             return (
                               <button 
                                 key={i} 
                                 onClick={() => jumpToQuestion(i)}
                                 className={`w-9 h-9 flex items-center justify-center text-[13px] border rounded-[2px] transition-all relative
                                   ${status === 'unvisited' ? 'bg-white border-gray-300 text-black' : 
                                     status === 'visited' ? 'bg-[#f44336] border-[#f44336] text-white' :
                                     status === 'answered' ? 'bg-[#4caf50] border-[#4caf50] text-white rounded-br-[40%]' :
                                     status === 'marked' ? 'bg-[#9c27b0] border-[#9c27b0] text-white rounded-full' :
                                     status === 'answered-marked' ? 'bg-[#9c27b0] border-[#9c27b0] text-white rounded-full' : ''
                                   }
                                   ${state.currentQuestionIndex === i ? 'ring-2 ring-blue-500 ring-offset-1' : ''}
                                 `}
                               >
                                  {q.number}
                                  {status === 'answered-marked' && <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-[#4caf50] border border-white rounded-full" />}
                               </button>
                             );
                          })}
                       </div>

                       <div className="space-y-4 pt-10 border-t border-gray-200">
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Legend</p>
                          <div className="grid gap-2">
                             {[
                               { label: 'Answered', status: 'bg-[#4caf50] rounded-br-[40%] text-white', count: summary.answered },
                               { label: 'Not Answered', status: 'bg-[#f44336] text-white', count: summary.notAnswered },
                               { label: 'Marked', status: 'bg-[#9c27b0] rounded-full text-white', count: summary.marked },
                               { label: 'Not Visited', status: 'bg-white border-gray-300', count: summary.unvisited }
                             ].map((l, idx) => (
                               <div key={idx} className="flex items-center justify-between text-[11px]">
                                  <div className="flex items-center gap-3 text-gray-500 uppercase font-bold tracking-tight">
                                     <div className={`w-5 h-5 flex items-center justify-center font-bold border ${l.status}`}>1</div>
                                     {l.label}
                                  </div>
                                  <span className="font-bold">{l.count}</span>
                               </div>
                             ))}
                          </div>
                       </div>
                    </div>
                 </motion.aside>
              )}
           </AnimatePresence>
           {!isPaletteVisible && (
              <button 
                onClick={() => setIsPaletteVisible(true)}
                className="w-10 bg-[#f5f5f5] border-l border-gray-300 flex flex-col items-center py-4 hover:bg-gray-100 transition-colors"
              >
                 <span className="[writing-mode:vertical-lr] rotate-180 text-[11px] font-bold uppercase tracking-[0.2em] text-gray-500">Palette ◀</span>
              </button>
           )}
        </div>
      </div>
    );
  };

  // --- SIMPLIFIED INTERFACE RENDERING ---
  const renderSimplified = () => {
    return (
      <div className="fixed inset-0 bg-white flex flex-col overflow-hidden font-['Inter',_sans-serif] text-black z-[100] selection:bg-blue-500/20">
         {/* Scholar Header */}
         <header className="h-14 px-8 border-b border-gray-100 flex items-center justify-between shrink-0 bg-white z-50">
            <div className="flex items-center gap-8">
               <span className="text-15 font-medium tracking-tight">Scholar JEE Main</span>
               <div className="h-4 w-[1px] bg-gray-200" />
               <span className="text-15 text-gray-400 capitalize">{currentQ.subject}</span>
            </div>
            <div className="flex items-center gap-10">
               <div className="text-right">
                  <span className={`text-xl font-mono tabular-nums leading-none ${state.timeLeft < 600 ? 'text-red-500' : 'text-black'}`}>
                     {formatTime(state.timeLeft)}
                  </span>
               </div>
               <button 
                  onClick={() => setShowSubmitModal(true)}
                  className="bg-black text-white px-6 h-9 text-xs font-bold uppercase tracking-widest rounded-sm hover:bg-gray-900 transition-all"
               >
                  SUBMIT
               </button>
            </div>
         </header>

         {/* Subject Navigation Bar (Minimal) */}
         <div className="h-10 bg-white border-b border-gray-100 flex items-center px-8 gap-6 shrink-0">
            {config?.subjects.map((sub: any, i: number) => (
               <button 
                  key={i}
                  onClick={() => {
                     const firstIdx = questions.findIndex(q => q.subject === sub.name);
                     if (firstIdx !== -1) jumpToQuestion(firstIdx);
                  }}
                  className={`text-[12px] font-medium tracking-wide uppercase transition-all pb-1 border-b-2 ${
                     currentQ.subject === sub.name ? 'border-red-500 text-black' : 'border-transparent text-gray-400 hover:text-black'
                  }`}
               >
                  {sub.name}
               </button>
            ))}
         </div>

         {/* Main Content Area */}
         <div className="flex-1 relative overflow-hidden flex border-b border-gray-100">
            {/* Sidebar Toggle Controls */}
            <button 
               onClick={() => setIsNavVisible(!isNavVisible)}
               className="absolute bottom-6 left-6 w-12 h-12 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-lg hover:bg-gray-50 z-40"
            >
               <Menu size={20} className="text-gray-500" />
            </button>
            <button 
               onClick={() => setIsPaletteVisible(!isPaletteVisible)}
               className="absolute bottom-6 right-6 w-12 h-12 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-lg hover:bg-gray-50 z-40"
            >
               <Grid size={20} className="text-gray-500" />
            </button>

            {/* Left Nav Panel (Subject Jump) */}
            <AnimatePresence>
               {isNavVisible && (
                  <motion.div 
                    initial={{ x: -200 }} animate={{ x: 0 }} exit={{ x: -200 }}
                    className="absolute inset-y-0 left-0 w-64 bg-white border-r border-gray-100 z-30 p-8 pt-16 shadow-2xl"
                  >
                     <p className="text-[10px] font-bold text-gray-300 uppercase tracking-[0.2em] mb-6">☰ Navigation</p>
                     <div className="space-y-4">
                        {['Physics', 'Chemistry', 'Mathematics'].map(s => (
                           <button 
                             key={s}
                             onClick={() => {
                                const idx = questions.findIndex(q => q.subject === s);
                                if (idx !== -1) jumpToQuestion(idx);
                                setIsNavVisible(false);
                             }}
                             className={`block w-full text-left text-lg font-medium py-2 ${currentQ.subject === s ? 'text-black underline underline-offset-8' : 'text-gray-300 hover:text-black'}`}
                           >
                              {s}
                           </button>
                        ))}
                     </div>
                     <button onClick={() => setIsNavVisible(false)} className="mt-12 text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2 pr-4 py-2">
                        <X size={12} /> Close
                     </button>
                  </motion.div>
               )}
            </AnimatePresence>

            {/* Question Display Area */}
            <div className="flex-1 overflow-y-auto px-8 py-16 custom-scrollbar">
               <div className="max-w-[800px] mx-auto space-y-16">
                  <header>
                     <span className="text-[14px] text-gray-400 capitalize tracking-wide">Question {currentQ.number} of {questions.length}</span>
                  </header>
                  
                  <div className="space-y-12 pb-24">
                     <p className="text-xl leading-[1.8] tracking-tight">{currentQ.text}</p>
                     <div className="space-y-3">
                        {currentQ.options?.map((opt, i) => (
                           <button 
                             key={i}
                             onClick={() => handleAnswerSelect(currentQ.id, opt)}
                             className={`w-full flex items-center gap-6 p-6 border rounded-[4px] transition-all text-left ${
                                state.answers[currentQ.id] === opt 
                                ? 'bg-blue-50 border-blue-400' 
                                : 'bg-white border-gray-100 hover:bg-gray-50'
                             }`}
                           >
                              <div className={`w-6 h-6 rounded-full border flex items-center justify-center text-[10px] font-bold transition-colors ${
                                 state.answers[currentQ.id] === opt ? 'bg-blue-400 border-blue-400 text-white' : 'border-gray-200 text-gray-400'
                              }`}>
                                 {String.fromCharCode(65+i)}
                              </div>
                              <span className={`text-[16px] flex-1 ${state.answers[currentQ.id] === opt ? 'text-black font-medium' : 'text-gray-600'}`}>{opt}</span>
                           </button>
                        ))}
                     </div>
                  </div>
               </div>
            </div>

            {/* Right Palette Panel */}
            <AnimatePresence>
               {isPaletteVisible && (
                  <motion.div 
                    initial={{ x: 300 }} animate={{ x: 0 }} exit={{ x: 300 }}
                    className="absolute inset-y-0 right-0 w-80 bg-white border-l border-gray-100 z-30 p-8 pt-16 shadow-2xl flex flex-col"
                  >
                     <div className="flex justify-between items-center mb-10">
                        <p className="text-[10px] font-bold text-gray-300 uppercase tracking-[0.2em]">Questions Grid</p>
                        <button onClick={() => setIsPaletteVisible(false)} className="text-gray-300"><X size={18} /></button>
                     </div>
                     <div className="flex-1 overflow-y-auto custom-scrollbar">
                        <div className="grid grid-cols-6 gap-2">
                           {questions.map((q, i) => {
                              const status = state.statuses[q.id];
                              return (
                                <button 
                                  key={i} 
                                  onClick={() => jumpToQuestion(i)}
                                  className={`aspect-square text-[13px] border rounded-[2px] flex items-center justify-center transition-all
                                    ${status === 'unvisited' ? 'bg-white border-gray-100 text-gray-300' : 
                                      status === 'visited' ? 'bg-red-50 text-red-500 border-red-200' :
                                      status === 'answered' ? 'bg-green-500 border-green-500 text-white' :
                                      status === 'marked' ? 'bg-amber-50 text-amber-600 border-amber-200' :
                                      status === 'answered-marked' ? 'bg-blue-500 text-white border-blue-500' : ''
                                    }
                                    ${state.currentQuestionIndex === i ? 'ring-1 ring-black ring-offset-2' : ''}
                                  `}
                                >
                                   {q.number}
                                </button>
                              );
                           })}
                        </div>
                     </div>
                  </motion.div>
               )}
            </AnimatePresence>
         </div>

         {/* Scholar Navigation Footer */}
         <div className="h-20 px-8 bg-white flex flex-col md:flex-row justify-between items-center shrink-0 border-t border-gray-100 gap-4">
            <div className="flex items-center gap-8">
               <label className="flex items-center gap-3 cursor-pointer select-none">
                  <input 
                     type="checkbox" 
                     className="w-4 h-4 rounded-sm border-gray-200" 
                     checked={state.statuses[currentQ.id] === 'marked' || state.statuses[currentQ.id] === 'answered-marked'}
                     onChange={() => handleMarkForReview(currentQ.id)}
                  />
                  <span className="text-[12px] text-gray-500 font-medium uppercase tracking-widest">Mark for Review</span>
               </label>
               <button onClick={() => handleClear(currentQ.id)} className="text-[12px] text-gray-400 font-medium uppercase tracking-widest hover:text-red-500 transition-colors">Clear Selection</button>
            </div>
            <div className="flex gap-4">
               <button 
                  onClick={() => jumpToQuestion(Math.max(0, state.currentQuestionIndex - 1))}
                  className="px-6 h-11 border border-gray-200 text-[12px] font-medium uppercase tracking-widest flex items-center gap-2 hover:bg-gray-50 rounded-sm"
               >
                  <ChevronLeft size={16} /> Prev
               </button>
               <button 
                  onClick={() => handleSaveNext(currentQ.id)}
                  className="px-10 h-11 bg-blue-500 text-white text-[12px] font-bold uppercase tracking-[0.2em] flex items-center gap-2 rounded-sm shadow-lg shadow-blue-500/20 hover:scale-[1.02] transition-all"
               >
                  Save & Next <ChevronRight size={16} />
               </button>
            </div>
         </div>
      </div>
    );
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {state.interfaceMode === 'pro' ? renderPro() : renderSimplified()}
      </AnimatePresence>

      {/* FINAL SUBMIT MODAL */}
      <AnimatePresence>
         {showSubmitModal && (
            <div className="fixed inset-0 z-[500] flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm select-none">
               <motion.div 
                 initial={{ opacity: 0, scale: 0.95 }}
                 animate={{ opacity: 1, scale: 1 }}
                 exit={{ opacity: 0, scale: 0.95 }}
                 className="w-full max-w-md bg-white p-8 border border-gray-200 shadow-2xl space-y-8"
               >
                  <div className="space-y-2">
                     <h2 className="text-2xl font-bold tracking-tight text-black">Submit Session?</h2>
                     <p className="text-sm text-gray-400">Review your final response stats before closing. This session will be verified instantly.</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 py-6 border-y border-gray-100">
                     <div className="text-center">
                        <p className="text-[10px] font-bold text-gray-300 uppercase tracking-widest mb-1">Answered</p>
                        <p className="text-3xl font-bold text-black">{calculateSummary().answered + calculateSummary().answeredMarked}</p>
                     </div>
                     <div className="text-center border-l border-gray-100">
                        <p className="text-[10px] font-bold text-gray-300 uppercase tracking-widest mb-1">Unvisited</p>
                        <p className="text-3xl font-bold text-red-500">{calculateSummary().unvisited}</p>
                     </div>
                  </div>

                  <div className="space-y-3">
                     <button 
                       onClick={() => {
                          localStorage.removeItem('active_test_state');
                          navigate('/results/latest');
                       }}
                       className="w-full h-12 bg-[#f44336] text-white font-bold uppercase tracking-widest text-xs"
                     >
                        Finalize Submission
                     </button>
                     <button 
                       onClick={() => setShowSubmitModal(false)}
                       className="w-full h-10 text-[10px] font-bold text-gray-400 uppercase tracking-widest hover:text-black transition-colors"
                     >
                        Return to Paper
                     </button>
                  </div>
               </motion.div>
            </div>
         )}
      </AnimatePresence>

      <button 
        onClick={toggleFullscreen}
        className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[600] px-4 py-1.5 bg-black/10 hover:bg-black/20 backdrop-blur-md rounded-full text-[10px] font-bold text-black/40 uppercase tracking-widest flex items-center gap-2 opacity-0 hover:opacity-100 transition-opacity"
      >
         {isFullscreen ? <Minimize2 size={12} /> : <Maximize2 size={12} />} {isFullscreen ? 'Exit Full' : 'Focus Mode'}
      </button>
    </>
  );
};

export default TestInterface;
