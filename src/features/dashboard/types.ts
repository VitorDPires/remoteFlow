export type ProjectStatus = "active" | "paused" | "planning";

export type Project = {
  id: string;
  name: string;
  role: string;
  status: ProjectStatus;
  members: number;
  updatedAt: string;
  description: string;
};
