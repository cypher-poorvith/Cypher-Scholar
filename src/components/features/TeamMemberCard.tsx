import React from 'react';
import { motion } from 'motion/react';
import { Mail, MoreVertical, Edit3, Activity, Trash2, Zap } from 'lucide-react';
import { UserProfile, UserRole } from '../../types';
import GlassCard from '../ui/GlassCard';
import Badge from '../ui/Badge';
import { formatDate } from '../../lib/utils';

interface TeamMemberCardProps {
  member: UserProfile;
  isCurrentUser: boolean;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({ 
  member, 
  isCurrentUser, 
  onEdit, 
  onDelete 
}) => {
  return (
    <GlassCard className={cn("p-6 flex flex-col relative group overflow-hidden", isCurrentUser && "border-primary/30")}>
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary p-1 flex items-center justify-center shadow-2xl relative">
            <div className="w-full h-full bg-slate-900 rounded-xl flex items-center justify-center text-white font-black text-xl overflow-hidden border border-white/10 uppercase">
              {member.photoURL ? <img src={member.photoURL} alt="" /> : member.displayName.charAt(0)}
            </div>
            {member.isActive && (
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-success border-4 border-slate-900 rounded-full shadow-lg"></div>
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-black text-white leading-tight">{member.displayName}</h3>
              {isCurrentUser && (
                <Badge variant="primary" className="h-4 px-1.5 py-0">You</Badge>
              )}
            </div>
            <div className="flex items-center gap-1.5 mt-1 text-slate-500">
              <Mail size={12} />
              <span className="text-xs font-medium truncate max-w-[150px]">{member.email}</span>
            </div>
          </div>
        </div>
        <button className="text-slate-600 hover:text-white transition-colors">
          <MoreVertical size={20} />
        </button>
      </div>

      <div className="flex items-center gap-2 mb-6">
        <Badge variant={member.role === UserRole.SUPERADMIN ? 'danger' : 'primary'}>
          {member.role}
        </Badge>
        <div className="flex items-center gap-1 ml-auto">
          {Object.entries(member.permissions || {}).map(([key, value], i) => (
            value && (
              <div key={key} title={key} className="w-6 h-6 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center text-slate-500">
                <Zap size={12} />
              </div>
            )
          ))}
        </div>
      </div>

      <div className="mt-auto grid grid-cols-2 gap-4 pt-6 border-t border-white/5">
        <div>
          <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest mb-1">Created</p>
          <p className="text-xs font-bold text-slate-300">{formatDate(member.createdAt).split(',')[0]}</p>
        </div>
        <div>
          <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest mb-1">Status</p>
          <p className="text-xs font-bold text-slate-300 uppercase">{member.status}</p>
        </div>
      </div>

      {!isCurrentUser && (
        <div className="absolute inset-0 bg-primary/10 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center gap-4">
           <button onClick={() => onEdit(member.id)} className="w-12 h-12 rounded-2xl bg-slate-900 border border-white/10 text-white hover:text-primary transition-colors flex items-center justify-center shadow-2xl">
              <Edit3 size={20} />
           </button>
           <button className="w-12 h-12 rounded-2xl bg-slate-900 border border-white/10 text-white hover:text-secondary transition-colors flex items-center justify-center shadow-2xl">
              <Activity size={20} />
           </button>
           <button onClick={() => onDelete(member.id)} className="w-12 h-12 rounded-2xl bg-slate-900 border border-white/10 text-white hover:text-danger transition-colors flex items-center justify-center shadow-2xl">
              <Trash2 size={20} />
           </button>
        </div>
      )}
    </GlassCard>
  );
};

// Helper for cn in components that might not have utils imported correctly in my thought process
const cn = (...classes: any[]) => classes.filter(Boolean).join(' ');

export default TeamMemberCard;
