import React from 'react';
import { motion } from 'motion/react';
import { 
  Plus, 
  Clock, 
  CheckCircle2, 
  FileText, 
  Trophy, 
  ArrowRight,
  TrendingUp,
  Award
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const EditorDashboard: React.FC = () => {
  const { profile } = useAuth();

  const stats = [
    { label: 'Content Uploaded', value: '23', icon: <FileText size={20} />, color: 'indigo' },
    { label: 'Tests Created', value: '5', icon: <Trophy size={20} />, color: 'amber' },
    { label: 'Results Verified', value: '12', icon: <CheckCircle2 size={20} />, color: 'emerald' },
  ];

  const pendingTasks = [
    { id: 1, title: '8 test results awaiting verification', icon: <Clock size={16} />, link: '/editor/verify', type: 'verification' },
    { id: 2, title: 'Scholar JEE Main Series #6 - Draft', icon: <FileText size={16} />, link: '/editor/tests', type: 'edit' },
  ];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header */}
      <section className="vibrant-card p-10 bg-white border-l-8 border-primary shadow-xl shadow-primary/5">
        <h2 className="text-4xl md:text-5xl font-display font-black text-slate-900 leading-none uppercase tracking-tighter">Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">{profile?.displayName?.split(' ')[0]}!</span></h2>
        <p className="text-slate-500 font-medium text-lg mt-4 max-w-2xl">Shape the future of students by managing educational content and reviewing assessments from your workspace.</p>
      </section>

      {/* Activity Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <motion.div 
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="vibrant-card p-8 bg-white border-slate-100 flex items-center justify-between group hover:border-primary/20 transition-all shadow-sm"
          >
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
              <h3 className="text-4xl font-black text-slate-900 leading-none">{stat.value}</h3>
            </div>
            <div className={`w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-primary border border-slate-100 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all shadow-sm shadow-primary/5`}>
              {React.cloneElement(stat.icon as React.ReactElement<any>, { size: 28 })}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Pending Tasks */}
        <section className="vibrant-card p-8 bg-white border-slate-100 h-full shadow-sm">
          <div className="flex items-center justify-between mb-8 border-b border-slate-50 pb-6">
            <h3 className="text-lg font-black text-slate-900 uppercase tracking-widest flex items-center gap-3">
              <Clock size={20} className="text-primary" />
              Pending Tasks
            </h3>
            <span className="px-3 py-1 bg-primary/10 rounded-lg text-[10px] font-bold text-primary uppercase tracking-widest">{pendingTasks.length} Active</span>
          </div>
          
          <div className="space-y-4">
            {pendingTasks.map((task) => (
              <Link key={task.id} to={task.link} className="flex items-center justify-between p-5 bg-slate-50 border border-slate-100 rounded-2xl hover:bg-white hover:border-primary/20 transition-all group shadow-sm">
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-primary shadow-sm">
                    {task.icon}
                  </div>
                  <span className="text-sm font-bold text-slate-700">{task.title}</span>
                </div>
                <ArrowRight size={18} className="text-slate-300 group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </Link>
            ))}
          </div>
        </section>

        {/* Quick Actions */}
        <section className="vibrant-card p-8 bg-white border-slate-100 h-full shadow-sm">
          <h3 className="text-lg font-black text-slate-900 uppercase tracking-widest mb-8 border-b border-slate-50 pb-6">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Upload Content', icon: <Plus size={24} />, link: '/editor/content', color: 'primary' },
              { label: 'Create Test', icon: <Award size={24} />, link: '/editor/tests', color: 'secondary' },
              { label: 'Verify Results', icon: <CheckCircle2 size={24} />, link: '/editor/verify', color: 'emerald' },
              { label: 'View Analytics', icon: <TrendingUp size={24} />, link: '/editor/analytics', color: 'cyan' },
            ].map((action) => (
              <Link 
                key={action.label} 
                to={action.link} 
                className="flex flex-col items-center justify-center gap-4 p-8 bg-slate-50 border border-slate-100 rounded-2xl hover:bg-white hover:border-primary/20 transition-all group shadow-sm overflow-hidden relative"
              >
                <div className="relative z-10 w-14 h-14 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-slate-700 group-hover:scale-110 group-hover:text-primary transition-all shadow-sm">
                  {action.icon}
                </div>
                <span className="relative z-10 text-[10px] font-bold text-slate-400 uppercase tracking-widest group-hover:text-slate-900 transition-colors">{action.label}</span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default EditorDashboard;
