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
  const { profile, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { label: 'Dashboard', path: '/editor/dashboard', icon: <Home size={18} /> },
    { label: 'Content', path: '/editor/content', icon: <BookOpen size={18} /> },
    { label: 'Test Management', path: '/editor/tests', icon: <Trophy size={18} /> },
    { label: 'Results Verification', path: '/editor/verify', icon: <CheckCircle2 size={18} /> },
  ];

  const handleLogout = async () => {
    await signOut();
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-100 shadow-sm">
      <div className="max-w-[1440px] mx-auto px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link to="/editor/dashboard" className="flex items-center gap-3 group">
           <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
              <span className="text-2xl">🎓</span>
           </div>
           <div className="hidden sm:block">
              <h1 className="font-display text-lg font-black text-slate-900 uppercase tracking-tight leading-none">Cypher Scholar</h1>
              <p className="text-[8px] font-bold text-primary uppercase tracking-[0.2em] mt-1">Educator Portal</p>
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
                     "flex items-center gap-2 px-6 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all",
                     isActive 
                       ? "bg-primary/5 text-primary border border-primary/20 shadow-sm" 
                       : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                   )}
                 >
                    {item.label}
                 </Link>
              );
           })}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
           <button className="p-2.5 rounded-xl bg-slate-50 text-slate-400 hover:text-primary transition-colors relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full border-2 border-white"></span>
           </button>

           <div className="h-8 w-px bg-slate-100 mx-2" />

           <div className="flex items-center gap-3">
              <Link to="/profile" className="flex items-center gap-3 p-1 pr-4 rounded-xl bg-slate-50 border border-slate-100 hover:border-primary/20 transition-all group">
                 <img 
                   src={profile?.photoURL || `https://ui-avatars.com/api/?name=${profile?.displayName}&background=6366f1&color=fff`} 
                   alt="Profile" 
                   className="w-8 h-8 rounded-lg object-cover"
                 />
                 <div className="text-left hidden lg:block">
                    <p className="text-[10px] font-bold text-slate-900 uppercase tracking-tight truncate">{profile?.displayName}</p>
                    <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Educator</p>
                 </div>
              </Link>
              
              <button 
                onClick={handleLogout}
                className="p-2.5 rounded-xl bg-rose-50 text-rose-500 hover:bg-rose-100 transition-all shadow-sm"
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
