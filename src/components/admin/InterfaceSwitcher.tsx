import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GraduationCap, Edit3, ShieldAlert, Check, RefreshCw } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { UserRole } from '../../types';

const InterfaceSwitcher: React.FC = () => {
  const { profile, effectiveRole, setEffectiveRole } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  if (profile?.role !== UserRole.SUPERADMIN) return null;

  const modes = [
    { id: UserRole.STUDENT, label: 'Student View', icon: <GraduationCap size={16} />, path: '/dashboard', color: 'text-blue-400' },
    { id: UserRole.EDITOR, label: 'Editor View', icon: <Edit3 size={16} />, path: '/editor/dashboard', color: 'text-purple-400' },
    { id: UserRole.SUPERADMIN, label: 'Admin View', icon: <ShieldAlert size={16} />, path: '/admin/overview', color: 'text-indigo-400' },
  ];

  const handleSwitch = (mode: UserRole, path: string) => {
    setEffectiveRole(mode);
    setIsOpen(false);
    navigate(path);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute bottom-20 right-0 w-64 glass-panel p-4 border border-white/10 shadow-2xl"
          >
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4 px-2">Switch Interface</p>
            <div className="space-y-1">
              {modes.map((mode) => (
                <button
                  key={mode.id}
                  onClick={() => handleSwitch(mode.id, mode.path)}
                  className={`w-full flex items-center justify-between p-3 rounded-xl transition-all ${
                    effectiveRole === mode.id 
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' 
                    : 'text-slate-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={effectiveRole === mode.id ? 'text-white' : mode.color}>
                      {mode.icon}
                    </div>
                    <span className="text-xs font-bold uppercase tracking-tight">{mode.label}</span>
                  </div>
                  {effectiveRole === mode.id && <Check size={14} />}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center shadow-2xl shadow-indigo-500/40 relative group"
      >
        <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-10 transition-opacity" />
        <RefreshCw size={24} className={`transition-transform duration-500 ${isOpen ? 'rotate-180' : ''}`} />
        
        {/* Active Mode Badge (Desktop Only) */}
        <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-white/5 backdrop-blur-xl border border-white/10 px-4 py-2 rounded-xl hidden md:block whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
           <span className="text-[10px] font-black text-white uppercase tracking-widest">
             Mode: <span className="text-indigo-400">{effectiveRole?.toUpperCase()}</span>
           </span>
        </div>
      </motion.button>
    </div>
  );
};

export default InterfaceSwitcher;
