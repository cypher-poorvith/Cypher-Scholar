import React from 'react';
import { UserProfile, UserRole, UserStatus } from '../../types';
import Badge from '../ui/Badge';
import { Eye, Edit2, ShieldAlert } from 'lucide-react';
import { formatDate } from '../../lib/utils';

interface UserRowProps {
  user: UserProfile;
  onView: (user: UserProfile) => void;
  onEdit: (user: UserProfile) => void;
  onAction: (user: UserProfile) => void;
}

const UserRow: React.FC<UserRowProps> = ({ user, onView, onEdit, onAction }) => {
  return (
    <tr className="hover:bg-white/[0.02] transition-colors group">
      <td className="px-6 py-4">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-primary/10 border border-white/10 flex items-center justify-center text-primary font-black relative overflow-hidden shadow-inner uppercase">
            {user.photoURL ? <img src={user.photoURL} alt="" /> : user.displayName.charAt(0)}
            {user.isActive && (
              <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-success border-2 border-[#16122D] rounded-full"></div>
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
               <p className="text-sm font-black text-white">{user.displayName}</p>
               {user.role === UserRole.SUPERADMIN && <span title="Platform Owner">👑</span>}
            </div>
            <p className="text-xs text-slate-500 font-medium">{user.email}</p>
          </div>
        </div>
      </td>
      <td className="px-6 py-4">
        <Badge variant={
          user.role === UserRole.SUPERADMIN ? 'danger' : 
          user.role === UserRole.EDITOR ? 'primary' : 
          user.role === UserRole.VIEWER ? 'secondary' : 'outline'
        }>
          {user.role}
        </Badge>
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <div className={`w-1.5 h-1.5 rounded-full ${user.status === UserStatus.ACTIVE ? 'bg-success' : 'bg-warning'}`} />
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{user.status}</span>
        </div>
      </td>
      <td className="px-6 py-4">
        <p className="text-xs text-slate-400 font-mono font-bold tracking-tight">
          {formatDate(user.lastLogin)}
        </p>
      </td>
      <td className="px-6 py-4 text-right">
        <div className="flex items-center justify-end gap-2">
          <button onClick={() => onView(user)} className="w-9 h-9 rounded-lg hover:bg-white/5 flex items-center justify-center text-slate-500 hover:text-white transition-all">
            <Eye size={18} />
          </button>
          <button onClick={() => onEdit(user)} className="w-9 h-9 rounded-lg hover:bg-white/5 flex items-center justify-center text-slate-500 hover:text-primary transition-all">
            <Edit2 size={18} />
          </button>
          {user.role !== UserRole.SUPERADMIN && (
            <button onClick={() => onAction(user)} className="w-9 h-9 rounded-lg hover:bg-danger/10 flex items-center justify-center text-slate-500 hover:text-danger transition-all">
              <ShieldAlert size={18} />
            </button>
          )}
        </div>
      </td>
    </tr>
  );
};

export default UserRow;
