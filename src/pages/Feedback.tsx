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
    <div className="p-8 space-y-12 max-w-3xl mx-auto">
      <header className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold text-cyan-400 uppercase tracking-widest">
           Send Feedback // Help Us Improve
        </div>
        <h1 className="text-5xl font-display font-black text-white uppercase tracking-tighter leading-[0.9]">
          Share Your<br/>Thoughts
        </h1>
      </header>

      <div className="immersive-card p-10 border-cyan-600/20">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.25em] mb-4 block">Your Message</label>
            <textarea 
              className="immersive-input w-full min-h-[200px] resize-none"
              placeholder="What can we do better? Found a bug? Let us know!"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              required
            />
          </div>

          <div className="flex items-center justify-between gap-6">
             <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse shadow-[0_0_8px_#06b6d4]"></div>
                <span className="text-[10px] text-slate-500 font-black font-mono uppercase tracking-widest">Channel: Live</span>
             </div>
             <button type="submit" className="immersive-button-primary h-14 px-10 bg-cyan-600 hover:bg-cyan-500 shadow-xl shadow-cyan-600/20">
               Send Feedback
               <Send size={18} />
             </button>
          </div>
        </form>
        {msg && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-center text-xs font-bold uppercase font-mono tracking-widest"
          >
            THANK YOU: Feedback sent successfully.
          </motion.div>
        )}
      </div>

      <div className="immersive-card p-6 flex items-center gap-6 bg-white/5">
        <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 shadow-inner">
           <ShieldAlert size={24} className="text-amber-500" />
        </div>
        <div className="flex-1">
           <h4 className="text-xs font-black text-white uppercase tracking-widest mb-1">Help & Support</h4>
           <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
             Need immediate help? Contact our support team directly for any issues with your account or content.
           </p>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
