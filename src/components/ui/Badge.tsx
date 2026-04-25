import React from 'react';
import { cn } from '../../lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'danger' | 'outline';
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({ 
  children, 
  variant = 'outline', 
  className 
}) => {
  const variants = {
    primary: "text-primary border-primary/30 bg-primary/10",
    secondary: "text-secondary border-secondary/30 bg-secondary/10",
    accent: "text-accent border-accent/30 bg-accent/10",
    success: "text-success border-success/30 bg-success/10",
    warning: "text-warning border-warning/30 bg-warning/10",
    danger: "text-danger border-danger/30 bg-danger/10",
    outline: "text-slate-400 border-white/10 bg-white/5",
  };

  return (
    <span className={cn(
      "px-2.5 py-0.5 border text-[10px] rounded-full font-bold uppercase tracking-widest inline-flex items-center justify-center",
      variants[variant],
      className
    )}>
      {children}
    </span>
  );
};

export default Badge;
