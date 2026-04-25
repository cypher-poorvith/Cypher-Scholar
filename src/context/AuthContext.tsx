import React, { createContext, useContext, useEffect, useState } from 'react';
import { UserProfile, UserRole } from '../types';
import { useToast } from './ToastContext';

interface AuthContextType {
  user: any | null;
  profile: UserProfile | null;
  loading: boolean;
  isAdmin: boolean;
  isEditor: boolean;
  logout: () => Promise<void>;
  logAudit: (action: string, target: string, type: 'user' | 'content' | 'test' | 'system', targetId: string, before?: any, after?: any) => Promise<void>;
  viewMode: 'student' | 'editor' | 'admin';
  setViewMode: React.Dispatch<React.SetStateAction<'student' | 'editor' | 'admin'>>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  loading: true,
  isAdmin: false,
  isEditor: false,
  logout: async () => {},
  logAudit: async () => {},
  viewMode: 'student',
  setViewMode: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { showToast } = useToast();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [viewMode, setViewMode] = useState<'student' | 'editor' | 'admin'>(
    (localStorage.getItem('cypher_view_mode') as any) || 'student'
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    localStorage.setItem('cypher_view_mode', viewMode);
  }, [viewMode]);

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/auth/me');
      if (response.ok) {
        const data = await response.json();
        setProfile(data.user);
        
        // Set initial viewMode based on role
        if (data.user.role === UserRole.SUPERADMIN) setViewMode('admin');
        else if (data.user.role === UserRole.EDITOR) setViewMode('editor');
        else setViewMode('student');
      } else {
        setProfile(null);
        setViewMode('student');
      }
    } catch (error) {
      console.error("Auth check error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const isAdmin = profile?.role === UserRole.SUPERADMIN;
  const isEditor = profile?.role === UserRole.EDITOR || isAdmin;

  const logout = async () => {
    setLoading(true);
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      setProfile(null);
      showToast("Logged out successfully", "success");
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      setLoading(false);
    }
  };

  const logAudit = async (action: string, target: string, type: 'user' | 'content' | 'test' | 'system', targetId: string, before?: any, after?: any) => {
    // Audit logging can be moved to backend entirely later
    console.log("Audit:", { action, target, type, targetId });
  };

  return (
    <AuthContext.Provider value={{ user: profile, profile, loading, isAdmin, isEditor, logout, logAudit, viewMode, setViewMode } as any}>
      {children}
    </AuthContext.Provider>
  );
};


