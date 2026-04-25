import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Plus, 
  Layers, 
  Database, 
  Search, 
  FileText, 
  Video, 
  HelpCircle, 
  ClipboardList,
  History,
  TrendingUp,
  Download,
  Eye,
  ChevronRight,
  Settings
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import ExamManager from '../../components/editor/ExamManager';
import QuestionEditor from '../../components/editor/QuestionEditor';

const ContentManagement: React.FC = () => {
  const { profile } = useAuth();
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState<'hierarchy' | 'questions' | 'overview'>('overview');
  const [selectedTopic, setSelectedTopic] = useState<{sid: string, cid: string, tid: string} | null>(null);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'hierarchy':
        return (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-black text-white uppercase tracking-tight">Syllabus Structure</h2>
                <p className="text-sm text-slate-500 mt-1">Manage the Exam → Subject → Chapter → Topic tree.</p>
              </div>
              <div className="flex gap-3">
                 <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white transition-all">
                    Bulk Import
                 </button>
                 <button className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-indigo-600/20">
                    Add Exam
                 </button>
              </div>
            </div>
            <ExamManager />
          </motion.div>
        );
      case 'questions':
        return (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[700px]"
          >
            {/* Context Sidebar */}
            <div className="lg:col-span-1 glass-panel border-white/5 p-6 flex flex-col space-y-6 bg-white/[0.02]">
               <div className="space-y-4">
                  <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Question Bank Stats</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5">
                        <span className="text-xs text-slate-400">Total Questions</span>
                        <span className="text-sm font-black text-white">1,245</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5">
                        <span className="text-xs text-slate-400">PYQs Included</span>
                        <span className="text-sm font-black text-emerald-400">320</span>
                    </div>
                  </div>
               </div>

               <div className="space-y-4">
                  <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Active Context</h3>
                  <div className="p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl">
                     <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-2">Target Chapter</p>
                     <p className="text-sm font-bold text-white">Laws of Motion</p>
                     <p className="text-[10px] text-slate-500 mt-1 uppercase font-black tracking-widest">Physics • JEE Advanced</p>
                  </div>
                  <button 
                    onClick={() => setActiveTab('hierarchy')}
                    className="w-full h-10 border border-dashed border-white/10 rounded-xl text-[10px] font-black text-slate-500 uppercase tracking-widest hover:text-white hover:border-white/20 transition-all"
                  >
                    Change Selection
                  </button>
               </div>
            </div>

            {/* Editor Hub */}
            <div className="lg:col-span-3">
              <QuestionEditor 
                subjectId="physics" 
                chapterId="mechanics" 
                topicId="newtons-laws" 
              />
            </div>
          </motion.div>
        );
      case 'overview':
      default:
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Stats Overview */}
            <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { label: "Questions Added", value: "450", icon: <Database size={16} />, color: "text-indigo-400", bg: "bg-indigo-400/20" },
                { label: "Mock tests", value: "12", icon: <ClipboardList size={16} />, color: "text-amber-400", bg: "bg-amber-400/20" },
                { label: "Verified Today", value: "23", icon: <Eye size={16} />, color: "text-emerald-400", bg: "bg-emerald-400/20" },
                { label: "Content Score", value: "9.2", icon: <TrendingUp size={16} />, color: "text-cyan-400", bg: "bg-cyan-400/20" },
              ].map((stat, i) => (
                <div key={i} className="glass-panel rounded-2xl p-6 border-white/5 relative overflow-hidden group">
                  <div className="flex items-center justify-between mb-4 relative z-10">
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{stat.label}</span>
                    <div className={`w-8 h-8 rounded-full ${stat.bg} flex items-center justify-center ${stat.color} border border-white/5`}>
                      {stat.icon}
                    </div>
                  </div>
                  <div className="text-4xl font-black text-white relative z-10 italic">{stat.value}</div>
                  <div className={`absolute -bottom-4 -right-4 w-16 h-16 ${stat.bg.replace('/20', '/5')} rounded-full transition-all group-hover:scale-150`}></div>
                </div>
              ))}
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
               <div className="lg:col-span-2 space-y-6">
                  <section className="glass-panel p-8 border-white/5">
                    <h3 className="text-lg font-black text-white uppercase tracking-widest mb-6">Recent Content Operations</h3>
                    <div className="space-y-4">
                      {[
                        { title: 'Thermodynamics Quiz #2', action: 'Question set modified', time: '10m ago', type: 'test' },
                        { title: 'Organic Chemistry PDF', action: 'New version uploaded', time: '2h ago', type: 'material' },
                        { title: 'Mock Test Series #5', action: 'Published for students', time: '5h ago', type: 'test' },
                      ].map((item, i) => (
                        <div key={i} className="flex items-center justify-between p-4 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 transition-all cursor-pointer">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-[#070512] flex items-center justify-center text-indigo-400">
                              {item.type === 'test' ? <ClipboardList size={18} /> : <FileText size={18} />}
                            </div>
                            <div>
                               <p className="text-sm font-bold text-white">{item.title}</p>
                               <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-1">{item.action} • {item.time}</p>
                            </div>
                          </div>
                          <ChevronRight size={16} className="text-slate-600" />
                        </div>
                      ))}
                    </div>
                  </section>
               </div>
               
               <div className="lg:col-span-1 space-y-6">
                  <section className="glass-panel p-8 border-white/5 bg-indigo-600/5 h-full">
                    <h3 className="text-lg font-black text-white uppercase tracking-widest mb-6">System Health</h3>
                    <div className="space-y-6">
                       <div className="space-y-2">
                          <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest">
                            <span>Question Coverage</span>
                            <span className="text-emerald-400">82%</span>
                          </div>
                          <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                            <div className="h-full w-[82%] bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                          </div>
                       </div>
                       <div className="space-y-2">
                          <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest">
                            <span>Syllabus Verified</span>
                            <span className="text-amber-400">65%</span>
                          </div>
                          <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                            <div className="h-full w-[65%] bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]"></div>
                          </div>
                       </div>
                       <div className="pt-6 mt-6 border-t border-white/5">
                          <p className="text-[10px] text-slate-500 font-bold leading-relaxed">
                            Infrastructure: Firebase Cloud (Asia-South)
                            <br />
                            Last sync: Just now
                          </p>
                       </div>
                    </div>
                  </section>
               </div>
            </div>
          </div>
        );
    }
  };

  return (
    <main className="flex-1 w-full max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-white uppercase tracking-tight mb-2">Content Hub</h1>
          <p className="text-sm font-medium text-slate-500 uppercase tracking-widest italic">{profile?.role} Clearance Active</p>
        </div>
        
        <div className="flex items-center gap-2 p-1.5 bg-white/5 border border-white/5 rounded-2xl">
          <button 
            onClick={() => setActiveTab('overview')}
            className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'overview' ? 'bg-[#070512] text-white shadow-xl' : 'text-slate-500 hover:text-white'}`}
          >
            Overview
          </button>
          <button 
            onClick={() => setActiveTab('hierarchy')}
            className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'hierarchy' ? 'bg-[#070512] text-white shadow-xl' : 'text-slate-500 hover:text-white'}`}
          >
            Exam Tree
          </button>
          <button 
            onClick={() => setActiveTab('questions')}
            className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'questions' ? 'bg-[#070512] text-white shadow-xl' : 'text-slate-500 hover:text-white'}`}
          >
            Question Bank
          </button>
        </div>
      </header>

      <div className="min-h-[600px]">
        <AnimatePresence mode="wait">
          {renderTabContent()}
        </AnimatePresence>
      </div>
    </main>
  );
};

export default ContentManagement;

