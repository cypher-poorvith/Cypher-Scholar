import React from 'react';
import { cn } from '../../lib/utils';
import { motion } from 'motion/react';

interface LoaderProps {
  size?: 'sm' | 'md' | 'lg' | 'full';
  className?: string;
  label?: string;
}

const Loader: React.FC<LoaderProps> = ({ 
  size = 'md', 
  className,
  label = "Synchronizing..."
}) => {
  const sizes = {
    sm: "w-6 h-6 border-2",
    md: "w-12 h-12 border-3",
    lg: "w-20 h-20 border-4",
    full: "w-20 h-20 border-4",
  };

  if (size === 'full') {
    return (
      <div className="fixed inset-0 z-[200] bg-[#0D0A1F] flex flex-col items-center justify-center gap-6">
        <motion.div
           animate={{ rotate: 360 }}
           transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
           className={cn(
            "rounded-full border-primary/20 border-t-primary shadow-[0_0_40px_rgba(99,102,241,0.2)]",
            sizes.full
          )}
        />
        <motion.p
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-xs font-mono font-black text-primary uppercase tracking-[0.4em]"
        >
          {label}
        </motion.p>
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col items-center justify-center gap-4", className)}>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        className={cn(
          "rounded-full border-primary/10 border-t-primary shadow-sm",
          sizes[size as keyof typeof sizes]
        )}
      />
      {label && size !== 'sm' && (
        <p className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest">{label}</p>
      )}
    </div>
  );
};

export default Loader;
