// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDgdSNN1M9kxkrJz2GN_vgUFEUkNmDwa3A",
  authDomain: "apptracker-64729.firebaseapp.com",
  projectId: "apptracker-64729",
  storageBucket: "apptracker-64729.firebasestorage.app",
  messagingSenderId: "433823368988",
  appId: "1:433823368988:web:b78326ee543ef5fe8f1cd9",
  measurementId: "G-M8LNMTJW07",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
