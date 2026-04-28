import React, { createContext, useContext, useEffect, useState } from 'react';
import { UserProfile, UserRole, UserStatus } from '../types';
import { useToast } from './ToastContext';
import { auth, db, googleProvider, signInWithPopup, signOut as firebaseSignOut, onAuthStateChanged } from '../lib/firebase';
import { doc, getDoc, setDoc, updateDoc, serverTimestamp, getDocFromServer } from 'firebase/firestore';
import { User } from 'firebase/auth';

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  }
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  }
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  isAdmin: boolean;
  isEditor: boolean;
  role: UserRole | null;
  effectiveRole: UserRole | null;
  setEffectiveRole: (role: UserRole) => void;
  signInWithGoogle: () => Promise<{ error: any }>;
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
    const path = `users/${uid}`;
    try {
      const docRef = doc(db, path);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return docSnap.data() as UserProfile;
      }
      return null;
    } catch (error) {
      handleFirestoreError(error, OperationType.GET, path);
      return null;
    }
  };

  const createInitialProfile = async (firebaseUser: User) => {
    const path = `users/${firebaseUser.uid}`;
    const newProfile: UserProfile = {
      id: firebaseUser.uid,
      displayName: firebaseUser.displayName || 'New Scholar',
      email: firebaseUser.email || '',
      photoURL: firebaseUser.photoURL || undefined,
      role: UserRole.STUDENT,
      status: UserStatus.ACTIVE,
      createdAt: Date.now(),
      lastLogin: Date.now(),
      isActive: true,
      blocked: false,
      devices: [],
      permissions: {
        uploadContent: false,
        manageUsers: false,
        viewAnalytics: false,
        deleteContent: false,
        createAnnouncements: false,
        editAppStructure: false,
      },
      onboardingComplete: false
    };

    try {
      await setDoc(doc(db, path), newProfile);
      return newProfile;
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, path);
      return null;
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        let userProfile = await fetchProfile(firebaseUser.uid);
        
        if (!userProfile) {
          userProfile = await createInitialProfile(firebaseUser);
        }

        if (userProfile) {
          setProfile(userProfile);
          if (!localStorage.getItem('cypher_effective_role')) {
            setEffectiveRole(userProfile.role);
          }
        }
      } else {
        setUser(null);
        setProfile(null);
        setEffectiveRoleState(null);
        localStorage.removeItem('cypher_effective_role');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      showToast("Signed in successfully", "success");
      return { error: null };
    } catch (err: any) {
      console.error("Login error:", err);
      showToast(err.message || "Failed to sign in", "danger");
      return { error: err };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { signInWithEmailAndPassword } = await import('firebase/auth');
      await signInWithEmailAndPassword(auth, email, password);
      return { error: null };
    } catch (err: any) {
      return { error: err };
    }
  };

  const signUp = async (email: string, password: string, displayName: string) => {
    try {
      const { createUserWithEmailAndPassword, updateProfile, sendEmailVerification } = await import('firebase/auth');
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName });
      await sendEmailVerification(userCredential.user);
      return { error: null, data: userCredential.user };
    } catch (err: any) {
      return { error: err, data: null };
    }
  };

  const resetPassword = async (email: string) => {
    try {
      const { sendPasswordResetEmail } = await import('firebase/auth');
      await sendPasswordResetEmail(auth, email);
      return { error: null };
    } catch (err: any) {
      return { error: err };
    }
  };

  const signOut = async () => {
    setLoading(true);
    try {
      await firebaseSignOut(auth);
      localStorage.removeItem('cypher_effective_role');
      showToast("Logged out successfully", "success");
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      setLoading(false);
    }
  };

  const logAudit = async (action: string, target: string, type: 'user' | 'content' | 'test' | 'system', targetId: string, before?: any, after?: any) => {
    if (!user) return;
    const path = `audit_logs/${Date.now()}_${user.uid}`;
    try {
      await setDoc(doc(db, path), {
        userId: user.uid,
        userName: profile?.displayName || user.email,
        userRole: profile?.role || UserRole.STUDENT,
        action,
        targetType: type,
        targetId: targetId,
        targetName: target,
        timestamp: Date.now(),
        before,
        after
      });
    } catch (error) {
      console.warn("Failed to log audit:", error);
    }
  };

  const isAdmin = profile?.role === UserRole.SUPERADMIN || user?.email === 'poorvith519@gmail.com';
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
      signInWithGoogle,
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


