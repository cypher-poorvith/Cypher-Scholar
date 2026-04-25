import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Search, 
  Bell, 
  Settings, 
  Trophy, 
  Menu, 
  X, 
  Home, 
  School, 
  BarChart3, 
  BookOpen, 
  FileQuestion, 
  Info,
  LogOut,
  User,
  Layout
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../../lib/utils';

const StudentNavbar: React.FC = () => {
  const { user, profile, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const navItems = [
    { label: 'Home', path: '/dashboard', icon: <Home size={18} /> },
    { label: 'Competitive Exams', path: '/exams', icon: <School size={18} /> },
    { label: 'Grades', path: '/grades', icon: <BarChart3 size={18} /> },
    { label: 'Subjects', path: '/subjects/all', icon: <BookOpen size={18} /> },
    { label: 'Practice', path: '/practice', icon: <FileQuestion size={18} /> },
    { label: 'Scholar Test Series', path: '/scholar-series', icon: <Trophy size={18} /> },
    { label: 'Results', path: '/results', icon: <BarChart3 size={18} /> },
    { label: 'About', path: '/about', icon: <Info size={18} /> },
  ];

  const handleLogout = async () => {
    await signOut();
    navigate('/login');
  };

  return (
    <div className="w-full relative z-50">
      {/* 1. TOP NAVIGATION BAR */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-[12px] border-b border-slate-100 shadow-sm">
        <div className="max-w-[1440px] mx-auto px-8 py-4 flex items-center justify-between">
          
          {/* LEFT: Logo & Search */}
          <div className="flex items-center gap-8 flex-1">
            <Link to="/" className="flex items-center gap-3 shrink-0 group">
               <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
                  <span className="text-2xl">🎓</span>
               </div>
               <h1 className="font-display text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary hidden sm:block tracking-tight">
                  Cypher <span className="text-slate-900">Scholar</span>
               </h1>
            </Link>
            
            {/* Search Bar */}
            <div className={cn(
              "hidden md:flex items-center gap-3 bg-slate-100/50 border border-slate-200 rounded-xl px-4 py-2.5 transition-all w-full max-w-md",
              isSearchFocused && "bg-white border-primary/50 ring-4 ring-primary/10"
            )}>
              <Search className={cn("text-slate-400 transition-colors", isSearchFocused && "text-primary")} size={18} />
              <input 
                type="text" 
                placeholder="Search resources, topics, exams..." 
                className="bg-transparent border-none text-sm font-bold text-slate-700 w-full focus:outline-none placeholder:text-slate-400 placeholder:font-medium placeholder:uppercase placeholder:tracking-widest"
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
              />
            </div>
          </div>
          
          {/* RIGHT: Conditional Content */}
          <div className="flex items-center gap-6">
            {!user ? (
               <div className="flex items-center gap-3">
                  <Link to="/login" className="text-xs font-bold text-slate-500 hover:text-primary transition-colors uppercase tracking-widest px-4 py-2">
                    Sign In
                  </Link>
                  <Link to="/signup" className="btn-primary text-xs px-6 py-2.5">
                    Join Now
                  </Link>
               </div>
            ) : (
               <div className="flex items-center gap-4">
                  {/* Streak Badge */}
                  <div className="hidden lg:flex items-center gap-2 bg-orange-50 border border-orange-100 rounded-xl px-4 py-2 group hover:bg-orange-100/50 transition-colors cursor-default">
                    <span className="text-lg group-hover:scale-125 transition-transform duration-500">🔥</span>
                    <span className="text-[10px] font-bold text-orange-600 uppercase tracking-widest leading-none">7 Day Streak</span>
                  </div>
                  
                  {/* Notifications */}
                  <button className="relative p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-slate-500 hover:text-primary hover:bg-white transition-all">
                    <Bell size={20} />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full animate-pulse border-2 border-white"></span>
                  </button>
                  
                  {/* Scholar Badge */}
                  <div className="hidden lg:flex items-center gap-2 bg-primary/5 text-primary px-4 py-2 rounded-xl border border-primary/10 hover:bg-primary/10 transition-all">
                    <span className="text-[10px] font-bold uppercase tracking-widest">Scholar Badge</span>
                    <Trophy size={14} />
                  </div>
                  
                  {/* User Profile */}
                  <div className="relative">
                    <button 
                      onClick={() => setIsProfileOpen(!isProfileOpen)}
                      className="flex items-center gap-3 p-1 rounded-xl bg-slate-50 border border-slate-100 hover:bg-white transition-all shadow-sm"
                    >
                      <img 
                        src={profile?.photoURL || `https://ui-avatars.com/api/?name=${profile?.displayName}&background=6366f1&color=fff`} 
                        alt="Profile" 
                        className="w-8 h-8 rounded-lg object-cover ring-2 ring-primary/10"
                      />
                      <span className="font-bold text-xs text-slate-700 max-w-[80px] truncate hidden sm:block">
                        {profile?.displayName?.split(' ')[0]}
                      </span>
                    </button>

                    <AnimatePresence>
                      {isProfileOpen && (
                        <>
                          <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-40"
                            onClick={() => setIsProfileOpen(false)}
                          />
                          <motion.div 
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            className="absolute right-0 mt-4 w-56 bg-white border border-slate-100 rounded-2xl shadow-xl p-2 z-50 overflow-hidden"
                          >
                             <div className="px-4 py-3 border-b border-slate-50 mb-2">
                                <p className="text-xs font-bold text-slate-900 uppercase tracking-tight truncate">{profile?.displayName}</p>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest truncate">{profile?.email}</p>
                             </div>
                             <Link to="/profile" className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-bold text-slate-500 hover:text-primary hover:bg-slate-50 transition-all">
                                <User size={16} /> My Profile
                             </Link>
                             <Link to="/exams" className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-bold text-slate-500 hover:text-primary hover:bg-slate-50 transition-all">
                                <School size={16} /> My Exams
                             </Link>
                             {(profile?.role === 'superadmin' || profile?.role === 'editor') && (
                                <Link 
                                  to={profile.role === 'superadmin' ? "/admin/overview" : "/editor/dashboard"} 
                                  className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-bold text-primary hover:bg-slate-50 transition-all"
                                >
                                   <Layout size={16} /> {profile.role === 'superadmin' ? 'Admin Portal' : 'Editor Portal'}
                                </Link>
                             )}
                             <button 
                                onClick={handleLogout}
                                className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-bold text-rose-500 hover:bg-rose-50 transition-all border-t border-slate-50 mt-2"
                             >
                                <LogOut size={16} /> Logout
                             </button>
                          </motion.div>
                        </>
                      )}
                    </AnimatePresence>
                  </div>
               </div>
            )}
          </div>
        </div>
      </header>

      {/* 2. MAIN HORIZONTAL NAVIGATION (Tab Bar) */}
      <nav className="w-full border-b border-slate-100 bg-white/80 backdrop-blur-md sticky top-20 z-40">
        <div className="max-w-[1440px] mx-auto px-8">
          <ul className="flex items-center gap-8 overflow-x-auto no-scrollbar py-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <li key={item.path}>
                  <Link 
                    to={item.path} 
                    className={cn(
                      "flex items-center gap-2 py-3 px-1 border-b-4 transition-all group whitespace-nowrap",
                      isActive 
                        ? "text-primary border-primary font-bold" 
                        : "text-slate-400 border-transparent font-medium hover:text-slate-900 hover:border-slate-200"
                    )}
                  >
                    <span className={cn(
                      "transition-transform duration-300 group-hover:scale-110",
                      isActive ? "text-primary" : "text-slate-300 group-hover:text-slate-900"
                    )}>
                      {item.icon}
                    </span>
                    <span className="text-[11px] uppercase tracking-[0.2em]">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default StudentNavbar;
