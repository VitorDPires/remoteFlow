import Button from "@/components/ui/Button";

import type { Project } from "../types";
import ProjectCard from "./ProjectCard";
import styles from "../pages/DashboardPage.module.css";

type ProjectListProps = {
  projects: Project[];
  formatDate: (value: string) => string;
  onCreateClick: () => void;
};

function ProjectList({ projects, formatDate, onCreateClick }: ProjectListProps) {
  if (projects.length === 0) {
    return (
      <div className={styles.emptyState}>
        <p>No projects yet. Create the first one to get started.</p>
        <Button type="button" onClick={onCreateClick}>
          Create now
        </Button>
      </div>
    );
  }

  return (
    <div className={styles.projectList}>
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} formatDate={formatDate} />
      ))}
    </div>
  );
}

export default ProjectList;
