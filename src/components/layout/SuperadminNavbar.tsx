import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Shield, 
  LogOut,
  Bell,
  Settings,
  Search,
  LayoutDashboard,
  Users,
  BookOpen,
  Settings as SettingsIcon,
  Activity
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const SuperadminNavbar: React.FC = () => {
  const { profile, signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate('/login');
  };

  return (
    <header className="fixed top-0 w-full border-b border-white/40 dark:border-slate-800/40 z-[500] bg-white/70 dark:bg-slate-900/70 backdrop-blur-[20px] h-20 shadow-[0_4px_30px_rgba(15,23,42,0.08)] transition-all duration-300">
      <div className="max-w-[1440px] mx-auto px-6 md:px-8 h-full flex items-center justify-between">
        {/* Left: Branding */}
        <div className="flex items-center gap-12">
          <Link to="/admin" className="flex items-center gap-3 group">
             <div className="w-10 h-10 rounded-xl brand-gradient flex items-center justify-center text-white shadow-xl shadow-pr/20 group-hover:scale-110 transition-transform">
                <Shield size={22} className="text-3d" />
             </div>
             <div className="hidden sm:block">
                <h1 className="text-xl font-black brand-text-gradient font-display transition-all group-hover:tracking-wider">Cypher Scholar</h1>
                <p className="text-[0.5rem] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-[0.2em] leading-none">Command Center</p>
             </div>
          </Link>
        </div>

        {/* Right: Search & System Control */}
        <div className="flex items-center gap-4">
           {/* Search bar - Desktop */}
           <div className="hidden lg:flex items-center bg-slate-100 dark:bg-slate-800/50 rounded-full px-4 py-2 w-64 border border-transparent focus-within:border-pr/30 transition-all">
             <Search className="text-slate-400" size={16} />
             <input 
               type="text" 
               placeholder="System lookup..." 
               className="bg-transparent border-none focus:ring-0 text-sm w-full text-on-surface dark:text-white px-2 placeholder:text-slate-400"
             />
           </div>

           <button className="p-2.5 rounded-2xl text-violet-600 dark:text-violet-400 hover:bg-violet-500/10 transition-all relative">
              <Bell size={22} />
              <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-orange-500 rounded-full border-2 border-white dark:border-slate-900"></span>
           </button>

           <div className="h-8 w-px bg-slate-200 dark:bg-slate-800 mx-2" />

           <div className="flex items-center gap-3">
              <Link to="/profile" className="flex items-center gap-3 p-1 rounded-full border-2 border-amber-500/10 hover:border-amber-500 transition-all">
                 <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-500 to-orange-600 flex items-center justify-center text-white text-[0.7rem] font-black shadow-md">
                   {profile?.displayName?.substring(0, 2).toUpperCase() || 'AD'}
                </div>
              </Link>
              
              <button 
                onClick={handleLogout}
                className="p-2.5 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all"
                title="Terminate Session"
              >
                <LogOut size={22} />
              </button>
           </div>
        </div>
      </div>
    </header>
  );
};

export default SuperadminNavbar;
