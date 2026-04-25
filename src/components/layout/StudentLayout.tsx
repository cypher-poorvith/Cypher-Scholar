import React from 'react';
import StudentNavbar from './StudentNavbar';
import Footer from './Footer';
import { motion, AnimatePresence } from 'motion/react';
import { useLocation } from 'react-router-dom';

interface StudentLayoutProps {
  children: React.ReactNode;
}

const StudentLayout: React.FC<StudentLayoutProps> = ({ children }) => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-[#13131b] flex flex-col font-primary text-[#e4e1ed] transition-all duration-500">
      <StudentNavbar />
      
      <main className="flex-1 relative z-10 w-full overflow-x-hidden">
        {/* Background Ambient Glows */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
          <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-600/10 blur-[120px] rounded-full animate-pulse" />
          <div className="absolute bottom-[10%] left-[-5%] w-[40%] h-[40%] bg-purple-600/10 blur-[100px] rounded-full animate-pulse decoration-indigo-200" />
          <div className="absolute top-[40%] left-[20%] w-[30%] h-[30%] bg-cyan-600/5 blur-[80px] rounded-full" />
        </div>

        <div className="max-w-[1440px] mx-auto px-6 py-8 relative z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default StudentLayout;
