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
    primary: "text-primary border-primary/20 bg-primary/10",
    secondary: "text-secondary border-secondary/20 bg-secondary/10",
    accent: "text-accent border-accent/20 bg-accent/10",
    success: "text-success border-success/20 bg-success/10",
    warning: "text-warning border-warning/20 bg-warning/10",
    danger: "text-error border-error/20 bg-error/10",
    outline: "text-slate-500 border-slate-200 bg-slate-50",
  };

  return (
    <span className={cn(
      "vibrant-badge inline-flex items-center justify-center",
      variants[variant],
      className
    )}>
      {children}
    </span>
  );
};

export default Badge;
