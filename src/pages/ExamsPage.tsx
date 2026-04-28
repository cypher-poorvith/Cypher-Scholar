import React, { useState } from 'react';
import { School, ArrowRight, CheckCircle2, TrendingUp, Users, Lock, Mail, Bell } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { cn } from '../lib/utils';

const ExamsPage: React.FC = () => {
  const { user } = useAuth();
  const { showToast } = useToast();
  const [showComingSoon, setShowComingSoon] = useState(false);
  const [selectedExamine, setSelectedExamine] = useState<string | null>(null);
  const [email, setEmail] = useState('');

  const exams = [
    {
      id: 'jee-main',
      title: 'JEE Main',
      desc: 'Engineering Entrance',
      icon: '🎓',
      subjects: 3,
      pdfs: 234,
      videos: 45,
      mocks: 50,
      color: 'border-indigo-500',
      progress: 23,
      locked: false
    },
    {
      id: 'jee-adv',
      title: 'JEE Advanced',
      desc: 'IIT Entrance',
      icon: '🚀',
      subjects: 3,
      pdfs: 180,
      videos: 32,
      mocks: 40,
      color: 'border-cyan-500',
      progress: 15,
      locked: false
    },
    {
      id: 'neet',
      title: 'NEET',
      desc: 'Medical Entrance',
      icon: '🩺',
      subjects: 4,
      pdfs: 0,
      videos: 0,
      mocks: 0,
      color: 'border-rose-500',
      progress: 0,
      locked: true
    },
    {
      id: 'bitsat',
      title: 'BITSAT',
      desc: 'BITS Pilani Entrance',
      icon: '🏫',
      subjects: 5,
      pdfs: 0,
      videos: 0,
      mocks: 0,
      color: 'border-blue-500',
      progress: 0,
      locked: true
    },
    {
      id: 'comedk',
      title: 'COMEDK',
      desc: 'Karnataka Engineering',
      icon: '🏙️',
      subjects: 3,
      pdfs: 0,
      videos: 0,
      mocks: 0,
      color: 'border-amber-500',
      progress: 0,
      locked: true
    },
    {
      id: 'wbjee',
      title: 'WBJEE',
      desc: 'West Bengal Engineering',
      icon: '🌉',
      subjects: 3,
      pdfs: 0,
      videos: 0,
      mocks: 0,
      color: 'border-emerald-500',
      progress: 0,
      locked: true
    }
  ];

  const handleNotify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    showToast(`SUCCESS! We'll notify you when ${selectedExamine} is released at ${email}.`, 'success');
    setShowComingSoon(false);
    setEmail('');
  };

  const handleExamClick = (exam: typeof exams[0]) => {
    if (exam.locked) {
      setSelectedExamine(exam.title);
      setShowComingSoon(true);
    }
  };

  return (
    <div className="space-y-12 pb-20">
      <header>
        <h1 className="text-4xl md:text-6xl font-display font-black text-slate-900 tracking-tight mb-4 leading-none uppercase">
          Competitive <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Exams</span>
        </h1>
        <p className="text-lg text-slate-500 font-medium max-w-2xl">
          Prepare for your target exam with comprehensive resources, verified by experts and top rankers.
        </p>
      </header>

      {/* Exam Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {exams.map((exam, i) => (
          <motion.div 
            key={exam.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            onClick={() => handleExamClick(exam)}
            className={cn(
              "vibrant-card p-8 hover-lift cursor-pointer border-l-4 flex flex-col gap-6 relative group overflow-hidden",
              exam.locked ? "opacity-90 saturate-50 brightness-95" : "",
              exam.id === 'jee-main' ? 'border-primary' :
              exam.id === 'jee-adv' ? 'border-cyan-500' : 
              exam.color
            )}
          >
            {exam.locked && (
              <div className="absolute inset-0 bg-slate-900/5 backdrop-blur-[2px] z-20 flex flex-col items-center justify-center gap-4 group-hover:bg-slate-900/10 transition-all">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-slate-400 shadow-xl border border-slate-100">
                   <Lock size={24} />
                </div>
                <div className="bg-slate-900 text-white px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl">
                   Coming Soon
                </div>
              </div>
            )}

            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700" />
            
            <div className="flex items-center gap-4 relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-3xl shadow-sm border border-slate-100 group-hover:scale-110 transition-transform">
                {exam.icon}
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 tracking-tight">{exam.title}</h3>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{exam.desc}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 relative z-10">
              <div className="bg-slate-50 rounded-xl p-4 text-center border border-slate-100 group-hover:border-primary/20 transition-colors shadow-sm">
                <p className="text-2xl font-black text-slate-900 leading-none">{exam.subjects}</p>
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-2">Subjects</p>
              </div>
              <div className="bg-slate-50 rounded-xl p-4 text-center border border-slate-100 group-hover:border-primary/20 transition-colors shadow-sm">
                <p className="text-2xl font-black text-slate-900 leading-none">{exam.pdfs}</p>
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-2">PDF Notes</p>
              </div>
            </div>

            <ul className="space-y-3 relative z-10">
              {['Previous Year Papers', 'Topic-wise Tests', 'Full-length Mocks'].map((feature, j) => (
                <li key={j} className="flex items-center gap-3 text-xs font-bold text-slate-500">
                  <CheckCircle2 size={16} className="text-primary" />
                  {feature}
                </li>
              ))}
            </ul>

            <div className="mt-auto pt-6 relative z-10">
              {exam.locked ? (
                 <button className="btn-secondary w-full h-14 text-xs flex items-center justify-center gap-2 group/btn">
                    Notify Me When Released
                    <Bell size={18} className="group-hover/btn:rotate-12 transition-transform" />
                 </button>
              ) : (
                <Link to={`/subjects/${exam.id}`}>
                  <button className="btn-primary w-full h-14 text-xs flex items-center justify-center gap-2 group/btn">
                    Start Preparation
                    <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </Link>
              )}
            </div>

            {user && !exam.locked && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-100">
                <div 
                  className="h-full bg-primary shadow-[0_-4px_12px_rgba(99,102,241,0.5)] transition-all duration-1000"
                  style={{ width: `${exam.progress}%` }}
                />
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Coming Soon Modal */}
      <AnimatePresence>
        {showComingSoon && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
             <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               onClick={() => setShowComingSoon(false)}
               className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm"
             />
             <motion.div
               initial={{ opacity: 0, scale: 0.9, y: 20 }}
               animate={{ opacity: 1, scale: 1, y: 0 }}
               exit={{ opacity: 0, scale: 0.9, y: 20 }}
               className="relative w-full max-w-lg bg-white rounded-[40px] p-10 overflow-hidden shadow-2xl"
             >
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -mr-32 -mt-32" />
                
                <div className="relative z-10 text-center space-y-6">
                   <div className="w-20 h-20 bg-primary/5 rounded-3xl flex items-center justify-center text-primary mx-auto border border-primary/10">
                      <School size={40} />
                   </div>
                   
                   <div className="space-y-2">
                      <h2 className="text-3xl font-black text-slate-900 leading-tight uppercase tracking-tight">
                         {selectedExamine} is <span className="text-primary">Under Construction</span>
                      </h2>
                      <p className="text-slate-500 font-medium text-sm">
                        Our content wizards are fine-tuning the precision-crafted resources for {selectedExamine}. Enter your email to be the first to know when it drops!
                      </p>
                   </div>

                   <form onSubmit={handleNotify} className="space-y-4 pt-4">
                      <div className="relative">
                         <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                         <input 
                           type="email" 
                           placeholder="Enter your email address" 
                           required
                           value={email}
                           onChange={(e) => setEmail(e.target.value)}
                           className="w-full bg-slate-50 border-2 border-slate-100 rounded-3xl pl-16 pr-6 h-16 text-sm font-bold focus:border-primary/50 focus:bg-white outline-none transition-all placeholder:text-slate-400"
                         />
                      </div>
                      <button type="submit" className="btn-primary w-full h-16 text-xs uppercase tracking-widest">
                         Notify Me
                      </button>
                   </form>

                   <button 
                     onClick={() => setShowComingSoon(false)}
                     className="text-slate-400 text-[10px] font-bold uppercase tracking-widest hover:text-slate-600 transition-colors"
                   >
                     Nevermind, show me other exams
                   </button>
                </div>
             </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Trust Banner */}
      <section className="vibrant-card p-12 flex flex-col md:flex-row items-center justify-between gap-8 border-t-4 border-t-primary shadow-sm bg-white">
        <div className="space-y-4 text-center md:text-left">
          <h2 className="text-3xl font-black text-slate-900 tracking-tight uppercase">THE SCHOLAR CIRCLE</h2>
          <p className="text-slate-500 font-medium max-w-md">Join 2,492 other students who are currently preparing for their exams using Cypher Scholar.</p>
        </div>
        <div className="flex -space-x-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="w-16 h-16 rounded-full border-4 border-white bg-slate-100 flex items-center justify-center overflow-hidden shadow-sm">
              <Users className="text-slate-400" />
            </div>
          ))}
          <div className="w-16 h-16 rounded-full border-4 border-white bg-primary flex items-center justify-center text-white font-black text-xs shadow-lg">
            +2k
          </div>
        </div>
      </section>
    </div>
  );
};

export default ExamsPage;
