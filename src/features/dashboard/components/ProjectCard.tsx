import { memo } from "react";

import { PROJECT_STATUS_LABELS } from "../constants";
import type { Project } from "../types";
import styles from "../pages/DashboardPage.module.css";

interface ProjectCardProps {
  project: Project;
  formatDate: (value: string) => string;
}

function ProjectCard({ project, formatDate }: ProjectCardProps) {
  const statusLabel = PROJECT_STATUS_LABELS[project.status] || project.status;

  return (
    <article 
      className={styles.projectCard}
      aria-label={`Project ${project.name}`}
    >
      <div className={styles.cardHeader}>
        <div>
          <h3 className={styles.projectName}>{project.name}</h3>
          {project.description && (
            <p className={styles.projectDescription}>{project.description}</p>
          )}
        </div>
        <span
          className={[styles.status, styles[`status-${project.status}`]]
            .filter(Boolean)
            .join(" ")}
          aria-label={`Status: ${statusLabel}`}
          role="status"
        >
          {statusLabel}
        </span>
      </div>

      <div className={styles.meta} role="list" aria-label="Project information">
        <div role="listitem">
          <span className={styles.metaLabel}>Role</span>
          <span className={styles.metaValue}>{project.role}</span>
        </div>
        <div role="listitem">
          <span className={styles.metaLabel}>Updated</span>
          <span className={styles.metaValue}>{formatDate(project.updatedAt)}</span>
        </div>
        <div role="listitem">
          <span className={styles.metaLabel}>Members</span>
          <span className={styles.metaValue}>{project.members}</span>
        </div>
      </div>
    </article>
  );
}

export default memo(ProjectCard);
