// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDKLQijWlLGyzzMLuWhGPrZtUudYpxW7zk",
    authDomain: "https://intuji-b47ae-default-rtdb.firebaseio.com/",
    projectId: "intuji-b47ae",
    storageBucket: "intuji-b47ae.appspot.com",
    messagingSenderId: "3017804584",
    appId: "1:3017804584:web:d5208be71d01b2886b9e1d",
    measurementId: "G-65609B12T0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);