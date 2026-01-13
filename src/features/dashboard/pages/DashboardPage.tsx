import { useCallback, useState } from "react";

import { useAuth } from "@/features/auth/hooks";

import { CreateProjectModal, DashboardHero, ProjectList } from "../components";
import { DASHBOARD_MESSAGES } from "../constants";
import { useCreateProject, useProjects } from "../hooks";
import type { CreateProjectPayload } from "../types";
import styles from "./DashboardPage.module.css";

const formatDate = (value: string): string => {
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return "—";

  return parsed.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
  });
};

export default function DashboardPage() {
  const { user, loading: authLoading } = useAuth();
  const { projects, loading: loadingProjects, error: projectsError, stats, addProject, clearError: clearProjectsError } = useProjects();
  const { create, creating, error: createError, clearError: clearCreateError } = useCreateProject();
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const error = projectsError || createError;

  const handleCreateProject = useCallback(
    async (payload: CreateProjectPayload) => {
      clearProjectsError();
      clearCreateError();

      const newProject = await create(payload);
      if (newProject) {
        addProject(newProject);
        setIsCreateOpen(false);
      }
    },
    [create, addProject, clearProjectsError, clearCreateError]
  );

  const handleCreateClick = useCallback(() => {
    if (!user) {
      return;
    }
    clearProjectsError();
    clearCreateError();
    setIsCreateOpen(true);
  }, [user, clearProjectsError, clearCreateError]);

  const handleCloseModal = useCallback(() => {
    setIsCreateOpen(false);
    clearCreateError();
  }, [clearCreateError]);

  return (
    <main className={styles.page}>
      <DashboardHero
        totalProjects={stats.total}
        activeProjects={stats.active}
        onCreateClick={handleCreateClick}
        disabled={!user}
      />

      <section className={styles.panel}>
        <header className={styles.panelHeader}>
          <div>
            <p className={styles.kicker}>Projects</p>
            <h2 className={styles.sectionTitle}>Projects you participate in</h2>
          </div>
        </header>

        {error && (
          <div className={styles.alert} role="alert">
            {error}
          </div>
        )}

        {authLoading || loadingProjects ? (
          <div className={styles.emptyState}>
            <p>{DASHBOARD_MESSAGES.INFO.LOADING}</p>
          </div>
        ) : !user ? (
          <div className={styles.emptyState}>
            <p>{DASHBOARD_MESSAGES.INFO.NOT_LOGGED_IN}</p>
          </div>
        ) : (
          <ProjectList 
            projects={projects} 
            formatDate={formatDate} 
            onCreateClick={handleCreateClick} 
          />
        )}
      </section>

      <CreateProjectModal
        isOpen={isCreateOpen}
        onClose={handleCloseModal}
        onCreate={handleCreateProject}
        isCreating={creating}
      />
    </main>
  );
}