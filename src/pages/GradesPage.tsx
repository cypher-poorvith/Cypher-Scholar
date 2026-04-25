import React, { useState } from 'react';
import { BookOpen, GraduationCap, School, Microscope, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

const GradesPage: React.FC = () => {
  const [selectedGrade, setSelectedGrade] = useState<string | null>(null);

  const gradeCategories = [
    { id: '1-8', label: 'Grades 1-8', sub: 'Primary Education', icon: '📖', color: 'text-indigo-400', bg: 'bg-indigo-400/10' },
    { id: '9-10', label: 'Grades 9-10', sub: 'Secondary Education', icon: '📚', color: 'text-cyan-400', bg: 'bg-cyan-400/10' },
    { id: '11-12', label: 'Grades 11-12', sub: 'Senior Secondary', icon: '🎓', color: 'text-purple-400', bg: 'bg-purple-400/10' },
    { id: 'btech', label: 'B.Tech / UG', sub: 'Engineering', icon: '🔬', color: 'text-orange-400', bg: 'bg-orange-400/10' },
  ];

  const streams = [
    { title: 'Science Stream', desc: 'PCM, PCB, PCMB', items: ['Physics', 'Chemistry', 'Math', 'Biology'], color: 'border-indigo-500' },
    { title: 'Commerce Stream', desc: 'Accountancy, BST', items: ['Accountancy', 'Economics', 'Business Studies'], color: 'border-cyan-500' },
    { title: 'Arts Stream', desc: 'History, Pol Sci', items: ['History', 'Political Science', 'Sociology'], color: 'border-purple-500' },
  ];

  return (
    <div className="space-y-12">
      <AnimatePresence mode="wait">
        {!selectedGrade ? (
          <motion.div 
            key="selection"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-12 pb-20"
          >
            <header>
              <h1 className="text-4xl md:text-6xl font-display font-black text-slate-900 tracking-tight mb-4 leading-none uppercase">
                Grade-wise <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Learning</span>
              </h1>
              <p className="text-lg text-slate-500 font-medium max-w-2xl">
                Select your current grade to access curated content, syllabus-specific notes, and practice materials.
              </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {gradeCategories.map((group) => (
                <div 
                  key={group.id} 
                  onClick={() => setSelectedGrade(group.id)}
                  className="vibrant-card p-8 hover-lift cursor-pointer text-center group flex flex-col items-center gap-6 shadow-sm"
                >
                  <div className={`w-20 h-20 rounded-3xl ${group.bg} flex items-center justify-center text-5xl shadow-sm border border-slate-50 group-hover:scale-110 transition-transform`}>
                    {group.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 tracking-tight">{group.label}</h3>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{group.sub}</p>
                  </div>
                  <button className={`w-full h-12 bg-slate-50 ${group.color} rounded-xl font-bold text-[10px] uppercase tracking-widest hover:bg-slate-100 transition-all mt-auto border border-slate-100 shadow-sm`}>
                    Explore →
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="streams"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-12 pb-20"
          >
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <button 
                  onClick={() => setSelectedGrade(null)} 
                  className="flex items-center gap-2 text-primary hover:text-secondary transition-colors mb-6 text-xs font-bold uppercase tracking-widest"
                >
                  <ArrowLeft size={16} />
                  Back to Grades
                </button>
                <h2 className="text-4xl md:text-6xl font-display font-black text-slate-900 tracking-tight leading-none uppercase">Grade 11-12</h2>
                <p className="text-lg text-slate-500 font-medium mt-2">Select your stream of study</p>
              </div>
              <div className="vibrant-card p-4 flex flex-wrap gap-4 bg-white border border-slate-100 shadow-sm">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest self-center mr-4">Select Board:</p>
                <button className="btn-primary px-6 py-2.5 text-[10px]">CBSE</button>
                <button className="btn-secondary px-6 py-2.5 text-[10px]">ICSE</button>
                <button className="btn-secondary px-6 py-2.5 text-[10px]">State Board</button>
              </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {streams.map((stream, i) => (
                <div key={i} className={cn(
                  "vibrant-card p-8 hover-lift cursor-pointer border-t-4 flex flex-col gap-6 group shadow-sm",
                  stream.color === 'border-indigo-500' ? 'border-primary' :
                  stream.color === 'border-cyan-500' ? 'border-cyan-500' : 'border-purple-500'
                )}>
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight uppercase">{stream.title}</h3>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-relaxed">Includes: {stream.desc}</p>
                  
                  <div className="space-y-4">
                    {stream.items.map((item, j) => (
                      <div key={j} className="flex items-center gap-4 text-sm font-bold text-slate-500 transition-colors">
                        <CheckCircle2 size={18} className={cn(
                          stream.color === 'border-indigo-500' ? 'text-primary' :
                          stream.color === 'border-cyan-500' ? 'text-cyan-500' : 'text-purple-500'
                        )} />
                        {item}
                      </div>
                    ))}
                  </div>

                  <button className="btn-secondary w-full h-14 text-xs mt-auto">
                    Select Stream →
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GradesPage;
