import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Home } from 'lucide-react';

const NavControls: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="fixed top-24 left-8 z-[500] flex flex-col gap-3 hidden lg:flex">
      <motion.button
        whileHover={{ x: -4 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate(-1)}
        className="w-12 h-12 rounded-2xl glass-panel !p-0 flex items-center justify-center text-slate-500 hover:text-pr shadow-lg border-white/50 dark:border-slate-700/50"
        title="Go Back"
      >
        <ArrowLeft size={20} />
      </motion.button>
      
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate('/')}
        className="w-12 h-12 rounded-2xl glass-panel !p-0 flex items-center justify-center text-slate-500 hover:text-pr shadow-lg border-white/50 dark:border-slate-700/50"
        title="Back to Home"
      >
        <Home size={20} />
      </motion.button>
    </div>
  );
};

export default NavControls;
