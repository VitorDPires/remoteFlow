import { auth, googleProvider } from "@/app/firebase/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { createUserIfNotExists } from "./userService";

export const signInWithGoogle = async () => {
  const result = await signInWithPopup(auth, googleProvider);
  return result;
};

<<<<<<< HEAD
export const registerWithEmailAndPassword = async (name: string, email: string, password: string) => {
  const result = await createUserWithEmailAndPassword(auth, email, password);
  const user = result.user;
  await updateProfile(user, { displayName: name });
  await createUserIfNotExists(user);
  return user;
};

export const loginWithEmailAndPassword = async (email: string, password: string) => {
  const result = await signInWithEmailAndPassword(auth, email, password);
  return result.user;
};

export const logout = async () => {
  await signOut(auth);
};