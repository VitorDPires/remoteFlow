import { useMemo, useState } from "react";

import { CreateProjectModal, DashboardHero, ProjectList } from "../components";
import type { Project } from "../types";
import styles from "./DashboardPage.module.css";

const initialProjects: Project[] = [
  {
    id: "p1",
    name: "RemoteFlow Core",
    role: "Owner",
    status: "active",
    members: 12,
    updatedAt: "2024-12-20T00:00:00Z",
    description: "Platform foundation, authentication, and security.",
  },
  {
    id: "p2",
    name: "Customer Portal",
    role: "Contributor",
    status: "active",
    members: 8,
    updatedAt: "2024-12-12T00:00:00Z",
    description: "Onboarding layer and authenticated customer area.",
  },
  {
    id: "p3",
    name: "Executive Reports",
    role: "Viewer",
    status: "paused",
    members: 4,
    updatedAt: "2024-11-28T00:00:00Z",
    description: "Quarterly delivery and metrics dashboards.",
  },
];

const formatDate = (value: string): string => {
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return "—";

  return parsed.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
  });
};

export default function DashboardPage() {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const activeProjects = useMemo(
    () => projects.filter((project) => project.status === "active").length,
    [projects],
  );

  const handleCreateProject = (payload: { name: string; description: string }) => {
    const newProject: Project = {
      id: `project-${Date.now()}`,
      name: payload.name,
      role: "Owner",
      status: "planning",
      members: 1,
      updatedAt: new Date().toISOString(),
      description: payload.description || "Projeto criado localmente para testes.",
    };

    setProjects((previous) => [newProject, ...previous]);
  };

  return (
    <main className={styles.page}>
      <DashboardHero
        totalProjects={projects.length}
        activeProjects={activeProjects}
        onCreateClick={() => setIsCreateOpen(true)}
      />

      <section className={styles.panel}>
        <header className={styles.panelHeader}>
          <div>
            <p className={styles.kicker}>Projects</p>
            <h2 className={styles.sectionTitle}>Projects you are part of</h2>
            <p className={styles.sectionText}>Mocked list to validate the dashboard layout.</p>
          </div>
          <div className={styles.panelActions}>
            <span className={styles.badge}>{projects.length} total</span>
            <button
              type="button"
              className={styles.ghostAction}
              onClick={() => setIsCreateOpen(true)}
            >
              Create project
            </button>
          </div>
        </header>

        <ProjectList
          projects={projects}
          formatDate={formatDate}
          onCreateClick={() => setIsCreateOpen(true)}
        />
      </section>

      <CreateProjectModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onCreate={handleCreateProject}
      />
    </main>
  );
}