// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDgI4f9ZBukB10HEuwXvjHq11qXrSpptQE",
  authDomain: "chattingapp-f6610.firebaseapp.com",
  projectId: "chattingapp-f6610",
  storageBucket: "chattingapp-f6610.appspot.com",
  messagingSenderId: "1006199043178",
  appId: "1:1006199043178:web:8cda1486759ff203dc4613",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
