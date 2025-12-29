import type { User } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

import { db } from "@/app/firebase/firebase";

export const createUserIfNotExists = async (user: User) => {
  const ref = doc(db, "users", user.uid);
  const snapshot = await getDoc(ref);

  if (!snapshot.exists()) {
    await setDoc(ref, {
      email: user.email,
      name: user.displayName,
      role: "user",
      createdAt: new Date(),
    });
  }
};

