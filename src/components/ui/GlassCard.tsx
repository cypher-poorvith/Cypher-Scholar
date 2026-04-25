import React from 'react';
import { cn } from '../../lib/utils';
import { motion, HTMLMotionProps } from 'motion/react';

interface GlassCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

const GlassCard: React.FC<GlassCardProps> = ({ 
  children, 
  className, 
  hover = true,
  ...props 
}) => {
  return (
    <motion.div
      whileHover={hover ? { y: -5 } : undefined}
      className={cn(
        "bg-white/10 backdrop-blur-[10px] border border-white/20 rounded-[20px] overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.37)]",
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default GlassCard;
