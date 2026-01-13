import { useCallback, useEffect, useState } from "react";

import { useAuth } from "@/features/auth/hooks";

import { DASHBOARD_MESSAGES } from "../constants";
import { fetchUserProjects } from "../services";
import type { DashboardStats, Project } from "../types";

interface UseProjectsState {
  projects: Project[];
  loading: boolean;
  error: string | null;
  stats: DashboardStats;
  refetch: () => Promise<void>;
  addProject: (project: Project) => void;
  clearError: () => void;
}

export const useProjects = (): UseProjectsState => {
  const { user, loading: authLoading } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const stats: DashboardStats = {
    total: projects.length,
    active: projects.filter((p) => p.status === "active").length,
    paused: projects.filter((p) => p.status === "paused").length,
    planning: projects.filter((p) => p.status === "planning").length,
  };

  const loadProjects = useCallback(async () => {
    if (!user) {
      setProjects([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const fetchedProjects = await fetchUserProjects(user.uid);
      setProjects(fetchedProjects);
    } catch (err) {
      console.error("Error loading projects:", err);
      setError(DASHBOARD_MESSAGES.ERRORS.LOAD_PROJECTS);
    } finally {
      setLoading(false);
    }
  }, [user]);

  const refetch = useCallback(async () => {
    await loadProjects();
  }, [loadProjects]);

  const addProject = useCallback((project: Project) => {
    setProjects((prev) => [project, ...prev]);
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  useEffect(() => {
    if (!authLoading) {
      void loadProjects();
    }
  }, [authLoading, loadProjects]);

  return {
    projects,
    loading,
    error,
    stats,
    refetch,
    addProject,
    clearError,
  };
};
