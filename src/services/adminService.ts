import { db, auth } from '../lib/firebase';
import { 
  doc, 
  setDoc, 
  updateDoc, 
  deleteDoc, 
  collection, 
  addDoc, 
  getDoc,
  serverTimestamp 
} from 'firebase/firestore';
import { UserRole, UserProfile } from '../types';

/**
 * Task 11: Firebase Integration - Cloud Function equivalents (logic)
 */

export const setUserRole = async (userId: string, role: UserRole, permissions: any) => {
  const userRef = doc(db, 'users', userId);
  await updateDoc(userRef, {
    role,
    permissions,
    updatedAt: serverTimestamp()
  });
};

export const createTeamMember = async (email: string, name: string, role: UserRole) => {
  // Logic for creating a team member invitation
  const inviteRef = collection(db, 'invitations');
  await addDoc(inviteRef, {
    email,
    displayName: name,
    role,
    status: 'pending',
    createdAt: serverTimestamp()
  });
  // In a real env, a Cloud Function would trigger an email from here
};

export const disableUserAuth = async (userId: string, blocked: boolean) => {
  const userRef = doc(db, 'users', userId);
  await updateDoc(userRef, { blocked });
  // In a real env, this would also call admin.auth().updateUser(uid, { disabled: blocked })
};

export const deleteUserAccount = async (userId: string) => {
  // Delete from Firestore
  await deleteDoc(doc(db, 'users', userId));
  // In a real env, this would also call admin.auth().deleteUser(uid)
};

export const sendAnnouncement = async (announcementData: any) => {
  const announcementRef = collection(db, 'announcements');
  await addDoc(announcementRef, {
    ...announcementData,
    publishDate: Date.now(),
    active: true,
    views: 0
  });
};
