import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: 'blog-app-nextjs-1ffe3.firebaseapp.com',
  projectId: 'blog-app-nextjs-1ffe3',
  storageBucket: 'blog-app-nextjs-1ffe3.appspot.com',
  messagingSenderId: '345964547621',
  appId: '1:345964547621:web:5d8a8055cd7f0fa2b2f9cc',
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
