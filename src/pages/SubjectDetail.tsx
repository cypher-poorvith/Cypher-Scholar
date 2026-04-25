import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  PlayCircle, 
  CheckCircle2, 
  FileText, 
  Video, 
  ClipboardList, 
  Search,
  BookOpen,
  ChevronDown,
  Lock,
  Download,
  HelpCircle,
  Clock
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../context/AuthContext';
import { cn } from '../lib/utils';

const SubjectDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [expandedChapter, setExpandedChapter] = useState<number | null>(0);

  const chapters = [
    {
      id: 1,
      title: "Kinematics",
      topicsCount: 8,
      questionsCount: 45,
      progress: 75,
      topics: [
        { id: "motion-straight", title: "Motion in a Straight Line", type: "Theory • Video", qs: 12, status: "complete" },
        { id: "relative-motion", title: "Relative Motion", type: "Theory • Video", qs: 8, status: "in-progress" },
        { id: "projectiles", title: "Projectile Motion", type: "Theory • Video", qs: 15, status: "not-started" },
      ]
    },
    {
       id: 2,
       title: "Laws of Motion",
       topicsCount: 10,
       questionsCount: 52,
       progress: 20,
       topics: [
         { id: "newtons-laws", title: "Newton's Laws", type: "Theory", qs: 20, status: "not-started" },
         { id: "friction", title: "Friction", type: "Theory • Video", qs: 12, status: "not-started" },
       ]
    }
  ];

  return (
    <div className="space-y-12 pb-20 animate-in fade-in duration-700">
      {/* Header */}
      <header className="space-y-8">
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center gap-2 text-slate-400 hover:text-primary transition-colors text-xs font-bold uppercase tracking-widest"
        >
          <ArrowLeft size={16} />
          Back to Subjects
        </button>

        <div className="flex flex-col md:flex-row items-center gap-8">
           <div className="w-24 h-24 rounded-[2rem] bg-primary/10 border border-primary/20 flex items-center justify-center text-5xl shadow-sm">
              ⚛️
           </div>
           <div className="text-center md:text-left">
              <h1 className="text-4xl md:text-6xl font-display font-black text-slate-900 leading-none uppercase tracking-tight">Physics</h1>
              <p className="text-lg text-slate-500 font-medium tracking-wide mt-2">Explore the laws of nature and the universe</p>
           </div>
        </div>

        {user && (
          <div className="vibrant-card p-8 flex flex-col md:flex-row items-center justify-between gap-8 border-primary/10 bg-white">
             <div className="flex-1 space-y-4 w-full">
                <div className="flex justify-between items-end">
                   <div>
                      <p className="text-[10px] font-bold text-primary uppercase tracking-widest mb-1">Your Mastery Level</p>
                      <h3 className="text-2xl font-black text-slate-900 uppercase">45% Complete</h3>
                   </div>
                   <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">15 / 33 Chapters finished</p>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                   <div className="h-full bg-primary rounded-full shadow-[0_0_15px_rgba(99,102,241,0.2)] transition-all duration-1000" style={{ width: '45%' }} />
                </div>
             </div>
             <div className="flex gap-4">
                <button className="btn-secondary h-12 px-6 text-[10px]">Resume Learning</button>
                <button className="btn-primary h-12 px-6 text-[10px]">Daily Goal: 2h</button>
             </div>
          </div>
        )}
      </header>

      {/* Resource Tabs */}
      <div className="overflow-x-auto no-scrollbar pb-2">
        <div className="flex gap-4 border-b border-slate-100">
          {['All Resources', 'Theory', 'Videos', 'Practice', 'Mock Tests', 'PYQs'].map((tab, i) => (
            <button 
              key={i}
              className={`px-8 py-4 text-xs font-bold uppercase tracking-widest transition-all whitespace-nowrap
                ${i === 0 ? 'bg-primary/5 text-primary border-b-4 border-primary' : 'text-slate-400 hover:text-slate-900'}
              `}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Chapters Accordion */}
      <div className="space-y-6">
        {chapters.map((chapter, idx) => (
          <div key={chapter.id} className="vibrant-card overflow-hidden bg-white border-slate-100 hover:border-primary/20 transition-all shadow-sm">
            <button 
              onClick={() => setExpandedChapter(expandedChapter === idx ? null : idx)}
              className="w-full p-8 flex flex-col md:flex-row items-center justify-between gap-6 hover:bg-slate-50 transition-colors group"
            >
               <div className="flex items-center gap-6">
                  <div className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center font-black text-lg transition-all",
                    chapter.progress > 50 ? "bg-primary text-white shadow-lg shadow-primary/20" : "bg-slate-100 text-slate-400"
                  )}>
                    {idx + 1}
                  </div>
                  <div className="text-left">
                     <h3 className="text-xl font-bold text-slate-900 tracking-tight group-hover:text-primary transition-colors">{chapter.title}</h3>
                     <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{chapter.topicsCount} Topics • {chapter.questionsCount} Questions</p>
                  </div>
               </div>

               <div className="flex items-center gap-8 w-full md:w-auto">
                  {user && (
                    <div className="hidden lg:flex items-center gap-4 border-x border-slate-50 px-8">
                       <div className="w-32 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${chapter.progress}%` }} />
                       </div>
                       <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">{chapter.progress}%</span>
                    </div>
                  )}
                  <div className={cn(
                    "w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 transition-transform duration-500 shadow-sm",
                    expandedChapter === idx && "rotate-180 bg-primary/10 text-primary"
                  )}>
                    <ChevronDown size={20} />
                  </div>
               </div>
            </button>

            <AnimatePresence>
              {expandedChapter === idx && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="border-t border-slate-50 bg-slate-50/30"
                >
                  <div className="p-8 space-y-10">
                    <div className="space-y-4">
                       <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2">Active Topics</h4>
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {chapter.topics.map((topic, tIdx) => (
                            <Link to={`/topic/${topic.id}`} key={tIdx}>
                              <div className="p-6 bg-white border border-slate-100 rounded-2xl flex items-center justify-between hover:bg-slate-50 hover:border-primary/20 hover:scale-[1.02] transition-all group/topic cursor-pointer shadow-sm">
                                 <div className="flex items-center gap-4">
                                    <div className={cn(
                                      "w-10 h-10 rounded-xl flex items-center justify-center transition-all",
                                      topic.status === 'complete' ? "bg-emerald-50 text-emerald-600" : "bg-slate-50 text-slate-400"
                                    )}>
                                       {topic.status === 'complete' ? <CheckCircle2 size={20} /> : <PlayCircle size={20} />}
                                    </div>
                                    <div>
                                       <p className="text-sm font-bold text-slate-900 group-hover/topic:text-primary transition-colors">{topic.title}</p>
                                       <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">{topic.type} • {topic.qs} Qs</p>
                                    </div>
                                 </div>
                                 {topic.status === 'complete' && (
                                   <span className="text-[8px] font-black text-emerald-600 uppercase tracking-[0.2em] bg-emerald-50 px-2 py-1 rounded-full">DONE</span>
                                 )}
                              </div>
                            </Link>
                          ))}
                       </div>
                    </div>

                    <div className="space-y-4 pt-6 border-t border-slate-100">
                       <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2">Chapter Toolset</h4>
                       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {[
                            { label: "Full Notes", icon: <FileText size={18} />, color: "text-indigo-600", bg: "bg-indigo-50" },
                            { label: "Quick Quiz", icon: <HelpCircle size={18} />, color: "text-cyan-600", bg: "bg-cyan-50" },
                            { label: "Question Bank", icon: <ClipboardList size={18} />, color: "text-purple-600", bg: "bg-purple-50" },
                            { label: "DPP Set", icon: <Download size={18} />, color: "text-orange-600", bg: "bg-orange-50" },
                          ].map((tool, tIndex) => (
                            <button key={tIndex} className="p-4 bg-white border border-slate-100 rounded-2xl flex flex-col items-center gap-3 hover:bg-slate-50 hover:border-primary/20 transition-all group/tool shadow-sm">
                               <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center group-hover/tool:scale-110 transition-transform shadow-sm", tool.bg, tool.color)}>
                                  {tool.icon}
                               </div>
                               <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest group-hover/tool:text-primary transition-colors">{tool.label}</span>
                            </button>
                          ))}
                       </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubjectDetail;
