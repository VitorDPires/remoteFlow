export type ProjectStatus = "active" | "paused" | "planning";

export type ProjectRole = "Owner" | "Admin" | "Member" | "Viewer";

export interface Project {
  id: string;
  name: string;
  role: ProjectRole;
  status: ProjectStatus;
  members: number;
  updatedAt: string;
  description: string;
  createdAt?: string;
}

export interface CreateProjectPayload {
  name: string;
  description: string;
}

export interface UpdateProjectPayload {
  name?: string;
  description?: string;
  status?: ProjectStatus;
}

export interface ValidationResult {
  valid: boolean;
  error?: string;
}

export interface DashboardStats {
  total: number;
  active: number;
  paused: number;
  planning: number;
}
