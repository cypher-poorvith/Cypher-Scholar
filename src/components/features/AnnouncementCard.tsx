import React from 'react';
import { motion } from 'motion/react';
import { AlertTriangle, CheckCircle2, Info, Eye, Clock, MoreVertical } from 'lucide-react';
import { Announcement } from '../../types';
import GlassCard from '../ui/GlassCard';
import Badge from '../ui/Badge';
import { formatDate } from '../../lib/utils';

interface AnnouncementCardProps {
  announcement: Announcement;
  onEdit?: (id: string) => void;
  onView?: (id: string) => void;
}

const AnnouncementCard: React.FC<AnnouncementCardProps> = ({ 
  announcement, 
  onEdit, 
  onView 
}) => {
  const icons = {
    info: <Info size={24} />,
    warning: <AlertTriangle size={24} />,
    success: <CheckCircle2 size={24} />,
  };

  const variants = {
    info: "bg-primary/10 text-primary border-primary/20",
    warning: "bg-warning/10 text-warning border-warning/20",
    success: "bg-success/10 text-success border-success/20",
  };

  return (
    <div className="p-6 flex items-center justify-between group hover:bg-white/[0.01] transition-all border-b border-white/5 last:border-0">
      <div className="flex items-center gap-6">
        <div className={cn(
          "w-14 h-14 rounded-2xl flex items-center justify-center shadow-inner relative overflow-hidden border",
          variants[announcement.type]
        )}>
          {icons[announcement.type]}
        </div>
        <div>
          <h4 className="text-base font-bold text-white group-hover:text-primary transition-colors">{announcement.title}</h4>
          <div className="flex items-center gap-4 mt-2">
            <Badge variant={announcement.active ? 'success' : 'outline'}>
              {announcement.active ? 'Active' : 'Archived'}
            </Badge>
            <span className="text-[10px] text-slate-500 font-mono flex items-center gap-1 uppercase tracking-wider">
              <Clock size={12} />
              {formatDate(announcement.publishDate).split(',')[0]}
            </span>
            <span className="text-[10px] text-slate-500 font-mono flex items-center gap-1 uppercase tracking-wider">
              <Eye size={12} />
              {announcement.views >= 1000 ? `${(announcement.views / 1000).toFixed(1)}k` : announcement.views} Reach
            </span>
            <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest bg-white/5 px-2 py-0.5 rounded italic">
              TO: {announcement.targetAudience}
            </span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-4">
        {onEdit && (
          <button 
            onClick={() => onEdit(announcement.id)}
            className="immersive-button h-10 px-4 text-[10px] font-black uppercase tracking-widest"
          >
            Edit Module
          </button>
        )}
        <button className="text-slate-600 hover:text-white transition-colors">
          <MoreVertical size={20} />
        </button>
      </div>
    </div>
  );
};

const cn = (...classes: any[]) => classes.filter(Boolean).join(' ');

export default AnnouncementCard;
