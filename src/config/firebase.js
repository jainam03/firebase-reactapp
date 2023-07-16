
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyCdy8q64A36jORjLVdG_-gujEhINv8pNoI",
  authDomain: "react-project-e14f8.firebaseapp.com",
  projectId: "react-project-e14f8",
  storageBucket: "react-project-e14f8.appspot.com",
  messagingSenderId: "51887685691",
  appId: "1:51887685691:web:3300e64ca06e26ef699c1e",
  measurementId: "G-90LHVHC2XY"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()

export const db = getFirestore(app)
export const storage = getStorage(app)
