import React from 'react';
import { Shield, Check } from 'lucide-react';
import { cn } from '../../lib/utils';

interface PermissionOption {
  key: string;
  label: string;
  description: string;
}

interface PermissionSelectorProps {
  permissions: Record<string, boolean>;
  onChange: (key: string, value: boolean) => void;
  disabled?: boolean;
}

const PermissionSelector: React.FC<PermissionSelectorProps> = ({ 
  permissions, 
  onChange,
  disabled = false
}) => {
  const options: PermissionOption[] = [
    { key: 'uploadContent', label: 'Content Upload', description: 'Permission to upload new study materials into the library.' },
    { key: 'manageUsers', label: 'User Management', description: 'Authority to manage students and staff roles.' },
    { key: 'viewAnalytics', label: 'View Reports', description: 'Ability to view student progress and engagement data.' },
    { key: 'deleteContent', label: 'Delete Content', description: 'Authorized to permanently delete files from the system.' },
    { key: 'createAnnouncements', label: 'Announcements', description: 'Ability to send announcements to all users.' },
    { key: 'editAppStructure', label: 'App Settings', description: 'Full access to modify the platform structure and settings.' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {options.map((opt) => (
        <button
          key={opt.key}
          type="button"
          disabled={disabled}
          onClick={() => onChange(opt.key, !permissions[opt.key])}
          className={cn(
            "flex items-start gap-4 p-4 rounded-2xl border transition-all text-left group",
            permissions[opt.key] 
              ? "bg-primary/10 border-primary shadow-[0_0_20px_rgba(99,102,241,0.1)]" 
              : "bg-white/[0.02] border-white/5 hover:bg-white/[0.04]",
            disabled && "opacity-50 cursor-not-allowed"
          )}
        >
          <div className={cn(
            "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border transition-colors",
            permissions[opt.key] ? "bg-primary text-white border-primary" : "bg-white/5 border-white/10 text-slate-600"
          )}>
            {permissions[opt.key] ? <Check size={20} /> : <Shield size={20} />}
          </div>
          <div>
            <h4 className={cn(
              "text-sm font-black transition-colors",
              permissions[opt.key] ? "text-white" : "text-slate-400 group-hover:text-slate-200"
            )}>
              {opt.label}
            </h4>
            <p className="text-[10px] text-slate-600 font-medium leading-relaxed mt-1 group-hover:text-slate-500 uppercase tracking-tight">
              {opt.description}
            </p>
          </div>
        </button>
      ))}
    </div>
  );
};

export default PermissionSelector;
