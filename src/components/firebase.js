// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAsE3o_RH-Cdz-Vwk6iLR9RJJjVfyLW-w8",
  authDomain: "login-auth-28a6f.firebaseapp.com",
  projectId: "login-auth-28a6f",
  storageBucket: "login-auth-28a6f.appspot.com",
  messagingSenderId: "841437284368",
  appId: "1:841437284368:web:1b655c29d5fd57298ca295",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

export default app;
