import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from 'firebase/storage'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDkRVHOiHCjMXZAr1Fdq1vrfzjFTa8BK80",
  authDomain: "lama-chat-c9f00.firebaseapp.com",
  projectId: "lama-chat-c9f00",
  storageBucket: "lama-chat-c9f00.appspot.com",
  messagingSenderId: "936742277000",
  appId: "1:936742277000:web:5e7f10c2f372962c0af43d"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
