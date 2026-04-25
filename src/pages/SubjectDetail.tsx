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
          className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors text-xs font-black uppercase tracking-widest"
        >
          <ArrowLeft size={16} />
          Back to Subjects
        </button>

        <div className="flex flex-col md:flex-row items-center gap-8">
           <div className="w-24 h-24 rounded-[2rem] bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-5xl shadow-2xl shadow-indigo-600/10">
              ⚛️
           </div>
           <div className="text-center md:text-left">
              <h1 className="text-4xl md:text-6xl font-display font-black text-white uppercase tracking-tighter italic">Physics</h1>
              <p className="text-lg text-slate-500 font-medium uppercase tracking-[0.2em] mt-2">Explore the laws of nature and the universe</p>
           </div>
        </div>

        {user && (
          <div className="glass-panel p-8 flex flex-col md:flex-row items-center justify-between gap-8 border-indigo-500/20 bg-indigo-500/5">
             <div className="flex-1 space-y-4 w-full">
                <div className="flex justify-between items-end">
                   <div>
                      <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-1">Your Mastery Level</p>
                      <h3 className="text-2xl font-black text-white italic">45% Complete</h3>
                   </div>
                   <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">15 / 33 Chapters finished</p>
                </div>
                <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                   <div className="h-full bg-indigo-500 rounded-full shadow-[0_0_15px_rgba(99,102,241,0.5)] transition-all duration-1000" style={{ width: '45%' }} />
                </div>
             </div>
             <div className="flex gap-4">
                <button className="h-12 px-6 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all">Resume Learning</button>
                <button className="h-12 px-6 bg-indigo-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-indigo-600/20 transition-all">Daily Goal: 2h</button>
             </div>
          </div>
        )}
      </header>

      {/* Resource Tabs */}
      <div className="overflow-x-auto no-scrollbar pb-2">
        <div className="flex gap-4 border-b border-white/5">
          {['All Resources', 'Theory', 'Videos', 'Practice', 'Mock Tests', 'PYQs'].map((tab, i) => (
            <button 
              key={i}
              className={`px-8 py-4 text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap
                ${i === 0 ? 'bg-indigo-500/10 text-indigo-400 border-b-2 border-indigo-500' : 'text-slate-500 hover:text-white'}
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
          <div key={chapter.id} className="glass-panel overflow-hidden border-white/5 hover:border-white/10 transition-all">
            <button 
              onClick={() => setExpandedChapter(expandedChapter === idx ? null : idx)}
              className="w-full p-8 flex flex-col md:flex-row items-center justify-between gap-6 hover:bg-white/[0.02] transition-colors group"
            >
               <div className="flex items-center gap-6">
                  <div className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center font-black text-lg transition-all",
                    chapter.progress > 50 ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20" : "bg-white/5 text-slate-500"
                  )}>
                    {idx + 1}
                  </div>
                  <div className="text-left">
                     <h3 className="text-xl font-bold text-white uppercase tracking-tight group-hover:text-indigo-400 transition-colors">{chapter.title}</h3>
                     <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">{chapter.topicsCount} Topics • {chapter.questionsCount} Questions</p>
                  </div>
               </div>

               <div className="flex items-center gap-8 w-full md:w-auto">
                  {user && (
                    <div className="hidden lg:flex items-center gap-4 border-x border-white/5 px-8">
                       <div className="w-32 h-1.5 bg-white/5 rounded-full overflow-hidden">
                          <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${chapter.progress}%` }} />
                       </div>
                       <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">{chapter.progress}%</span>
                    </div>
                  )}
                  <div className={cn(
                    "w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-500 transition-transform duration-500",
                    expandedChapter === idx && "rotate-180 bg-indigo-600/10 text-indigo-400"
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
                  className="border-t border-white/5 bg-white/[0.01]"
                >
                  <div className="p-8 space-y-10">
                    <div className="space-y-4">
                       <h4 className="text-[10px] font-black text-slate-600 uppercase tracking-widest border-b border-white/5 pb-2">Active Topics</h4>
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {chapter.topics.map((topic, tIdx) => (
                            <Link to={`/topic/${topic.id}`} key={tIdx}>
                              <div className="p-6 bg-white/[0.02] border border-white/5 rounded-2xl flex items-center justify-between hover:bg-white/[0.05] hover:border-white/10 hover:scale-[1.02] transition-all group/topic cursor-pointer">
                                 <div className="flex items-center gap-4">
                                    <div className={cn(
                                      "w-10 h-10 rounded-xl flex items-center justify-center transition-all",
                                      topic.status === 'complete' ? "bg-emerald-500/10 text-emerald-400" : "bg-white/5 text-slate-500"
                                    )}>
                                      {topic.status === 'complete' ? <CheckCircle2 size={20} /> : <PlayCircle size={20} />}
                                    </div>
                                    <div>
                                       <p className="text-sm font-bold text-white uppercase tracking-tight group-hover/topic:text-indigo-400 transition-colors">{topic.title}</p>
                                       <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-1">{topic.type} • {topic.qs} Qs</p>
                                    </div>
                                 </div>
                                 {topic.status === 'complete' && (
                                   <span className="text-[8px] font-black text-emerald-500 uppercase tracking-[0.2em] bg-emerald-500/10 px-2 py-1 rounded-full">DONE</span>
                                 )}
                              </div>
                            </Link>
                          ))}
                       </div>
                    </div>

                    <div className="space-y-4 pt-6 border-t border-white/5">
                       <h4 className="text-[10px] font-black text-slate-600 uppercase tracking-widest border-b border-white/5 pb-2">Chapter Toolset</h4>
                       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {[
                            { label: "Full Notes", icon: <FileText size={18} />, color: "text-indigo-400", bg: "bg-indigo-400/10" },
                            { label: "Quick Quiz", icon: <HelpCircle size={18} />, color: "text-cyan-400", bg: "bg-cyan-400/10" },
                            { label: "Question Bank", icon: <ClipboardList size={18} />, color: "text-purple-400", bg: "bg-purple-400/10" },
                            { label: "DPP Set", icon: <Download size={18} />, color: "text-orange-400", bg: "bg-orange-400/10" },
                          ].map((tool, tIndex) => (
                            <button key={tIndex} className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl flex flex-col items-center gap-3 hover:bg-white/[0.05] hover:border-white/10 transition-all group/tool">
                               <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center group-hover/tool:scale-110 transition-transform", tool.bg, tool.color)}>
                                  {tool.icon}
                               </div>
                               <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest group-hover/tool:text-white transition-colors">{tool.label}</span>
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
