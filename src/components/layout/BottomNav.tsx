import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, BookOpen, Settings2 } from 'lucide-react';
import { cn } from '../../lib/utils';

interface BottomNavProps {
  className?: string;
}

const BottomNav: React.FC<BottomNavProps> = ({ className }) => {
  const items = [
    { icon: <LayoutDashboard size={20} />, label: 'Overview', path: '/dashboard' },
    { icon: <Users size={20} />, label: 'Users', path: '/admin/users' },
    { icon: <BookOpen size={20} />, label: 'Content', path: '/admin/content' },
    { icon: <Settings2 size={20} />, label: 'Settings', path: '/admin/settings' },
  ];

  return (
    <nav className={cn(
      "fixed bottom-0 inset-x-0 h-20 bg-white/80 backdrop-blur-2xl border-t border-slate-100 flex items-center justify-around px-4 md:hidden z-50",
      className
    )}>
      {items.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) => cn(
            "flex flex-col items-center gap-1.5 px-3 py-2 rounded-2xl transition-all",
            isActive ? "text-primary scale-110" : "text-slate-500"
          )}
        >
          <div className="relative">
            {item.icon}
          </div>
          <span className="text-[9px] font-black uppercase tracking-tighter">{item.label}</span>
        </NavLink>
      ))}
    </nav>
  );
};

export default BottomNav;
