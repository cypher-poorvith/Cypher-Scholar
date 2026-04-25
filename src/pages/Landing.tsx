import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  BookOpen, 
  Target, 
  BarChart3, 
  ShieldCheck, 
  Zap, 
  Globe, 
  Cpu, 
  Network, 
  Database,
  Layers,
  Sparkles,
  Search,
  MessageSquare,
  Lock,
  Trophy,
  Star,
  Users,
  CheckCircle2,
  XCircle,
  Building2,
  GraduationCap,
  CreditCard,
  Brain,
  Library,
  Play,
  Clock
} from 'lucide-react';
import Button from '../components/ui/Button';
import GlassCard from '../components/ui/GlassCard';
import Badge from '../components/ui/Badge';
import { useAuth } from '../context/AuthContext';

const Landing: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start end", "end start"]
  });

  const xTranslate = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);
  const xTranslateReverse = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const yTranslate = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  const features = [
    { 
      icon: <Brain className="text-primary" />, 
      title: "Smart Study Path", 
      desc: "Our AI finds exactly where you are struggling and builds a personalized roadmap for your success.",
      color: "from-blue-500/20 to-indigo-500/20"
    },
    { 
      icon: <Layers className="text-secondary" />, 
      title: "Interactive 3D Lessons", 
      desc: "Visualize complex topics in Physics, Chemistry, and Math with high-quality 3D models and animations.",
      color: "from-purple-500/20 to-pink-500/20"
    },
    { 
      icon: <Zap className="text-yellow-400" />, 
      title: "Live Doubt Solving", 
      desc: "Connect with expert teachers and peers instantly. Get your doubts cleared in real-time.",
      color: "from-amber-500/20 to-orange-500/20"
    },
    { 
      icon: <ShieldCheck className="text-emerald-400" />, 
      title: "Proven Results", 
      desc: "Track your progress with detailed reports verified by top educators to ensure you're exam-ready.",
      color: "from-emerald-500/20 to-teal-500/20"
    },
    { 
      icon: <Library className="text-rose-400" />, 
      title: "Study Library", 
      desc: "Get unlimited access to premium notes, video lectures, and thousands of practice mock tests.",
      color: "from-rose-500/20 to-red-500/20"
    },
    { 
      icon: <Globe className="text-cyan-400" />, 
      title: "All Exam Content", 
      desc: "Complete study material for JEE, NEET, UPSC, and Board Exams across India.",
      color: "from-cyan-500/20 to-blue-500/20"
    }
  ];

  const testimonials = [
    {
      quote: "This platform turned my JEE preparation from a mess into a clear, daily plan. The 3D physics lessons are a game changer.",
      author: "Rahul S.",
      role: "JEE Aspirant, AIR 84",
      company: "IIT Bombay"
    },
    {
      quote: "As a teacher, this is the first tool that shows me exactly where each student is stuck. It's much better than just looking at scores.",
      author: "Dr. Ananya P.",
      role: "Senior Physics Faculty",
      company: "Delhi Public School"
    },
    {
      quote: "The design makes students actually want to study. It's the most effective learning tool I've seen in years.",
      author: "Sarah J.",
      role: "Education Consultant",
      company: "Top Coaching Institute"
    }
  ];

  const { user, profile } = useAuth();

  const subjects = [
    { name: "Physics", icon: <Brain />, color: "text-blue-500" },
    { name: "Chemistry", icon: <Sparkles />, color: "text-green-500" },
    { name: "Math", icon: <Layers />, color: "text-violet-500" },
    { name: "Biology", icon: <Library />, color: "text-orange-500" },
  ];

  const exams = [
    { name: "JEE Main", type: "Engineering", color: "from-blue-50 to-indigo-50 border-blue-100", textColor: "text-blue-900" },
    { name: "NEET", type: "Medical", color: "from-rose-50 to-pink-50 border-rose-100", textColor: "text-rose-900" },
    { name: "UPSC", type: "Civil Services", color: "from-amber-50 to-yellow-50 border-amber-100", textColor: "text-amber-900" },
  ];

  return (
    <div ref={scrollRef} className="flex flex-col relative w-full overflow-x-hidden bg-slate-50">
      {/* Background Atmosphere */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-[80vw] h-[80vh] bg-primary/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[60vw] h-[60vh] bg-secondary/5 blur-[120px] rounded-full" />
      </div>

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 pt-32 pb-20 relative z-10">
        {!user ? (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-5xl mx-auto"
          >
            <h1 className="text-6xl md:text-[8rem] font-display font-black tracking-tighter mb-8 text-slate-900 leading-[0.85]">
              Master Every<br/>Subject, Ace<br/><span className="text-primary italic">Every Exam</span>
            </h1>
            
            <p className="max-w-2xl mx-auto text-xl text-slate-500 mb-12 font-medium">
              Comprehensive learning resources designed to help you understand complex topics visualized through modern interactive learning.
            </p>
            
            <div className="flex flex-wrap items-center justify-center gap-6">
              <Link to="/signup">
                <button className="h-16 px-12 btn-primary flex items-center gap-3">
                  Get Started Free
                  <ArrowRight size={20} />
                </button>
              </Link>
              
              <Link to="/subjects/all">
                <button className="h-16 px-12 btn-outline flex items-center gap-3">
                  Browse Subjects
                </button>
              </Link>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-[10px] font-bold text-primary uppercase tracking-widest mb-8">
              Welcome back, {profile?.displayName || 'Scholar'}
            </div>
            
            <h1 className="text-6xl md:text-8xl font-display font-black text-slate-900 uppercase tracking-tighter mb-8 leading-[0.9]">
              Let's continue your learning journey
            </h1>
            
            <Link to="/dashboard">
              <button className="h-20 px-16 btn-primary rounded-full text-xl flex items-center gap-4">
                Resume Learning
                <Play size={24} fill="currentColor" />
              </button>
            </Link>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16">
              {[
                { label: 'Streak', val: '7 Days', icon: <Zap size={16} /> },
                { label: 'Tests', val: '12 Done', icon: <Target size={16} /> },
                { label: 'Time', val: '24h', icon: <Clock size={16} /> },
                { label: 'Solved', val: '456 Qs', icon: <Brain size={16} /> },
              ].map((stat, i) => (
                <div key={i} className="vibrant-card p-6 text-left group">
                  <div className="text-primary mb-3">{stat.icon}</div>
                  <p className="text-2xl font-black text-slate-900 leading-none">{stat.val}</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </section>

      {/* Popular Subjects */}
      <section className="py-24 px-6 border-y border-slate-100 bg-white shadow-sm relative z-10">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-[0.4em] mb-12 text-center">Popular Learning Domains</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {subjects.map((sub, i) => (
              <Link to={`/subjects/${sub.name.toLowerCase()}`} key={i}>
                <div className="vibrant-card p-8 text-center group">
                  <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-slate-50 flex items-center justify-center ${sub.color} group-hover:scale-110 transition-transform`}>
                    {React.cloneElement(sub.icon as React.ReactElement<any>, { size: 32 })}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 uppercase tracking-tight">{sub.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Exams */}
      <section className="py-24 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-[0.4em] mb-12 text-center">Exam Specific Prep</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {exams.map((exam, i) => (
              <div key={i} className={`p-10 rounded-[40px] bg-gradient-to-br ${exam.color} border group transition-all cursor-pointer shadow-sm hover:shadow-md`}>
                <h3 className={`text-4xl font-display font-black ${exam.textColor} uppercase tracking-tighter mb-2`}>{exam.name}</h3>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">{exam.type}</p>
                <div className="mt-12 flex items-center justify-between">
                  <span className={`text-[10px] font-bold ${exam.textColor} uppercase tracking-widest underline underline-offset-8`}>Explore Course</span>
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                    <ArrowRight size={20} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Section */}
      <section className="py-40 px-6 bg-slate-100/50 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="mb-6">THE LEARNING EDGE</Badge>
          <h2 className="text-5xl md:text-7xl font-display font-black text-slate-900 tracking-tight mb-12">Why Choose<br/>Cypher Scholar?</h2>
          
          <div className="space-y-4">
            {[
              "3D interactive lessons that visualize every concept",
              "Smart AI tutor that adapts to your learning style",
              "Complete Study Library: PDFs, Videos, and Tests",
              "Real-time progress tracking of every student",
              "Board-certified content (JEE, NEET, CBSE) verified by experts"
            ].map((item, i) => (
              <div key={i} className="vibrant-card p-6 flex items-center gap-6 group">
                <CheckCircle2 size={24} className="text-green-500 shrink-0" />
                <p className="text-lg font-bold text-slate-700 tracking-tight text-left">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="py-20 border-t border-slate-100 text-center relative z-10 bg-white">
         <div className="flex flex-col items-center gap-6 mb-12">
            <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300 mb-4 border border-slate-100 group hover:border-primary transition-all">
               <span className="text-3xl">🎓</span>
            </div>
            <div className="flex justify-center gap-10 opacity-30">
               <ShieldCheck className="text-slate-400" />
               <Database className="text-slate-400" />
               <Network className="text-slate-400" />
               <Lock className="text-slate-400" />
            </div>
         </div>
         <p className="text-slate-400 font-bold text-[10px] uppercase tracking-[0.5em]">Cypher Scholar © 2026 // Helping Students Reach Their Goals Across India</p>
      </footer>
    </div>
  );
};

export default Landing;
