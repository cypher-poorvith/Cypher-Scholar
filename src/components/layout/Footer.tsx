import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail, FileText } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#1e1b4b]/60 border-t border-white/10 mt-20 relative z-10">
      <div className="max-w-[1440px] mx-auto px-8 py-12">
        
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Column 1: Brand */}
          <div className="space-y-6">
            <h3 className="font-display text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
              Cypher Scholar
            </h3>
            <p className="text-sm font-medium text-slate-400 leading-relaxed">
              Master Every Subject, Ace Every Exam with India's most comprehensive free learning platform.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-400 hover:text-indigo-400 hover:bg-indigo-400/10 transition-all">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-400 hover:text-indigo-400 hover:bg-indigo-400/10 transition-all">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-400 hover:text-indigo-400 hover:bg-indigo-400/10 transition-all">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-400 hover:text-indigo-400 hover:bg-indigo-400/10 transition-all">
                <Linkedin size={18} />
              </a>
            </div>
          </div>
          
          {/* Column 2: Quick Links */}
          <div className="space-y-6">
            <h4 className="text-xs font-black text-white uppercase tracking-[0.2em]">Quick Links</h4>
            <ul className="space-y-4">
              <li><Link to="/" className="text-sm font-bold text-slate-400 hover:text-white transition-colors uppercase tracking-widest">Home</Link></li>
              <li><Link to="/exams" className="text-sm font-bold text-slate-400 hover:text-white transition-colors uppercase tracking-widest">Competitive Exams</Link></li>
              <li><Link to="/grades" className="text-sm font-bold text-slate-400 hover:text-white transition-colors uppercase tracking-widest">Grades</Link></li>
              <li><Link to="/subjects/all" className="text-sm font-bold text-slate-400 hover:text-white transition-colors uppercase tracking-widest">All Subjects</Link></li>
            </ul>
          </div>
          
          {/* Column 3: Resources */}
          <div className="space-y-6">
            <h4 className="text-xs font-black text-white uppercase tracking-[0.2em]">Resources</h4>
            <ul className="space-y-4">
              <li><Link to="/practice" className="text-sm font-bold text-slate-400 hover:text-white transition-colors uppercase tracking-widest">Practice Tests</Link></li>
              <li><Link to="/pdfs" className="text-sm font-bold text-slate-400 hover:text-white transition-colors uppercase tracking-widest">Study Materials</Link></li>
              <li><Link to="/videos" className="text-sm font-bold text-slate-400 hover:text-white transition-colors uppercase tracking-widest">Video Lectures</Link></li>
              <li><Link to="/about" className="text-sm font-bold text-slate-400 hover:text-white transition-colors uppercase tracking-widest">Formula Sheets</Link></li>
            </ul>
          </div>
          
          {/* Column 4: Support */}
          <div className="space-y-6">
            <h4 className="text-xs font-black text-white uppercase tracking-[0.2em]">Support</h4>
            <ul className="space-y-4">
              <li><Link to="/about" className="text-sm font-bold text-slate-400 hover:text-white transition-colors uppercase tracking-widest">About Us</Link></li>
              <li><Link to="/feedback" className="text-sm font-bold text-slate-400 hover:text-white transition-colors uppercase tracking-widest">Feedback</Link></li>
              <li><Link to="/feedback" className="text-sm font-bold text-slate-400 hover:text-white transition-colors uppercase tracking-widest">Contribute</Link></li>
              <li><Link to="/about" className="text-sm font-bold text-slate-400 hover:text-white transition-colors uppercase tracking-widest">Contact Us</Link></li>
            </ul>
          </div>
          
        </div>
        
        {/* Divider */}
        <div className="border-t border-white/5 pt-12">
          
          {/* Developer Credit */}
          <div className="flex flex-col items-center text-center space-y-6">
            <div className="space-y-1">
               <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">
                Built By <span className="text-indigo-400">Poorvith M P</span>
              </p>
              <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.3em]">A New Developer Emerging</p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-6">
              <a href="mailto:poorvith519@gmail.com" className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-indigo-400 transition-colors uppercase tracking-widest">
                <Mail size={14} />
                Email
              </a>
              <a href="#" className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-indigo-400 transition-colors uppercase tracking-widest">
                <Linkedin size={14} />
                LinkedIn
              </a>
              <a href="#" className="flex items-center gap-2 text-xs font-bold text-indigo-400 hover:text-indigo-300 transition-colors uppercase tracking-widest">
                <FileText size={14} />
                View Full Resume
              </a>
            </div>
          </div>
          
          {/* Bottom Bar */}
          <div className="mt-12 flex flex-col md:flex-row items-center justify-between gap-6 border-t border-white/5 pt-8">
            <div className="flex gap-8 text-[10px] font-black text-slate-500 uppercase tracking-widest">
              <Link to="/about" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link to="/about" className="hover:text-white transition-colors">Terms of Service</Link>
            </div>
            
            <div className="text-center md:text-right space-y-1">
              <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest">
                © 2024 Cypher Scholar. All rights reserved.
              </p>
              <p className="text-[9px] font-bold text-indigo-500/50 uppercase tracking-tight">
                Made with <span className="text-rose-500">♥</span> for students across India
              </p>
            </div>
          </div>
          
        </div>
        
      </div>
    </footer>
  );
};

export default Footer;
