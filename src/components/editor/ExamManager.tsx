import React, { useState, useEffect } from 'react';
import { Plus, Folder, Book, FileText, ChevronRight, Layers, Trash2, Edit } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { examService, Exam, Subject, Chapter, Topic } from '../../services/examService';
import { useToast } from '../../context/ToastContext';

const ExamManager: React.FC = () => {
  const { showToast } = useToast();
  const [exams, setExams] = useState<Exam[]>([]);
  const [selectedExam, setSelectedExam] = useState<string | null>(null);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [selectedChapter, setSelectedChapter] = useState<string | null>(null);
  const [topics, setTopics] = useState<Topic[]>([]);
  
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadExams();
  }, []);

  const loadExams = async () => {
    try {
      const data = await examService.getExams();
      setExams(data);
    } catch (e) {
      console.error(e);
    }
  };

  const handleExamClick = async (examId: string) => {
    setSelectedExam(examId);
    setSelectedSubject(null);
    setSelectedChapter(null);
    setSubjects([]);
    setChapters([]);
    setTopics([]);
    try {
      const data = await examService.getSubjects(examId);
      setSubjects(data);
    } catch (e) { console.error(e); }
  };

  const handleSubjectClick = async (subId: string) => {
    setSelectedSubject(subId);
    setSelectedChapter(null);
    setChapters([]);
    setTopics([]);
    try {
      const data = await examService.getChapters(subId);
      setChapters(data);
    } catch (e) { console.error(e); }
  };

  const handleChapterClick = async (chapId: string) => {
    setSelectedChapter(chapId);
    setTopics([]);
    try {
      const data = await examService.getTopics(chapId);
      setTopics(data);
    } catch (e) { console.error(e); }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-[600px]">
      {/* Exams Column */}
      <div className="glass-panel p-4 border-white/5 space-y-4 overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest">Exams</h3>
          <button className="p-1 hover:bg-white/5 rounded"><Plus size={16} /></button>
        </div>
        {exams.map(exam => (
          <button
            key={exam.id}
            onClick={() => handleExamClick(exam.id!)}
            className={`w-full text-left p-3 rounded-xl flex items-center justify-between group transition-all ${selectedExam === exam.id ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'bg-white/5 text-slate-400 hover:bg-white/10'}`}
          >
            <div className="flex items-center gap-3">
              <Layers size={16} />
              <span className="text-sm font-bold">{exam.name}</span>
            </div>
            <ChevronRight size={14} className={selectedExam === exam.id ? 'text-white' : 'text-slate-600'} />
          </button>
        ))}
      </div>

      {/* Subjects Column */}
      <div className="glass-panel p-4 border-white/5 space-y-4 overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest">Subjects</h3>
          <button disabled={!selectedExam} className="p-1 hover:bg-white/5 rounded disabled:opacity-30"><Plus size={16} /></button>
        </div>
        {subjects.map(sub => (
          <button
            key={sub.id}
            onClick={() => handleSubjectClick(sub.id!)}
            className={`w-full text-left p-3 rounded-xl flex items-center justify-between group transition-all ${selectedSubject === sub.id ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/20' : 'bg-white/5 text-slate-400 hover:bg-white/10'}`}
          >
            <div className="flex items-center gap-3">
              <Book size={16} />
              <span className="text-sm font-bold">{sub.name}</span>
            </div>
            <ChevronRight size={14} className={selectedSubject === sub.id ? 'text-white' : 'text-slate-600'} />
          </button>
        ))}
        {selectedExam && subjects.length === 0 && <p className="text-center py-10 text-xs text-slate-600 italic">No subjects found</p>}
      </div>

      {/* Chapters Column */}
      <div className="glass-panel p-4 border-white/5 space-y-4 overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest">Chapters</h3>
          <button disabled={!selectedSubject} className="p-1 hover:bg-white/5 rounded disabled:opacity-30"><Plus size={16} /></button>
        </div>
        {chapters.map(chap => (
          <button
            key={chap.id}
            onClick={() => handleChapterClick(chap.id!)}
            className={`w-full text-left p-3 rounded-xl flex items-center justify-between group transition-all ${selectedChapter === chap.id ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20' : 'bg-white/5 text-slate-400 hover:bg-white/10'}`}
          >
            <div className="flex items-center gap-3">
              <Folder size={16} />
              <span className="text-sm font-bold">{chap.name}</span>
            </div>
            <ChevronRight size={14} className={selectedChapter === chap.id ? 'text-white' : 'text-slate-600'} />
          </button>
        ))}
        {selectedSubject && chapters.length === 0 && <p className="text-center py-10 text-xs text-slate-600 italic">No chapters found</p>}
      </div>

      {/* Topics Column */}
      <div className="glass-panel p-4 border-white/5 space-y-4 overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest">Topics</h3>
          <button disabled={!selectedChapter} className="p-1 hover:bg-white/5 rounded disabled:opacity-30"><Plus size={16} /></button>
        </div>
        {topics.map(topic => (
          <div
            key={topic.id}
            className="w-full text-left p-3 bg-white/5 text-slate-400 border border-white/5 rounded-xl flex items-center justify-between group hover:border-indigo-500/30 transition-all"
          >
            <div className="flex items-center gap-3">
              <FileText size={16} />
              <span className="text-sm font-bold">{topic.name}</span>
            </div>
            <div className="opacity-0 group-hover:opacity-100 flex items-center gap-1 transition-opacity">
              <button className="p-1 hover:text-white"><Edit size={12} /></button>
              <button className="p-1 hover:text-red-400"><Trash2 size={12} /></button>
            </div>
          </div>
        ))}
        {selectedChapter && topics.length === 0 && <p className="text-center py-10 text-xs text-slate-600 italic">No topics found</p>}
      </div>
    </div>
  );
};

export default ExamManager;
