import type { DocumentData } from "firebase/firestore";
import { doc, getDoc } from "firebase/firestore";

import { db } from "@/app/firebase/firebase";

export const fetchUserProfile = async (uid: string): Promise<DocumentData | null> => {
  const ref = doc(db, "users", uid);
  const snapshot = await getDoc(ref);
  return snapshot.exists() ? snapshot.data() : null;
};

