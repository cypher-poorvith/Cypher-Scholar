import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, ShieldAlert, LayoutDashboard, Activity, BookOpen, Crown } from 'lucide-react';

const StudentNavbar: React.FC = () => {
  const { profile, isAdmin, signOut } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [isLibraryOpen, setIsLibraryOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Academy', path: '/dashboard', icon: <LayoutDashboard size={14} /> },
    { label: 'Labs', path: '/simulations', icon: <Activity size={14} /> },
    { label: 'Exams', path: '/exams', icon: <BookOpen size={14} /> },
  ];

  return (
    <nav className="sticky top-0 z-[500] backdrop-blur-2xl border-b border-border-subtle bg-white/95 dark:bg-slate-900/95 transition-all duration-300">
      <div className="max-w-[1440px] mx-auto flex items-center gap-2 px-4 md:px-6 h-[72px]">
        {/* Branding & Internal Gate */}
        <Link 
          to={isAdmin ? "/admin" : "/dashboard"} 
          className="flex items-center gap-3 md:gap-4 group cursor-pointer pr-4 md:pr-8"
        >
          <div className="w-10 h-10 md:w-11 h-11 rounded-2xl bg-gradient-to-br from-pr to-sec flex items-center justify-center text-white shadow-xl shadow-pr/20 group-hover:scale-110 transition-all duration-500">
             <div className="text-[1.1rem] md:text-[1.2rem] font-black uppercase tracking-tighter">CP</div>
          </div>
          <div className="hidden sm:block leading-none">
            <span className="text-[1.1rem] md:text-[1.2rem] font-black uppercase tracking-tighter text-tx-main dark:text-white block mb-0.5 group-hover:text-pr transition-colors">Cypher</span>
            <span className="text-[0.5rem] md:text-[0.55rem] font-black uppercase tracking-[0.3em] text-pr block">Research Core</span>
          </div>
        </Link>

        {/* Global Nav Control - Desktop */}
        <div className="hidden md:flex items-center gap-1 flex-1">
          {navLinks.map((link) => (
            <Link 
              key={link.path}
              to={link.path} 
              className={`h-11 px-6 rounded-2xl flex items-center gap-2.5 text-[0.65rem] font-black uppercase tracking-widest transition-all relative overflow-hidden group ${
                location.pathname === link.path ? 'bg-pr text-white shadow-lg shadow-pr/20' : 'text-tx-dim hover:text-pr hover:bg-pr/5'
              }`}
            >
               {link.icon}
               <span className="relative z-10">{link.label}</span>
            </Link>
          ))}
          
          <div className="h-6 w-[1px] bg-border-subtle mx-4" />

          {/* Institutional Control (Library) */}
          <div className="relative" onMouseEnter={() => setIsLibraryOpen(true)} onMouseLeave={() => setIsLibraryOpen(false)}>
            <button className={`h-11 px-6 rounded-2xl text-[0.65rem] font-black uppercase tracking-widest flex items-center gap-2.5 transition-all outline-none ${isLibraryOpen ? 'bg-surface-subtle text-pr' : 'text-tx-dim hover:text-pr hover:bg-pr/5'}`}>
              <Crown size={14} />
              Library
              <ChevronDown size={14} className={`transition-transform duration-300 ${isLibraryOpen ? 'rotate-180' : ''}`} />
            </button>
            
            <AnimatePresence>
              {isLibraryOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 15, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute top-full left-0 mt-2 bg-white dark:bg-slate-900 border border-border-subtle rounded-[24px] p-2 min-w-[240px] shadow-2xl z-[400] backdrop-blur-3xl"
                >
                  <div className="p-4 border-b border-border-subtle mb-2">
                     <p className="text-[0.55rem] font-black text-tx-dim uppercase tracking-[0.2em] mb-1">Standardized Content</p>
                     <h4 className="text-[0.7rem] font-black text-tx-main dark:text-white uppercase">Grade-Wise Modules</h4>
                  </div>
                  {[
                    { label: 'High School Core', icon: '📗', path: '/practice' },
                    { label: 'Higher Secondary', icon: '📘', path: '/practice' },
                    { label: 'Professional Entrance', icon: '🚀', path: '/practice', hi: true },
                  ].map((item, idx) => (
                    <Link 
                      key={idx}
                      to={item.path}
                      className={`flex items-center gap-4 px-4 py-3.5 rounded-xl text-[0.8rem] font-black uppercase tracking-tight transition-all ${item.hi ? 'bg-pr/5 text-pr' : 'text-tx-muted hover:bg-surface-subtle hover:text-pr'}`}
                    >
                      <span className="w-8 h-8 flex items-center justify-center bg-surface-subtle dark:bg-slate-800 rounded-xl text-lg">{item.icon}</span>
                      {item.label}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* User Terminal */}
        <div className="flex items-center gap-2 md:gap-4 ml-auto">
          {isAdmin && (
             <Link to="/admin" className="h-10 px-5 rounded-xl bg-amber-500/10 text-amber-500 hidden xl:flex items-center gap-2 text-[0.6rem] font-black uppercase tracking-widest border border-amber-500/20 hover:bg-amber-500 hover:text-white transition-all">
                <ShieldAlert size={14} /> Admin
             </Link>
          )}

          <button 
            onClick={toggleTheme}
            className="w-10 h-10 md:w-11 h-11 flex items-center justify-center bg-surface-subtle dark:bg-slate-800 border border-border-subtle rounded-2xl text-[1rem] md:text-[1.2rem] shadow-sm hover:border-pr/30 transition-all outline-none"
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
          
          <div className="h-10 w-[1px] bg-border-subtle mx-1 md:mx-2" />

          {/* Profile Terminal - Desktop */}
          <Link to="/profile" className="hidden md:flex items-center gap-4 p-1 rounded-[20px] bg-surface-subtle dark:bg-slate-800 border border-border-subtle hover:border-pr/30 transition-all group pr-6">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-pr to-sec flex items-center justify-center text-[0.8rem] font-black text-white border-2 border-white dark:border-slate-800 shadow-lg group-hover:scale-105 transition-transform">
              {profile?.displayName?.substring(0, 2).toUpperCase() || 'SP'}
            </div>
            <div className="hidden md:block leading-none">
              <p className="text-[0.7rem] font-black uppercase tracking-tight text-tx-main dark:text-white mb-1 group-hover:text-pr transition-colors">
                {profile?.displayName?.split(' ')[0] || 'Scholar'}
              </p>
              <p className="text-[0.55rem] font-black text-tx-dim uppercase tracking-widest">Scholar Portal</p>
            </div>
          </Link>

          {/* Mobile Profile Trigger */}
          <Link to="/profile" className="md:hidden w-10 h-10 rounded-xl bg-pr flex items-center justify-center text-white font-black text-xs border-2 border-white dark:border-slate-800 shadow-lg">
             {profile?.displayName?.substring(0, 2).toUpperCase() || 'SP'}
          </Link>

          {/* Mobile Menu Toggle */}
          <button 
             onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
             className="md:hidden w-10 h-10 flex items-center justify-center bg-surface-subtle dark:bg-slate-800 border border-border-subtle rounded-xl text-tx-main hover:text-pr transition-all"
          >
             {isMobileMenuOpen ? <div className="font-black text-lg">×</div> : <div className="space-y-1">
                <div className="w-5 h-0.5 bg-current rounded-full" />
                <div className="w-5 h-0.5 bg-current rounded-full" />
                <div className="w-5 h-0.5 bg-current rounded-full" />
             </div>}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-border-subtle bg-white dark:bg-slate-900 overflow-hidden"
          >
            <div className="p-4 space-y-2">
              {navLinks.map((link) => (
                <Link 
                  key={link.path}
                  to={link.path} 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-4 p-4 rounded-2xl text-[0.85rem] font-black uppercase tracking-widest ${
                    location.pathname === link.path ? 'bg-pr text-white' : 'text-tx-dim hover:bg-surface-subtle dark:hover:bg-slate-800'
                  }`}
                >
                   {link.icon}
                   {link.label}
                </Link>
              ))}
              <div className="h-px bg-border-subtle my-2" />
              {isAdmin && (
                <Link 
                  to="/admin" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-4 p-4 rounded-2xl text-[0.85rem] font-black uppercase tracking-widest bg-amber-500/10 text-amber-500"
                >
                   <ShieldAlert size={18} /> Admin Portal
                </Link>
              )}
              <button 
                onClick={() => { signOut(); setIsMobileMenuOpen(false); }}
                className="w-full flex items-center gap-4 p-4 rounded-2xl text-[0.85rem] font-black uppercase tracking-widest text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10"
              >
                 <div className="w-5 h-5 flex items-center justify-center">×</div> Logout session
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default StudentNavbar;
