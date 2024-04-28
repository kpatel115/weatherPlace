import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAlfqXxoxYzDEAbMwUgWq24WTVZfIpCmDs",
  authDomain: "weatherplace-f5d20.firebaseapp.com",
  projectId: "weatherplace-f5d20",
  storageBucket: "weatherplace-f5d20.appspot.com",
  messagingSenderId: "710805357131",
  appId: "1:710805357131:web:090d3e03e871edcd3583ce"
};

// Initialize Firebase
initializeApp(firebaseConfig);

export const db = getFirestore();
export const auth = getAuth();
export const storage = getStorage();
