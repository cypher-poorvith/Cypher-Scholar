import React, { useState } from 'react';
import { Save, Eye, Code, List, Plus, Trash2, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';
import { examService, Question } from '../../services/examService';
import { useToast } from '../../context/ToastContext';

interface QuestionEditorProps {
  subjectId: string;
  chapterId: string;
  topicId: string;
  onSave?: () => void;
}

const QuestionEditor: React.FC<QuestionEditorProps> = ({ subjectId, chapterId, topicId, onSave }) => {
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState<Omit<Question, 'id'>>({
    text: '',
    type: 'mcq',
    difficulty: 'medium',
    subjectId,
    chapterId,
    topicId,
    options: ['', '', '', ''],
    correctAnswer: '0',
    solution: '',
    tags: [],
    isPYQ: false
  });

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...formData.options];
    newOptions[index] = value;
    setFormData({ ...formData, options: newOptions });
  };

  const handleSave = async () => {
    if (!formData.text) {
      showToast("Question text is required", "warning");
      return;
    }
    setLoading(true);
    try {
      await examService.addQuestion(formData);
      showToast("Question saved successfully", "success");
      setFormData({
        ...formData,
        text: '',
        options: ['', '', '', ''],
        correctAnswer: '0',
        solution: ''
      });
      if (onSave) onSave();
    } catch (e: any) {
      showToast(e.message || "Error saving question", "danger");
    } finally {
      setLoading(false);
    }
  };

  const renderLaTeX = (text: string) => {
    // Basic LaTeX parsing: replace $...$ with InlineMath and $$...$$ with BlockMath
    // For simplicity in this UI, we just check if it contains $
    if (!text.includes('$')) return <span>{text}</span>;
    
    const parts = text.split(/(\$\$[\s\S]*?\$\$|\$[\s\S]*?\$)/g);
    return parts.map((part, i) => {
      if (part.startsWith('$$')) {
        return <BlockMath key={i} math={part.slice(2, -2)} />;
      } else if (part.startsWith('$')) {
        return <InlineMath key={i} math={part.slice(1, -1)} />;
      }
      return <span key={i}>{part}</span>;
    });
  };

  return (
    <div className="glass-panel border-white/5 overflow-hidden flex flex-col h-full bg-[#070512]">
      {/* Header */}
      <div className="p-4 border-b border-white/5 flex items-center justify-between bg-white/5">
        <div className="flex gap-1 bg-[#070512] p-1 rounded-xl border border-white/5">
          <button 
            onClick={() => setActiveTab('edit')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'edit' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:text-white'}`}
          >
            <Code size={14} /> Edit
          </button>
          <button 
            onClick={() => setActiveTab('preview')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'preview' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:text-white'}`}
          >
            <Eye size={14} /> Preview
          </button>
        </div>
        <button 
          onClick={handleSave} 
          disabled={loading}
          className="flex items-center gap-2 px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-black uppercase tracking-widest transition-all disabled:opacity-50"
        >
          <Save size={14} /> {loading ? 'Saving...' : 'Save Question'}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-8">
        <AnimatePresence mode="wait">
          {activeTab === 'edit' ? (
            <motion.div 
              key="edit"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-6"
            >
              {/* Question Text */}
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                  Question Text <span className="text-indigo-400 capitalize bg-indigo-400/10 px-2 py-0.5 rounded-full">(Supports LaTeX with $...$)</span>
                </label>
                <textarea 
                  value={formData.text}
                  onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                  placeholder="Enter question text here... Use $x = \frac{-b \pm \sqrt{b^2-4ac}}{2a}$ for math"
                  className="w-full h-40 bg-white/5 border border-white/10 rounded-2xl p-6 text-white font-bold focus:outline-none focus:border-indigo-500 transition-all font-mono text-sm"
                />
              </div>

              {/* Type & Difficulty */}
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Type</label>
                  <select 
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                    className="w-full h-12 bg-white/5 border border-white/10 rounded-xl px-4 text-white font-bold focus:outline-none focus:border-indigo-500 appearance-none"
                  >
                    <option value="mcq">Multiple Choice (MCQ)</option>
                    <option value="integer">Integer Type</option>
                  </select>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Difficulty</label>
                  <div className="flex gap-2">
                    {['easy', 'medium', 'hard'].map((level) => (
                      <button
                        key={level}
                        onClick={() => setFormData({ ...formData, difficulty: level as any })}
                        className={`flex-1 h-12 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border ${formData.difficulty === level ? 'bg-white text-[#070512] border-white' : 'bg-white/5 text-slate-500 border-white/10 hover:bg-white/10'}`}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Options */}
              {formData.type === 'mcq' && (
                <div className="space-y-4">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Options</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {formData.options.map((opt, i) => (
                      <div key={i} className="relative group">
                        <div className={`absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-black border transition-all ${formData.correctAnswer === String(i) ? 'bg-emerald-500 border-emerald-500 text-white' : 'bg-white/5 border-white/10 text-slate-500'}`}>
                          {String.fromCharCode(65 + i)}
                        </div>
                        <input 
                          type="text"
                          value={opt}
                          onChange={(e) => handleOptionChange(i, e.target.value)}
                          placeholder={`Option ${String.fromCharCode(65 + i)}`}
                          className={`w-full h-14 bg-white/5 border rounded-2xl pl-14 pr-12 text-white font-bold focus:outline-none transition-all ${formData.correctAnswer === String(i) ? 'border-emerald-500/50 bg-emerald-500/5' : 'border-white/10 focus:border-indigo-500'}`}
                        />
                        <button 
                          onClick={() => setFormData({ ...formData, correctAnswer: String(i) })}
                          className={`absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center transition-all ${formData.correctAnswer === String(i) ? 'text-emerald-500' : 'text-slate-600 hover:text-white'}`}
                        >
                          <CheckCircle2 size={20} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Solution */}
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Step-by-step Solution</label>
                <textarea 
                  value={formData.solution}
                  onChange={(e) => setFormData({ ...formData, solution: e.target.value })}
                  placeholder="Explain the logic here..."
                  className="w-full h-32 bg-white/5 border border-white/10 rounded-2xl p-6 text-white font-bold focus:outline-none focus:border-indigo-500 transition-all text-sm"
                />
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="preview"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-10"
            >
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <span className="px-2 py-1 bg-indigo-500/20 text-indigo-400 rounded text-[10px] font-black uppercase tracking-widest">Question Preview</span>
                  <span className={`px-2 py-1 bg-white/5 rounded text-[10px] font-black uppercase tracking-widest ${formData.difficulty === 'easy' ? 'text-emerald-400' : formData.difficulty === 'hard' ? 'text-red-400' : 'text-amber-400'}`}>
                    {formData.difficulty}
                  </span>
                </div>
                <div className="text-xl text-white font-bold leading-relaxed markdown-preview">
                  {renderLaTeX(formData.text)}
                </div>
              </div>

              {formData.type === 'mcq' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {formData.options.map((opt, i) => (
                    <div 
                      key={i} 
                      className={`p-6 rounded-2xl border flex items-center gap-4 transition-all ${formData.correctAnswer === String(i) ? 'bg-emerald-500/10 border-emerald-500/50 text-white' : 'bg-white/5 border-white/5 text-slate-400'}`}
                    >
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black border ${formData.correctAnswer === String(i) ? 'bg-emerald-500 border-emerald-500 text-white' : 'bg-white/5 border-white/10 text-slate-500'}`}>
                        {String.fromCharCode(65 + i)}
                      </div>
                      <div className="font-bold flex-1">
                        {renderLaTeX(opt)}
                      </div>
                      {formData.correctAnswer === String(i) && (
                        <CheckCircle2 size={18} className="text-emerald-500" />
                      )}
                    </div>
                  ))}
                </div>
              )}

              {formData.solution && (
                <div className="p-8 bg-indigo-500/5 border border-indigo-500/20 rounded-3xl space-y-4">
                  <h4 className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Detailed Solution</h4>
                  <div className="text-slate-300 text-sm leading-relaxed">
                    {renderLaTeX(formData.solution)}
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default QuestionEditor;
