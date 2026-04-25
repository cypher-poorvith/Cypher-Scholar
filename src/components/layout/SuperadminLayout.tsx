import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import Breadcrumbs from './Breadcrumbs';
import BottomNav from './BottomNav';
import { AnimatePresence, motion } from 'motion/react';
import { cn } from '../../lib/utils';

interface SuperadminLayoutProps {
  children: React.ReactNode;
}

const SuperadminLayout: React.FC<SuperadminLayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[#0D0A1F] overflow-hidden text-slate-200">
      {/* Desktop Sidebar */}
      <div className="hidden md:block h-full">
        <Sidebar />
      </div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm md:hidden"
            />
            <motion.div
              initial={{ x: -288 }}
              animate={{ x: 0 }}
              exit={{ x: -288 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 z-[60] w-72 md:hidden"
            >
              <Sidebar />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden relative">
        {/* Atmosphere background elements */}
        <div className="atmosphere-spot w-[600px] h-[600px] bg-primary/10 -top-40 -right-40 opacity-40 blur-[150px]" />
        <div className="atmosphere-spot w-[500px] h-[500px] bg-secondary/10 bottom-0 -left-20 opacity-30 blur-[120px]" />

        <Header onMenuClick={() => setIsSidebarOpen(true)} />

        <main className="flex-1 overflow-y-auto no-scrollbar p-6 pb-24 md:pb-6 relative z-10">
          <div className="max-w-7xl mx-auto w-full">
            <Breadcrumbs />
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {children}
            </motion.div>
          </div>
        </main>

        <BottomNav />
      </div>
    </div>
  );
};

export default SuperadminLayout;
