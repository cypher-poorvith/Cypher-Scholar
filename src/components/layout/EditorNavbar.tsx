import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Home, 
  BookOpen, 
  Trophy, 
  CheckCircle2, 
  User, 
  LogOut,
  Bell
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { cn } from '../../lib/utils';

const EditorNavbar: React.FC = () => {
  const { profile, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { label: 'Dashboard', path: '/editor/dashboard', icon: <Home size={18} /> },
    { label: 'Content', path: '/editor/content', icon: <BookOpen size={18} /> },
    { label: 'Test Management', path: '/editor/tests', icon: <Trophy size={18} /> },
    { label: 'Results Verification', path: '/editor/verify', icon: <CheckCircle2 size={18} /> },
  ];

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 bg-[#070512]/80 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-[1440px] mx-auto px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link to="/editor/dashboard" className="flex items-center gap-3 group">
           <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-600/20 group-hover:scale-110 transition-transform">
              <span className="text-2xl">🎓</span>
           </div>
           <div className="hidden sm:block">
              <h1 className="font-sans text-lg font-black text-white uppercase tracking-tight leading-none">Cypher Scholar</h1>
              <p className="text-[8px] font-bold text-indigo-400 uppercase tracking-[0.2em] mt-1">Educator Portal</p>
           </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-2">
           {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                 <Link 
                   key={item.path}
                   to={item.path}
                   className={cn(
                     "flex items-center gap-2 px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                     isActive 
                       ? "bg-indigo-600/10 text-indigo-400 border border-indigo-500/20" 
                       : "text-slate-500 hover:text-white hover:bg-white/5"
                   )}
                 >
                    {item.label}
                 </Link>
              );
           })}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
           <button className="p-2.5 rounded-xl bg-white/5 text-slate-500 hover:text-white transition-colors relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-indigo-500 rounded-full border-2 border-[#070512]"></span>
           </button>

           <div className="h-8 w-px bg-white/5 mx-2" />

           <div className="flex items-center gap-3">
              <Link to="/profile" className="flex items-center gap-3 p-1 pr-4 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-all group">
                 <img 
                   src={profile?.photoURL || `https://ui-avatars.com/api/?name=${profile?.displayName}&background=6366f1&color=fff`} 
                   alt="Profile" 
                   className="w-8 h-8 rounded-lg object-cover"
                 />
                 <div className="text-left hidden lg:block">
                    <p className="text-[10px] font-black text-white uppercase tracking-tight truncate">{profile?.displayName}</p>
                    <p className="text-[8px] font-bold text-slate-500 uppercase tracking-widest">Educator</p>
                 </div>
              </Link>
              
              <button 
                onClick={handleLogout}
                className="p-2.5 rounded-xl bg-rose-500/10 text-rose-500 hover:bg-rose-500/20 transition-all"
                title="Logout"
              >
                <LogOut size={20} />
              </button>
           </div>
        </div>
      </div>
    </header>
  );
};

export default EditorNavbar;
