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
    { name: "Physics", icon: <Brain />, color: "text-indigo-400" },
    { name: "Chemistry", icon: <Sparkles />, color: "text-emerald-400" },
    { name: "Math", icon: <Layers />, color: "text-cyan-400" },
    { name: "Biology", icon: <Library />, color: "text-rose-400" },
  ];

  const exams = [
    { name: "JEE Main", type: "Engineering", color: "from-indigo-500/20 to-indigo-600/20" },
    { name: "NEET", type: "Medical", color: "from-rose-500/20 to-rose-600/20" },
    { name: "UPSC", type: "Civil Services", color: "from-amber-500/20 to-amber-600/20" },
  ];

  return (
    <div ref={scrollRef} className="flex flex-col relative w-full overflow-x-hidden bg-[#0A0817]">
      {/* Background Atmosphere */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-[80vw] h-[80vh] bg-indigo-600/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[60vw] h-[60vh] bg-purple-600/5 blur-[120px] rounded-full" />
      </div>

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 pt-32 pb-20 relative z-10">
        {!user ? (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-5xl mx-auto"
          >
            <h1 className="text-6xl md:text-[8rem] font-sans font-black tracking-tighter mb-8 text-white uppercase leading-[0.85]">
              Master Every<br/>Subject, Ace<br/><span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20">Every Exam</span>
            </h1>
            
            <p className="max-w-2xl mx-auto text-xl text-slate-400 mb-12 font-medium">
              Free, comprehensive learning resources designed to help you understand complex topics visualized through modern interactive learning.
            </p>
            
            <div className="flex flex-wrap items-center justify-center gap-6">
              <Link to="/signup">
                <button className="h-16 px-12 bg-indigo-600 text-white rounded-full font-black text-xs uppercase tracking-[0.3em] flex items-center gap-3 hover:scale-105 transition-all shadow-xl shadow-indigo-600/20">
                  Get Started Free
                  <ArrowRight size={20} />
                </button>
              </Link>
              
              <Link to="/subjects/all">
                <button className="h-16 px-12 bg-white/5 border border-white/10 text-white rounded-full font-black text-xs uppercase tracking-[0.3em] flex items-center gap-3 hover:bg-white/10 transition-all">
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
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-8">
              Welcome back, {profile?.displayName || user?.displayName || 'Scholar'}
            </div>
            
            <h1 className="text-6xl md:text-8xl font-display font-black text-white uppercase tracking-tighter mb-8 leading-[0.9]">
              Let's continue your learning journey
            </h1>
            
            <Link to="/dashboard">
              <button className="h-20 px-16 bg-white text-[#0A0817] rounded-full font-black text-xl uppercase tracking-widest flex items-center gap-4 hover:scale-105 transition-all shadow-2xl">
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
                <div key={i} className="p-6 rounded-3xl bg-white/5 border border-white/10 text-left group hover:border-indigo-500/30 transition-colors">
                  <div className="text-indigo-400 mb-3">{stat.icon}</div>
                  <p className="text-2xl font-black text-white leading-none">{stat.val}</p>
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-2">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </section>

      {/* Popular Subjects */}
      <section className="py-24 px-6 border-y border-white/5 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-xs font-black text-slate-500 uppercase tracking-[0.4em] mb-12 text-center">Popular Learning Domains</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {subjects.map((sub, i) => (
              <Link to={`/subjects/${sub.name.toLowerCase()}`} key={i}>
                <div className="glass-panel p-8 text-center border-white/5 hover:border-indigo-500/30 group transition-all">
                  <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-white/5 flex items-center justify-center ${sub.color} group-hover:scale-110 transition-transform`}>
                    {React.cloneElement(sub.icon as React.ReactElement<any>, { size: 32 })}
                  </div>
                  <h3 className="text-xl font-black text-white uppercase tracking-tight">{sub.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Exams */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-xs font-black text-slate-500 uppercase tracking-[0.4em] mb-12 text-center">Exam Specific Prep</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {exams.map((exam, i) => (
              <div key={i} className={`p-10 rounded-[40px] bg-gradient-to-br ${exam.color} border border-white/5 hover:border-white/20 group transition-all cursor-pointer`}>
                <h3 className="text-4xl font-black text-white uppercase tracking-tighter mb-2">{exam.name}</h3>
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest">{exam.type}</p>
                <div className="mt-12 flex items-center justify-between">
                  <span className="text-[10px] font-black text-white uppercase tracking-widest underline underline-offset-8">Explore Course</span>
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white group-hover:bg-white group-hover:text-[#0A0817] transition-all">
                    <ArrowRight size={20} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Section */}
      <section className="py-40 px-6 bg-white/[0.01]">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="mb-6">THE LEARNING EDGE</Badge>
          <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter mb-12">Why Choose<br/>Cypher Scholar?</h2>
          
          <div className="space-y-4">
            {[
              "3D interactive lessons that visualize every concept",
              "Smart AI tutor that adapts to your learning style",
              "Complete Study Library: PDFs, Videos, and Tests",
              "Real-time progress tracking of every student",
              "Board-certified content (JEE, NEET, CBSE) verified by experts"
            ].map((item, i) => (
              <div key={i} className="glass-panel p-6 flex items-center gap-6 border-white/5 hover:bg-white/5 transition-colors">
                <CheckCircle2 size={24} className="text-emerald-400 shrink-0" />
                <p className="text-lg font-bold text-white uppercase tracking-tight text-left">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="py-20 border-t border-white/5 text-center relative z-10">
         <div className="flex flex-col items-center gap-6 mb-12">
            <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-slate-400 mb-4 border border-white/10 group hover:border-indigo-500 transition-all">
               <span className="text-3xl">🎓</span>
            </div>
            <div className="flex justify-center gap-10 opacity-30 grayscale hover:grayscale-0 transition-all duration-500">
               <ShieldCheck className="text-slate-400" />
               <Database className="text-slate-400" />
               <Network className="text-slate-400" />
               <Lock className="text-slate-400" />
            </div>
         </div>
         <p className="text-slate-600 font-bold text-[10px] uppercase tracking-[0.5em]">Cypher Scholar © 2026 // Helping Students Reach Their Goals Across India</p>
      </footer>
    </div>
  );
};

export default Landing;
