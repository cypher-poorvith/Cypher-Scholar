import React, { useState } from 'react';
import { 
  FileQuestion, Download, BookOpen, 
  ChevronRight, Search, LayoutGrid, List,
  X, ChevronLeft, Mail, Clock, TrendingUp
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { JEE_CHAPTERS } from '../constants';
import jsPDF from 'jspdf';

type Subject = keyof typeof JEE_CHAPTERS;

const PracticeZone: React.FC = () => {
  const [selectedSubject, setSelectedSubject] = useState<Subject>('Physics');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [exporting, setExporting] = useState<string | null>(null);
  const [previewChapter, setPreviewChapter] = useState<string | null>(null);

  const subjects: Subject[] = ['Physics', 'Chemistry', 'Maths'];

  const filteredChapters = JEE_CHAPTERS[selectedSubject].filter(chapter => 
    chapter.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Mock function to generate 100 questions for a chapter
  const generateQuestions = (chapterName: string) => {
    const questions = [];
    const types = ['Single Correct', 'Multi-correct', 'Numerical'];
    
    for (let i = 1; i <= 20; i++) { // Limit to 20 for preview
      const type = types[Math.floor(Math.random() * types.length)];
      questions.push({
        id: i,
        type,
        question: `Question ${i}: This is a sample ${type} question for ${chapterName} in ${selectedSubject}. Solve for the variables provided in the diagram (not shown).`,
        options: type !== 'Numerical' ? ['Option A', 'Option B', 'Option C', 'Option D'] : null,
        answer: type === 'Numerical' ? Math.floor(Math.random() * 100).toString() : 'A',
        solution: `This is a detailed step-by-step solution for Question ${i}. First, identify the key formulas... then apply the values... finally, we get the result.`
      });
    }
    return questions;
  };

  const exportToPDF = async (chapterName: string) => {
    setExporting(chapterName);
    
    const doc = new jsPDF();
    const questions = generateQuestions(chapterName);
    
    doc.setFontSize(22);
    doc.text(`JEE Question Bank: ${chapterName}`, 20, 20);
    doc.setFontSize(14);
    doc.text(`Subject: ${selectedSubject}`, 20, 30);
    doc.text(`Total Questions: 100`, 20, 40);
    doc.setLineWidth(0.5);
    doc.line(20, 45, 190, 45);
    
    let yOffset = 55;
    const pageHeight = doc.internal.pageSize.height;

    questions.forEach((q, index) => {
      if (yOffset > pageHeight - 40) {
        doc.addPage();
        yOffset = 20;
      }

      doc.setFont("helvetica", "bold");
      doc.text(`Q${q.id} (${q.type})`, 20, yOffset);
      yOffset += 7;

      doc.setFont("helvetica", "normal");
      const questionLines = doc.splitTextToSize(q.question, 170);
      doc.text(questionLines, 20, yOffset);
      yOffset += (questionLines.length * 7);

      if (q.options) {
        q.options.forEach((opt, optIdx) => {
          doc.text(`${String.fromCharCode(65 + optIdx)}) ${opt}`, 30, yOffset);
          yOffset += 7;
        });
      }

      yOffset += 5;
      doc.setFont("helvetica", "bold");
      doc.text("Detailed Solution:", 20, yOffset);
      yOffset += 7;
      doc.setFont("helvetica", "normal");
      const solutionLines = doc.splitTextToSize(q.solution, 170);
      doc.text(solutionLines, 20, yOffset);
      yOffset += (solutionLines.length * 7) + 10;
    });

    doc.save(`${selectedSubject}_${chapterName.replace(/\s+/g, '_')}_Questions.pdf`);
    setExporting(null);
  };

  return (
    <div className="space-y-12 pb-20">
      <header className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-primary font-bold uppercase tracking-widest text-[10px]">
             <FileQuestion size={16} /> JEE Question Bank
          </div>
          <h1 className="text-4xl md:text-6xl font-display font-black text-slate-900 tracking-tight leading-none uppercase">
            Power <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Knowledge Hub</span>
          </h1>
          <p className="text-lg text-slate-500 font-medium max-w-3xl">
            Access exhaustive chapter-wise question banks for JEE Main & Advanced. Every chapter contains 100+ precision-crafted questions with detailed step-by-step solutions.
          </p>
        </div>

        {/* Subject Toggles & Search */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-white p-4 rounded-[32px] border border-slate-100 shadow-sm">
          <div className="flex items-center gap-2 p-1.5 bg-slate-100 rounded-2xl w-fit">
            {subjects.map(sub => (
              <button
                key={sub}
                onClick={() => setSelectedSubject(sub)}
                className={cn(
                  "px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                  selectedSubject === sub 
                    ? "bg-white text-primary shadow-sm" 
                    : "text-slate-400 hover:text-slate-600"
                )}
              >
                {sub}
              </button>
            ))}
          </div>

          <div className="flex flex-1 items-center gap-4 max-w-xl">
             <div className="relative flex-1 group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={18} />
                <input 
                  type="text" 
                  placeholder={`Search ${selectedSubject} chapters...`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 h-14 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all outline-none"
                />
             </div>
             
             <div className="flex items-center gap-2 p-1 bg-slate-100 rounded-xl">
                <button 
                  onClick={() => setViewMode('grid')}
                  className={cn("p-2 rounded-lg transition-all", viewMode === 'grid' ? "bg-white text-primary shadow-sm" : "text-slate-400")}
                >
                  <LayoutGrid size={18} />
                </button>
                <button 
                  onClick={() => setViewMode('list')}
                  className={cn("p-2 rounded-lg transition-all", viewMode === 'list' ? "bg-white text-primary shadow-sm" : "text-slate-400")}
                >
                  <List size={18} />
                </button>
             </div>
          </div>
        </div>
      </header>

      {/* Chapters Content */}
      <AnimatePresence mode="wait">
        <motion.div 
          key={selectedSubject}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className={cn(
            "grid gap-6",
            viewMode === 'grid' ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
          )}
        >
          {filteredChapters.map((chapter, i) => (
            <motion.div
              layout
              key={chapter}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.02 }}
              className={cn(
                "vibrant-card group hover:border-primary/20 transition-all overflow-hidden relative",
                viewMode === 'list' ? "p-6 flex items-center justify-between gap-6" : "p-8 space-y-6"
              )}
            >
              {/* Info Section */}
              <div className="flex items-center gap-5">
                 <div className="w-14 h-14 bg-primary/5 rounded-2xl flex items-center justify-center text-primary border border-primary/10 group-hover:bg-primary group-hover:text-white transition-all">
                    <BookOpen size={24} />
                 </div>
                 <div>
                    <h3 className="font-bold text-slate-900 leading-tight">{chapter}</h3>
                    <div className="flex items-center gap-3 mt-1.5">
                       <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">100 Questions</span>
                       <span className="w-1.5 h-1.5 bg-slate-200 rounded-full" />
                       <span className="text-[9px] font-black uppercase tracking-widest text-emerald-500">Solved</span>
                    </div>
                 </div>
              </div>

              {/* Actions */}
              <div className={cn(
                "flex items-center gap-4",
                viewMode === 'list' ? "" : "pt-4 border-t border-slate-50"
              )}>
                 <button 
                  onClick={() => exportToPDF(chapter)}
                  disabled={exporting === chapter}
                  className={cn(
                    "flex-1 h-12 flex items-center justify-center gap-2 px-6 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                    exporting === chapter 
                      ? "bg-slate-100 text-slate-400 cursor-not-allowed" 
                      : "bg-white border-2 border-slate-100 text-slate-600 hover:border-primary/20 hover:text-primary shadow-sm"
                  )}
                 >
                    {exporting === chapter ? (
                      <>Processing...</>
                    ) : (
                      <>Export PDF <Download size={14} /></>
                    )}
                 </button>
                 <button 
                    onClick={() => setPreviewChapter(chapter)}
                    className="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center hover:bg-black transition-all shadow-xl shadow-black/10"
                    title="Preview Questions"
                  >
                     <ChevronRight size={18} />
                  </button>
              </div>

              {/* Grid Decorative Elements */}
              {viewMode === 'grid' && (
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
              )}
            </motion.div>
          ))}

          {filteredChapters.length === 0 && (
            <div className="col-span-full py-20 text-center space-y-4">
               <div className="w-20 h-20 bg-slate-100 rounded-3xl flex items-center justify-center text-slate-300 mx-auto">
                 <Search size={32} />
               </div>
               <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">No chapters found matching your search</p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Preview Modal */}
      <AnimatePresence>
        {previewChapter && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10">
             <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               onClick={() => setPreviewChapter(null)}
               className="absolute inset-0 bg-slate-900/40 backdrop-blur-md"
             />
             <motion.div
               initial={{ opacity: 0, scale: 0.95, y: 30 }}
               animate={{ opacity: 1, scale: 1, y: 0 }}
               exit={{ opacity: 0, scale: 0.95, y: 30 }}
               className="relative w-full max-w-5xl h-[85vh] bg-white rounded-[40px] flex flex-col overflow-hidden shadow-2xl border border-slate-100"
             >
                {/* Header */}
                <div className="p-8 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white z-10">
                   <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary/5 rounded-2xl flex items-center justify-center text-primary border border-primary/10">
                         <BookOpen size={24} />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-slate-900 tracking-tight leading-none">{previewChapter}</h2>
                        <div className="flex items-center gap-3 mt-1.5">
                           <span className="text-[9px] font-black uppercase tracking-widest text-primary">JEE Main Material</span>
                           <span className="w-1.5 h-1.5 bg-slate-200 rounded-full" />
                           <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">20 Sample Questions</span>
                        </div>
                      </div>
                   </div>
                   <button 
                     onClick={() => setPreviewChapter(null)}
                     className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition-all"
                   >
                      <X size={24} />
                   </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-8 space-y-12 custom-scrollbar">
                   {generateQuestions(previewChapter).map((q, i) => (
                      <div key={q.id} className="space-y-6 animate-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: `${i * 100}ms` }}>
                         <div className="flex items-center gap-3">
                            <span className="w-10 h-10 bg-slate-900 text-white rounded-xl flex items-center justify-center font-black text-xs">
                               Q{q.id}
                            </span>
                            <span className="px-4 py-1.5 bg-primary/5 text-primary border border-primary/10 rounded-full text-[10px] font-black uppercase tracking-widest">
                               {q.type}
                            </span>
                         </div>
                         
                         <p className="text-lg text-slate-700 font-medium leading-relaxed max-w-4xl">
                            {q.question}
                         </p>

                         {q.options && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl">
                               {q.options.map((opt, optIdx) => (
                                  <div key={optIdx} className="flex items-center gap-4 p-4 rounded-2xl border border-slate-100 hover:border-primary/20 hover:bg-primary/5 transition-all group cursor-pointer">
                                     <div className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-[10px] font-black group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all">
                                        {String.fromCharCode(65 + optIdx)}
                                     </div>
                                     <span className="text-sm font-bold text-slate-600 group-hover:text-slate-900 transition-colors">{opt}</span>
                                  </div>
                               ))}
                            </div>
                         )}

                         <div className="bg-emerald-50/50 border border-emerald-100 rounded-[32px] p-8 space-y-4">
                            <div className="flex items-center gap-2 text-emerald-600 font-black uppercase tracking-widest text-[10px]">
                               <TrendingUp size={16} /> Strategy & Solution
                            </div>
                            <p className="text-sm text-slate-600 font-medium leading-relaxed italic">
                               {q.solution}
                            </p>
                            <div className="flex items-center gap-2 pt-2">
                               <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Core Concept:</span>
                               <span className="px-3 py-1 bg-white border border-emerald-100 rounded-full text-[9px] font-bold text-emerald-600">Fundamental Theory</span>
                            </div>
                         </div>

                         {i < 19 && <div className="h-px bg-slate-50 w-full" />}
                      </div>
                   ))}
                </div>

                {/* Footer */}
                <div className="p-8 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
                   <div className="flex items-center gap-4 text-slate-400 font-bold text-[10px] uppercase tracking-widest">
                      <Clock size={16} /> estimated read time: 15 mins
                   </div>
                   <button 
                     onClick={() => exportToPDF(previewChapter)}
                     disabled={exporting === previewChapter}
                     className="btn-primary h-14 px-10 text-xs"
                   >
                      {exporting === previewChapter ? "Processing..." : "Download Full PDF Bank"}
                   </button>
                </div>
             </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PracticeZone;
