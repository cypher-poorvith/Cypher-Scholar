import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Menu, X, ShieldAlert,
  LayoutDashboard, BookOpen, Activity, GraduationCap, ChevronDown
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'motion/react';
import { UserRole } from '../types';

const Navbar: React.FC = () => {
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const isAdmin = profile?.role === UserRole.SUPERADMIN;

  const navLinks = [
    { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={14} /> },
    { name: 'Simulations', path: '/simulations', icon: <Activity size={14} /> },
    { name: 'Profile', path: '/profile', icon: <GraduationCap size={14} /> },
  ];

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl z-50 transition-all">
      <div className="glass-panel nh h-16 px-6 flex items-center justify-between shadow-2xl shadow-pr/10 bg-white/70 dark:bg-slate-900/70 border-white/40 dark:border-slate-800/40">
        {/* Branding & Admin Gate */}
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-pr to-sec flex items-center justify-center text-white shadow-xl shadow-pr/20 group-hover:scale-110 transition-all duration-500">
               <GraduationCap size={22} className="group-hover:rotate-12 transition-transform" />
            </div>
            <div className="leading-none hidden sm:block">
              <span className="text-[1.2rem] font-black uppercase tracking-tighter text-tx-main dark:text-white block mb-0.5">Cypher</span>
              <span className="text-[0.55rem] font-black uppercase tracking-[0.3em] text-pr block">Educational Core</span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          {user && (
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link 
                  key={link.path}
                  to={link.path}
                  className={`h-9 px-5 flex items-center gap-2.5 rounded-xl text-[0.65rem] font-black uppercase tracking-widest transition-all ${
                    location.pathname === link.path 
                    ? 'bg-pr text-white shadow-lg shadow-pr/20' 
                    : 'text-tx-dim hover:text-pr hover:bg-pr/5'
                  }`}
                >
                  {link.icon}
                  {link.name}
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Action Zone */}
        <div className="flex items-center gap-4">
           {isAdmin && (
             <Link 
               to="/admin" 
               className="h-10 px-6 rounded-2xl bg-amber-500/10 text-amber-500 border border-amber-500/20 items-center justify-center gap-2 hidden md:flex text-[0.65rem] font-black uppercase tracking-widest hover:bg-amber-500 hover:text-white transition-all shadow-sm"
             >
                <ShieldAlert size={16} /> Admin Portal
             </Link>
           )}

           <div className="h-8 w-px bg-border-subtle mx-2 hidden lg:block" />

           {user ? (
             <Link to="/profile" className="flex items-center gap-3 p-1 pr-4 rounded-2xl bg-surface-subtle dark:bg-slate-800 hover:bg-pr/5 transition-all group">
                <img 
                   src={profile?.photoURL || `https://ui-avatars.com/api/?name=${profile?.displayName}&background=primary&color=fff`} 
                   className="w-10 h-10 rounded-xl border-2 border-white dark:border-slate-800 shadow-sm" 
                   alt="scholar-nav" 
                />
                <div className="text-left hidden xl:block">
                   <p className="text-[0.7rem] font-black text-tx-main dark:text-white leading-none mb-1 group-hover:text-pr transition-colors">{profile?.displayName?.split(' ')[0]}</p>
                   <p className="text-[0.55rem] font-black text-tx-dim uppercase tracking-wider">Lvl 12 Scholar</p>
                </div>
             </Link>
           ) : (
             <Link to="/auth" className="btn-primary h-12 px-8 text-[0.75rem] shadow-xl shadow-pr/20">Initiate Access</Link>
           )}

           <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden w-10 h-10 flex items-center justify-center text-tx-main hover:bg-surface-subtle rounded-xl transition-all">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
           </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="lg:hidden mt-4 glass-panel nh p-6 bg-white/90 backdrop-blur-xl border border-white/50 shadow-2xl flex flex-col gap-3 origin-top"
          >
            {user ? (
              <>
                 {navLinks.map((link) => (
                    <Link 
                      key={link.path}
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center gap-4 p-5 rounded-2xl text-[0.85rem] font-black uppercase tracking-widest ${
                        location.pathname === link.path ? 'bg-pr text-white' : 'hover:bg-surface-subtle text-tx-dim'
                      }`}
                    >
                      {link.icon}
                      {link.name}
                    </Link>
                 ))}
                 {isAdmin && (
                    <Link 
                      to="/admin" 
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-4 p-5 rounded-2xl text-[0.85rem] font-black uppercase tracking-widest bg-amber-500/10 text-amber-500"
                    >
                      <ShieldAlert size={18} /> Admin Portal
                    </Link>
                 )}
                 <button 
                   onClick={() => { signOut(); setIsOpen(false); }}
                   className="flex items-center gap-4 p-5 rounded-2xl text-[0.85rem] font-black uppercase tracking-widest text-red-500 hover:bg-red-50 transition-all"
                 >
                    <X size={18} /> End Session
                 </button>
              </>
            ) : (
              <Link to="/auth" onClick={() => setIsOpen(false)} className="btn-primary h-14 w-full flex items-center justify-center text-[0.85rem]">Sign In / Register</Link>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
