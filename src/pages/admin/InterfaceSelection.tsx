import React from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, Edit3, ShieldAlert, Check } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';

const InterfaceSelection: React.FC = () => {
  const navigate = useNavigate();
  const { profile, setEffectiveRole } = useAuth();

  const options = [
    {
      id: UserRole.STUDENT,
      title: 'Student View',
      desc: 'Experience the platform as a student',
      icon: <GraduationCap size={48} />,
      features: ['Browse content', 'Take tests', 'Track progress'],
      color: 'text-blue-400',
      bg: 'bg-blue-400/10',
      border: 'border-blue-500/30'
    },
    {
      id: UserRole.EDITOR,
      title: 'Editor View',
      desc: 'Manage and upload content',
      icon: <Edit3 size={48} />,
      features: ['Upload PDFs, videos', 'Create questions', 'Content library'],
      color: 'text-purple-400',
      bg: 'bg-purple-400/10',
      border: 'border-purple-500/30'
    },
    {
      id: UserRole.SUPERADMIN,
      title: 'Admin Control',
      desc: 'Full platform management',
      icon: <ShieldAlert size={48} />,
      features: ['Manage users', 'View analytics', 'System settings'],
      color: 'text-indigo-400',
      bg: 'bg-indigo-400/10',
      border: 'border-indigo-500/30',
      badge: 'Full Access'
    }
  ];

  const handleSelect = (mode: UserRole) => {
    setEffectiveRole(mode);
    if (mode === UserRole.SUPERADMIN) navigate('/admin/overview');
    else if (mode === UserRole.EDITOR) navigate('/editor/dashboard');
    else navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#0D0A1F] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <div className="atmosphere-spot spot-indigo -top-40 -left-40 opacity-20" />
      <div className="atmosphere-spot spot-purple -bottom-40 -right-40 opacity-20" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16 relative z-10"
      >
        <h1 className="text-4xl md:text-6xl font-display font-black text-white uppercase tracking-tighter mb-4">
          Welcome, {profile?.displayName || 'Admin'}
        </h1>
        <p className="text-slate-400 font-medium text-lg">Select your primary interface for this session</p>
        <p className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.3em] mt-4">You have superadmin privileges</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-7xl relative z-10">
        {options.map((opt, i) => (
          <motion.div
            key={opt.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            onClick={() => handleSelect(opt.id)}
            className={`glass-panel p-10 flex flex-col items-center text-center cursor-pointer group hover:scale-[1.02] hover:shadow-2xl transition-all border-t-8 ${opt.border} relative overflow-hidden`}
          >
            {opt.badge && (
              <div className="absolute top-4 right-4 px-3 py-1 bg-indigo-500 text-white text-[9px] font-black uppercase tracking-widest rounded-full shadow-lg shadow-indigo-500/20">
                {opt.badge}
              </div>
            )}
            
            <div className={`w-24 h-24 rounded-3xl ${opt.bg} ${opt.color} flex items-center justify-center mb-8 border border-white/5 group-hover:scale-110 transition-transform duration-500`}>
              {opt.icon}
            </div>

            <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-2">{opt.title}</h3>
            <p className="text-sm text-slate-500 font-medium mb-8">{opt.desc}</p>

            <ul className="space-y-4 mb-10 text-left w-full">
              {opt.features.map((feat, idx) => (
                <li key={idx} className="flex items-center gap-3 text-xs font-bold text-slate-400">
                  <div className={`w-1.5 h-1.5 rounded-full ${opt.color.replace('text-', 'bg-')}`} />
                  {feat}
                </li>
              ))}
            </ul>

            <button className={`w-full h-14 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 transition-all ${opt.bg} ${opt.color} hover:bg-white group-hover:scale-[1.02]`}>
              Enter {opt.id} Mode
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default InterfaceSelection;
