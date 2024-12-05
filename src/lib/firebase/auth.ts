import { 
  signInWithPopup,
  signOut as firebaseSignOut,
  GoogleAuthProvider,
  signInWithCustomToken 
} from 'firebase/auth';
import { auth } from './config';

const googleProvider = new GoogleAuthProvider();

export async function signInWithGoogle() {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    console.error('Error signing in with Google:', error);
    throw error;
  }
}

export async function signInWithTelegram() {
  try {
    // For now, we'll just use Google auth as a fallback
    // In a production environment, you would implement proper Telegram auth
    return signInWithGoogle();
  } catch (error) {
    console.error('Error signing in with Telegram:', error);
    throw error;
  }
}

export async function signOut() {
  try {
    await firebaseSignOut(auth);
  } catch (error) {
    console.error('Error signing out:', error);
    throw error;
  }
}