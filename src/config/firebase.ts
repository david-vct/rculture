// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBW95qRm4z76c5LeamDwhK8RDhIVBpimcE",
    authDomain: "rculture.firebaseapp.com",
    projectId: "rculture",
    storageBucket: "rculture.appspot.com",
    messagingSenderId: "1012250840118",
    appId: "1:1012250840118:web:5747fe0e820c88c881dc97",
    measurementId: "G-TH4MDYBNZH"
  };


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleAuthProvider = new GoogleAuthProvider();

export const db = getFirestore(app);