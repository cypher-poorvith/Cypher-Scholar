import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronUp, ChevronDown } from 'lucide-react';

const ScrollControls: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToBottom = () => {
    window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed right-8 bottom-32 z-[500] flex flex-col gap-3">
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            className="w-12 h-12 rounded-2xl glass-panel !p-0 flex items-center justify-center text-pr shadow-xl border-white/50 dark:border-slate-700/50"
          >
            <ChevronUp size={24} />
          </motion.button>
          
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToBottom}
            className="w-12 h-12 rounded-2xl glass-panel !p-0 flex items-center justify-center text-pr shadow-xl border-white/50 dark:border-slate-700/50"
          >
            <ChevronDown size={24} />
          </motion.button>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ScrollControls;
