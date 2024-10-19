import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCQdkJxmyiKLYNhRuHo1rlCnw14zLByl4k",
  authDomain: "calhack24.firebaseapp.com",
  projectId: "calhack24",
  storageBucket: "calhack24.appspot.com",
  messagingSenderId: "948991304155",
  appId: "1:948991304155:web:490e1c004500fa1c3ec7fe",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
