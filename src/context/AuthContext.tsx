import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc, collection } from 'firebase/firestore';
import { auth, db, handleFirestoreError } from '../lib/firebase';
import { UserProfile, UserRole, UserStatus } from '../types';

interface AuthContextType {
  user: User | null;
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

const SUPERADMIN_EMAIL = 'poorvith519@gmail.com';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [viewMode, setViewMode] = useState<'student' | 'editor' | 'admin'>(
    (localStorage.getItem('cypher_view_mode') as any) || 'student'
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    localStorage.setItem('cypher_view_mode', viewMode);
  }, [viewMode]);

  useEffect(() => {
    return onAuthStateChanged(auth, async (user) => {
      try {
        setUser(user);
        if (user) {
          const userRef = doc(db, 'users', user.uid);
          let userDoc = await getDoc(userRef);
          
          if (!userDoc.exists() && user.email) {
            const isSuper = user.email === SUPERADMIN_EMAIL || user.email === 'admin@123.com';
            const isEditor = user.email === 'editor@123.com';
            
            const newProfile: UserProfile = {
              id: user.uid,
              displayName: user.displayName || 'Scholar',
              email: user.email,
              photoURL: user.photoURL || null as any,
              role: isSuper ? UserRole.SUPERADMIN : (isEditor ? UserRole.EDITOR : UserRole.USER),
              status: UserStatus.NEW,
              createdAt: Date.now(),
              lastLogin: Date.now(),
              isActive: true,
              blocked: false,
              devices: [],
              onboardingComplete: false,
              permissions: {
                uploadContent: isSuper || isEditor,
                manageUsers: isSuper,
                viewAnalytics: isSuper,
                deleteContent: isSuper,
                createAnnouncements: isSuper,
                editAppStructure: isSuper
              }
            };
            try {
              // Ensure we don't send undefined to Firestore
              const cleanedProfile = JSON.parse(JSON.stringify(newProfile));
              await setDoc(userRef, cleanedProfile);
              userDoc = await getDoc(userRef);
            } catch (e) {
              console.error("Firestore Error creating profile:", e);
              showToast("Error creating profile. Please contact support.", "danger");
            }
          }

          if (userDoc?.exists()) {
            const data = userDoc.data() as UserProfile;
            setProfile(data);
            
            // Set initial viewMode based on role
            if (data.role === UserRole.SUPERADMIN) setViewMode('admin');
            else if (data.role === UserRole.EDITOR) setViewMode('editor');
            else setViewMode('student');

            try {
              await updateDoc(userRef, { lastLogin: Date.now(), isActive: true });
            } catch (e) {
              console.error("Firestore Error updating last login:", e);
              // Not a fatal error for the user
            }
          }
        } else {
          setProfile(null);
          setViewMode('student');
        }
      } catch (error: any) {
        console.error("Auth state change error:", error);
        showToast(error.message || "Auth error", "danger");
      } finally {
        setLoading(false);
      }
    });
  }, [showToast]);

  const isAdmin = profile?.role === UserRole.SUPERADMIN;
  const isEditor = profile?.role === UserRole.EDITOR || isAdmin;

  const logout = async () => {
    setLoading(true);
    await auth.signOut();
    setProfile(null);
    setLoading(false);
  };

  const logAudit = async (action: string, target: string, type: 'user' | 'content' | 'test' | 'system', targetId: string, before?: any, after?: any) => {
    if (!profile) return;
    try {
      const logRef = doc(collection(db, 'auditLogs'));
      const log: any = {
        id: logRef.id,
        userId: profile.id,
        userName: profile.displayName,
        userRole: profile.role,
        action,
        targetType: type,
        targetId,
        targetName: target,
        timestamp: Date.now(),
        ipAddress: 'detected',
        userAgent: navigator.userAgent,
        before: before || null,
        after: after || null
      };
      await setDoc(logRef, log);
    } catch (err) {
      console.error("Failed to log audit:", err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, profile, loading, isAdmin, isEditor, logout, logAudit, viewMode, setViewMode } as any}>
      {children}
    </AuthContext.Provider>
  );
};

