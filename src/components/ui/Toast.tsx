import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, AlertTriangle, AlertCircle, X, Info } from 'lucide-react';
import { cn } from '../../lib/utils';
import GlassCard from './GlassCard';

export type ToastVariant = 'success' | 'warning' | 'danger' | 'info';

interface ToastProps {
  id: string;
  message: string;
  variant?: ToastVariant;
  onClose: (id: string) => void;
}

const Toast: React.FC<ToastProps> = ({ 
  id, 
  message, 
  variant = 'info', 
  onClose 
}) => {
  const icons = {
    success: <CheckCircle2 className="text-success" size={18} />,
    warning: <AlertTriangle className="text-warning" size={18} />,
    danger: <AlertCircle className="text-danger" size={18} />,
    info: <Info className="text-primary" size={18} />,
  };

  const borders = {
    success: "border-success/30 bg-success/5",
    warning: "border-warning/30 bg-warning/5",
    danger: "border-danger/30 bg-danger/5",
    info: "border-primary/30 bg-primary/5",
  };

  React.useEffect(() => {
    const timer = setTimeout(() => onClose(id), 5000);
    return () => clearTimeout(timer);
  }, [id, onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 20, scale: 0.9 }}
      className="pointer-events-auto"
    >
      <GlassCard className={cn("p-4 flex items-center gap-4 min-w-[300px] border-l-4", borders[variant])} hover={false}>
        <div className="shrink-0">{icons[variant]}</div>
        <div className="flex-1">
          <p className="text-xs font-bold text-white uppercase tracking-tight">{message}</p>
        </div>
        <button 
          onClick={() => onClose(id)}
          className="p-1 hover:bg-white/10 rounded-lg transition-colors text-slate-500 hover:text-white"
        >
          <X size={14} />
        </button>
      </GlassCard>
    </motion.div>
  );
};

export default Toast;
