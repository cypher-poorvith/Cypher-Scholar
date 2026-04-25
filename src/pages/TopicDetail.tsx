import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Video, 
  FileText, 
  ClipboardList, 
  HelpCircle,
  Play,
  RotateCcw,
  CheckCircle2,
  ChevronRight,
  Maximize2,
  Download,
  Share2,
  Bookmark
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

const TopicDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'video' | 'notes' | 'practice'>('video');

  const content = {
    title: "Motion in a Straight Line",
    chapter: "Kinematics",
    subject: "Physics",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Placeholder
    duration: "45 mins",
    views: "12.4k",
    difficulty: "Base Level"
  };

  return (
    <div className="space-y-12 pb-20 animate-in fade-in duration-700">
      {/* Navigation Breadcrumb */}
      <header className="space-y-6">
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center gap-2 text-slate-400 hover:text-primary transition-colors text-xs font-bold uppercase tracking-widest"
        >
          <ArrowLeft size={16} />
          Back to Chapter
        </button>
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
           <div>
              <div className="flex items-center gap-3 mb-2">
                 <span className="px-2 py-0.5 bg-primary/5 text-primary rounded text-[9px] font-bold uppercase tracking-widest border border-primary/20">{content.subject}</span>
                 <span className="text-slate-200 font-black text-xs">/</span>
                 <span className="text-slate-400 font-bold text-[10px] uppercase tracking-widest">{content.chapter}</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-display font-black text-slate-900 tracking-tight leading-none uppercase">{content.title}</h1>
           </div>
           
           <div className="flex gap-4">
              <button className="w-12 h-12 bg-white border border-slate-100 rounded-xl flex items-center justify-center text-slate-400 hover:text-primary transition-all shadow-sm"><Bookmark size={18} /></button>
              <button className="w-12 h-12 bg-white border border-slate-100 rounded-xl flex items-center justify-center text-slate-400 hover:text-primary transition-all shadow-sm"><Share2 size={18} /></button>
           </div>
        </div>
      </header>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
         {/* Player/Viewer Area */}
         <div className="xl:col-span-3 space-y-8">
            {/* View Selection Tabs */}
            <div className="vibrant-card p-2 flex flex-wrap gap-2 w-fit bg-white border border-slate-100 shadow-sm">
               {[
                 { id: 'video', label: 'Watch Lesson', icon: <Video size={16} /> },
                 { id: 'notes', label: 'Study Notes', icon: <FileText size={16} /> },
                 { id: 'practice', label: 'Practice Set', icon: <ClipboardList size={16} /> },
               ].map((tab) => (
                  <button 
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={cn(
                      "flex items-center gap-3 px-8 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all",
                      activeTab === tab.id 
                        ? "bg-primary text-white shadow-lg shadow-primary/20" 
                        : "text-slate-400 hover:text-slate-900 hover:bg-slate-50"
                    )}
                  >
                     {tab.icon}
                     {tab.label}
                  </button>
               ))}
            </div>

            <div className="vibrant-card aspect-video overflow-hidden border-slate-100 relative bg-slate-900 transition-all shadow-sm">
               <AnimatePresence mode="wait">
                  {activeTab === 'video' ? (
                    <motion.div 
                      key="video"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0"
                    >
                       <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1614741487278-759d2af746fe?q=80&w=2574&auto=format&fit=crop')] bg-cover bg-center opacity-40 blur-sm"></div>
                       <div className="absolute inset-0 flex items-center justify-center z-10">
                          <button className="w-24 h-24 rounded-[40px] bg-primary text-white flex items-center justify-center shadow-2xl shadow-primary/50 hover:scale-110 active:scale-95 transition-all">
                             <Play size={40} className="fill-current ml-2" />
                          </button>
                       </div>
                       <div className="absolute bottom-10 left-10 right-10 flex justify-between items-center z-10">
                          <div className="bg-white/90 backdrop-blur-md px-6 py-3 rounded-2xl border border-slate-100 shadow-xl">
                             <p className="text-[10px] font-bold text-primary uppercase tracking-widest">Video Lesson</p>
                             <p className="text-lg font-bold text-slate-900 uppercase tracking-tight">1. Introduction to Kinematics</p>
                          </div>
                          <button className="w-12 h-12 bg-white/90 backdrop-blur-md rounded-xl flex items-center justify-center text-slate-900 border border-slate-100 shadow-xl"><Maximize2 size={20} /></button>
                       </div>
                    </motion.div>
                  ) : activeTab === 'notes' ? (
                     <motion.div 
                        key="notes"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className="p-20 text-center space-y-8 flex flex-col items-center justify-center h-full bg-white"
                     >
                        <div className="w-24 h-24 rounded-[40px] bg-slate-50 flex items-center justify-center text-slate-300">
                           <FileText size={48} />
                        </div>
                        <div className="space-y-2">
                           <h3 className="text-2xl font-black text-slate-900 uppercase">Interactive PDF Notes</h3>
                           <p className="text-slate-500 font-medium max-w-sm">Detailed topic breakdown with solved examples, formula keys and quick summaries.</p>
                        </div>
                        <button className="btn-primary h-14 px-10 text-xs flex items-center gap-4">
                           <Download size={18} />
                           Download Materials
                        </button>
                     </motion.div>
                  ) : (
                    <motion.div 
                      key="practice"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      className="p-12 space-y-12 bg-white h-full"
                    >
                       <div className="flex justify-between items-center border-b border-slate-50 pb-6">
                          <div className="space-y-1">
                             <h3 className="text-2xl font-black text-slate-900 uppercase">Topic Practice Set</h3>
                             <p className="text-[10px] font-bold text-primary uppercase tracking-widest">15 Questions • Estimated Time: 30m</p>
                          </div>
                          <button className="btn-primary h-12 px-8 text-[10px] flex items-center gap-3">
                             <Play size={14} className="fill-current" />
                             Start Session
                          </button>
                       </div>

                       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {[
                            { label: "Target Skills", val: "Velocity, Speed, Displacement" },
                            { label: "Last Attempt", val: "Never" },
                            { label: "Difficulty", val: "Level 1 (Fundamental)" },
                            { label: "Completion Marks", val: "60 Points" },
                          ].map((info, idx) => (
                             <div key={idx} className="bg-slate-50 p-4 rounded-xl border border-slate-100 shadow-sm">
                                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">{info.label}</p>
                                <p className="text-sm font-bold text-slate-900 uppercase">{info.val}</p>
                             </div>
                          ))}
                       </div>
                    </motion.div>
                  )}
               </AnimatePresence>
            </div>

            {/* Topic Navigation */}
            <div className="flex justify-between items-center pt-8 border-t border-slate-100">
               <button className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-3 hover:text-slate-900 transition-colors">
                  <ChevronRight size={16} className="rotate-180" />
                  Previous Topic
               </button>
               <button className="text-[10px] font-bold text-primary uppercase tracking-widest flex items-center gap-3 hover:text-secondary transition-colors">
                  Next Topic: Relative Motion
                  <ChevronRight size={16} />
               </button>
            </div>
         </div>

         {/* Sidebar: Index & Progress */}
         <aside className="space-y-8">
            <div className="vibrant-card p-8 space-y-8 bg-white shadow-sm">
               <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] border-b border-slate-50 pb-4">Topic Index</h3>
               <div className="space-y-2">
                  {[
                    { id: 1, title: "Introduction", done: true },
                    { id: 2, title: "Frame of Reference", done: true },
                    { id: 3, title: "Velocity vs Speed", active: true },
                    { id: 4, title: "Average Acceleration", done: false },
                    { id: 5, title: "Equations of Motion", done: false },
                  ].map((item) => (
                     <div 
                        key={item.id} 
                        className={cn(
                          "p-4 rounded-xl flex items-center justify-between group cursor-pointer transition-all border",
                          item.active 
                            ? "bg-primary/5 border-primary text-primary" 
                            : "bg-slate-50 border-transparent text-slate-500 hover:text-slate-900"
                        )}
                     >
                        <div className="flex items-center gap-4">
                           <div className={cn(
                             "w-6 h-6 rounded-lg text-[10px] font-black flex items-center justify-center transition-all",
                             item.active ? "bg-primary text-white" : "bg-white text-slate-400 border border-slate-100 shadow-sm"
                           )}>
                              {item.id}
                           </div>
                           <span className="text-[11px] font-bold uppercase tracking-tight">{item.title}</span>
                        </div>
                        {item.done && <CheckCircle2 size={14} className="text-emerald-500" />}
                     </div>
                  ))}
               </div>
            </div>

            <div className="vibrant-card p-8 space-y-6 bg-white shadow-sm border-t-4 border-t-amber-400">
               <div className="flex items-center gap-4 text-slate-900">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center shadow-sm">
                     <HelpCircle size={20} />
                  </div>
                  <p className="text-sm font-black uppercase tracking-tight">Need Help?</p>
               </div>
               <p className="text-xs text-slate-500 leading-relaxed font-medium">Stuck on a concept? Connect with our AI Tutor or jump into the community discussion for instant help.</p>
               <button className="btn-secondary w-full h-12 text-[10px] flex items-center justify-center gap-3">
                  Ask AI Tutor <Play size={12} className="fill-current" />
               </button>
            </div>
         </aside>
      </div>
    </div>
  );
};

export default TopicDetail;
