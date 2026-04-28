import React, { useState } from 'react';
import SuperadminNavbar from './SuperadminNavbar';
import FloatingNav from '../ui/FloatingNav';
import PageLoader from '../ui/PageLoader';
import ScrollControls from '../ui/ScrollControls';
import NavControls from '../ui/NavControls';

interface SuperadminLayoutProps {
  children: React.ReactNode;
}

export default function SuperadminLayout({ children }: SuperadminLayoutProps) {
  return (
    <div className="flex h-screen bg-surface-bg dark:bg-slate-950 overflow-hidden text-tx-main transition-colors duration-500">
      <PageLoader />
      <SuperadminNavbar />
      <NavControls />
      
      {/* Atmosphere background elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-pr/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-sec/5 blur-[120px]" />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden relative z-10 pt-20 pb-40">
        <main className="flex-1 overflow-y-auto no-scrollbar relative scale-100">
          <div className="max-w-[1440px] mx-auto px-6 md:px-8 py-8">
            {children}
          </div>
        </main>
      </div>

      <ScrollControls />
      <FloatingNav />
    </div>
  );
}
