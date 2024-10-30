// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

// Your Firebase configuration from the Firebase Console
const firebaseConfig = {
    apiKey: "AIzaSyCv-FsPNOMxw6NkXv9mrQx6D4ieNVU7uzg",
    authDomain: "experimentlabs-bdf19.firebaseapp.com",
    projectId: "experimentlabs-bdf19",
    storageBucket: "experimentlabs-bdf19.appspot.com",
    messagingSenderId: "525204295583",
    appId: "525204295583",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup };
