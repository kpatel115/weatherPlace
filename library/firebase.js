import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBmLyKq_iniKcedDdDNeMxdRDp_ewUOV6w",
  authDomain: "ecstatic-emblem-268211.firebaseapp.com",
  databaseURL: "https://ecstatic-emblem-268211-default-rtdb.firebaseio.com",
  projectId: "ecstatic-emblem-268211",
  storageBucket: "ecstatic-emblem-268211.appspot.com",
  messagingSenderId: "837040977434",
  appId: "1:837040977434:web:cccfbff83ec1809f9683a3",
};

// Initialize Firebase
initializeApp(firebaseConfig);

export const db = getFirestore();
export const auth = getAuth();
export const storage = getStorage();
