// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "healthdonals.firebaseapp.com",
  projectId: "healthdonals",
  storageBucket: "healthdonals.appspot.com",
  messagingSenderId: "765192112858",
  appId: "1:765192112858:web:b10ce9a68c8636ac2bb3e3",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
