import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { cn } from '../../lib/utils';
import GlassCard from './GlassCard';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

const Modal: React.FC<ModalProps> = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  className 
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative z-10 w-full max-w-2xl"
          >
            <GlassCard className={cn("p-0 shadow-2xl relative", className)} hover={false}>
              <div className="flex items-center justify-between p-6 border-b border-white/5">
                {title && <h2 className="text-xl font-display font-black text-white uppercase tracking-widest">{title}</h2>}
                <button 
                  onClick={onClose}
                  className="w-10 h-10 rounded-xl hover:bg-white/5 flex items-center justify-center text-slate-500 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="p-8">
                {children}
              </div>
            </GlassCard>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
