import type { Project } from "../types";
import styles from "../pages/DashboardPage.module.css";

type ProjectCardProps = {
  project: Project;
  formatDate: (value: string) => string;
};

function ProjectCard({ project, formatDate }: ProjectCardProps) {
  return (
    <article className={styles.projectCard}>
      <div className={styles.cardHeader}>
        <div>
          <h3 className={styles.projectName}>{project.name}</h3>
          <p className={styles.projectDescription}>{project.description}</p>
        </div>
        <span
          className={[styles.status, styles[`status-${project.status}`]]
            .filter(Boolean)
            .join(" ")}
        >
          {project.status === "active"
            ? "Active"
            : project.status === "paused"
              ? "Paused"
              : "Planning"}
        </span>
      </div>

      <div className={styles.meta}>
        <div>
          <span className={styles.metaLabel}>Papel</span>
          <span className={styles.metaValue}>{project.role}</span>
        </div>
        <div>
          <span className={styles.metaLabel}>Atualizado</span>
          <span className={styles.metaValue}>{formatDate(project.updatedAt)}</span>
        </div>
        <div>
          <span className={styles.metaLabel}>Membros</span>
          <span className={styles.metaValue}>{project.members}</span>
        </div>
      </div>
    </article>
  );
}

export default ProjectCard;
