import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyDzSjNvFGBnqkWAFOFGASbGZhp5-BNYR6s",
  authDomain: "chat-dab34.firebaseapp.com",
  projectId: "chat-dab34",
  storageBucket: "chat-dab34.appspot.com",
  messagingSenderId: "526521468815",
  appId: "1:526521468815:web:6298110afbb7e00b566dfa"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app)