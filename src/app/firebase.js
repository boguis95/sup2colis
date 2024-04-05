import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Importez getFirestore

// Configuration de Firebase (existant)
const firebaseConfig = {
  apiKey: "AIzaSyA2RsJkOZ8fDloWNO0ZHREXXJAWky6Ord8",
  authDomain: "sup2colis-afb9e.firebaseapp.com",
  projectId: "sup2colis-afb9e",
  storageBucket: "sup2colis-afb9e.appspot.com",
  messagingSenderId: "579797814994",
  appId: "1:579797814994:web:4eff6e5a0507be7521670b"
};

// Initialisation de Firebase (existant)
const app = initializeApp(firebaseConfig);

// Initialisation de Firebase Authentication (existant)
export const auth = getAuth(app);

// Initialisation de Firestore
export const db = getFirestore(app);
