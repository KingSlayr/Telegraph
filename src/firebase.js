// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDEMurIrc5JYFv80Ci8EoH6JqdE-N7mbzc",
    authDomain: "telegraph-original.firebaseapp.com",
    projectId: "telegraph-original",
    storageBucket: "telegraph-original.appspot.com",
    messagingSenderId: "818320475575",
    appId: "1:818320475575:web:e7e39c42a7d05aa410d432",
    measurementId: "G-V48W89SDB6",
    databaseURL: "https://telegraph-original-default-rtdb.asia-southeast1.firebasedatabase.app"
};

// Initialize Firebase
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore();
const auth = getAuth(app)
const realdb = getDatabase(app)
const storage = getStorage(app)

export { app, db, analytics, auth, realdb, storage};