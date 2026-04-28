import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';

const CLASS_LABELS: Record<string, string> = {
  class9: 'Class 9',
  class10: 'Class 10',
  class11: 'Class 11',
  class12: 'Class 12',
  dropper: 'Dropper Track'
};

const EXAMS: Record<string, any[]> = {
  class9:  [{id:'cbse9',name:'CBSE Class 9',tag:'CBSE',color:'#2563eb',bg:'#eff6ff'},{id:'olympiad',name:'Science Olympiad',tag:'Olympiad',color:'#7c3aed',bg:'#f5f3ff'}],
  class10: [{id:'cbse10',name:'CBSE Class 10',tag:'CBSE',color:'#2563eb',bg:'#eff6ff'},{id:'ntse',name:'NTSE',tag:'Scholarship',color:'#059669',bg:'#f0fdf4'}],
  class11: [{id:'cbse11',name:'CBSE Class 11',tag:'CBSE',color:'#2563eb',bg:'#eff6ff'},{id:'jeemain11',name:'JEE Main Foundation',tag:'JEE',color:'#6366f1',bg:'#eef2ff'}],
  class12: [{id:'cbse12',name:'CBSE Class 12',tag:'CBSE',color:'#2563eb',bg:'#eff6ff'},{id:'jeemain12',name:'JEE Main',tag:'JEE Main',color:'#6366f1',bg:'#eef2ff'},{id:'jeeadv12',name:'JEE Advanced',tag:'JEE Adv',color:'#7c3aed',bg:'#f5f3ff'}],
  dropper: [{id:'jeemain',name:'JEE Main 2026',tag:'JEE Main',color:'#6366f1',bg:'#eef2ff'},{id:'jeeadv',name:'JEE Advanced 2026',tag:'JEE Adv',color:'#7c3aed',bg:'#f5f3ff'},{id:'bitsat',name:'BITSAT',tag:'BITSAT',color:'#059669',bg:'#f0fdf4'}],
};

const SUBJECTS = [
  { key: 'Physics', icon: '⚡', color: 'var(--phy)', bg: 'rgba(59,130,246,.1)', desc: 'Mechanics, Electrodynamics, Modern Physics' },
  { key: 'Chemistry', icon: '🧪', color: 'var(--chm)', bg: 'rgba(16,185,129,.1)', desc: 'Physical, Organic, Inorganic Chemistry' },
  { key: 'Mathematics', icon: '∑', color: 'var(--mth)', bg: 'rgba(139,92,246,.1)', desc: 'Calculus, Algebra, Coordinate Geometry' },
];

