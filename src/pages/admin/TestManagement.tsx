import React, { useState } from 'react';
import { 
  Trophy, Plus, Upload, Search, Filter, 
  CheckCircle2, Clock, AlertCircle, ChevronRight,
  BarChart3, FileText, Trash2, Edit, Eye, User
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../../context/AuthContext';

const TestManagement: React.FC = () => {
  const { profile } = useAuth();
  const [activeTab, setActiveTab] = useState<'create' | 'verify' | 'list'>('list');
  const [selectedTest, setSelectedTest] = useState<any>(null);

  // Mock data for tests
  const [tests, setTests] = useState([
    {
      id: 'scholar_jee_5',
      name: 'Scholar JEE Main Test Series #5',
      type: 'JEE Main',
      questions: 90,
      attempts: 234,
      verified: 180,
      pending: 54,
      status: 'active',
      date: '2024-12-10'
    },
    {
      id: 'scholar_jee_4',
      name: 'Scholar JEE Main Test Series #4',
      type: 'JEE Main',
      questions: 90,
      attempts: 562,
      verified: 562,
      pending: 0,
      status: 'completed',
      date: '2024-11-25'
    }
  ]);

  // Mock data for verification queue
  const pendingQueue = [
    {
      id: 'att_1',
      studentName: 'Rahul Sharma',
      studentEmail: 'rahul.s@example.com',
      testName: 'Scholar JEE Main Series #5',
      score: '234/300',
      timeTaken: '165 mins',
      submittedAt: 'Dec 15, 10:45 AM',
      flags: 0
    },
    {
      id: 'att_2',
      studentName: 'Priya Singh',
      studentEmail: 'priya.singh@example.com',
      testName: 'Scholar JEE Main Series #5',
      score: '198/300',
      timeTaken: '178 mins',
      submittedAt: 'Dec 15, 11:20 AM',
      flags: 2
    }
  ];

  // --- RENDERING TABS ---

  const renderTestsList = () => (
    <div className="space-y-8">
       <div className="flex items-center justify-between">
          <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">Test Series Management</h2>
          <button 
            onClick={() => setActiveTab('create')}
            className="h-12 px-6 bg-primary text-white rounded-xl text-xs font-black uppercase tracking-widest flex items-center gap-2 shadow-xl shadow-primary/20"
          >
             <Plus size={18} /> Create Official Series
          </button>
       </div>

       <div className="grid gap-4">
          {tests.map(test => (
            <div key={test.id} className="glass-panel p-6 border-white/5 flex flex-col md:flex-row items-center justify-between gap-6 hover:border-white/10 transition-all">
               <div className="flex items-center gap-6 flex-1">
                  <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                     <Trophy size={24} />
                  </div>
                  <div className="space-y-1">
                     <div className="flex items-center gap-3">
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{test.type} • {test.date}</span>
                        <span className={`text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded ${test.status === 'active' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-slate-500/10 text-slate-500'}`}>
                           {test.status}
                        </span>
                     </div>
                     <h3 className="text-lg font-black text-white uppercase italic tracking-tight">{test.name}</h3>
                  </div>
               </div>

               <div className="flex items-center gap-12">
                  <div className="grid grid-cols-2 gap-8 text-center">
                     <div>
                        <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1">Attempts</p>
                        <p className="text-lg font-black text-white">{test.attempts}</p>
                     </div>
                     <div>
                        <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1">Queue</p>
                        <p className={`text-lg font-black ${test.pending > 0 ? 'text-amber-500' : 'text-slate-500'}`}>{test.pending}</p>
                     </div>
                  </div>
                  <div className="flex items-center gap-2">
                     <button className="p-2.5 rounded-lg bg-white/5 text-slate-400 hover:text-white transition-colors" title="View Results">
                        <BarChart3 size={18} />
                     </button>
                     <button className="p-2.5 rounded-lg bg-white/5 text-slate-400 hover:text-white transition-colors" title="Edit Test">
                        <Edit size={18} />
                     </button>
                     <button 
                       onClick={() => setActiveTab('verify')}
                       className="h-10 px-4 bg-amber-500/10 text-amber-500 rounded-lg text-[10px] font-black uppercase tracking-widest border border-amber-500/20 hover:bg-amber-500/20 transition-all"
                     >
                        Verification Queue
                     </button>
                  </div>
               </div>
            </div>
          ))}
       </div>
    </div>
  );

  const renderCreateTest = () => (
    <div className="space-y-8 max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-500">
       <div className="flex items-center gap-4">
          <button onClick={() => setActiveTab('list')} className="p-2 bg-white/5 rounded-lg text-slate-400 hover:text-white"><ChevronRight size={20} className="rotate-180" /></button>
          <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">Create New Official Series</h2>
       </div>

       <div className="glass-panel p-10 border-white/5 space-y-10">
          <div className="grid gap-8">
             <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Series Name *</label>
                <input type="text" placeholder="Scholar JEE Main Test Series #6" className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl px-6 text-white font-bold focus:outline-none focus:border-primary" />
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                   <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Exam Type *</label>
                   <select className="w-full h-14 bg-[#121021] border border-white/10 rounded-2xl px-6 text-white font-bold">
                      <option>JEE Main</option>
                      <option>JEE Advanced</option>

                   </select>
                </div>
                <div className="space-y-2">
                   <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Total Duration (Mins) *</label>
                   <input type="number" placeholder="180" className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl px-6 text-white font-bold" />
                </div>
             </div>
          </div>

          <div className="space-y-4">
             <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Upload Question Paper</label>
             <div className="border-2 border-dashed border-white/10 rounded-3xl p-12 text-center space-y-4 hover:border-primary/50 transition-colors cursor-pointer group">
                <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto text-slate-500 group-hover:scale-110 transition-transform">
                   <Upload size={32} />
                </div>
                <div>
                   <p className="text-sm font-bold text-white uppercase tracking-tight">Drop PDF, Excel or JSON</p>
                   <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-1">Maximum file size: 10MB</p>
                </div>
             </div>
          </div>

          <div className="flex gap-4 pt-6 border-t border-white/5">
             <button className="flex-1 h-14 bg-white/5 text-slate-400 rounded-2xl font-black text-xs uppercase tracking-widest">Preview Test</button>
             <button onClick={() => setActiveTab('list')} className="flex-2 h-14 bg-primary text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-primary/20">Publish Series</button>
          </div>
       </div>
    </div>
  );

  const renderVerifyQueue = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
       <div className="flex items-center gap-4">
          <button onClick={() => setActiveTab('list')} className="p-2 bg-white/5 rounded-lg text-slate-400 hover:text-white"><ChevronRight size={20} className="rotate-180" /></button>
          <div className="space-y-1">
             <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">Verification Queue</h2>
             <p className="text-[10px] font-bold text-amber-500 uppercase tracking-widest">Scholar JEE Main Series #5</p>
          </div>
       </div>

       <div className="grid gap-6">
          {pendingQueue.map((item, idx) => (
             <div key={item.id} className="glass-panel p-8 border-white/5 relative overflow-hidden group">
                {item.flags > 0 && (
                   <div className="absolute top-0 right-0 px-4 py-1.5 bg-rose-500 text-white text-[8px] font-black uppercase tracking-[0.2em] rounded-bl-xl shadow-lg flex items-center gap-2">
                      <AlertCircle size={10} /> {item.flags} Suspect Activities Detected
                   </div>
                )}
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                   <div className="flex items-center gap-6 flex-1">
                      <div className="w-14 h-14 bg-white/5 rounded-xl flex items-center justify-center text-slate-400">
                         <User size={24} />
                      </div>
                      <div className="space-y-1">
                         <h3 className="text-lg font-black text-white uppercase italic tracking-tight">{item.studentName}</h3>
                         <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{item.studentEmail}</p>
                         <p className="text-[8px] font-bold text-slate-600 uppercase tracking-widest">Submitted: {item.submittedAt}</p>
                      </div>
                   </div>

                   <div className="flex items-center gap-12">
                      <div className="grid grid-cols-2 gap-8 text-center text-[10px] font-bold uppercase tracking-widest">
                         <div className="space-y-1">
                            <p className="text-slate-500">Calculated Score</p>
                            <p className="text-white text-lg font-black italic">{item.score}</p>
                         </div>
                         <div className="space-y-1">
                            <p className="text-slate-500">Time Taken</p>
                            <p className="text-white text-lg font-black italic">{item.timeTaken}</p>
                         </div>
                      </div>
                      <div className="flex items-center gap-3">
                         <button className="px-6 h-12 bg-white/5 text-slate-400 rounded-xl text-[10px] font-black uppercase tracking-widest hover:text-white transition-all">Review Detailed Attempt</button>
                         <button className="px-6 h-12 bg-emerald-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-emerald-600/20 hover:scale-105 transition-all">Verify & Publish</button>
                      </div>
                   </div>
                </div>
             </div>
          ))}
       </div>
    </div>
  );

  return (
    <div className="space-y-10 min-h-screen pb-20">
      <AnimatePresence mode="wait">
        {activeTab === 'list' && renderTestsList()}
        {activeTab === 'create' && renderCreateTest()}
        {activeTab === 'verify' && renderVerifyQueue()}
      </AnimatePresence>
    </div>
  );
};

export default TestManagement;
