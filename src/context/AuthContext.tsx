import React, { createContext, useContext, useEffect, useState } from 'react';
import { UserProfile, UserRole } from '../types';
import { useToast } from './ToastContext';
import { supabase } from '../lib/supabase';
import { User, Session } from '@supabase/supabase-js';

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  isAdmin: boolean;
  isEditor: boolean;
  role: UserRole | null;
  effectiveRole: UserRole | null;
  setEffectiveRole: (role: UserRole) => void;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string, displayName: string) => Promise<{ error: any, data: any }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: any }>;
  logAudit: (action: string, target: string, type: 'user' | 'content' | 'test' | 'system', targetId: string, before?: any, after?: any) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { showToast } = useToast();
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [effectiveRole, setEffectiveRoleState] = useState<UserRole | null>(null);
  const [loading, setLoading] = useState(true);

  // Initialize viewMode/effectiveRole from localStorage if it exists
  useEffect(() => {
    const savedRole = localStorage.getItem('cypher_effective_role') as UserRole;
    if (savedRole && Object.values(UserRole).includes(savedRole)) {
      setEffectiveRoleState(savedRole);
    }
  }, []);

  const setEffectiveRole = (role: UserRole) => {
    setEffectiveRoleState(role);
    localStorage.setItem('cypher_effective_role', role);
  };

  const fetchProfile = async (uid: string) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', uid)
      .single();

    if (error) {
      console.error('Error fetching profile:', error);
      // In case of race condition during signup, profile might not be created yet by trigger
      return null;
    }
    return data as UserProfile;
  };

  useEffect(() => {
    // Check active sessions and subscribe to auth changes
    const initAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        setUser(session.user);
        const userProfile = await fetchProfile(session.user.id);
        setProfile(userProfile);
        
        // If no effective role set, use the real role
        if (!localStorage.getItem('cypher_effective_role') && userProfile) {
          setEffectiveRole(userProfile.role);
        }
      } else {
        setUser(null);
        setProfile(null);
        setEffectiveRoleState(null);
      }
      setLoading(false);
    };

    initAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session) {
        setUser(session.user);
        const userProfile = await fetchProfile(session.user.id);
        setProfile(userProfile);
        
        if (!localStorage.getItem('cypher_effective_role') && userProfile) {
          setEffectiveRole(userProfile.role);
        }
      } else {
        setUser(null);
        setProfile(null);
        setEffectiveRoleState(null);
        localStorage.removeItem('cypher_effective_role');
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      // Specific error messages handling is usually done in the component
      // but we return the raw error here.
      return { error };
    }
    return { error: null };
  };

  const signUp = async (email: string, password: string, displayName: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          display_name: displayName,
        },
      },
    });

    return { error, data };
  };

  const signOut = async () => {
    setLoading(true);
    try {
      await supabase.auth.signOut();
      localStorage.removeItem('cypher_effective_role');
      showToast("Logged out successfully", "success");
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    return { error };
  };

  const logAudit = async (action: string, target: string, type: 'user' | 'content' | 'test' | 'system', targetId: string, before?: any, after?: any) => {
    if (!user) return;
    
    await supabase.from('audit_logs').insert({
      user_id: user.id,
      user_name: profile?.displayName || user.email,
      user_role: profile?.role || UserRole.STUDENT,
      action,
      target_type: type,
      target_id: targetId,
      target_name: target,
      timestamp: Date.now(),
      before,
      after
    });
  };

  const isAdmin = profile?.role === UserRole.SUPERADMIN;
  const isEditor = profile?.role === UserRole.EDITOR || isAdmin;

  return (
    <AuthContext.Provider value={{ 
      user, 
      profile, 
      loading, 
      isAdmin, 
      isEditor, 
      role: profile?.role || null,
      effectiveRole,
      setEffectiveRole,
      signIn,
      signUp,
      signOut,
      resetPassword,
      logAudit 
    }}>
      {children}
    </AuthContext.Provider>
  );
};