const TestConfig: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [wizClass, setWizClass] = useState('dropper');
  const [wizExam, setWizExam] = useState<any>(null);
  const [wizSubject, setWizSubject] = useState<string | null>(null);

  const renderStep1 = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="space-y-1">
        <h2 className="text-[2rem] font-black tracking-tighter leading-none">Choose Your Exam</h2>
        <p className="text-tx-muted text-[0.85rem] uppercase font-bold tracking-widest">{CLASS_LABELS[wizClass]}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {EXAMS[wizClass]?.map((e) => (
          <button 
            key={e.id}
            onClick={() => { setWizExam(e); setStep(2); }}
            className={`glass-panel text-left p-6 group relative overflow-hidden transition-all border-2 ${wizExam?.id === e.id ? 'border-pr bg-pr/5' : 'border-border-subtle hover:border-pr/30'}`}
            style={{ backgroundColor: `${e.bg}0A`, borderColor: wizExam?.id === e.id ? 'var(--pr)' : 'var(--border-subtle)' }}
          >
            <div className="badge mb-3" style={{ backgroundColor: `${e.bg}`, color: e.color, borderColor: `${e.color}44` }}>{e.tag}</div>
            <h3 className="text-[1.2rem] font-black leading-tight mb-2" style={{ color: e.color }}>{e.name}</h3>
            <p className="text-[0.78rem] text-tx-muted leading-relaxed mb-4">Full chapter-wise practice with solutions</p>
            <div className="flex justify-between items-center mt-auto">
               <span className="text-[0.65rem] font-bold underline underline-offset-4" style={{ color: e.color }}>Select →</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
      <button className="text-[0.7rem] font-bold uppercase tracking-widest text-tx-dim hover:text-pr mb-2" onClick={() => setStep(1)}>← Back to Exams</button>
      <div className="space-y-1">
        <h2 className="text-[2rem] font-black tracking-tighter leading-none">Choose Subject</h2>
        <p className="text-tx-muted text-[0.85rem] uppercase font-bold tracking-widest">{wizExam?.name}</p>
      </div>
      <div className="space-y-3">
        {SUBJECTS.map((s) => (
          <button 
            key={s.key}
            onClick={() => { setWizSubject(s.key); setStep(3); }}
            className="glass-panel w-full flex items-center gap-4 p-5 hover:border-pr/30 text-left transition-all group"
          >
            <div className="w-[50px] h-[50px] rounded-[14px] flex items-center justify-center text-[1.6rem] shrink-0" style={{ backgroundColor: s.bg, color: s.color }}>{s.icon}</div>
            <div className="flex-1">
              <h3 className="text-[1.05rem] font-black leading-tight mb-0.5">{s.key}</h3>
              <p className="text-tx-muted text-[0.78rem] leading-relaxed">{s.desc}</p>
            </div>
            <div className="w-8 h-8 rounded-lg bg-surface-subtle flex items-center justify-center text-[0.85rem] text-tx-muted group-hover:bg-pr/10 group-hover:text-pr transition-all">→</div>
          </button>
        ))}
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
      <button className="text-[0.7rem] font-bold uppercase tracking-widest text-tx-dim hover:text-pr mb-2" onClick={() => setStep(2)}>← Back to Subjects</button>
      <div className="flex justify-between items-start gap-4 flex-wrap">
        <div className="space-y-1">
          <h2 className="text-[2rem] font-black tracking-tighter leading-none">{wizSubject} Chapters</h2>
          <p className="text-tx-muted text-[0.85rem] uppercase font-bold tracking-widest">{wizExam?.name} · Chapters List</p>
        </div>
        <button 
          className="btn-primary h-[38px] px-6 text-[0.75rem]"
          onClick={() => navigate('/tests/active')}
        >
          ⚡ Full Subject Test
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* We'd map actual chapters here, but I'll use placeholders for now based on mockup style */}
        {[1,2,3,4,5,6,7,8].map((i) => (
          <button 
            key={i} 
            className="glass-panel p-4 text-left hover:border-pr/30 transition-all group"
            onClick={() => navigate(`/topic/${i}`)}
          >
             <div className="flex justify-between items-start mb-2.5">
               <span className="label-sm text-[0.55rem]">Chapter {i}</span>
               <span className="label-sm text-[0.55rem]">30 Qs</span>
             </div>
             <h4 className="text-[0.85rem] font-bold leading-tight mb-3 group-hover:text-pr">Chapter Title Placeholder {i}</h4>
             <div className="w-full bg-surface-subtle rounded-full h-[5px] overflow-hidden">
               <div className="h-full bg-pr" style={{ width: `${Math.floor(Math.random() * 80 + 10)}%` }} />
             </div>
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="p-6 md:p-10 max-w-[1100px] mx-auto space-y-10">
      {/* Step Progress Bar */}
      <div className="flex items-center gap-0 w-full mb-10 overflow-x-auto no-scrollbar">
        {[
          { n: 1, l: 'Select Exam' },
          { n: 2, l: 'Select Subject' },
          { n: 3, l: 'Select Chapter' }
        ].map((s, idx) => (
          <React.Fragment key={s.n}>
            <div className="flex items-center gap-2 shrink-0">
               <div className={`w-[30px] h-[30px] rounded-full flex items-center justify-center text-[0.72rem] font-black border-2 transition-all ${
                 step > s.n ? 'bg-emerald-500 border-emerald-500 text-white' : 
                 step === s.n ? 'bg-[var(--grad)] border-pr text-white shadow-lg shadow-pr/20' : 
                 'bg-surface-card border-border-subtle text-tx-dim'
               }`}>
                 {step > s.n ? '✓' : s.n}
               </div>
               <span className={`text-[0.68rem] font-bold uppercase tracking-widest whitespace-nowrap hidden sm:block ${
                 step > s.n ? 'text-emerald-500' :
                 step === s.n ? 'text-pr' : 'text-tx-dim'
               }`}>
                 {s.l}
               </span>
            </div>
            {idx < 2 && (
              <div className={`flex-1 h-[2px] mx-4 min-w-[20px] transition-all ${step > s.n ? 'bg-emerald-500' : 'bg-border-subtle'}`} />
            )}
          </React.Fragment>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}
      </AnimatePresence>
    </div>
  );
};

export default TestConfig;
