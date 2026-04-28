import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail, FileText } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 mt-20 relative z-10">
      <div className="max-w-[1440px] mx-auto px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20">
          {/* Brand Info */}
          <div className="md:col-span-4 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pr to-sec flex items-center justify-center text-white text-lg font-black">CP</div>
              <span className="text-2xl font-black font-display bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-fuchsia-500">Cypher Scholar</span>
            </div>
            <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed max-w-sm">
              The ultimate digital sanctuary for elite academic performance. Experience rigorous learning through high-stakes simulations and master-level curriculum.
            </p>
            <div className="flex gap-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-500 hover:text-pr hover:border-pr/30 transition-all shadow-sm">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="md:col-span-2 space-y-6">
            <h4 className="text-xs font-black uppercase tracking-widest text-slate-900 dark:text-white">Academy</h4>
            <ul className="space-y-4">
              {['Courses', 'Simulations', 'Exams', 'Library'].map((item) => (
                <li key={item}>
                  <Link to={`/${item.toLowerCase()}`} className="text-sm font-bold text-slate-500 hover:text-pr transition-colors">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2 space-y-6">
            <h4 className="text-xs font-black uppercase tracking-widest text-slate-900 dark:text-white">Network</h4>
            <ul className="space-y-4">
              {['Users', 'Community', 'Rankings', 'Mentorship'].map((item) => (
                <li key={item}>
                  <Link to="#" className="text-sm font-bold text-slate-500 hover:text-pr transition-colors">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2 space-y-6">
            <h4 className="text-xs font-black uppercase tracking-widest text-slate-900 dark:text-white">Institute</h4>
            <ul className="space-y-4">
              {['About', 'Privacy', 'Security', 'Compliance'].map((item) => (
                <li key={item}>
                  <Link to={`/${item.toLowerCase()}`} className="text-sm font-bold text-slate-500 hover:text-pr transition-colors">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2 space-y-6">
            <h4 className="text-xs font-black uppercase tracking-widest text-slate-900 dark:text-white">Contact</h4>
            <ul className="space-y-4">
              <li>
                <a href="mailto:support@cypher.scholar" className="text-sm font-bold text-slate-500 hover:text-pr transition-colors flex items-center gap-2">
                  <Mail size={14} /> Support
                </a>
              </li>
              <li>
                <a href="#" className="text-sm font-bold text-slate-500 hover:text-pr transition-colors flex items-center gap-2">
                  <FileText size={14} /> Whitepaper
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">© 2026 Cypher Scholar AI. All rights reserved.</p>
          <div className="flex gap-8">
            <Link to="/about" className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-pr transition-colors">Privacy Policy</Link>
            <Link to="/about" className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-pr transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
