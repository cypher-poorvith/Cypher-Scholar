import React from 'react';
import GlassCard from './GlassCard';
import { cn } from '../../lib/utils';

interface StatCardProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: {
    value: string;
    isUp: boolean;
  };
  variant?: 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'danger';
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({ 
  label, 
  value, 
  icon, 
  trend,
  variant = 'primary',
  className 
}) => {
  const colors = {
    primary: "text-primary bg-primary/10",
    secondary: "text-secondary bg-secondary/10",
    accent: "text-accent bg-accent/10",
    success: "text-success bg-success/10",
    warning: "text-warning bg-warning/10",
    danger: "text-danger bg-danger/10",
  };

  return (
    <GlassCard className={cn("p-6 flex items-center justify-between", className)}>
      <div>
        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">{label}</p>
        <h3 className="text-2xl font-black text-white">{value}</h3>
        {trend && (
          <div className={cn(
            "flex items-center gap-1 text-[10px] mt-1 font-bold",
            trend.isUp ? "text-success" : "text-danger"
          )}>
            <span>{trend.isUp ? '↑' : '↓'}</span>
            <span>{trend.value}</span>
            <span className="text-slate-600 ml-1">vs last period</span>
          </div>
        )}
      </div>
      <div className={cn(
        "w-12 h-12 rounded-2xl flex items-center justify-center shadow-inner ring-1 ring-white/10 transition-transform group-hover:scale-110",
        colors[variant]
      )}>
        {icon}
      </div>
    </GlassCard>
  );
};

export default StatCard;
