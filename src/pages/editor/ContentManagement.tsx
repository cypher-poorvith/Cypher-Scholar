import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Layers, FileText, Database, Plus, ChevronRight, Search } from 'lucide-react';
import ExamManager from '../../components/editor/ExamManager';
import QuestionEditor from '../../components/editor/QuestionEditor';

const ContentManagement: React.FC = () => {
  const [activeView, setActiveView] = useState<'hierarchy' | 'questions'>('hierarchy');
  const [selectedTopic, setSelectedTopic] = useState<{sid: string, cid: string, tid: string} | null>(null);

  return (
    <div className="h-[calc(100vh-180px)] flex flex-col space-y-6">
      {/* Tab Navigation */}
      <div className="flex items-center gap-6 border-b border-white/5 pb-4">
        <button 
          onClick={() => setActiveView('hierarchy')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeView === 'hierarchy' ? 'bg-indigo-600 text-white' : 'text-slate-500 hover:text-white'}`}
        >
          <Layers size={16} /> Exam Tree & Hierarchy
        </button>
        <button 
          onClick={() => setActiveView('questions')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeView === 'questions' ? 'bg-indigo-600 text-white' : 'text-slate-500 hover:text-white'}`}
        >
          <Database size={16} /> Question Bank
        </button>
      </div>

      <div className="flex-1 min-h-0">
        <AnimatePresence mode="wait">
          {activeView === 'hierarchy' ? (
            <motion.div 
              key="hierarchy"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="h-full"
            >
              <ExamManager />
              
              <div className="mt-8 glass-panel p-8 border-white/5 bg-indigo-600/5">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-black text-white uppercase tracking-tight">Bulk Operations</h3>
                    <p className="text-sm text-slate-400 mt-1">Export schemas or import bulk chapter data via CSV.</p>
                  </div>
                  <div className="flex gap-4">
                    <button className="px-6 py-2.5 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white hover:border-white/20 transition-all">
                      Export CSV Template
                    </button>
                    <button className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-indigo-600/20 hover:scale-[1.02] transition-all">
                      Bulk Import
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="questions"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="h-full grid grid-cols-1 lg:grid-cols-3 gap-6"
            >
              {/* Filter Sidebar */}
              <div className="lg:col-span-1 glass-panel border-white/5 p-6 flex flex-col space-y-6">
                 <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-xs" />
                    <input 
                      type="text" 
                      placeholder="Search questions..."
                      className="w-full h-12 bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 text-xs font-bold text-white focus:outline-none focus:border-indigo-500"
                    />
                 </div>

                 <div className="space-y-4">
                    <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Filter by selection</h4>
                    <p className="text-xs text-slate-400">Select a Topic from the Hierarchy view first to add questions directly.</p>
                    <button 
                      onClick={() => setActiveView('hierarchy')}
                      className="w-full py-4 bg-white/5 border border-dashed border-white/10 rounded-2xl text-[10px] font-black text-slate-500 uppercase tracking-widest hover:text-white hover:border-white/20 transition-all flex flex-col items-center gap-2"
                    >
                      <Layers size={18} />
                      Choose Target Location
                    </button>
                 </div>
              </div>

              {/* Editor Shell */}
              <div className="lg:col-span-2">
                <QuestionEditor 
                  subjectId="physics" 
                  chapterId="mechanics" 
                  topicId="newtons-laws" 
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ContentManagement;
