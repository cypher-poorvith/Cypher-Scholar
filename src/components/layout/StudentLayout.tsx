import React from 'react';
import StudentNavbar from './StudentNavbar';
import Footer from './Footer';
import { motion, AnimatePresence } from 'motion/react';
import { useLocation } from 'react-router-dom';

interface StudentLayoutProps {
  children: React.ReactNode;
}

export default function StudentLayout({ children }: StudentLayoutProps) {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-surface-bg flex flex-col font-sans text-tx-main transition-colors duration-200">
      <StudentNavbar />
      
      <main className="flex-1 relative z-10 w-full">
        {/* BG GLOW from mockup */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
           <div className="absolute top-[-15%] right-[-10%] w-[50%] h-[50%] bg-pr/5 dark:bg-pr/10 rounded-full blur-[80px]" />
           <div className="absolute bottom-0 left-[-5%] w-[40%] h-[40%] bg-sec/5 dark:bg-sec/10 rounded-full blur-[60px]" />
        </div>

        <div className="max-w-[1440px] mx-auto relative z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      <Footer />
    </div>
  );
}
