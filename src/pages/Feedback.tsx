import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, MessageSquare, Send, CheckCircle2, ShieldAlert } from 'lucide-react';

const Feedback: React.FC = () => {
  const [feedback, setFeedback] = useState('');
  const [msg, setMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMsg('TRANSMISSION SUCCESS: Telemetric Report Logged.');
    setFeedback('');
    setTimeout(() => setMsg(''), 5000);
  };

  return (
    <div className="p-8 space-y-12 max-w-3xl mx-auto animate-in fade-in duration-700">
      <header className="space-y-6 text-center md:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/5 border border-primary/10 rounded-full text-[10px] font-bold text-primary uppercase tracking-widest">
           Send Feedback // Help Us Improve
        </div>
        <h1 className="text-5xl md:text-7xl font-display font-black text-slate-900 leading-none uppercase tracking-tighter">
          Share Your<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Thoughts</span>
        </h1>
        <p className="text-slate-500 font-medium max-w-sm">We value your input. Help us build the ultimate learning platform for standard excellence.</p>
      </header>

      <div className="vibrant-card p-10 bg-white shadow-xl shadow-primary/5">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.25em] mb-4 block">Your Message</label>
            <textarea 
              className="vibrant-input w-full min-h-[200px] resize-none"
              placeholder="What can we do better? Found a bug? Let us know!"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
             <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]"></div>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Channel: Live Secure</span>
             </div>
             <button type="submit" className="btn-primary w-full sm:w-auto h-14 px-10 flex items-center justify-center gap-4">
               SUBMIT FEEDBACK
               <Send size={18} />
             </button>
          </div>
        </form>
        {msg && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 p-6 rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-600 text-center text-[10px] font-bold uppercase tracking-widest shadow-sm"
          >
            <div className="flex items-center justify-center gap-2">
               <CheckCircle2 size={16} />
               SUCCESS: FEEDBACK RECEIVED & LOGGED
            </div>
          </motion.div>
        )}
      </div>

      <div className="vibrant-card p-8 flex flex-col sm:flex-row items-center gap-8 bg-slate-50 border-slate-100 shadow-sm">
        <div className="w-16 h-16 rounded-[24px] bg-white text-amber-500 flex items-center justify-center shadow-md border border-slate-50/50">
           <ShieldAlert size={32} />
        </div>
        <div className="flex-1 text-center sm:text-left">
           <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest mb-1">Direct Support</h4>
           <p className="text-[11px] text-slate-500 font-medium leading-relaxed max-w-sm mx-auto sm:mx-0">
             Need immediate help? Contact our support team directly for any issues with your accounts or course materials.
           </p>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
