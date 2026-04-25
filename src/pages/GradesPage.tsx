import React, { useState } from 'react';
import { BookOpen, GraduationCap, School, Microscope, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

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
            className="space-y-12"
          >
            <header>
              <h1 className="text-4xl md:text-6xl font-display font-black text-white uppercase tracking-tighter mb-4 italic">
                Grade-wise Learning
              </h1>
              <p className="text-lg text-slate-400 font-medium max-w-2xl">
                Select your current grade to access curated content, syllabus-specific notes, and practice materials.
              </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {gradeCategories.map((group) => (
                <div 
                  key={group.id} 
                  onClick={() => setSelectedGrade(group.id)}
                  className="glass-panel p-8 hover-lift cursor-pointer text-center group flex flex-col items-center gap-6"
                >
                  <div className={`w-20 h-20 rounded-3xl ${group.bg} flex items-center justify-center text-5xl shadow-inner border border-white/5 group-hover:scale-110 transition-transform`}>
                    {group.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-white uppercase tracking-tight">{group.label}</h3>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">{group.sub}</p>
                  </div>
                  <button className={`w-full h-12 ${group.bg} ${group.color} rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-opacity-20 transition-all mt-auto`}>
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
            className="space-y-12"
          >
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <button 
                  onClick={() => setSelectedGrade(null)} 
                  className="flex items-center gap-2 text-indigo-400 hover:text-white transition-colors mb-6 text-xs font-black uppercase tracking-widest"
                >
                  <ArrowLeft size={16} />
                  Back to Grades
                </button>
                <h2 className="text-4xl md:text-6xl font-display font-black text-white uppercase tracking-tighter italic">Grade 11-12</h2>
                <p className="text-lg text-slate-400 font-medium mt-2">Select your stream of study</p>
              </div>
              <div className="glass-panel p-4 flex gap-4 bg-white/5 border-white/10">
                <p className="text-xs font-black text-slate-500 uppercase tracking-widest self-center mr-4">Select Board:</p>
                <button className="px-6 py-2.5 bg-indigo-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-indigo-600/20">CBSE</button>
                <button className="px-6 py-2.5 bg-white/5 text-slate-400 hover:bg-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest">ICSE</button>
                <button className="px-6 py-2.5 bg-white/5 text-slate-400 hover:bg-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest">State Board</button>
              </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {streams.map((stream, i) => (
                <div key={i} className={`glass-panel p-8 hover-lift cursor-pointer border-t-4 ${stream.color} flex flex-col gap-6 group`}>
                  <h3 className="text-2xl font-black text-white uppercase tracking-tight italic">{stream.title}</h3>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest leading-relaxed">Includes: {stream.desc}</p>
                  
                  <div className="space-y-4">
                    {stream.items.map((item, j) => (
                      <div key={j} className="flex items-center gap-4 text-sm font-bold text-slate-400 group-hover:text-slate-200 transition-colors">
                        <CheckCircle2 size={18} className={stream.color.replace('border-', 'text-')} />
                        {item}
                      </div>
                    ))}
                  </div>

                  <button className={`w-full h-14 bg-white/5 hover:bg-white/10 rounded-xl font-black text-xs uppercase tracking-widest transition-all mt-auto border border-white/5 group-hover:border-white/20`}>
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
