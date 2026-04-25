import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import EditorNavbar from './EditorNavbar';

const EditorLayout: React.FC = () => {
  const { profile, loading, isEditor } = useAuth();

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-[#070512]">
        <div className="w-12 h-12 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!profile || !isEditor) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-[#070512]">
      <EditorNavbar />
      <main className="p-8 pb-20">
        <div className="max-w-[1440px] mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default EditorLayout;
