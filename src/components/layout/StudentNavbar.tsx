import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, Bell, Settings, Menu, X, 
  LayoutDashboard, BookOpen, GraduationCap, Library,
  LogOut, ShieldAlert
} from 'lucide-react';

const StudentNavbar: React.FC = () => {
  const { profile, isAdmin, signOut } = useAuth();
  const { toggleTheme } = useTheme();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={18} /> },
    { label: 'Courses', path: '/simulations', icon: <GraduationCap size={18} /> },
    { label: 'Exams', path: '/exams', icon: <BookOpen size={18} /> },
    { label: 'Library', path: '/practice', icon: <Library size={18} /> },
  ];

  return (
    <nav className="fixed top-0 w-full border-b border-white/40 dark:border-slate-800/40 z-[500] bg-white/70 dark:bg-slate-900/70 backdrop-blur-[20px] h-20 shadow-[0_4px_30px_rgba(15,23,42,0.08)] transition-all duration-300">
      <div className="max-w-[1440px] mx-auto h-full flex items-center justify-between px-6 md:px-8">
        
        {/* Left: Branding */}
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl brand-gradient flex items-center justify-center text-white font-black text-lg transition-transform group-hover:scale-110 shadow-lg shadow-pr/20">
              CP
            </div>
            <span className="text-xl md:text-2xl font-black brand-text-gradient font-display transition-all group-hover:tracking-wider">
              Cypher Scholar
            </span>
          </Link>
        </div>

        {/* Right: Search & User Tools */}
        <div className="flex items-center gap-2 md:gap-6">
          {/* Search bar - Desktop */}
          <div className="hidden lg:flex items-center bg-slate-100 dark:bg-slate-800/50 rounded-full px-4 py-2 w-64 border border-transparent focus-within:border-pr/30 transition-all">
            <Search className="text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Search knowledge..." 
              className="bg-transparent border-none focus:ring-0 text-sm w-full text-on-surface dark:text-white px-2 placeholder:text-slate-400"
            />
          </div>

          <div className="flex items-center gap-1 md:gap-2">
            {isAdmin && (
              <Link 
                to="/admin" 
                className="p-2.5 rounded-2xl text-amber-500 hover:bg-amber-500/10 transition-all"
                title="Admin Portal"
              >
                <ShieldAlert size={22} />
              </Link>
            )}
            
            <button className="p-2.5 rounded-2xl text-violet-600 dark:text-violet-400 hover:bg-violet-500/10 transition-all relative">
              <Bell size={22} />
              <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-pr rounded-full border-2 border-white dark:border-slate-900"></span>
            </button>
            
            <button 
              onClick={toggleTheme}
              className="p-2.5 rounded-2xl text-violet-600 dark:text-violet-400 hover:bg-violet-500/10 transition-all"
            >
              <Settings size={22} />
            </button>
            
            <div className="h-8 w-px bg-slate-200 dark:bg-slate-800 mx-2 hidden sm:block" />

            <Link to="/profile" className="flex items-center gap-3 p-1 rounded-full border-2 border-pr/10 hover:border-pr transition-all">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-pr to-sec flex items-center justify-center text-white text-[0.7rem] font-bold overflow-hidden shadow-md">
                 {profile?.displayName?.substring(0, 2).toUpperCase() || 'SP'}
              </div>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default StudentNavbar;
