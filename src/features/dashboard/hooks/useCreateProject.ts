import { useCallback, useState } from "react";

import { useAuth } from "@/features/auth/hooks";

import { DASHBOARD_MESSAGES } from "../constants";
import { createProject } from "../services";
import type { CreateProjectPayload, Project } from "../types";
import { validateCreateProjectPayload } from "../utils";

interface UseCreateProjectState {
  creating: boolean;
  error: string | null;
  create: (payload: CreateProjectPayload) => Promise<Project | null>;
  clearError: () => void;
}

export const useCreateProject = (): UseCreateProjectState => {
  const { user } = useAuth();
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(
    async (payload: CreateProjectPayload): Promise<Project | null> => {
      if (!user) {
        setError(DASHBOARD_MESSAGES.ERRORS.NOT_AUTHENTICATED);
        return null;
      }

      const validation = validateCreateProjectPayload(payload);
      if (!validation.valid) {
        setError(validation.error || DASHBOARD_MESSAGES.ERRORS.CREATE_PROJECT);
        return null;
      }

      setCreating(true);
      setError(null);

      try {
        const newProject = await createProject(user, payload);
        return newProject;
      } catch (err) {
        console.error("Error creating project:", err);
        setError(DASHBOARD_MESSAGES.ERRORS.CREATE_PROJECT);
        return null;
      } finally {
        setCreating(false);
      }
    },
    [user]
  );

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    creating,
    error,
    create,
    clearError,
  };
};
