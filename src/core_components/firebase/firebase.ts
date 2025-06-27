
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyB468iyE4mS4AWcdNlf13lfnRnnf90mVi8",
    authDomain: "ecommerce-c659f.firebaseapp.com",
    projectId: "ecommerce-c659f",
    storageBucket: "ecommerce-c659f.firebasestorage.app",
    messagingSenderId: "806847950366",
    appId: "1:806847950366:web:f7d62d32aa41f91a69480f",
    measurementId: "G-ZV2NV9V63X"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const provider = new GoogleAuthProvider();