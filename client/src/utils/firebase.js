import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";



const firebaseConfig = {
  apiKey: "AIzaSyB3Q5v6EVwcjktBL0kGEh0422e_4-y_h74",
  authDomain: "netflixclone-c99bb.firebaseapp.com",
  projectId: "netflixclone-c99bb",
  storageBucket: "netflixclone-c99bb.appspot.com",
  messagingSenderId: "759592153399",
  appId: "1:759592153399:web:1c5aa470f9f994e1362ab2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);