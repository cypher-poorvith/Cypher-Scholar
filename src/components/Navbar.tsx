import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronDown, Menu, X, Shield, Cpu, Globe, Zap, GraduationCap } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'motion/react';

const Navbar: React.FC = () => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[90%] max-w-7xl z-[100]">
      <div className="bg-[#16122D]/60 backdrop-blur-2xl border border-white/10 h-16 rounded-2xl px-8 flex items-center justify-between shadow-2xl">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-600/30 group-hover:scale-110 transition-transform">
            <GraduationCap size={24} />
          </div>
          <span className="font-display font-black text-white tracking-tight uppercase text-sm">Cypher Scholar</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
           <Link to="/about" className="text-xs font-bold text-slate-400 hover:text-white uppercase tracking-widest transition-colors flex items-center gap-2">
             About Us
           </Link>
           <Link to="/feedback" className="text-xs font-bold text-slate-400 hover:text-white uppercase tracking-widest transition-colors flex items-center gap-2">
             Feedback
           </Link>
           <div className="h-4 w-px bg-white/10" />
           {user ? (
             <Link to="/dashboard" className="immersive-button-primary h-9 px-4 text-xs">
               My Dashboard
             </Link>
           ) : (
             <Link to="/auth" className="immersive-button-primary h-9 px-4 text-xs ring-4 ring-indigo-600/20">
               Login / Join
             </Link>
           )}
        </div>

        {/* Mobile menu button */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white">
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden mt-4 immersive-card p-6 flex flex-col gap-6"
          >
            <Link to="/about" onClick={() => setIsOpen(false)} className="text-sm font-bold text-slate-400 uppercase tracking-widest">About Us</Link>
            <Link to="/feedback" onClick={() => setIsOpen(false)} className="text-sm font-bold text-slate-400 uppercase tracking-widest">Feedback</Link>
            <div className="h-px bg-white/5" />
            {user ? (
              <Link to="/dashboard" onClick={() => setIsOpen(false)} className="immersive-button-primary text-center">My Dashboard</Link>
            ) : (
              <Link to="/auth" onClick={() => setIsOpen(false)} className="immersive-button-primary text-center">Login / Join</Link>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
