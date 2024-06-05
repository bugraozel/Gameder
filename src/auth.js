// src/auth.js

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "./firebase-config";

const auth = getAuth(app);

function registerUser(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}

function loginUser(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

export { registerUser, loginUser };