// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
//Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBCpEyzPGBeiVC23prGdjznQZ6DpkOqZdI",
  authDomain: "authentication-fbab9.firebaseapp.com",
  projectId: "authentication-fbab9",
  storageBucket: "authentication-fbab9.appspot.com",
  messagingSenderId: "1060073755510",
  appId: "1:1060073755510:web:77839eacfb8652db9ea057",
  measurementId: "G-LW29Z1N364",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
