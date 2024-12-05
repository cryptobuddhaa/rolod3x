import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getAnalytics, isSupported } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyBfbFucCkpZgT-BRlw9p8HzMfc-1yJobn8",
  authDomain: "rolod3x.firebaseapp.com",
  projectId: "rolod3x",
  storageBucket: "rolod3x.firebasestorage.app",
  messagingSenderId: "1048695601829",
  appId: "1:1048695601829:web:516546e1398e31f4eb6b4c",
  measurementId: "G-798FYFXDFB"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

// Initialize analytics only if supported
let analytics = null;
isSupported().then(yes => {
  if (yes) {
    analytics = getAnalytics(app);
  }
});

export { analytics };