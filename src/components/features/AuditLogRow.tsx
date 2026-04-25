import React from 'react';
import { AuditLog } from '../../types';
import Badge from '../ui/Badge';
import { formatDate } from '../../lib/utils';

interface AuditLogRowProps {
  log: AuditLog;
  onTrace: (log: AuditLog) => void;
}

const AuditLogRow: React.FC<AuditLogRowProps> = ({ log, onTrace }) => {
  const actions: Record<string, 'primary' | 'success' | 'danger' | 'warning' | 'info'> = {
    create: 'success',
    update: 'primary',
    delete: 'danger',
    login: 'primary',
  };

  const targets: Record<string, string> = {
    user: '👤 USER',
    content: '📚 CONTENT',
    test: '🎯 TEST',
    system: '⚙️ SYSTEM',
  };

  return (
    <tr className="hover:bg-white/[0.02] transition-colors group">
      <td className="px-6 py-4">
        <p className="text-xs font-mono font-bold text-slate-500 uppercase tracking-tight">#{log.id.slice(-8)}</p>
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-xs font-black text-slate-400 uppercase">
            {log.userName.charAt(0)}
          </div>
          <div>
            <p className="text-sm font-bold text-white">{log.userName}</p>
            <p className="text-[10px] text-slate-600 font-bold uppercase tracking-wider">{log.userRole}</p>
          </div>
        </div>
      </td>
      <td className="px-6 py-4">
        <Badge variant={actions[log.action] as any || 'outline'}>{log.action}</Badge>
      </td>
      <td className="px-6 py-4">
        <div className="space-y-1">
          <p className="text-xs font-bold text-slate-300">{targets[log.targetType]}</p>
          <p className="text-[10px] text-slate-600 font-mono truncate max-w-[150px]">{log.targetName}</p>
        </div>
      </td>
      <td className="px-6 py-4">
        <p className="text-xs text-slate-400 font-mono font-bold tracking-tighter">
          {formatDate(log.timestamp)}
        </p>
        <p className="text-[9px] text-slate-600 font-mono uppercase mt-1">{log.ipAddress}</p>
      </td>
      <td className="px-6 py-4 text-right">
        <button 
          onClick={() => onTrace(log)}
          className="text-[10px] font-black text-primary uppercase tracking-[0.2em] hover:text-white transition-colors"
        >
          Trace Details
        </button>
      </td>
    </tr>
  );
};

export default AuditLogRow;
