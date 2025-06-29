import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCM5LcXBAYphw56MnOVMMp3qvBvn9Ht5ok",
  authDomain: "morgan-94de0.firebaseapp.com",
  projectId: "morgan-94de0",
  storageBucket: "morgan-94de0.firebasestorage.app",
  messagingSenderId: "599423835923",
  appId: "1:599423835923:web:e6ab66bea05c7807ff44e6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export default app;