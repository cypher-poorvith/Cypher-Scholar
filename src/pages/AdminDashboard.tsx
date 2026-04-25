import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Subject, SubjectCategory } from '../types';
import { 
  Users, 
  ShieldCheck, 
  Database, 
  Activity, 
  RefreshCcw, 
  TrendingUp, 
  MonitorSmartphone, 
  UserPlus, 
  UploadCloud, 
  Megaphone, 
  History,
  Cloud,
  CheckCircle,
  AlertTriangle,
  Zap
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const AdminDashboard: React.FC = () => {
  const { profile } = useAuth();
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSubjects = async () => {
    try {
      const q = query(collection(db, 'subjects'), orderBy('order', 'asc'));
      const snapshot = await getDocs(q);
      setSubjects(snapshot.docs.map(d => ({ id: d.id, ...d.data() } as Subject)));
    } catch (e) { console.error(e); }
    setLoading(false);
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  return (
    <main className="flex-1 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="mb-8">
        <h1 className="text-4xl font-display font-black text-white uppercase tracking-tight mb-2">Welcome back, {profile?.displayName?.split(' ')[0] || 'Admin'}!</h1>
        <p className="text-sm font-medium text-slate-500 uppercase tracking-widest">Here's your command center overview for today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Total Users", value: "1,234", trend: "+12% this week", icon: <Users size={20} className="text-indigo-400" />, color: "bg-indigo-500/20" },
          { label: "Team Members", value: "5", trend: "Active now: 3", icon: <ShieldCheck size={20} className="text-purple-400" />, color: "bg-purple-500/20" },
          { label: "Total Content", value: "456", trend: "+5 added today", icon: <Database size={20} className="text-emerald-400" />, color: "bg-emerald-500/20" },
          { label: "Tests Attempted", value: "3,456", trend: "+8% completion rate", icon: <Activity size={20} className="text-orange-400" />, color: "bg-orange-500/20" },
        ].map((stat, i) => (
          <div key={i} className="glass-panel rounded-xl p-6 relative overflow-hidden group hover:scale-[1.02] transition-all">
            <div className="absolute inset-0 bg-white/[0.02] opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="flex justify-between items-start mb-6 relative z-10">
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{stat.label}</span>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border border-white/10 ${stat.color}`}>
                {stat.icon}
              </div>
            </div>
            <div className="text-4xl font-black text-white relative z-10">{stat.value}</div>
            <div className="mt-4 flex items-center gap-1 text-[10px] font-bold text-slate-400 uppercase tracking-widest relative z-10">
              {stat.trend.includes('+') ? (
                <TrendingUp size={12} className="text-emerald-500" />
              ) : null}
              {stat.trend}
            </div>
          </div>
        ))}
      </div>

      {/* Bento Layout Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* System Health */}
        <div className="lg:col-span-2 glass-panel rounded-xl p-8 flex flex-col gap-6">
          <div className="flex items-center justify-between border-b border-white/5 pb-4">
            <h2 className="text-xl font-display font-black text-white uppercase tracking-tight flex items-center gap-2">
              <Activity size={20} className="text-cyan-400" /> 
              System Health
            </h2>
            <button className="text-slate-500 hover:text-white transition-colors" onClick={() => fetchSubjects()}>
              <RefreshCcw size={16} />
            </button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 flex-1">
            <div className="bg-white/[0.02] rounded-xl p-6 border border-white/5 flex flex-col justify-center">
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">API Response Time</span>
              <div className="flex items-end gap-2">
                <span className="text-3xl font-black text-cyan-400">45<span className="text-sm font-medium text-slate-500">ms</span></span>
              </div>
              <div className="w-full bg-white/5 h-1.5 rounded-full mt-4 overflow-hidden">
                <div className="bg-cyan-400 h-full rounded-full w-[20%] shadow-[0_0_10px_#22d3ee]"></div>
              </div>
            </div>
            
            <div className="bg-white/[0.02] rounded-xl p-6 border border-white/5 flex flex-col justify-center">
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Active Sessions</span>
              <div className="flex items-end gap-2">
                <span className="text-3xl font-black text-indigo-400">67</span>
              </div>
              <div className="w-full bg-white/5 h-1.5 rounded-full mt-4 overflow-hidden">
                <div className="bg-indigo-400 h-full rounded-full w-[45%] shadow-[0_0_10px_#6366f1]"></div>
              </div>
            </div>
            
            <div className="sm:col-span-2 bg-white/[0.02] rounded-xl p-6 border border-white/5">
              <div className="flex justify-between items-center mb-3">
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Storage Capacity</span>
                <span className="text-[10px] font-bold text-white uppercase tracking-widest">2.3 GB / 10 GB</span>
              </div>
              <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                <div className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full rounded-full w-[23%]"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Live Activity */}
        <div className="glass-panel rounded-xl p-8 flex flex-col h-[400px]">
          <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6 shrink-0">
            <h2 className="text-xl font-display font-black text-white uppercase tracking-tight flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></div>
              Live activity
            </h2>
          </div>
          <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar flex flex-col gap-4">
            {[
              { user: "Sarah Jenkins", action: "registered as a new student", time: "2 mins ago", icon: <UserPlus size={14} />, color: "text-indigo-400", bg: "bg-indigo-400/20" },
              { user: "Alex Chen (Staff)", action: "uploaded 'Advanced Physics Part 1'", time: "15 mins ago", icon: <UploadCloud size={14} />, color: "text-emerald-400", bg: "bg-emerald-400/20" },
              { user: "System", action: "Failed login attempt detected from IP 192.168.1.1", time: "1 hr ago", icon: <AlertTriangle size={14} />, color: "text-orange-400", bg: "bg-orange-400/20" },
              { user: "Course Admin", action: "Physics 101 Midterm was published", time: "2 hrs ago", icon: <Zap size={14} />, color: "text-purple-400", bg: "bg-purple-400/20" },
            ].map((activity, i) => (
              <div key={i} className="flex gap-4 items-start p-3 rounded-xl hover:bg-white/[0.03] transition-colors group">
                <div className={`w-8 h-8 rounded-lg ${activity.bg} flex items-center justify-center shrink-0 border border-white/5 ${activity.color}`}>
                  {activity.icon}
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-300 leading-snug">
                    <span className="font-bold text-white">{activity.user}</span> {activity.action}
                  </p>
                  <span className="text-[9px] font-bold text-slate-600 uppercase tracking-widest mt-1 block">{activity.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="lg:col-span-3 glass-panel rounded-xl p-8">
          <h2 className="text-xl font-display font-black text-white uppercase tracking-tight border-b border-white/5 pb-4 mb-8">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: "Add Team Member", icon: <UserPlus className="text-indigo-400" size={24} />, color: "hover:border-indigo-500/50 hover:bg-indigo-500/5" },
              { label: "Upload Content", icon: <UploadCloud className="text-emerald-400" size={24} />, color: "hover:border-emerald-500/50 hover:bg-emerald-500/5" },
              { label: "Send Announcement", icon: <Megaphone className="text-cyan-400" size={24} />, color: "hover:border-cyan-500/50 hover:bg-cyan-500/5" },
              { label: "View Audit Logs", icon: <History className="text-slate-400" size={24} />, color: "hover:border-white/20 hover:bg-white/5" },
            ].map((action, i) => (
              <button key={i} className={`immersive-card p-6 flex flex-col items-center justify-center gap-4 transition-all group ${action.color}`}>
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner">
                  {action.icon}
                </div>
                <span className="text-xs font-black text-white uppercase tracking-widest">{action.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default AdminDashboard;
