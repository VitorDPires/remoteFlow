import { useEffect, useMemo, useState } from "react";

import { useAuth } from "@/features/auth/hooks";

import { CreateProjectModal, DashboardHero, ProjectList } from "../components";
import { createProject, fetchUserProjects } from "../services";
import type { Project } from "../types";
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
  const [projects, setProjects] = useState<Project[]>([]);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const activeProjects = useMemo(
    () => projects.filter((project) => project.status === "active").length,
    [projects],
  );

  useEffect(() => {
    const load = async () => {
      if (!user) {
        setProjects([]);
        setLoadingProjects(false);
        return;
      }

      setLoadingProjects(true);
      setError(null);
      try {
        const fetched = await fetchUserProjects(user.uid);
        setProjects(fetched);
      } catch (err) {
        console.error(err);
        setError("Failed to load projects from Firestore.");
      } finally {
        setLoadingProjects(false);
      }
    };

    if (!authLoading) {
      void load();
    }
  }, [authLoading, user]);

  const handleCreateProject = async (payload: { name: string; description: string }) => {
    if (!user) {
      setError("You must be logged in to create a project.");
      return;
    }

    try {
      const newProject = await createProject(user, payload);
      setProjects((previous) => [newProject, ...previous]);
    } catch (err) {
      console.error(err);
      setError("Failed to create project. Please try again.");
    }
  };

  const handleCreateClick = () => {
    if (!user) {
      setError("You must be logged in to create a project.");
      return;
    }
    setError(null);
    setIsCreateOpen(true);
  };

  return (
    <main className={styles.page}>
      <DashboardHero
        totalProjects={projects.length}
        activeProjects={activeProjects}
        onCreateClick={handleCreateClick}
      />

      <section className={styles.panel}>
        <header className={styles.panelHeader}>
          <div>
            <p className={styles.kicker}>Projects</p>
            <h2 className={styles.sectionTitle}>Projects you are part of</h2>
            <p className={styles.sectionText}>Synced with Firestore (per membership).</p>
          </div>
          <div className={styles.panelActions}>
            <span className={styles.badge}>{projects.length} total</span>
            <button type="button" className={styles.ghostAction} onClick={handleCreateClick}>
              Create project
            </button>
          </div>
        </header>

        {error && <div className={styles.alert}>{error}</div>}

        {authLoading || loadingProjects ? (
          <div className={styles.emptyState}>
            <p>Loading projects…</p>
          </div>
        ) : !user ? (
          <div className={styles.emptyState}>
            <p>You need to be logged in to view your projects.</p>
          </div>
        ) : (
          <ProjectList projects={projects} formatDate={formatDate} onCreateClick={handleCreateClick} />
        )}
      </section>

      <CreateProjectModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onCreate={handleCreateProject}
      />
    </main>
  );
}