import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronRight, ChevronLeft, Check, Sparkles, Target, 
  Clock, Bell, Brain, Rocket, Star, Heart, Zap,
  User, ShieldCheck, GraduationCap, Trophy
} from 'lucide-react';
import { useAuth, handleFirestoreError, OperationType } from '../context/AuthContext';
import { db } from '../lib/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import confetti from 'canvas-confetti';
import { cn } from '../lib/utils';

// Types for onboarding
type OnboardingData = {
  displayName: string;
  exams: string[];
  situation: string;
  weakTopics: string[];
  studyGoal: string;
  notificationsEnabled: boolean;
  studyTime: string;
};

const STORAGE_KEY = 'cypher_onboarding_progress';

const Onboarding: React.FC = () => {
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(0); // 1 for next, -1 for prev
  const [loading, setLoading] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  const [formData, setFormData] = useState<OnboardingData>({
    displayName: '',
    exams: [],
    situation: '',
    weakTopics: [],
    studyGoal: '2 hours',
    notificationsEnabled: false,
    studyTime: '18:00'
  });

  // Load progress
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setFormData(prev => ({ ...prev, ...parsed.data }));
        setStep(parsed.step || 1);
      } catch (e) {
        console.error("Failed to load onboarding progress", e);
      }
    } else if (profile?.displayName) {
      setFormData(prev => ({ ...prev, displayName: profile.displayName }));
    }
  }, [profile]);

  // Save progress
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ step, data: formData }));
  }, [step, formData]);

  const handleNext = () => {
    setDirection(1);
    setStep(prev => Math.min(prev + 1, 5));
  };

  const handleBack = () => {
    setDirection(-1);
    setStep(prev => Math.max(prev - 1, 1));
  };

  const triggerConfetti = () => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
  };

  const handleFinish = async () => {
    if (!user) return;
    setLoading(true);
    
    try {
      const path = `users/${user.uid}`;
      await updateDoc(doc(db, path), {
        displayName: formData.displayName,
        onboardingComplete: true,
        academicDetails: {
          exams: formData.exams,
          situation: formData.situation,
          weak_topics: formData.weakTopics,
          studyGoal: formData.studyGoal,
          notificationsEnabled: formData.notificationsEnabled,
          study_time: formData.studyTime
        },
        updatedAt: new Date().toISOString()
      });

      setShowCelebration(true);
      triggerConfetti();
      localStorage.removeItem(STORAGE_KEY);
      
      setTimeout(() => {
        navigate('/dashboard');
      }, 3500);
    } catch (err: any) {
      console.error("Failed to save onboarding", err);
      handleFirestoreError(err, OperationType.UPDATE, `users/${user.uid}`);
    } finally {
      setLoading(false);
    }
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0
    })
  };

  // --- Step Rendering ---

  const renderStep1 = () => (
    <div className="space-y-10 text-center">
      <motion.div 
        initial={{ scale: 0.8, rotate: -10 }}
        animate={{ scale: 1, rotate: 0 }}
        className="w-40 h-40 bg-indigo-50 rounded-[48px] border-4 border-white shadow-xl mx-auto flex items-center justify-center relative"
      >
        <Sparkles className="text-primary animate-pulse" size={48} />
        <motion.div 
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute -top-4 -right-4 bg-amber-400 text-white p-3 rounded-2xl shadow-lg"
        >
          <Star size={20} fill="currentColor" />
        </motion.div>
      </motion.div>

      <div className="space-y-4">
        <h2 className="text-4xl font-display font-black text-slate-900 leading-tight uppercase tracking-tight">Hey! What should we call you?</h2>
        <p className="text-slate-500 font-medium">Your chosen name will be used across the portal.</p>
      </div>

      <div className="relative group max-w-sm mx-auto">
        <User className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={24} />
        <input 
          type="text"
          value={formData.displayName}
          onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
          placeholder="Enter your name..."
          className="w-full pl-16 pr-8 h-20 bg-white border-2 border-slate-100 rounded-3xl text-xl font-bold focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none"
        />
      </div>

      <button 
        disabled={!formData.displayName}
        onClick={handleNext}
        className="btn-primary h-16 w-full max-w-xs shadow-xl shadow-primary/20 disabled:opacity-50 disabled:shadow-none"
      >
        NEXT STEP <ChevronRight size={20} />
      </button>
    </div>
  );

  const renderStep2 = () => {
    const exams = [
      { id: 'jee-main', label: 'JEE Main', color: 'from-blue-500 to-indigo-600', icon: <Zap size={20} /> },
      { id: 'jee-adv', label: 'JEE Advanced', color: 'from-indigo-600 to-purple-600', icon: <Rocket size={20} /> }
    ];

    const toggleExam = (examId: string) => {
      setFormData(prev => ({
        ...prev,
        exams: prev.exams.includes(examId) 
          ? prev.exams.filter(id => id !== examId) 
          : [...prev.exams, examId]
      }));
    };

    return (
      <div className="space-y-10">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-display font-black text-slate-900 leading-tight uppercase tracking-tight">What are you preparing for?</h2>
          <p className="text-slate-500 font-medium">Select all exams you're targeting this year.</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {exams.map((exam) => (
            <motion.button
              key={exam.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => toggleExam(exam.id)}
              className={cn(
                "relative h-32 rounded-3xl border-2 transition-all p-5 text-left flex flex-col justify-between overflow-hidden group",
                formData.exams.includes(exam.id) 
                  ? "border-primary bg-primary/5 shadow-lg shadow-primary/5" 
                  : "border-slate-100 bg-white hover:border-primary/30"
              )}
            >
              <div className={cn(
                "w-10 h-10 rounded-2xl flex items-center justify-center text-white bg-gradient-to-br",
                exam.color
              )}>
                {exam.icon}
              </div>
              
              <span className={cn(
                "font-black text-xs uppercase tracking-widest",
                formData.exams.includes(exam.id) ? "text-primary" : "text-slate-900"
              )}>
                {exam.label}
              </span>

              <AnimatePresence>
                {formData.exams.includes(exam.id) && (
                  <motion.div 
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="absolute top-4 right-4 bg-primary text-white p-1 rounded-full"
                  >
                    <Check size={12} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          ))}
        </div>

        <div className="flex gap-4">
          <button onClick={handleBack} className="flex-1 btn-secondary h-16">
            <ChevronLeft size={20} /> BACK
          </button>
          <button 
            disabled={formData.exams.length === 0}
            onClick={handleNext}
            className="flex-2 btn-primary h-16 shadow-xl shadow-primary/20 disabled:opacity-50"
          >
            CONTINUE <ChevronRight size={20} />
          </button>
        </div>
      </div>
    );
  };

  const renderStep3 = () => {
    const situations = [
      { id: 'class-11', label: 'Class 11', sub: 'The journey begins here.', icon: '🌱' },
      { id: 'class-12', label: 'Class 12', sub: 'The final showdown year.', icon: '⚔️' },
      { id: 'dropper', label: 'Dropper', sub: "You know what it takes. Let's finish this.", icon: '🦅' },
      { id: 'college', label: 'College Student', sub: 'Parallel prep mode on.', icon: '🏢' }
    ];

    return (
      <div className="space-y-10">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-display font-black text-slate-900 leading-tight uppercase tracking-tight">Where are you right now?</h2>
          <p className="text-slate-500 font-medium">This helps us tailor your study roadmap.</p>
        </div>

        <div className="space-y-4">
          {situations.map((situ) => (
            <motion.button
              key={situ.id}
              whileHover={{ x: 5 }}
              onClick={() => setFormData(prev => ({ ...prev, situation: situ.id }))}
              className={cn(
                "w-full h-24 rounded-3xl border-2 px-8 flex items-center gap-6 text-left transition-all",
                formData.situation === situ.id 
                  ? "border-primary bg-primary/5 shadow-xl shadow-primary/5 translate-x-1" 
                  : "border-slate-100 bg-white hover:border-primary/20"
              )}
            >
              <div className="text-3xl filter grayscale-[0.5] group-hover:grayscale-0 transition-all">{situ.icon}</div>
              <div className="flex-1">
                <h3 className={cn(
                  "font-black text-sm uppercase tracking-widest",
                  formData.situation === situ.id ? "text-primary" : "text-slate-900"
                )}>
                  {situ.label}
                </h3>
                <p className="text-xs font-medium text-slate-400">{situ.sub}</p>
              </div>
              {formData.situation === situ.id && (
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white">
                  <Check size={14} />
                </div>
              )}
            </motion.button>
          ))}
        </div>

        <div className="flex gap-4">
          <button onClick={handleBack} className="flex-1 btn-secondary h-16">
            <ChevronLeft size={20} /> BACK
          </button>
          <button 
            disabled={!formData.situation}
            onClick={handleNext}
            className="flex-2 btn-primary h-16 shadow-xl shadow-primary/20 disabled:opacity-50"
          >
            CONTINUE <ChevronRight size={20} />
          </button>
        </div>
      </div>
    );
  };

  const renderStep4 = () => {
    const topics = [
      'Circular Motion', 'Integration', 'Organic Chem', 'Electromagnetism',
      'Modern Physics', 'Trigonometry', 'Probability', 'Plant Physiology',
      'Human Anatomy', 'Coordination Compounds', 'Thermodynamics', 'Vectors & 3D'
    ];

    const toggleTopic = (topic: string) => {
      setFormData(prev => {
        if (prev.weakTopics.includes(topic)) {
          return { ...prev, weakTopics: prev.weakTopics.filter(t => t !== topic) };
        }
        if (prev.weakTopics.length >= 5) return prev;
        return { ...prev, weakTopics: [...prev.weakTopics, topic] };
      });
    };

    return (
      <div className="space-y-10">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-display font-black text-slate-900 leading-tight uppercase tracking-tight">Which topics give you nightmares?</h2>
          <div className="flex flex-col items-center gap-2">
            <p className="text-slate-500 font-medium">Select up to 5 areas where you need the most improvement.</p>
            <div className={cn(
              "px-3 py-1 bg-slate-100 rounded-full text-[10px] font-black uppercase tracking-widest transition-colors",
              formData.weakTopics.length === 5 ? "bg-amber-100 text-amber-600" : "text-slate-400"
            )}>
              {formData.weakTopics.length}/5 Selected
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          {topics.map((topic) => (
            <motion.button
              key={topic}
              whileTap={{ scale: 0.95 }}
              onClick={() => toggleTopic(topic)}
              className={cn(
                "h-12 px-6 rounded-2xl border-2 text-[10px] font-black uppercase tracking-widest transition-all",
                formData.weakTopics.includes(topic)
                  ? "bg-rose-500 border-rose-500 text-white shadow-lg shadow-rose-500/20"
                  : "bg-white border-slate-100 text-slate-500 hover:border-slate-200"
              )}
            >
              {topic}
            </motion.button>
          ))}
        </div>

        <div className="flex gap-4">
          <button onClick={handleBack} className="flex-1 btn-secondary h-16">
            <ChevronLeft size={20} /> BACK
          </button>
          <button 
            disabled={formData.weakTopics.length === 0}
            onClick={handleNext}
            className="flex-2 btn-primary h-16 shadow-xl shadow-primary/20 disabled:opacity-50"
          >
            CONTINUE <ChevronRight size={20} />
          </button>
        </div>
      </div>
    );
  };

  const renderStep5 = () => {
    const goals = ['30 mins', '1 hour', '2 hours', '3+ hours'];

    return (
      <div className="space-y-10">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-display font-black text-slate-900 leading-tight uppercase tracking-tight">How much time can you give daily?</h2>
          <p className="text-slate-500 font-medium">Consistency is more important than raw hours.</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {goals.map((goal) => (
            <button
              key={goal}
              onClick={() => setFormData({ ...formData, studyGoal: goal })}
              className={cn(
                "h-20 rounded-3xl border-2 font-black text-[10px] uppercase tracking-widest transition-all",
                formData.studyGoal === goal
                  ? "bg-primary border-primary text-white shadow-lg"
                  : "bg-white border-slate-100 text-slate-500 hover:border-primary/20"
              )}
            >
              {goal}
            </button>
          ))}
        </div>

        <div className="p-8 bg-slate-50 rounded-[40px] border border-slate-100 space-y-6">
          <div className="flex items-center justify-between">
             <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-primary shadow-sm">
                  <Bell size={24} />
                </div>
                <div className="space-y-0.5">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-900">Study Reminders</h4>
                  <p className="text-[10px] font-medium text-slate-400">Remind me to study daily</p>
                </div>
             </div>
             <button 
              onClick={() => setFormData({ ...formData, notificationsEnabled: !formData.notificationsEnabled })}
              className={cn(
                "w-12 h-6 rounded-full p-1 transition-colors relative",
                formData.notificationsEnabled ? "bg-primary" : "bg-slate-200"
              )}
             >
                <motion.div 
                  animate={{ x: formData.notificationsEnabled ? 24 : 0 }}
                  className="w-4 h-4 bg-white rounded-full shadow-sm"
                />
             </button>
          </div>

          <AnimatePresence>
            {formData.notificationsEnabled && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden space-y-3 pt-3 border-t border-slate-200"
              >
                <label className="text-[9px] font-black uppercase tracking-widest text-slate-400">Preferred Reminder Time</label>
                <div className="flex items-center gap-4">
                   <Clock className="text-primary" size={20} />
                   <input 
                    type="time" 
                    value={formData.studyTime}
                    onChange={(e) => setFormData({ ...formData, studyTime: e.target.value })}
                    className="vibrant-input h-14 font-black"
                   />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex gap-4">
          <button onClick={handleBack} className="flex-1 btn-secondary h-16">
            <ChevronLeft size={20} /> BACK
          </button>
          <button 
            disabled={loading}
            onClick={handleFinish}
            className="flex-2 btn-primary h-16 bg-slate-900 hover:bg-black border-slate-900 shadow-xl shadow-black/10 flex items-center justify-center gap-3"
          >
            {loading ? <Star className="animate-spin" /> : <>FINISH SETUP <Rocket size={20} /></>}
          </button>
        </div>
      </div>
    );
  };

  if (showCelebration) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center overflow-hidden">
        <motion.div 
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center space-y-8 p-12"
        >
          <div className="w-48 h-48 bg-primary rounded-[64px] flex items-center justify-center mx-auto text-white shadow-2xl shadow-primary/40 relative">
            <Trophy size={80} />
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 border-4 border-dashed border-white/30 rounded-[64px]"
            />
          </div>
          <div className="space-y-4">
            <h2 className="text-5xl font-display font-black text-slate-900 uppercase tracking-tighter">Profile Ready!</h2>
            <p className="text-slate-500 font-medium text-lg">Redirecting you to your power dashboard...</p>
          </div>
          <div className="flex justify-center gap-2">
            {[1, 2, 3].map(i => (
              <motion.div 
                key={i}
                animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                className="w-3 h-3 bg-primary rounded-full"
              />
            ))}
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 relative flex flex-col font-sans">
      {/* Dynamic Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -mr-64 -mt-64" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[120px] -ml-64 -mb-64" />
      </div>

      {/* Header Progress */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-100 h-24 flex flex-col justify-end">
        <div className="max-w-screen-xl mx-auto w-full px-6 flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-primary text-white rounded-xl flex items-center justify-center font-black text-sm">CS</div>
             <div>
                <h1 className="text-xs font-black uppercase tracking-widest text-slate-900 leading-none">Scholar Portal</h1>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Initialization Flow</p>
             </div>
          </div>
          <div className="text-[10px] font-black text-primary uppercase tracking-[0.2em] bg-primary/5 px-4 py-2 rounded-full border border-primary/10">
            Step {step} of 5
          </div>
        </div>
        <div className="w-full h-1.5 bg-slate-100 overflow-hidden">
          <motion.div 
            className="h-full bg-primary"
            initial={{ width: '0%' }}
            animate={{ width: `${(step / 5) * 100}%` }}
            transition={{ type: 'spring', stiffness: 50, damping: 20 }}
          />
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-6 sm:p-12 relative z-10">
        <div className="w-full max-w-2xl">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={step}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              className="vibrant-card p-10 sm:p-16"
            >
              {step === 1 && renderStep1()}
              {step === 2 && renderStep2()}
              {step === 3 && renderStep3()}
              {step === 4 && renderStep4()}
              {step === 5 && renderStep5()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Support Badge */}
      <footer className="h-20 flex items-center justify-center p-6">
        <div className="flex items-center gap-3 text-slate-400">
           <ShieldCheck size={16} />
           <span className="text-[9px] font-black uppercase tracking-widest">End-to-End Encryption Enabled</span>
        </div>
      </footer>
    </div>
  );
};

export default Onboarding;
