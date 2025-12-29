import { auth, googleProvider } from "@/app/firebase/firebase";
import { createUserWithEmailAndPassword, signInWithPopup, signInWithEmailAndPassword, signOut } from "firebase/auth";

export const signInWithGoogle = async () => {
  const result = await signInWithPopup(auth, googleProvider);
  return result;
};

export const registerWithEmailAndPassword = async (email: string, password: string) => {
  const result = await createUserWithEmailAndPassword(auth, email, password);
  return result.user;
};

export const loginWithEmailAndPassword = async (email: string, password: string) => {
  const result = await signInWithEmailAndPassword(auth, email, password);
  return result.user;
};

export const logout = async () => {
  await signOut(auth);
};