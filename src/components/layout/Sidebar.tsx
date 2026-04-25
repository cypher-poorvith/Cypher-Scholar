import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  UserSquare2, 
  BookOpen, 
  Target, 
  CheckCircle2,
  Megaphone, 
  Layout,
  Settings2, 
  BarChart3, 
  ShieldCheck, 
  UserCircle, 
  LogOut, 
  Zap
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';
import { cn } from '../../lib/utils';

const Sidebar: React.FC = () => {
  const { profile, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate('/login');
  };

  const menuSections = [
    {
      title: 'DASHBOARD',
      items: [
        { icon: <LayoutDashboard size={18} />, label: 'Overview', path: '/admin/overview' },
      ]
    },
    {
      title: 'MANAGEMENT',
      items: [
        { icon: <Users size={18} />, label: 'Users', path: '/admin/users' },
        { icon: <UserSquare2 size={18} />, label: 'Team Members', path: '/admin/team' },
        { icon: <BookOpen size={18} />, label: 'Content Library', path: '/admin/content' },
        { icon: <Target size={18} />, label: 'Test Management', path: '/admin/tests' },
        { icon: <CheckCircle2 size={18} />, label: 'Results Verification', path: '/admin/verify' },
      ]
    },
    {
      title: 'SYSTEM',
      items: [
        { icon: <Megaphone size={18} />, label: 'Announcements', path: '/admin/announcements' },
        { icon: <Layout size={18} />, label: 'App Structure', path: '/admin/structure' },
        { icon: <Settings2 size={18} />, label: 'System Settings', path: '/admin/settings' },
        { icon: <BarChart3 size={18} />, label: 'Analytics & Reports', path: '/admin/analytics' },
        { icon: <ShieldCheck size={18} />, label: 'Audit Logs', path: '/admin/audit' },
      ]
    },
    {
      title: 'PERSONAL',
      items: [
        { icon: <UserCircle size={18} />, label: 'My Profile', path: '/profile' },
      ]
    }
  ];

  return (
    <aside className="w-72 h-screen bg-white border-r border-slate-100 flex flex-col shrink-0 relative z-50 overflow-hidden shadow-sm">
      {/* Branding */}
      <div className="p-8 flex items-center gap-4 relative z-10 border-b border-slate-50">
        <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white shadow-xl shadow-primary/30">
          <span className="text-2xl">🎓</span>
        </div>
        <div>
          <h1 className="text-sm font-display font-black tracking-tight text-slate-900 leading-none">Cypher Scholar</h1>
          <p className="text-[9px] text-slate-400 font-bold uppercase mt-1 tracking-widest">Admin Control Center</p>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 px-4 py-6 overflow-y-auto no-scrollbar space-y-8">
        {menuSections.map((section) => (
          <div key={section.title} className="space-y-1">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] px-4 mb-3">{section.title}</p>
            {section.items.map((item) => (
              <Link 
                key={item.path} 
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-4 py-2.5 rounded-xl text-slate-500 transition-all hover:bg-slate-50 hover:text-primary cursor-pointer group",
                  location.pathname === item.path && "bg-primary/5 text-primary font-bold shadow-sm ring-1 ring-primary/10"
                )}
              >
                <span className={cn(
                  "transition-colors",
                  location.pathname === item.path ? 'text-primary' : 'text-slate-400 group-hover:text-primary'
                )}>
                  {item.icon}
                </span>
                <span className="text-xs font-medium tracking-wide">{item.label}</span>
                {location.pathname === item.path && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(99,102,241,0.5)]"></div>
                )}
              </Link>
            ))}
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="p-6 border-t border-slate-50 bg-slate-50/30">
        <div className="flex items-center gap-3 px-2 mb-4">
          <img 
            src={profile?.photoURL || `https://ui-avatars.com/api/?name=${profile?.displayName}&background=6366f1&color=fff`} 
            alt="" 
            className="w-10 h-10 rounded-xl border border-slate-200"
          />
          <div className="overflow-hidden">
            <p className="text-xs font-bold text-slate-900 truncate tracking-tight">{profile?.displayName?.split(' ')[0]}</p>
            <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest truncate">Superadmin</p>
          </div>
        </div>
        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-2.5 w-full rounded-xl text-rose-500 hover:bg-rose-50 transition-all font-bold uppercase text-[10px] tracking-widest"
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>
        <div className="mt-4 flex items-center justify-between text-[8px] font-bold text-slate-400 uppercase tracking-widest px-2">
           <span className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-green-500"></div> System Operational</span>
           <span>v1.0.0</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
