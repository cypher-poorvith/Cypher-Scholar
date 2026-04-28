import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail, FileText } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-surface-card border-t border-border-subtle mt-20 relative z-10">
      {/* Decorative element */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-pr/30 to-transparent" />
      
      <div className="max-w-[1440px] mx-auto px-8 py-16">
        
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          {/* Column 1: Brand */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h3 className="font-display text-3xl font-black uppercase italic tracking-tighter leading-none">
                <span className="gradient-text">Cypher</span><br />
                <span className="text-tx-main dark:text-white text-[1rem] tracking-[0.2em] opacity-80 not-italic">Scholar</span>
              </h3>
              <p className="text-[0.85rem] font-bold text-tx-muted leading-relaxed uppercase tracking-wide opacity-60">
                Master Every Subject, Ace Every Exam with India's most comprehensive free learning platform.
              </p>
            </div>
            
            <div className="flex gap-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="w-11 h-11 rounded-[14px] bg-surface-subtle border border-border-subtle flex items-center justify-center text-tx-muted hover:text-pr hover:border-pr/30 transition-all shadow-sm">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>
          
          {/* Column 2: Quick Links */}
          <div className="space-y-8">
            <h4 className="text-[0.7rem] font-black text-tx-main uppercase tracking-[0.25em] italic">Quick Links</h4>
            <ul className="space-y-4">
              {[
                { label: 'Home', path: '/' },
                { label: 'Competitive Exams', path: '/exams' },
                { label: 'Grades & Tracks', path: '/grades' },
                { label: 'All Subjects', path: '/subjects/all' }
              ].map((link, i) => (
                <li key={i}>
                  <Link to={link.path} className="text-[0.75rem] font-black text-tx-dim hover:text-pr transition-colors uppercase tracking-widest">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Column 3: Resources */}
          <div className="space-y-8">
            <h4 className="text-[0.7rem] font-black text-tx-main uppercase tracking-[0.25em] italic">Resources</h4>
            <ul className="space-y-4">
              {[
                { label: 'Practice Tests', path: '/practice' },
                { label: 'Study Materials', path: '/pdfs' },
                { label: 'Video Lectures', path: '/videos' },
                { label: 'Formula Sheets', path: '/about' }
              ].map((link, i) => (
                <li key={i}>
                  <Link to={link.path} className="text-[0.75rem] font-black text-tx-dim hover:text-pr transition-colors uppercase tracking-widest">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Column 4: Support */}
          <div className="space-y-8">
            <h4 className="text-[0.7rem] font-black text-tx-main uppercase tracking-[0.25em] italic">Support</h4>
            <ul className="space-y-4">
              {[
                { label: 'About Us', path: '/about' },
                { label: 'Feedback', path: '/feedback' },
                { label: 'Contribute', path: '/feedback' },
                { label: 'Contact Us', path: '/about' }
              ].map((link, i) => (
                <li key={i}>
                  <Link to={link.path} className="text-[0.75rem] font-black text-tx-dim hover:text-pr transition-colors uppercase tracking-widest">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          
        </div>
        
        {/* Divider */}
        <div className="border-t border-border-subtle pt-16">
          
          {/* Developer Credit */}
          <div className="flex flex-col items-center text-center space-y-8">
            <div className="space-y-2">
               <p className="text-[0.8rem] font-black text-tx-muted uppercase tracking-widest">
                Built By <span className="gradient-text">Poorvith M P</span>
              </p>
              <div className="h-1 w-12 bg-pr/20 mx-auto rounded-full" />
              <p className="text-[10px] font-black text-tx-dim uppercase tracking-[0.4em] opacity-40">A New Developer Emerging</p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-10">
              <a href="mailto:poorvith519@gmail.com" className="flex items-center gap-2.5 text-[0.7rem] font-black text-tx-muted hover:text-pr transition-colors uppercase tracking-widest">
                <Mail size={14} className="opacity-60" />
                Email Support
              </a>
              <a href="#" className="flex items-center gap-2.5 text-[0.7rem] font-black text-tx-muted hover:text-pr transition-colors uppercase tracking-widest">
                <Linkedin size={14} className="opacity-60" />
                LinkedIn
              </a>
              <motion.a 
                whileHover={{ scale: 1.05 }}
                href="#" 
                className="flex items-center gap-2.5 text-[0.7rem] font-black text-pr hover:text-ig-purple transition-colors uppercase tracking-widest bg-pr/5 px-4 py-2 rounded-full border border-pr/10"
              >
                <FileText size={14} />
                View Full Resume
              </motion.a>
            </div>
          </div>
          
          {/* Bottom Bar */}
          <div className="mt-16 flex flex-col md:flex-row items-center justify-between gap-8 border-t border-border-subtle pt-10">
            <div className="flex gap-10 text-[0.65rem] font-black text-tx-dim uppercase tracking-widest">
              <Link to="/about" className="hover:text-pr transition-colors">Privacy Policy</Link>
              <Link to="/about" className="hover:text-pr transition-colors">Terms of Service</Link>
            </div>
            
            <div className="text-center md:text-right space-y-2">
              <p className="text-[0.65rem] font-black text-tx-dim uppercase tracking-widest opacity-40">
                © 2026 Cypher Scholar AI. All rights reserved.
              </p>
              <p className="text-[0.6rem] font-bold text-tx-muted uppercase tracking-tight">
                Made with <span className="text-ig-pink animate-pulse">♥</span> for students across India
              </p>
            </div>
          </div>
          
        </div>
        
      </div>
    </footer>
  );
};

export default Footer;
