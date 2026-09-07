import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBQWAnslDmBjOOD-XWYiTBJowtQFHjrncc",

  authDomain: "e-commerce-react-1799.firebaseapp.com",

  projectId: "e-commerce-react-1799",

  storageBucket: "e-commerce-react-1799.firebasestorage.app",

  messagingSenderId: "238029406208",
  
  appId: "1:238029406208:web:e52a25299ee10ad268d8e5",

  measurementId: "G-1PDBDDNMG4",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
