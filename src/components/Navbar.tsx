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
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 w-[90%] max-w-7xl z-[100]">
      <div className="bg-white/80 backdrop-blur-xl border border-white/50 h-16 rounded-2xl px-6 flex items-center justify-between shadow-lg">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-linear-to-br from-primary via-secondary to-accent rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
            <GraduationCap size={24} />
          </div>
          <span className="font-display font-bold text-slate-900 tracking-tight text-lg">Cypher Scholar</span>
        </Link>
 
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
           <Link to="/about" className="text-sm font-semibold text-slate-500 hover:text-primary transition-colors flex items-center gap-2">
             About Us
           </Link>
           <Link to="/feedback" className="text-sm font-semibold text-slate-500 hover:text-primary transition-colors flex items-center gap-2">
             Feedback
           </Link>
           <div className="h-4 w-px bg-slate-200" />
           {user ? (
             <Link to="/dashboard" className="btn-primary h-10 px-6 text-xs">
               My Dashboard
             </Link>
           ) : (
             <Link to="/auth" className="btn-primary h-10 px-6 text-xs">
               Login / Join
             </Link>
           )}
        </div>
 
        {/* Mobile menu button */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-slate-600">
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
            className="md:hidden mt-2 bg-white/90 backdrop-blur-xl border border-white p-6 rounded-2xl shadow-xl flex flex-col gap-4"
          >
            <Link to="/about" onClick={() => setIsOpen(false)} className="text-sm font-semibold text-slate-600">About Us</Link>
            <Link to="/feedback" onClick={() => setIsOpen(false)} className="text-sm font-semibold text-slate-600">Feedback</Link>
            <div className="h-px bg-slate-100" />
            {user ? (
              <Link to="/dashboard" onClick={() => setIsOpen(false)} className="btn-primary text-center h-11">My Dashboard</Link>
            ) : (
              <Link to="/auth" onClick={() => setIsOpen(false)} className="btn-primary text-center h-11">Login / Join</Link>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
