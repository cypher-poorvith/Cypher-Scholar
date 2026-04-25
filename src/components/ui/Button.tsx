import React from 'react';
import { cn } from '../../lib/utils';
import { motion, HTMLMotionProps } from 'motion/react';

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md',
  loading = false,
  className,
  ...props 
}) => {
  const variants = {
    primary: "btn-primary",
    secondary: "btn-secondary",
    danger: "bg-red-500 text-white hover:bg-red-600 shadow-md",
    ghost: "bg-transparent text-slate-500 hover:text-primary hover:bg-primary/5 border-transparent",
    outline: "bg-transparent border-slate-200 text-slate-600 hover:border-primary/30 hover:bg-primary/5",
  };

  const sizes = {
    sm: "h-9 px-4 text-xs",
    md: "h-12 px-6 text-sm",
    lg: "h-14 px-10 text-base",
  };

  return (
    <motion.button
      whileHover={!loading ? { scale: 1.05 } : undefined}
      whileTap={!loading ? { scale: 0.95 } : undefined}
      className={cn(
        "rounded-[12px] font-bold transition-all flex items-center justify-center gap-2 whitespace-nowrap outline-none border",
        variants[variant],
        sizes[size],
        loading && "opacity-70 pointer-events-none grayscale",
        className
      )}
      {...props}
    >
      {loading ? (
        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
      ) : children}
    </motion.button>
  );
};

export default Button;
