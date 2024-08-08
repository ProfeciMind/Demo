// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
console.log(import.meta.env.VITE_FIREBASE_API_KEY);

const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-7d271.firebaseapp.com",
  projectId: "mern-estate-7d271",
  storageBucket: "mern-estate-7d271.appspot.com",
  messagingSenderId: "891133597045",
  appId: "1:891133597045:web:ad61f3aefceef01f9f6f3c"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);