import React from 'react';
import { motion } from 'motion/react';
import { Activity, User, FileText, Target, AlertCircle } from 'lucide-react';
import { cn, formatDate } from '../../lib/utils';
import GlassCard from '../ui/GlassCard';

interface ActivityItem {
  id: string;
  user: string;
  action: string;
  target: string;
  time: number;
  type: 'user' | 'content' | 'test' | 'system';
}

interface ActivityFeedProps {
  activities: ActivityItem[];
  className?: string;
  limit?: number;
}

const ActivityFeed: React.FC<ActivityFeedProps> = ({ 
  activities, 
  className,
  limit = 5
}) => {
  const icons = {
    user: <User size={16} />,
    content: <FileText size={16} />,
    test: <Target size={16} />,
    system: <AlertCircle size={16} />,
  };

  const colors = {
    user: "text-indigo-400 bg-indigo-500/10",
    content: "text-emerald-400 bg-emerald-500/10",
    test: "text-rose-400 bg-rose-500/10",
    system: "text-amber-400 bg-amber-500/10",
  };

  return (
    <GlassCard className={cn("p-0", className)}>
      <div className="p-6 border-b border-white/5 flex items-center justify-between">
        <h3 className="text-sm font-black text-white uppercase tracking-widest flex items-center gap-3">
          <Activity size={18} className="text-primary" />
          Real-time Event Stream
        </h3>
        <span className="text-[10px] font-mono text-slate-500 font-bold uppercase tracking-widest">Live Monitor</span>
      </div>
      <div className="divide-y divide-white/5 max-h-[500px] overflow-y-auto no-scrollbar">
        {activities.slice(0, limit).map((activity, i) => (
          <motion.div 
            key={activity.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-6 flex items-start gap-4 hover:bg-white/[0.01] transition-all group"
          >
            <div className={cn(
              "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border border-white/5 transition-transform group-hover:scale-110",
              colors[activity.type]
            )}>
              {icons[activity.type]}
            </div>
            <div className="flex-1 min-w-0">
               <p className="text-sm font-bold text-white leading-snug">
                  <span className="text-primary hover:underline cursor-pointer">{activity.user}</span>
                  <span className="text-slate-500 font-medium mx-1.5 lowercase">{activity.action}</span>
                  <span className="text-slate-200">{activity.target}</span>
               </p>
               <p className="text-[10px] text-slate-600 font-mono mt-1 font-black uppercase tracking-widest">
                  {formatDate(activity.time)}
               </p>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="p-4 bg-white/[0.01] text-center border-t border-white/5">
        <button className="text-[10px] font-black text-slate-500 hover:text-white uppercase tracking-[0.2em] transition-colors">
          View Global Event Manifest
        </button>
      </div>
    </GlassCard>
  );
};

export default ActivityFeed;
