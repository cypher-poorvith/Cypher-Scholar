import React, { useState } from 'react';
import { 
  Settings2, 
  Globe, 
  Mail, 
  Bell, 
  ShieldCheck, 
  Cpu, 
  Database,
  Cloud,
  Lock,
  Eye,
  RefreshCw,
  Palette,
  Image as ImageIcon
} from 'lucide-react';

const AppSettings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('general');

  const tabs = [
    { id: 'general', label: 'General', icon: <Globe size={18} /> },
    { id: 'email', label: 'Email', icon: <Mail size={18} /> },
    { id: 'security', label: 'Security', icon: <ShieldCheck size={18} /> },
    { id: 'features', label: 'Features', icon: <Cpu size={18} /> },
    { id: 'backup', label: 'Backup', icon: <Database size={18} /> },
  ];

  return (
    <div className="p-8 space-y-8 animate-in slide-in-from-right-4 duration-700">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 shrink-0">
        <div>
          <h1 className="text-4xl font-display font-black text-white tracking-tight">App Configuration</h1>
          <p className="text-slate-500 font-medium mt-1">Global system variables and core feature toggles.</p>
        </div>
        <button className="immersive-button-primary h-12 px-8">
          Save All Changes
        </button>
      </header>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Tabs */}
        <div className="lg:w-64 shrink-0 space-y-2">
          {tabs.map((tab) => (
             <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-6 py-4 rounded-2xl text-sm font-bold transition-all ${
                activeTab === tab.id 
                  ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-600/20' 
                  : 'text-slate-500 hover:text-white hover:bg-white/5 border border-transparent'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-1 space-y-6 max-w-4xl">
           <div className="immersive-card p-10 space-y-10">
              {activeTab === 'general' && (
                <div className="space-y-8 animate-in fade-in duration-500">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block">Application Name</label>
                      <input type="text" className="immersive-input w-full" defaultValue="Cypher Scholar" />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block">System Protocol</label>
                      <select className="immersive-input w-full cursor-pointer appearance-none">
                        <option>HTTPS / SSL v3</option>
                        <option>Direct Nexus Peer</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-6 p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                    <div className="flex items-center justify-between">
                       <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-white/10 flex items-center justify-center text-indigo-400 font-black">C</div>
                          <div>
                            <h4 className="text-sm font-black text-white">Platform Branding</h4>
                            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Logo and icons</p>
                          </div>
                       </div>
                       <button className="immersive-button text-xs">Update Branding Assets</button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block">Primary Visual Theme</label>
                    <div className="grid grid-cols-4 gap-4">
                       <button className="h-20 rounded-2xl border-4 border-indigo-600 ring-4 ring-indigo-600/10 bg-[#0D0A1F] relative overflow-hidden group">
                          <div className="absolute inset-x-0 bottom-0 py-1 bg-indigo-600 text-[8px] font-black text-white uppercase tracking-widest text-center">Immersive</div>
                       </button>
                       <button className="h-20 rounded-2xl border border-white/5 bg-slate-900 group grayscale hover:grayscale-0 transition-all">
                          <div className="flex flex-col items-center justify-center h-full opacity-30">
                            <Palette size={20} />
                          </div>
                       </button>
                       <button className="h-20 rounded-2xl border border-white/5 bg-slate-50 group grayscale hover:grayscale-0 transition-all opacity-10 pointer-events-none">
                       </button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'features' && (
                <div className="space-y-6 animate-in fade-in duration-500">
                  <h3 className="text-lg font-black text-white mb-8">Modular Control Terminal</h3>
                  {[
                    { id: 'video', label: 'Video Lectures Architecture', desc: 'Global synchronization of video modules.', status: true },
                    { id: 'quiz', label: 'Adaptive Testing Engine', desc: 'AI-driven question difficulty scaling.', status: true },
                    { id: 'chat', label: 'Doubt Nexus Protocol', desc: 'Real-time peer-to-peer communication.', status: false },
                    { id: 'shop', label: 'Gamification Nodes', desc: 'Reward distribution and leaderboard syncing.', status: true },
                  ].map((feat) => (
                    <div key={feat.id} className="flex items-center justify-between p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-all cursor-pointer group">
                       <div className="flex items-center gap-4">
                          <div className={`w-11 h-11 rounded-2xl flex items-center justify-center border transition-colors ${feat.status ? 'bg-indigo-600/10 border-indigo-500/20 text-indigo-400' : 'bg-white/5 border-white/5 text-slate-600'}`}>
                             <Cpu size={20} />
                          </div>
                          <div>
                            <h4 className="text-sm font-black text-white">{feat.label}</h4>
                            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">{feat.desc}</p>
                          </div>
                       </div>
                       <div className={`w-14 h-7 rounded-full transition-all relative ${feat.status ? 'bg-indigo-600' : 'bg-slate-800'}`}>
                          <div className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-all ${feat.status ? 'left-8' : 'left-1'}`} />
                       </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'backup' && (
                <div className="flex flex-col items-center justify-center py-10 space-y-8 animate-in zoom-in-95 duration-500">
                   <div className="w-24 h-24 rounded-[2rem] bg-indigo-600/10 flex items-center justify-center text-indigo-500 shadow-inner relative group">
                      <div className="absolute inset-0 bg-indigo-500 rounded-[2rem] animate-ping opacity-10"></div>
                      <Cloud size={48} className="relative z-10" />
                   </div>
                   <div className="text-center space-y-2">
                     <h3 className="text-xl font-bold text-white uppercase tracking-widest">Manual Cloud Backup</h3>
                     <p className="text-sm text-slate-500 max-w-sm mx-auto">Create a full backup of all student data and study materials to the cloud.</p>
                   </div>
                   <div className="flex gap-4">
                     <button className="immersive-button-primary h-14 px-10">
                        <RefreshCw size={20} />
                        Execute Backup Now
                     </button>
                   </div>
                   <div className="w-full pt-10 border-t border-white/5">
                      <div className="flex items-center justify-between text-[10px] font-black text-slate-600 uppercase tracking-widest">
                         <span>Last Successful Sync: 14h 22m ago</span>
                         <span>Cluster Health: 100%</span>
                      </div>
                   </div>
                </div>
              )}

              {activeTab === 'security' && (
                <div className="space-y-10 animate-in fade-in duration-500">
                  <div className="space-y-6">
                    <h3 className="text-sm font-black text-white uppercase tracking-widest border-b border-white/5 pb-4">Security Policies</h3>
                    <div className="grid md:grid-cols-2 gap-8">
                       <div className="space-y-3">
                          <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block">Session Timeout (Seconds)</label>
                          <input type="number" className="immersive-input w-full" defaultValue="3600" />
                       </div>
                       <div className="space-y-3">
                          <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block">Failed Attempt Threshold</label>
                          <input type="number" className="immersive-input w-full" defaultValue="5" />
                       </div>
                    </div>
                  </div>

                  <div className="p-8 rounded-3xl bg-rose-500/5 border border-rose-500/10 flex flex-col items-center gap-6">
                     <Lock size={32} className="text-rose-500 opacity-50" />
                     <div className="text-center">
                        <h4 className="text-sm font-black text-white uppercase tracking-widest">Two-Factor Authentication</h4>
                        <p className="text-xs text-slate-500 font-medium mt-2">Force 2FA across all admin and staff accounts for better security.</p>
                     </div>
                     <button className="h-11 px-8 rounded-xl bg-rose-500 text-white text-[10px] font-black uppercase tracking-widest hover:bg-rose-600 transition-colors">
                        Enable Mandatory 2FA
                     </button>
                  </div>
                </div>
              )}
           </div>
        </div>
      </div>
    </div>
  );
};

export default AppSettings;
