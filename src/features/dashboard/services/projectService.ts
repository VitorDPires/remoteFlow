import type { User } from "firebase/auth";
import type { DocumentData } from "firebase/firestore";
import { Timestamp, addDoc, collection, getDocs, query, serverTimestamp, where } from "firebase/firestore";

import { db } from "@/app/firebase/firebase";

import { DASHBOARD_CONSTANTS } from "../constants";
import type { CreateProjectPayload, Project, ProjectRole, ProjectStatus } from "../types";

const normalizeStatus = (value: unknown): ProjectStatus => {
  if (value === "active" || value === "paused" || value === "planning") {
    return value;
  }
  return "planning";
};

const normalizeRole = (value: unknown): ProjectRole => {
  if (value === "Owner" || value === "Admin" || value === "Member" || value === "Viewer") {
    return value;
  }
  return "Member";
};

const mapDocumentToProject = (id: string, data: DocumentData, uid: string): Project => {
  const updatedAt =
    data.updatedAt instanceof Timestamp
      ? data.updatedAt.toDate().toISOString()
      : new Date().toISOString();

  const createdAt =
    data.createdAt instanceof Timestamp
      ? data.createdAt.toDate().toISOString()
      : undefined;

  const members =
    typeof data.members === "number"
      ? data.members
      : Array.isArray(data.participantIds)
        ? data.participantIds.length
        : 0;

  const role = normalizeRole(data.roles?.[uid]);

  return {
    id,
    name: typeof data.name === "string" ? data.name : "Untitled project",
    description: typeof data.description === "string" ? data.description : "",
    status: normalizeStatus(data.status),
    members,
    role,
    updatedAt,
    createdAt,
  };
};

export const fetchUserProjects = async (uid: string): Promise<Project[]> => {
  const projectsRef = collection(db, DASHBOARD_CONSTANTS.PROJECTS_COLLECTION);
  const membershipQuery = query(projectsRef, where("participantIds", "array-contains", uid));
  const snapshot = await getDocs(membershipQuery);

  return snapshot.docs.map((doc) => mapDocumentToProject(doc.id, doc.data(), uid));
};

export const createProject = async (user: User, payload: CreateProjectPayload): Promise<Project> => {
  const projectsRef = collection(db, DASHBOARD_CONSTANTS.PROJECTS_COLLECTION);
  const name = payload.name.trim();
  const description = payload.description.trim();
  const now = new Date().toISOString();

  const docRef = await addDoc(projectsRef, {
    name,
    description,
    status: "planning" as ProjectStatus,
    members: 1,
    participantIds: [user.uid],
    roles: { [user.uid]: "Owner" as ProjectRole },
    updatedAt: serverTimestamp(),
    createdAt: serverTimestamp(),
  });

  return {
    id: docRef.id,
    name,
    description,
    status: "planning",
    members: 1,
    role: "Owner",
    updatedAt: now,
    createdAt: now,
  };
};
