import React, { useState } from 'react';
import { Smartphone, Monitor, Plus, Trash2, Edit3, Eye, Layout, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Question {
  id: string;
  question: string;
  options: string[];
  answer: string;
  solution: string;
  graphics?: string[];
}

const AdminContentManager: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: '1',
      question: 'A particle of mass m is released from height h...',
      options: ['√(2gh)', '√(gh)', '√(2gh sinθ)', '√(2gh cosθ)'],
      answer: '√(2gh)',
      solution: 'Using conservation of energy: mgh = 1/2 mv².'
    }
  ]);

  const [previewDevice, setPreviewDevice] = useState<'phone' | 'desktop'>('desktop');
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  // Form State
  const [formData, setFormData] = useState<Partial<Question>>({
    question: '',
    options: ['', '', '', ''],
    answer: '',
    solution: '',
    graphics: [] as string[]
  });

  const [activeEditorTab, setActiveEditorTab] = useState<'text' | 'media' | 'style'>('text');

  const handleSave = () => {
    if (editingQuestion) {
      setQuestions(qs => qs.map(q => q.id === editingQuestion.id ? { ...q, ...formData } as Question : q));
      setEditingQuestion(null);
    } else {
      const newQ: Question = {
        id: Math.random().toString(36).substr(2, 9),
        ...formData as Question,
        graphics: formData.graphics || []
      };
      setQuestions([...questions, newQ]);
      setIsAdding(false);
    }
    setFormData({ question: '', options: ['', '', '', ''], answer: '', solution: '', graphics: [] });
  };

  const removeQuestion = (id: string) => {
    setQuestions(qs => qs.filter(q => q.id !== id));
  };

  return (
    <div className="flex h-full gap-8">
      {/* Editor Column */}
      <div className="flex-1 space-y-6 overflow-y-auto pr-2 custom-scrollbar">
        <div className="flex justify-between items-center bg-surface-card backdrop-blur-xl p-5 rounded-[22px] border border-border-subtle sticky top-0 z-20 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-pr/10 flex items-center justify-center text-pr">
              <Layout size={20} />
            </div>
            <div>
              <h3 className="font-display font-black text-[1.1rem] tracking-tight uppercase italic leading-none">Studio Builder</h3>
              <p className="text-[0.6rem] font-bold opacity-50 uppercase tracking-widest mt-1">Live Synthesis Engine</p>
            </div>
          </div>
          <button 
            onClick={() => setIsAdding(true)}
            className="btn-primary h-[42px] px-6 text-[0.75rem]"
          >
            <Plus size={18} /> New Module
          </button>
        </div>

        {/* Form Overlay */}
        {(isAdding || editingQuestion) && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-panel border-pr/30 bg-surface-card/90 backdrop-blur-3xl p-8 space-y-6 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-1 h-full bg-pr" />
            
            <div className="flex gap-2 p-1 bg-surface-subtle rounded-xl w-fit">
              {['text', 'media', 'style'].map((t) => (
                <button
                  key={t}
                  onClick={() => setActiveEditorTab(t as any)}
                  className={`px-4 py-1.5 rounded-lg text-[0.65rem] font-black uppercase tracking-widest transition-all ${
                    activeEditorTab === t ? 'bg-white shadow-sm text-pr' : 'text-tx-dim'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {activeEditorTab === 'text' && (
                <motion.div 
                  key="text"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="space-y-5"
                >
                  <div className="space-y-2">
                    <label className="label-sm opacity-60">Question Prompt</label>
                    <textarea 
                      placeholder="Type your complex JEE level question here..." 
                      className="input-field min-h-[120px] text-[0.9rem] font-medium leading-relaxed"
                      value={formData.question}
                      onChange={e => setFormData({ ...formData, question: e.target.value })}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    {formData.options?.map((opt, i) => (
                      <div key={i} className="space-y-2">
                        <label className="label-sm opacity-60 font-black">Option {String.fromCharCode(65 + i)}</label>
                        <input 
                          placeholder={`Value for ${String.fromCharCode(65 + i)}`}
                          className="input-field h-[48px]"
                          value={opt}
                          onChange={e => {
                            const newOpts = [...(formData.options || [])];
                            newOpts[i] = e.target.value;
                            setFormData({ ...formData, options: newOpts });
                          }}
                        />
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="label-sm opacity-60">Correct Target</label>
                      <input 
                        placeholder="Ex: √(2gh)" 
                        className="input-field h-[48px] border-emerald-500/20"
                        value={formData.answer}
                        onChange={e => setFormData({ ...formData, answer: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="label-sm opacity-60">Success Strategy (Solution)</label>
                      <textarea 
                        placeholder="Explain the logic step-by-step..." 
                        className="input-field min-h-[48px] h-[48px] py-3 overflow-hidden resize-none"
                        value={formData.solution}
                        onChange={e => setFormData({ ...formData, solution: e.target.value })}
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {activeEditorTab === 'media' && (
                <motion.div 
                  key="media"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="space-y-6"
                >
                  <label className="label-sm opacity-60">Visual Assets (Graphics/Simulations)</label>
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { icon: '📐', label: 'Diagram' },
                      { icon: '⚛️', label: 'Atomic' },
                      { icon: '📈', label: 'Graph' }
                    ].map((m, i) => (
                      <button 
                        key={i}
                        className="flex flex-col items-center gap-3 p-6 rounded-[22px] border-2 border-dashed border-border-subtle hover:border-pr/30 hover:bg-pr/5 transition-all text-tx-dim hover:text-pr"
                      >
                        <span className="text-3xl">{m.icon}</span>
                        <span className="text-[0.65rem] font-black uppercase tracking-widest">{m.label}</span>
                      </button>
                    ))}
                  </div>
                  <div className="p-5 bg-surface-subtle rounded-[18px] border border-border-subtle">
                    <p className="text-[0.7rem] font-bold text-tx-muted mb-2">Graphics Pipeline Status</p>
                    <div className="flex gap-2">
                      <div className="h-1 flex-1 bg-emerald-500 rounded-full" />
                      <div className="h-1 flex-1 bg-emerald-500 rounded-full" />
                      <div className="h-1 flex-1 bg-surface-card rounded-full" />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex gap-4 justify-end pt-4 border-t border-border-subtle mt-4">
              <button 
                onClick={() => { setIsAdding(false); setEditingQuestion(null); }}
                className="btn-secondary h-[44px] px-8 text-[0.7rem]"
              >
                Discard Changes
              </button>
              <button 
                onClick={handleSave}
                className="btn-primary h-[44px] px-8 text-[0.7rem]"
              >
                Publish Module →
              </button>
            </div>
          </motion.div>
        )}

        <div className="space-y-5">
          {questions.map((q, idx) => (
            <motion.div 
              layout
              key={q.id} 
              className="glass-panel group relative border-l-4 border-l-transparent hover:border-l-pr p-8 transition-all hover:translate-x-1"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="flex flex-col">
                  <span className="badge badge-primary px-3 py-1 text-[0.6rem] mb-2 uppercase tracking-wide">ID: QZ-0{idx + 1}</span>
                  <p className="label-sm opacity-40 font-black">Sync Date: 2026-04-28</p>
                </div>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all">
                  <button 
                    onClick={() => { setEditingQuestion(q); setFormData(q); }}
                    className="p-3 bg-surface-subtle hover:bg-pr/10 text-pr rounded-xl transition-all"
                  >
                    <Edit3 size={18} />
                  </button>
                  <button 
                    onClick={() => removeQuestion(q.id)}
                    className="p-3 bg-red-500/5 hover:bg-red-500/15 text-red-500 rounded-xl transition-all"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>

              <h4 className="text-[1.05rem] font-black mb-6 leading-[1.4] tracking-tight">{q.question}</h4>
              
              <div className="grid grid-cols-2 gap-3 mb-6">
                {q.options.map((opt, i) => (
                  <div key={i} className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${opt === q.answer ? 'bg-emerald-500/5 border-emerald-500/30 text-emerald-600 shadow-sm' : 'bg-surface-subtle border-border-subtle opacity-70'}`}>
                    <span className="w-6 h-6 rounded-md bg-white flex items-center justify-center text-[0.65rem] font-black border border-inherit shrink-0">{String.fromCharCode(64 + i + 1)}</span>
                    <span className="text-[0.8rem] font-bold truncate">{opt}</span>
                    {opt === q.answer && <span className="ml-auto text-[0.6rem] font-black uppercase tracking-widest">Correct</span>}
                  </div>
                ))}
              </div>

              <div className="p-6 bg-surface-subtle/50 rounded-[22px] border border-border-subtle relative overflow-hidden group/sol">
                <div className="absolute top-0 left-0 w-1 h-full bg-pr/20 group-hover/sol:bg-pr transition-colors" />
                <p className="label-sm text-pr font-black mb-2 uppercase tracking-widest italic flex items-center gap-2">
                  <Eye size={12} /> Solution Architecture
                </p>
                <p className="text-[0.85rem] font-medium leading-[1.6] opacity-70 mb-0">{q.solution}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Preview Column */}
      <div className="w-[440px] shrink-0 space-y-6 sticky top-0 h-fit">
        <div className="flex items-center justify-between bg-surface-card p-4 rounded-[22px] border border-border-subtle shadow-sm">
           <div className="flex items-center gap-3 px-3">
              <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-600 animate-pulse">
                <Eye size={16} />
              </div>
              <div>
                <span className="label-sm block uppercase italic font-black">Live Pulse</span>
                <span className="text-[0.55rem] font-bold opacity-40 uppercase tracking-widest">Warp Drive Sync: Active</span>
              </div>
           </div>
           <div className="flex bg-surface-subtle p-1 rounded-xl">
              <button 
                onClick={() => setPreviewDevice('phone')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${previewDevice === 'phone' ? 'bg-white shadow-sm text-pr' : 'text-tx-dim'}`}
              >
                <Smartphone size={15} />
                <span className="text-[0.6rem] font-black uppercase">Mobile</span>
              </button>
              <button 
                onClick={() => setPreviewDevice('desktop')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${previewDevice === 'desktop' ? 'bg-white shadow-sm text-pr' : 'text-tx-dim'}`}
              >
                <Monitor size={15} />
                <span className="text-[0.6rem] font-black uppercase">Canvas</span>
              </button>
           </div>
        </div>

        <motion.div 
          layout
          className={`relative mx-auto transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] border-[12px] border-slate-900 rounded-[50px] bg-slate-900 shadow-2xl overflow-hidden group ${
            previewDevice === 'phone' ? 'w-[300px] h-[640px]' : 'w-full h-[640px]'
          }`}
        >
          {/* Inner Frame */}
          <div className="w-full h-full bg-surface-bg rounded-[38px] overflow-y-auto no-scrollbar relative p-6 flex flex-col">
            <header className="h-[50px] flex items-center justify-between border-b border-border-subtle mb-6 shrink-0">
               <div className="text-[0.7rem] font-black italic tracking-tighter">CYPHER<span className="gradient-text">SCHOLAR</span></div>
               <div className="flex gap-2">
                 <div className="w-6 h-6 rounded-full bg-surface-subtle flex items-center justify-center text-[0.4rem]">🔕</div>
                 <div className="w-6 h-6 rounded-full bg-gradient-to-br from-pr to-sec" />
               </div>
            </header>
            
            <div className="space-y-6 flex-1">
               <div className="flex gap-2 mb-2">
                 <div className="badge badge-primary text-[0.5rem] tracking-widest font-black italic uppercase">Level: Advanced</div>
                 <div className="badge border-border-subtle text-[0.5rem] font-bold text-tx-dim">74% Success Rate</div>
               </div>
               
               <h4 className="text-[1.1rem] font-black leading-[1.3] tracking-tight text-tx-main lowercase">
                 {formData.question || 'Initialize your content in the editor to see real-time rendering...'}
               </h4>

               <div className="space-y-3">
                 {[
                   { id: 'A', text: formData.options?.[0] },
                   { id: 'B', text: formData.options?.[1] },
                   { id: 'C', text: formData.options?.[2] },
                   { id: 'D', text: formData.options?.[3] }
                 ].map((opt, i) => (
                   <motion.div 
                     initial={{ x: -10, opacity: 0 }}
                     animate={{ x: 0, opacity: 1 }}
                     transition={{ delay: i * 0.05 }}
                     key={opt.id} 
                     className={`p-4 bg-white/80 dark:bg-slate-800 border rounded-2xl text-[0.75rem] font-bold group/opt hover:border-pr/50 transition-all flex items-center gap-3 ${opt.text === formData.answer && formData.answer ? 'border-emerald-500/50 ring-1 ring-emerald-500/20' : 'border-border-subtle'}`}
                   >
                     <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-[0.6rem] font-black ${opt.text === formData.answer && formData.answer ? 'bg-emerald-500 text-white' : 'bg-surface-subtle text-tx-muted group-hover/opt:text-pr'}`}>{opt.id}</span>
                     <span className="opacity-80">{opt.text || '...'}</span>
                   </motion.div>
                 ))}
               </div>
            </div>

            <div className="pt-6 border-t border-dashed border-border-subtle mt-auto space-y-3">
              <div className="flex justify-between items-center px-1">
                <span className="text-[0.6rem] font-black uppercase opacity-40">System Diagnostics</span>
                <span className="text-[0.6rem] font-black text-pr">Ready to Publish</span>
              </div>
              <button className="btn-primary w-full h-[48px] text-[0.75rem] rounded-2xl flex items-center justify-center gap-2 group-hover:scale-[1.02] transition-transform shadow-lg shadow-pr/20">
                Unlock Solution →
              </button>
            </div>

            {/* Notch if phone */}
            {previewDevice === 'phone' && (
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[90px] h-7 bg-slate-900 rounded-b-3xl z-20 flex items-center justify-center">
                <div className="w-10 h-1 rounded-full bg-slate-800" />
              </div>
            )}
          </div>
        </motion.div>
        
        <div className="glass-panel nh p-6 border-l-4 border-l-sec">
          <div className="flex gap-3 items-center mb-3">
             <div className="w-8 h-8 rounded-xl bg-sec/10 flex items-center justify-center text-sec">
              <BookOpen size={16} />
             </div>
             <span className="label-sm block uppercase italic font-black">Editor Insights</span>
          </div>
          <p className="text-[0.72rem] text-tx-muted leading-relaxed font-bold uppercase tracking-wider opacity-60">
            Current module uses <strong className="text-sec">Neural Rendering</strong>. Content is automatically indexed for the 2026 JEE Predictor engine.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminContentManager;
