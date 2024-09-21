/* global process */

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "healthdonals.firebaseapp.com",
  projectId: "healthdonals",
  storageBucket: "healthdonals.appspot.com",
  messagingSenderId: "765192112858",
  appId: "1:765192112858:web:b10ce9a68c8636ac2bb3e3",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage();
