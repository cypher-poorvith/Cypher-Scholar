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
      <section className="glass-panel p-8 border-l-4 border-indigo-500">
        <h2 className="text-3xl font-black text-white uppercase tracking-tight">Welcome back, {profile?.displayName?.split(' ')[0]}!</h2>
        <p className="text-slate-400 font-medium mt-2">Manage your educational content and student assessments from one central hub.</p>
      </section>

      {/* Activity Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <motion.div 
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-panel p-6 border-white/5 flex items-center justify-between group hover:border-white/10 transition-colors"
          >
            <div>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">{stat.label}</p>
              <h3 className="text-4xl font-black text-white italic">{stat.value}</h3>
            </div>
            <div className={`w-12 h-12 rounded-2xl bg-${stat.color}-500/10 flex items-center justify-center text-${stat.color}-400 group-hover:scale-110 transition-transform`}>
              {stat.icon}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Pending Tasks */}
        <section className="glass-panel p-8 border-white/5 h-full">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-black text-white uppercase tracking-widest flex items-center gap-2">
              <Clock size={18} className="text-indigo-400" />
              Pending Tasks
            </h3>
            <span className="px-2 py-1 bg-white/5 rounded-lg text-[10px] font-black text-slate-500 uppercase tracking-widest">{pendingTasks.length} Active</span>
          </div>
          
          <div className="space-y-4">
            {pendingTasks.map((task) => (
              <Link key={task.id} to={task.link} className="flex items-center justify-between p-4 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 transition-all group">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-indigo-400">
                    {task.icon}
                  </div>
                  <span className="text-sm font-bold text-slate-300">{task.title}</span>
                </div>
                <ArrowRight size={16} className="text-slate-600 group-hover:text-white group-hover:translate-x-1 transition-all" />
              </Link>
            ))}
          </div>
        </section>

        {/* Quick Actions */}
        <section className="glass-panel p-8 border-white/5 h-full">
          <h3 className="text-lg font-black text-white uppercase tracking-widest mb-8">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Upload Content', icon: <Plus size={20} />, link: '/editor/content', color: 'indigo' },
              { label: 'Create Test', icon: <Award size={20} />, link: '/editor/tests', color: 'amber' },
              { label: 'Verify Results', icon: <CheckCircle2 size={20} />, link: '/editor/verify', color: 'emerald' },
              { label: 'View Analytics', icon: <TrendingUp size={20} />, link: '/editor/analytics', color: 'cyan' },
            ].map((action) => (
              <Link 
                key={action.label} 
                to={action.link} 
                className="flex flex-col items-center justify-center gap-3 p-6 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 transition-all group border-b-4 border-b-transparent hover:border-b-indigo-500"
              >
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                  {action.icon}
                </div>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest group-hover:text-white">{action.label}</span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default EditorDashboard;
