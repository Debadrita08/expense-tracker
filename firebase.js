// Import the functions you need from the SDKs you need
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCg5Wbbvr3LY6DVuv5mUS6M-e_GFIKzf-I",
  authDomain: "expense-calculator-5bcbe.firebaseapp.com",
  projectId: "expense-calculator-5bcbe",
  storageBucket: "expense-calculator-5bcbe.firebasestorage.app",
  messagingSenderId: "312771317471",
  appId: "1:312771317471:web:3055c7a84aa77e2b4ee36a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
