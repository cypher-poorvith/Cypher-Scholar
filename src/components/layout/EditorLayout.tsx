import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import EditorNavbar from './EditorNavbar';
import PageLoader from '../ui/PageLoader';
import FloatingNav from '../ui/FloatingNav';
import ScrollControls from '../ui/ScrollControls';
import NavControls from '../ui/NavControls';

interface EditorLayoutProps {
  children?: React.ReactNode;
}

export default function EditorLayout({ children }: EditorLayoutProps) {
  const { profile, isEditor } = useAuth();

  if (!profile || !isEditor) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-500 overflow-x-hidden">
      <PageLoader />
      <EditorNavbar />
      <NavControls />
      
      <main className="p-4 md:p-8 pt-28 pb-40 relative z-10">
        {/* Subtle grid bg */}
        <div className="fixed inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.05]" 
             style={{ backgroundImage: 'radial-gradient(#5400c3 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }} />
             
        <div className="max-w-[1440px] mx-auto relative z-10">
          {children || <Outlet />}
        </div>
      </main>

      <ScrollControls />
      <FloatingNav />
    </div>
  );
}
