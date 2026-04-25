import React from 'react';
import { cn } from '../../lib/utils';
import { motion } from 'motion/react';

interface Tab {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onChange: (id: string) => void;
  className?: string;
  variant?: 'pills' | 'underline';
}

const Tabs: React.FC<TabsProps> = ({ 
  tabs, 
  activeTab, 
  onChange, 
  className,
  variant = 'pills'
}) => {
  return (
    <div className={cn(
      "flex gap-2 p-1 bg-white/5 border border-white/5 rounded-2xl",
      variant === 'underline' && "bg-transparent border-0 border-b border-white/5 rounded-none p-0",
      className
    )}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={cn(
              "relative flex-1 flex items-center justify-center gap-2 px-6 h-11 rounded-xl text-sm font-bold transition-all outline-none",
              isActive ? "text-white" : "text-slate-500 hover:text-slate-300",
              variant === 'underline' && "flex-none h-14 rounded-none border-b-2 border-transparent",
              variant === 'underline' && isActive && "border-primary"
            )}
          >
            {isActive && variant === 'pills' && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-primary rounded-xl shadow-lg shadow-primary/20"
                transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
              />
            )}
            <span className="relative z-10">{tab.icon}</span>
            <span className="relative z-10">{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default Tabs;
