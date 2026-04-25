import React, { useState, useEffect } from 'react';
import { Subject } from '../types';
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
      const response = await fetch('/api/subjects');
      if (response.ok) {
        setSubjects(await response.json());
      }
    } catch (e) { console.error(e); }
    setLoading(false);
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  return (
    <main className="flex-1 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="mb-8">
        <h1 className="text-4xl font-display font-bold text-slate-900 tracking-tight mb-2">Welcome back, <span className="primary-gradient-text">{profile?.displayName?.split(' ')[0] || 'Admin'}</span>!</h1>
        <p className="text-sm font-medium text-slate-500 uppercase tracking-widest">Here's your command center overview for today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Total Users", value: "1,234", trend: "+12% this week", icon: <Users size={20} className="text-primary" />, color: "bg-primary/10" },
          { label: "Team Members", value: "5", trend: "Active now: 3", icon: <ShieldCheck size={20} className="text-secondary" />, color: "bg-secondary/10" },
          { label: "Total Content", value: "456", trend: "+5 added today", icon: <Database size={20} className="text-chemistry" />, color: "bg-chemistry/10" },
          { label: "Tests Attempted", value: "3,456", trend: "+8% completion rate", icon: <Activity size={20} className="text-biology" />, color: "bg-biology/10" },
        ].map((stat, i) => (
          <div key={i} className="vibrant-card p-6 relative overflow-hidden group hover:scale-[1.02] transition-all">
            <div className="flex justify-between items-start mb-6 relative z-10">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{stat.label}</span>
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center border border-slate-100 ${stat.color}`}>
                {stat.icon}
              </div>
            </div>
            <div className="text-4xl font-black text-slate-900 relative z-10">{stat.value}</div>
            <div className="mt-4 flex items-center gap-1 text-[10px] font-bold text-slate-400 uppercase tracking-widest relative z-10">
              {stat.trend.includes('+') ? (
                <TrendingUp size={12} className="text-success" />
              ) : null}
              {stat.trend}
            </div>
          </div>
        ))}
      </div>

      {/* Bento Layout Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* System Health */}
        <div className="lg:col-span-2 vibrant-card p-8 flex flex-col gap-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <h2 className="text-xl font-display font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <Activity size={20} className="text-physics" /> 
              System Health
            </h2>
            <button className="text-slate-400 hover:text-primary transition-colors" onClick={() => fetchSubjects()}>
              <RefreshCcw size={16} />
            </button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 flex-1">
            <div className="bg-slate-50 rounded-xl p-6 border border-slate-100 flex flex-col justify-center">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">API Response Time</span>
              <div className="flex items-end gap-2">
                <span className="text-3xl font-black text-physics">45<span className="text-sm font-medium text-slate-400">ms</span></span>
              </div>
              <div className="w-full bg-slate-200 h-1.5 rounded-full mt-4 overflow-hidden">
                <div className="bg-physics h-full rounded-full w-[20%]"></div>
              </div>
            </div>
            
            <div className="bg-slate-50 rounded-xl p-6 border border-slate-100 flex flex-col justify-center">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Active Sessions</span>
              <div className="flex items-end gap-2">
                <span className="text-3xl font-black text-primary">67</span>
              </div>
              <div className="w-full bg-slate-200 h-1.5 rounded-full mt-4 overflow-hidden">
                <div className="bg-primary h-full rounded-full w-[45%]"></div>
              </div>
            </div>
            
            <div className="sm:col-span-2 bg-slate-50 rounded-xl p-6 border border-slate-100">
              <div className="flex justify-between items-center mb-3">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Storage Capacity</span>
                <span className="text-[10px] font-bold text-slate-900 uppercase tracking-widest">2.3 GB / 10 GB</span>
              </div>
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                <div className="bg-linear-to-r from-primary to-secondary h-full rounded-full w-[23%]"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Live Activity */}
        <div className="vibrant-card p-8 flex flex-col h-[400px]">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6 shrink-0">
            <h2 className="text-xl font-display font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-error animate-pulse"></div>
              Live activity
            </h2>
          </div>
          <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar flex flex-col gap-4">
            {[
              { user: "Sarah Jenkins", action: "registered as a new student", time: "2 mins ago", icon: <UserPlus size={14} />, color: "text-primary", bg: "bg-primary/10" },
              { user: "Alex Chen (Staff)", action: "uploaded 'Advanced Physics Part 1'", time: "15 mins ago", icon: <UploadCloud size={14} />, color: "text-chemistry", bg: "bg-chemistry/10" },
              { user: "System", action: "Failed login attempt detected from IP 192.168.1.1", time: "1 hr ago", icon: <AlertTriangle size={14} />, color: "text-warning", bg: "bg-warning/10" },
              { user: "Course Admin", action: "Physics 101 Midterm was published", time: "2 hrs ago", icon: <Zap size={14} />, color: "text-secondary", bg: "bg-secondary/10" },
            ].map((activity, i) => (
              <div key={i} className="flex gap-4 items-start p-3 rounded-xl hover:bg-slate-50 transition-colors group">
                <div className={`w-8 h-8 rounded-lg ${activity.bg} flex items-center justify-center shrink-0 border border-slate-100 ${activity.color}`}>
                  {activity.icon}
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-600 leading-snug">
                    <span className="font-bold text-slate-900">{activity.user}</span> {activity.action}
                  </p>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1 block">{activity.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="lg:col-span-3 vibrant-card p-8">
          <h2 className="text-xl font-display font-bold text-slate-900 tracking-tight border-b border-slate-100 pb-4 mb-8">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: "Add Team Member", icon: <UserPlus className="text-primary" size={24} />, color: "hover:border-primary/50 hover:bg-primary/5" },
              { label: "Upload Content", icon: <UploadCloud className="text-chemistry" size={24} />, color: "hover:border-chemistry/50 hover:bg-chemistry/5" },
              { label: "Send Announcement", icon: <Megaphone className="text-physics" size={24} />, color: "hover:border-physics/50 hover:bg-physics/5" },
              { label: "View Audit Logs", icon: <History className="text-slate-500" size={24} />, color: "hover:border-slate-200 hover:bg-slate-50" },
            ].map((action, i) => (
              <button key={i} className={`vibrant-card p-6 flex flex-col items-center justify-center gap-4 transition-all group ${action.color}`}>
                <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm border border-slate-100">
                  {action.icon}
                </div>
                <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">{action.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default AdminDashboard;
