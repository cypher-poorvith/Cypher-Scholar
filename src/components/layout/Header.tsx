import React from 'react';
import { Search, Bell, LayoutGrid, Globe, Shield, Menu } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { cn } from '../../lib/utils';
import Badge from '../ui/Badge';

interface HeaderProps {
  onMenuClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const { profile } = useAuth();

  return (
    <header className="h-20 px-8 flex items-center justify-between shrink-0 z-40 bg-white/80 backdrop-blur-xl border-b border-slate-100 relative">
      {/* Search Bar (Task 16) */}
      <div className="flex-1 max-w-2xl relative group hidden md:block">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={18} />
        <input 
          type="text" 
          placeholder="Search subjects, reports, students..."
          className="vibrant-input w-full pl-12 bg-slate-100/50 border-slate-200 focus:bg-white transition-all text-sm font-medium"
        />
        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1">
          <kbd className="px-1.5 py-0.5 rounded bg-white shadow-sm border border-slate-200 text-[8px] font-bold text-slate-400 uppercase">Cmd</kbd>
          <kbd className="px-1.5 py-0.5 rounded bg-white shadow-sm border border-slate-200 text-[8px] font-bold text-slate-400 uppercase">K</kbd>
        </div>
      </div>

      <div className="flex items-center lg:hidden">
        <button 
          onClick={onMenuClick}
          className="p-2 -ml-2 text-slate-500 hover:text-primary"
        >
          <Menu size={24} />
        </button>
      </div>
      
      <div className="flex items-center gap-6">
        {/* System Status Indicators */}
        <div className="hidden lg:flex items-center gap-4 px-4 border-r border-slate-100 mr-2">
           <div className="flex flex-col items-end">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Network Load</span>
              <div className="flex items-center gap-1.5">
                 <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                 <span className="text-xs font-bold text-slate-800 font-mono">NOMINAL</span>
              </div>
           </div>
           <div className="flex flex-col items-end">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Latency</span>
              <span className="text-xs font-bold text-slate-800 font-mono">22MS</span>
           </div>
        </div>

        <button className="text-slate-400 hover:text-primary relative group">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white group-hover:scale-125 transition-transform animate-pulse"></span>
        </button>
        
        <button className="text-slate-400 hover:text-primary transition-transform hover:rotate-90">
          <LayoutGrid size={20} />
        </button>

        <div className="flex items-center gap-3 pl-6 border-l border-slate-100">
           <div className="flex flex-col items-end hidden sm:flex">
              <span className="text-xs font-bold text-slate-900">{profile?.displayName}</span>
              <span className="text-[9px] font-bold text-primary uppercase tracking-widest">{profile?.role}</span>
           </div>
           <div className="w-9 h-9 rounded-xl bg-primary/5 border border-primary/10 flex items-center justify-center text-primary font-bold text-xs uppercase shadow-sm">
              {profile?.displayName?.charAt(0)}
           </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
