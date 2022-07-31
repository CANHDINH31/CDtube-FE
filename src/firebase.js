import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDMH7xtA5OusStotcbz2AX6VY71ZjFZhfI",
  authDomain: "videosharing-160a6.firebaseapp.com",
  projectId: "videosharing-160a6",
  storageBucket: "videosharing-160a6.appspot.com",
  messagingSenderId: "864496047704",
  appId: "1:864496047704:web:e79e08cdbb5bed020b5c2d",
  measurementId: "G-FS84EN8ENL",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();
export default app;
