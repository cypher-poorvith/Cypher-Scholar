import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  LayoutDashboard, 
  GraduationCap, 
  BookOpen, 
  Library,
  User,
  Settings,
  ShieldAlert
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { useAuth } from '../../context/AuthContext';

interface NavItem {
  label: string;
  path: string;
  icon: React.ElementType;
  adminOnly?: boolean;
}

const FloatingNav: React.FC = () => {
  const location = useLocation();
  const { isAdmin } = useAuth();

  const items: NavItem[] = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Courses', path: '/simulations', icon: GraduationCap },
    { label: 'Exams', path: '/exams', icon: BookOpen },
    { label: 'Library', path: '/practice', icon: Library },
    { label: 'Profile', path: '/profile', icon: User },
  ];

  if (isAdmin) {
    items.splice(items.length - 1, 0, { label: 'Admin', path: '/admin', icon: ShieldAlert, adminOnly: true });
  }

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[600] w-full max-w-fit px-4">
      <motion.nav 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', damping: 20, stiffness: 100 }}
        className="glass-panel !p-2 flex items-center gap-1 md:gap-2 shadow-[0_20px_50px_rgba(84,0,195,0.2)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-white/50 dark:border-slate-700/50"
      >
        {items.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;

          return (
            <Link 
              key={item.path}
              to={item.path}
              className={cn(
                "relative flex flex-col items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-[1.5rem] transition-all duration-500 group overflow-hidden",
                isActive 
                  ? "text-white" 
                  : "text-slate-400 hover:text-pr dark:text-slate-500 dark:hover:text-pr-light"
              )}
            >
              {isActive && (
                <motion.div 
                  layoutId="active-pill"
                  className="absolute inset-0 brand-gradient -z-10 shadow-lg shadow-pr/20"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}
              
              <Icon size={isActive ? 22 : 20} className={cn("transition-transform duration-500", isActive && "scale-110")} />
              
              <span className={cn(
                "text-[0.6rem] font-bold uppercase tracking-tighter mt-1 transition-all duration-500",
                isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0"
              )}>
                {item.label}
              </span>

              {!isActive && (
                <div className="absolute bottom-1 w-1 h-1 rounded-full bg-pr scale-0 group-hover:scale-100 transition-transform duration-300" />
              )}
            </Link>
          );
        })}
      </motion.nav>
    </div>
  );
};

export default FloatingNav;
