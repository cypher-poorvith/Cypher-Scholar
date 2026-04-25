import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import EditorNavbar from './EditorNavbar';

interface EditorLayoutProps {
  children?: React.ReactNode;
}

export default function EditorLayout({ children }: EditorLayoutProps) {
  const { profile, loading, isEditor } = useAuth();

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-slate-50">
        <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!profile || !isEditor) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <EditorNavbar />
      <main className="p-8 pb-20">
        <div className="max-w-[1440px] mx-auto">
          {children || <Outlet />}
        </div>
      </main>
    </div>
  );
}
