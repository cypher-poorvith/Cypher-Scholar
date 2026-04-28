import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import AdminContentManager from '../components/admin/AdminContentManager';
import { 
  Plus, Bell, Globe, ArrowDownRight, ArrowUpRight, Shield, TrendingUp,
  LayoutDashboard, Users, BookOpen, BarChart3, Settings as SettingsIcon, LogOut 
} from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const { profile, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    { label: 'Total Revenue', value: '$2.4M', trend: '+12.5%', icon: <BarChart3 size={18} />, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    { label: 'User Growth', value: '14.2K', trend: '+8.2%', icon: <Users size={18} />, color: 'text-pr', bg: 'bg-pr/10' },
    { label: 'Active Scholars', value: '89.4K', trend: '+4.1%', icon: <BookOpen size={18} />, color: 'text-sec', bg: 'bg-sec/10' },
    { label: 'Conversion Rate', value: '6.8%', trend: '-1.2%', icon: <TrendingUp size={18} />, color: 'text-red-500', bg: 'bg-red-500/10', down: true },
  ];

  return (
    <div className="flex min-h-[calc(100vh-58px)] bg-surface-bg dark:bg-slate-950 animate-fade-up">
      {/* Sidebar - Precision Control */}
      <aside className="w-[280px] bg-white dark:bg-slate-900 border-r border-border-subtle py-8 shrink-0 hidden lg:flex flex-col">
        <div className="px-6 mb-12">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-pr to-sec p-[1px] shadow-lg shadow-pr/20">
               <div className="w-full h-full bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center text-[1rem] font-black">
                 {profile?.displayName?.substring(0,2).toUpperCase() || 'AD'}
               </div>
            </div>
            <div>
               <p className="text-[0.85rem] font-black uppercase tracking-tight text-tx-main dark:text-white leading-none mb-1">Cypher Admin</p>
               <p className="text-[0.55rem] font-black text-tx-dim uppercase tracking-[0.2em]">Institutional Access</p>
            </div>
          </div>
        </div>

        <div className="flex-1 space-y-2 px-4">
          {[
            { id: 'overview', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
            { id: 'content', label: 'Content Lab', icon: <BookOpen size={20} /> },
            { id: 'users', label: 'User Directory', icon: <Users size={20} /> },
            { id: 'analytics', label: 'Analytics', icon: <BarChart3 size={20} /> },
            { id: 'settings', label: 'Configuration', icon: <SettingsIcon size={20} /> },
          ].map((tab) => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-5 py-3.5 rounded-xl text-[0.8rem] font-black uppercase tracking-wider transition-all ${
                activeTab === tab.id 
                ? 'bg-pr text-white shadow-lg shadow-pr/25' 
                : 'text-tx-muted hover:bg-surface-subtle dark:hover:bg-slate-800'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        <div className="px-6 mt-auto space-y-4">
           <button className="btn-primary w-full h-[50px] shadow-lg shadow-pr/20 flex items-center justify-center gap-2">
              <Plus size={18} /> New Report
           </button>
           <div className="pt-6 border-t border-border-subtle text-[0.7rem] font-black uppercase tracking-widest ">
             <Link to="/dashboard" className="text-tx-dim hover:text-pr flex items-center gap-2 mb-4">
                ← Exit Admin Portal
             </Link>
             <button 
               onClick={signOut}
               className="flex items-center gap-2 text-red-500 hover:opacity-80 transition-all font-black"
             >
                <LogOut size={16} /> Logout Session
             </button>
           </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 p-8 md:p-12 overflow-y-auto no-scrollbar">
        {activeTab === 'overview' && (
          <div className="space-y-10 animate-fade-up">
              <div className="flex justify-between items-end">
                <div>
                  <h2 className="text-[3rem] font-black tracking-tight leading-none mb-2 uppercase text-tx-main dark:text-white">Executive Overview</h2>
                  <p className="text-[0.9rem] font-medium text-tx-dim">Platform health and strategic metrics.</p>
                </div>
                <div className="flex items-center gap-4">
                   <button className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-800 border border-border-subtle flex items-center justify-center text-tx-main shadow-sm hover:border-pr/50 transition-all">
                      <Bell size={20} />
                   </button>
                   <div className="h-12 px-6 rounded-2xl bg-white dark:bg-slate-800 border border-border-subtle flex items-center gap-3 text-[0.7rem] font-black uppercase tracking-widest shadow-sm">
                      <Globe size={16} className="text-pr" /> Q3 2024
                   </div>
                </div>
              </div>

             {/* KPIs */}
             <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
                {stats.map((s, i) => (
                  <div key={i} className="glass-panel nh p-8 group relative overflow-hidden">
                    <div className="flex justify-between items-start mb-10">
                       <div className={`w-14 h-14 rounded-2xl ${s.bg} flex items-center justify-center ${s.color} transition-transform group-hover:scale-110`}>
                          {s.icon}
                       </div>
                       <div className={`flex items-center gap-1 text-[0.65rem] font-black px-2.5 py-1 rounded-lg ${s.down ? 'bg-red-500/10 text-red-500' : 'bg-emerald-500/10 text-emerald-500'}`}>
                          {s.down ? <ArrowDownRight size={12} /> : <ArrowUpRight size={12} />}
                          {s.trend}
                       </div>
                    </div>
                    <p className="text-[0.65rem] font-black uppercase tracking-[0.1em] text-tx-dim mb-2">{s.label}</p>
                    <div className="text-[2.2rem] font-black tracking-tighter leading-none text-tx-main dark:text-white">{s.value}</div>
                  </div>
                ))}
             </div>
             
             {/* Charts Row */}
             <div className="grid lg:grid-cols-3 gap-8">
                {/* Revenue Trajectory Chart */}
                <div className="glass-panel nh p-8 lg:col-span-2 relative overflow-hidden">
                   <div className="flex justify-between items-center mb-10">
                      <div>
                        <h3 className="text-[1.2rem] font-black uppercase tracking-tight text-tx-main dark:text-white">Revenue Trajectory</h3>
                        <p className="text-[0.7rem] font-black text-tx-dim uppercase tracking-widest mt-1">12-month rolling performance</p>
                      </div>
                      <div className="flex gap-2">
                         {['1M', '1Y', 'ALL'].map(p => (
                           <button key={p} className={`h-8 px-4 rounded-xl text-[0.6rem] font-black uppercase tracking-widest transition-all ${p === '1Y' ? 'bg-pr text-white' : 'bg-surface-subtle dark:bg-slate-800 text-tx-dim'}`}>
                              {p}
                           </button>
                         ))}
                      </div>
                   </div>
                   
                   {/* Simple Data visualization (Mock) */}
                   <div className="h-64 flex items-end justify-between gap-2 border-b border-border-subtle relative group">
                      {[30, 45, 40, 60, 55, 75, 90, 85, 100, 95, 110, 120].map((h, i) => (
                        <div key={i} className="flex-1 space-y-2 group/bar">
                           <div 
                             className={`w-full rounded-t-xl transition-all duration-700 ${i === 11 ? 'bg-pr' : 'bg-surface-subtle dark:bg-slate-800'} hover:bg-sec`}
                             style={{ height: `${h}%` }}
                           />
                           <div className="text-center text-[0.5rem] font-black text-tx-dim uppercase tracking-tighter opacity-0 group-hover:opacity-100 transition-opacity">
                             {['J','F','M','A','M','J','J','A','S','O','N','D'][i]}
                           </div>
                        </div>
                      ))}
                      <div className="absolute top-0 right-0 p-4">
                         <div className="text-[1.5rem] font-black text-tx-main dark:text-white">$2.4M</div>
                         <p className="text-[0.6rem] font-black text-emerald-500 uppercase">Target reached</p>
                      </div>
                   </div>
                </div>

                {/* Right Column: Strategic Insight + Map */}
                <div className="space-y-8 flex flex-col">
                   <div className="glass-panel nh p-8 flex-1 relative overflow-hidden group">
                      <div className="flex items-center gap-3 mb-6">
                        <Globe size={18} className="text-pr" />
                        <h3 className="text-[0.8rem] font-black uppercase tracking-widest text-tx-main dark:text-white">Global Distribution</h3>
                      </div>
                      <div className="aspect-video bg-surface-subtle dark:bg-slate-800 rounded-3xl overflow-hidden relative border border-border-subtle">
                         <img 
                           src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1472&auto=format&fit=crop" 
                           className="w-full h-full object-cover opacity-20 grayscale brightness-150" 
                           alt="WorldData" 
                         />
                         <div className="absolute top-[30%] left-[20%] w-3 h-3 bg-sec rounded-full animate-pulse" />
                         <div className="absolute top-[40%] left-[45%] w-4 h-4 bg-pr rounded-full animate-pulse delay-75" />
                         <div className="absolute top-[25%] left-[75%] w-2 h-2 bg-indigo-500 rounded-full" />
                      </div>
                      <div className="mt-6 flex flex-col gap-4">
                         <div className="flex justify-between items-center text-[0.7rem] font-black uppercase">
                            <span className="text-tx-dim">North America</span>
                            <span className="text-tx-main dark:text-white">45%</span>
                         </div>
                         <div className="w-full bg-surface-subtle dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                            <div className="bg-pr h-full rounded-full" style={{ width: '45%' }} />
                         </div>
                      </div>
                   </div>

                   <div className="glass-panel nh p-8 border-l-4 border-l-sec">
                      <div className="flex items-center gap-3 mb-4">
                         <div className="w-8 h-8 rounded-xl bg-sec/10 flex items-center justify-center text-sec">
                           <Shield size={16} />
                         </div>
                         <h4 className="text-[0.75rem] font-black uppercase tracking-[0.1em] text-sec">Strategic Insight</h4>
                      </div>
                      <p className="text-[0.85rem] font-medium text-tx-muted leading-relaxed">
                        Enterprise adoption in the European sector shows a 14% quarter-over-quarter increase. Recommended allocation of marketing budget to emphasize institutional rigor features.
                      </p>
                   </div>
                </div>
             </div>

             {/* Recent Activity Table */}
             <div className="glass-panel nh p-0 overflow-hidden">
                <div className="p-8 border-b border-border-subtle flex justify-between items-center">
                   <h3 className="text-[1.2rem] font-black uppercase tracking-tight text-tx-main dark:text-white">Recent Institutional Activity</h3>
                   <button className="text-[0.7rem] font-black text-pr uppercase tracking-widest hover:underline flex items-center gap-2">
                     View All Activity <ArrowUpRight size={14} />
                   </button>
                </div>
                <div className="overflow-x-auto">
                   <table className="w-full text-left border-collapse">
                      <thead>
                         <tr className="bg-surface-subtle dark:bg-slate-800/50">
                            <th className="p-6 text-[0.6rem] font-black uppercase tracking-widest text-tx-dim">Institution</th>
                            <th className="p-6 text-[0.6rem] font-black uppercase tracking-widest text-tx-dim">Plan Tier</th>
                            <th className="p-6 text-[0.6rem] font-black uppercase tracking-widest text-tx-dim">Active Scholars</th>
                            <th className="p-6 text-[0.6rem] font-black uppercase tracking-widest text-tx-dim">Status</th>
                         </tr>
                      </thead>
                      <tbody className="divide-y divide-border-subtle">
                         {[
                           { n: 'University of Cambridge', t: 'Enterprise Global', a: '1,240', s: 'Healthy', c: 'text-emerald-500 bg-emerald-500/10' },
                           { n: 'Stanford Research Institute', t: 'Enterprise Core', a: '850', s: 'Healthy', c: 'text-emerald-500 bg-emerald-500/10' },
                           { n: 'MIT Media Lab', t: 'Custom Research', a: '320', s: 'Review', c: 'text-amber-500 bg-amber-500/10' }
                         ].map((row, i) => (
                           <tr key={i} className="hover:bg-pr/5 transition-colors group cursor-pointer">
                              <td className="p-6 font-black text-[0.85rem] text-tx-main dark:text-white">{row.n}</td>
                              <td className="p-6 text-[0.8rem] font-medium text-tx-muted">{row.t}</td>
                              <td className="p-6 text-[0.8rem] font-black text-tx-main dark:text-white">{row.a}</td>
                              <td className="p-6">
                                 <span className={`px-3 py-1 rounded-full text-[0.6rem] font-black uppercase tracking-widest ${row.c}`}>
                                    {row.s}
                                 </span>
                              </td>
                           </tr>
                         ))}
                      </tbody>
                   </table>
                </div>
             </div>
          </div>
        )}

        {/* ... Rest of tabs (users, content) stay functional but inherit styles ... */}
        {activeTab === 'users' && (
          <div className="space-y-10 animate-fade-up">
             <div>
                <h2 className="text-[3rem] font-black tracking-tight uppercase text-tx-main dark:text-white">User Directory</h2>
                <p className="text-[0.9rem] font-medium text-tx-dim">Manage student accounts and editor privileges.</p>
             </div>

             <div className="glass-panel nh overflow-hidden p-0">
                <div className="p-8 border-b border-border-subtle flex justify-between items-center">
                   <div className="flex gap-4">
                      <input placeholder="Search users..." className="glass-panel nh h-12 px-6 text-[0.85rem] min-w-[300px]" />
                      <button className="h-12 px-6 rounded-2xl bg-surface-subtle dark:bg-slate-800 text-[0.7rem] font-black uppercase">Filter</button>
                   </div>
                   <button className="btn-primary h-12 px-8">Invite Member</button>
                </div>
                <table className="w-full text-left border-collapse">
                   <thead>
                      <tr className="bg-surface-subtle dark:bg-slate-800/50">
                         <th className="p-6 text-[0.6rem] font-black uppercase tracking-widest text-tx-dim">Principal</th>
                         <th className="p-6 text-[0.6rem] font-black uppercase tracking-widest text-tx-dim">Status</th>
                         <th className="p-6 text-[0.6rem] font-black uppercase tracking-widest text-tx-dim">Permissions</th>
                         <th className="p-6 text-[0.6rem] font-black uppercase tracking-widest text-tx-dim">Joined</th>
                         <th className="p-6 text-[0.6rem] font-black uppercase tracking-widest text-tx-dim">Actions</th>
                      </tr>
                   </thead>
                   <tbody className="divide-y divide-border-subtle">
                      {[
                        { n: 'Poorvith M P', e: 'poorvith@ex.com', r: 'Superadmin', s: 'Active', d: 'Oct 2025' },
                        { n: 'Kiran Kumar', e: 'kiran@scholar.com', r: 'Student', s: 'Active', d: 'Jan 2026' },
                        { n: 'Sneha Rao', e: 'sneha@editor.com', r: 'Editor', s: 'Pending', d: 'Feb 2026' }
                      ].map((u, i) => (
                        <tr key={i} className="hover:bg-pr/5 transition-colors group">
                           <td className="p-6">
                              <div className="flex items-center gap-4">
                                 <div className="w-10 h-10 rounded-2xl bg-surface-subtle dark:bg-slate-800 flex items-center justify-center font-black text-[0.75rem] text-pr">
                                   {u.n.substring(0, 2)}
                                 </div>
                                 <div className="leading-none">
                                    <p className="text-[0.9rem] font-black text-tx-main dark:text-white mb-1">{u.n}</p>
                                    <p className="text-[0.7rem] font-medium text-tx-dim">{u.e}</p>
                                 </div>
                              </div>
                           </td>
                           <td className="p-6">
                              <span className={`px-2.5 py-1 rounded-lg text-[0.6rem] font-black uppercase tracking-widest ${u.s === 'Active' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'}`}>{u.s}</span>
                           </td>
                           <td className="p-6">
                              <span className="text-[0.75rem] font-black text-tx-main dark:text-white uppercase tracking-wider">{u.r}</span>
                           </td>
                           <td className="p-6 text-[0.7rem] font-black text-tx-dim uppercase">{u.d}</td>
                           <td className="p-6">
                              <button className="text-[0.7rem] font-black text-pr uppercase hover:underline">Manage Access</button>
                           </td>
                        </tr>
                      ))}
                   </tbody>
                </table>
             </div>
          </div>
        )}

        {/* content manager tab */}
        {activeTab === 'content' && (
          <div className="h-full animate-fade-up">
             <div className="mb-10">
                <h2 className="text-[3rem] font-black tracking-tight uppercase text-tx-main dark:text-white">Content Lab</h2>
                <p className="text-[0.9rem] font-medium text-tx-dim">Create and moderate educational modules with real-time feedback.</p>
             </div>
             <AdminContentManager />
          </div>
        )}

        {['analytics', 'settings'].includes(activeTab) && (
          <div className="space-y-8 animate-fade-up h-[500px] flex flex-col items-center justify-center text-center">
             <div className="w-20 h-20 rounded-[2rem] bg-surface-subtle dark:bg-slate-800 flex items-center justify-center text-tx-muted mb-6 shadow-inner">
                {activeTab === 'analytics' ? <BarChart3 size={40} /> : <SettingsIcon size={40} />}
             </div>
             <h2 className="text-[2rem] font-black tracking-tight uppercase text-tx-main dark:text-white">{activeTab} Interface</h2>
             <p className="text-[0.85rem] font-black text-tx-dim uppercase tracking-[0.2em]">Interface currently being calibrated...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;

