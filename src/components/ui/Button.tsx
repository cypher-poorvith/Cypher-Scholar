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
    primary: "immersive-button-primary",
    secondary: "immersive-button-secondary",
    danger: "immersive-button-danger",
    ghost: "bg-transparent text-slate-400 hover:text-white hover:bg-white/5 border-transparent",
    outline: "bg-transparent border-white/10 text-slate-300 hover:border-white/30 hover:bg-white/5",
  };

  const sizes = {
    sm: "h-9 px-4 text-xs",
    md: "h-11 px-6 text-sm",
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
