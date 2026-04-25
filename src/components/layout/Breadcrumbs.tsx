import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '../../lib/utils';

const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  if (pathnames.length === 0) return null;

  return (
    <nav className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] mb-4">
      <Link 
        to="/dashboard" 
        className="text-slate-500 hover:text-primary flex items-center gap-1.5 transition-colors"
      >
        <Home size={12} />
        ROOT
      </Link>
      
      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;

        return (
          <React.Fragment key={name}>
            <ChevronRight size={10} className="text-slate-700" />
            <Link
              to={routeTo}
              className={cn(
                "transition-colors",
                isLast ? "text-primary" : "text-slate-500 hover:text-slate-300"
              )}
            >
              {name.replace(/-/g, ' ')}
            </Link>
          </React.Fragment>
        );
      })}
    </nav>
  );
};

export default Breadcrumbs;
