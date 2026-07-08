import { initializeApp, getApp, getApps } from 'firebase/app';
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signInWithRedirect, 
  signOut, 
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
  updateProfile,
  User
} from 'firebase/auth';
import { 
  getFirestore, 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  setDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy,
  limit,
  Timestamp,
  writeBatch
} from 'firebase/firestore';

// Configuration from firebase-applet-config.json
const firebaseConfig = {
  projectId: "silken-courage-t6rpq",
  appId: "1:828719825931:web:c16f66c96b6c098d99f30e",
  apiKey: "AIzaSyA2nPfFfzRD8TUWuIJPfp5wLWVamBwr7sI",
  authDomain: "silken-courage-t6rpq.firebaseapp.com",
  firestoreDatabaseId: "ai-studio-dkwgardabangsapa-2e9be65d-b82f-426a-9e22-c610bdd6c260",
  storageBucket: "silken-courage-t6rpq.firebasestorage.app",
  messagingSenderId: "828719825931"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

export { 
  app, 
  auth, 
  db, 
  googleProvider,
  signInWithPopup,
  signInWithRedirect,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
  updateProfile,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  Timestamp,
  writeBatch
};

// Helper function to sign in with Google (with iframe fallback)
export const loginWithGoogle = async (): Promise<User | null> => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    // Store user profile in firestore
    if (result.user) {
      await saveUserProfile(result.user);
    }
    return result.user;
  } catch (error: any) {
    console.warn("signInWithPopup failed, attempting redirect fallback:", error);
    // If popups are blocked/unsupported in the iframe context, we can try redirect or throw a descriptive error
    if (error.code === 'auth/popup-blocked' || error.code === 'auth/iframe-userAgent-to-resolve-uri') {
      try {
        await signInWithRedirect(auth, googleProvider);
        return null; // Page will redirect
      } catch (redirectErr) {
        console.error("signInWithRedirect also failed:", redirectErr);
        throw error;
      }
    }
    throw error;
  }
};

// Save user profile helper
export const saveUserProfile = async (user: User) => {
  try {
    const userRef = doc(db, 'users', user.uid);
    await setDoc(userRef, {
      uid: user.uid,
      email: user.email || '',
      displayName: user.displayName || '',
      photoURL: user.photoURL || '',
      role: 'Kader', // Default role
      lastLoginAt: Timestamp.now()
    }, { merge: true });
  } catch (e) {
    console.error("Error saving user profile:", e);
  }
};
