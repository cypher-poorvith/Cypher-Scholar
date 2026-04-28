import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const PageLoader: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(false), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="fixed inset-0 z-[1000] flex items-center justify-center bg-surface-bg dark:bg-slate-950"
        >
          <div className="relative flex flex-col items-center">
            {/* 3D Animated Logo */}
            <motion.div
              animate={{ 
                rotateY: [0, 180, 360],
                rotateX: [0, 10, 0, -10, 0]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "linear"
              }}
              className="w-20 h-20 rounded-[2rem] brand-gradient flex items-center justify-center text-white text-3xl font-black text-3d shadow-2xl shadow-pr/40"
            >
              CP
            </motion.div>
            
            {/* Glass loading bar */}
            <div className="mt-12 w-48 h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden border border-white/20 dark:border-slate-700/20">
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ 
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="w-full h-full brand-gradient"
              />
            </div>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-6 text-[0.7rem] font-bold uppercase tracking-[0.3em] text-pr animate-pulse"
            >
              Cypher Scholar
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PageLoader;
