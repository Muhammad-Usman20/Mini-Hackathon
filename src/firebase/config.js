// Firebase initialization file
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBj8Qk60svrDXk3euUEfKXSYdPIQw5zcF4",
    authDomain: "hackathon-smit-1bec6.firebaseapp.com",
    projectId: "hackathon-smit-1bec6",
    storageBucket: "hackathon-smit-1bec6.firebasestorage.app",
    messagingSenderId: "275025953063",
    appId: "1:275025953063:web:253acbcd93131fab28e902",
    measurementId: "G-FSLHWD8S5V"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
