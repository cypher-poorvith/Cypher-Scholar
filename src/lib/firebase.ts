import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDocFromServer } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Test Connection Helper
export async function testFirestoreConnection() {
  try {
    // Attempting to read a dummy doc to verify connectivity
    await getDocFromServer(doc(db, 'system', 'connection_test'));
    console.log('Firebase Connected Successfully');
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.error("Firebase Connection Error: The client is offline. Check your configuration.");
    }
  }
}

testFirestoreConnection();

export { signInWithPopup, signOut, onAuthStateChanged };
