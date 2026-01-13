import type { User } from "firebase/auth";
import type { DocumentData } from "firebase/firestore";
import { Timestamp, addDoc, collection, getDocs, query, serverTimestamp, where } from "firebase/firestore";

import { db } from "@/app/firebase/firebase";

import type { Project, ProjectStatus } from "../types";

const COLLECTION = "projects";

const normalizeStatus = (value: unknown): ProjectStatus => {
  if (value === "active" || value === "paused" || value === "planning") {
    return value;
  }
  return "planning";
};

const mapDocumentToProject = (id: string, data: DocumentData, uid: string): Project => {
  const updatedAt =
    data.updatedAt instanceof Timestamp
      ? data.updatedAt.toDate().toISOString()
      : new Date().toISOString();

  const members =
    typeof data.members === "number"
      ? data.members
      : Array.isArray(data.participantIds)
        ? data.participantIds.length
        : 0;

  const role = typeof data.roles?.[uid] === "string" ? data.roles[uid] : "Member";

  return {
    id,
    name: typeof data.name === "string" ? data.name : "Untitled project",
    description: typeof data.description === "string" ? data.description : "",
    status: normalizeStatus(data.status),
    members,
    role,
    updatedAt,
  };
};

export const fetchUserProjects = async (uid: string): Promise<Project[]> => {
  const projectsRef = collection(db, COLLECTION);
  const membershipQuery = query(projectsRef, where("participantIds", "array-contains", uid));
  const snapshot = await getDocs(membershipQuery);

  return snapshot.docs.map((doc) => mapDocumentToProject(doc.id, doc.data(), uid));
};

type CreateProjectPayload = {
  name: string;
  description: string;
};

export const createProject = async (user: User, payload: CreateProjectPayload): Promise<Project> => {
  const projectsRef = collection(db, COLLECTION);
  const description =
    payload.description.trim() || "Project created locally for testing purposes.";

  const docRef = await addDoc(projectsRef, {
    name: payload.name,
    description,
    status: "planning",
    members: 1,
    participantIds: [user.uid],
    roles: { [user.uid]: "Owner" },
    updatedAt: serverTimestamp(),
    createdAt: serverTimestamp(),
  });

  return {
    id: docRef.id,
    name: payload.name,
    description,
    status: "planning",
    members: 1,
    role: "Owner",
    updatedAt: new Date().toISOString(),
  };
};
