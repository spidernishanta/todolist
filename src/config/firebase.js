// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCuEBXiNP3aPlUTXMHtVBl7j3cS1wFlq3s",
  authDomain: "todolist-4b8b2.firebaseapp.com",
  projectId: "todolist-4b8b2",
  storageBucket: "todolist-4b8b2.appspot.com",
  messagingSenderId: "968844815833",
  appId: "1:968844815833:web:bbd1a66adff96b571c3dc8",
  measurementId: "G-8TTTKGM65W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);