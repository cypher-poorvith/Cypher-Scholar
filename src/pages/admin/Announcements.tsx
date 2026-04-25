import React, { useState } from 'react';
import { 
  Megaphone, 
  Plus, 
  Search, 
  Send, 
  Clock, 
  Eye, 
  MoreVertical, 
  CheckCircle2, 
  AlertTriangle, 
  Info,
  Calendar,
  Users,
  Target
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const Announcements: React.FC = () => {
  const [showAdd, setShowAdd] = useState(false);

  const announcements = [
    { id: 1, title: 'JEE Advanced Series Live', type: 'info', status: 'active', reached: '12.4k', date: '2h ago' },
    { id: 2, title: 'Maintenance Schedule Notification', type: 'warning', status: 'scheduled', reached: '0', date: 'In 2d' },
    { id: 3, title: 'Welcome to Cypher Scholar V4', type: 'success', status: 'archived', reached: '89.1k', date: '14 Jan' },
  ];

  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-700">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-display font-black text-white tracking-tight">Announcements Hub</h1>
          <p className="text-slate-500 font-medium mt-1">Broadcast critical data and updates to the entire network.</p>
        </div>
        <button 
          onClick={() => setShowAdd(true)}
          className="immersive-button-primary h-12 px-8"
        >
          <Plus size={18} />
          Create Broadcast
        </button>
      </header>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-6">
         <div className="immersive-card p-6 border-indigo-600/20">
            <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4">Total Reach</h3>
            <div className="flex items-center justify-between">
              <span className="text-4xl font-black text-white">102.5k</span>
              <div className="w-12 h-12 rounded-2xl bg-indigo-600/10 flex items-center justify-center text-indigo-400">
                <Users size={24} />
              </div>
            </div>
         </div>
         <div className="immersive-card p-6 border-emerald-600/20">
            <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4">Active Broadcasts</h3>
            <div className="flex items-center justify-between">
              <span className="text-4xl font-black text-white">4</span>
              <div className="w-12 h-12 rounded-2xl bg-emerald-600/10 flex items-center justify-center text-emerald-400">
                <Send size={24} />
              </div>
            </div>
         </div>
         <div className="immersive-card p-6 border-purple-600/20">
            <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4">Avg. Engagement</h3>
            <div className="flex items-center justify-between">
              <span className="text-4xl font-black text-white">74%</span>
              <div className="w-12 h-12 rounded-2xl bg-purple-600/10 flex items-center justify-center text-purple-400">
                <Target size={24} />
              </div>
            </div>
         </div>
      </div>

      {/* List */}
      <div className="immersive-card overflow-hidden">
        <div className="p-6 border-b border-white/5 flex items-center justify-between">
           <h3 className="text-sm font-black text-white uppercase tracking-widest">Global Handshakes</h3>
           <div className="flex items-center gap-2">
              <div className="relative">
                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600" size={14} />
                 <input type="text" placeholder="Filter announcements..." className="immersive-input h-9 pl-9 text-[10px] w-56" />
              </div>
           </div>
        </div>
        <div className="divide-y divide-white/5">
           {announcements.map((a) => (
             <div key={a.id} className="p-6 flex items-center justify-between group hover:bg-white/[0.01] transition-all">
                <div className="flex items-center gap-6">
                   <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-inner relative overflow-hidden ${
                     a.type === 'warning' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' :
                     a.type === 'success' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' :
                     'bg-indigo-500/10 text-indigo-500 border-indigo-500/20'
                   }`}>
                      {a.type === 'warning' ? <AlertTriangle size={24} /> : a.type === 'success' ? <CheckCircle2 size={24} /> : <Info size={24} />}
                   </div>
                   <div>
                      <h4 className="text-base font-bold text-white group-hover:text-indigo-400 transition-colors">{a.title}</h4>
                      <div className="flex items-center gap-4 mt-2">
                         <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full border ${
                           a.status === 'active' ? 'text-emerald-400 border-emerald-500/30' :
                           a.status === 'scheduled' ? 'text-amber-400 border-amber-500/30' :
                           'text-slate-500 border-white/10'
                         }`}>
                           {a.status}
                         </span>
                         <span className="text-[10px] text-slate-500 font-mono flex items-center gap-1">
                            <Clock size={12} />
                            {a.date}
                         </span>
                         <span className="text-[10px] text-slate-500 font-mono flex items-center gap-1">
                            <Eye size={12} />
                            {a.reached} Reach
                         </span>
                      </div>
                   </div>
                </div>
                <div className="flex items-center gap-4">
                   <button className="immersive-button h-10 px-4 text-[10px] font-black uppercase tracking-widest">Edit</button>
                   <button className="text-slate-600 hover:text-white transition-colors">
                      <MoreVertical size={20} />
                   </button>
                </div>
             </div>
           ))}
        </div>
      </div>

      {/* Add Modal Placeholder */}
      <AnimatePresence>
        {showAdd && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
             <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-[#0D0A1F]/80 backdrop-blur-sm"
              onClick={() => setShowAdd(false)}
             />
             <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="immersive-card w-full max-w-2xl p-10 relative z-10 border-white/10 shadow-2xl"
             >
                <h2 className="text-2xl font-display font-black text-white uppercase tracking-widest mb-8">Initiate Universal Broadcast</h2>
                <div className="space-y-6">
                   <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block">Broadcast Title</label>
                      <input type="text" className="immersive-input w-full" placeholder="Major system update incoming..." />
                   </div>
                   <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block">Message Content</label>
                      <textarea className="immersive-input w-full min-h-[150px] py-4" placeholder="Enter announcement details..." />
                   </div>
                   <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block">Target Audience</label>
                        <select className="immersive-input w-full">
                           <option>Global Nexus (All)</option>
                           <option>Students Only</option>
                           <option>Editors Only</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block">Broadcast Priority</label>
                        <div className="flex items-center gap-3 mt-2">
                           <button className="flex-1 h-10 rounded-xl bg-indigo-600/10 border border-indigo-600 text-indigo-400 text-[9px] font-black uppercase tracking-widest">Normal</button>
                           <button className="flex-1 h-10 rounded-xl bg-white/5 border border-white/5 text-slate-500 text-[9px] font-black uppercase tracking-widest hover:border-rose-500/30 hover:text-rose-500 transition-all">Critical</button>
                        </div>
                      </div>
                   </div>
                </div>
                <div className="mt-10 flex items-center justify-end gap-4 pt-8 border-t border-white/5">
                   <button 
                    onClick={() => setShowAdd(false)}
                    className="text-sm font-bold text-slate-500 hover:text-white px-6 transition-colors"
                   >
                     Discard Draft
                   </button>
                   <button className="immersive-button-primary h-12 px-10">
                      Synchronize & Broadcast
                   </button>
                </div>
             </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Announcements;
