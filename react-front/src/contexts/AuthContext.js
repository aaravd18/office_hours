import { React, useState, useEffect } from "react";
import { createContext, useContext } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../config/firebase";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState("");
  const [loading, setLoading] = useState(true);
  async function signUp(email, password) {
    await createUserWithEmailAndPassword(auth, email, password);
  }
  async function logIn(email, password) {
    await signInWithEmailAndPassword(auth, email, password);
  }
  async function logOut() {
    await signOut(auth);
  }
  const value = {
    currentUser,
    signUp,
    logIn,
    logOut,
  };
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
