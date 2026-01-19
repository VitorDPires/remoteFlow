import { memo } from "react";

import Button from "@/components/ui/Button";

import { DASHBOARD_MESSAGES } from "../constants";
import type { Project } from "../types";
import ProjectCard from "./ProjectCard";
import styles from "../pages/DashboardPage.module.css";

interface ProjectListProps {
  projects: Project[];
  formatDate: (value: string) => string;
  onCreateClick: () => void;
}

function ProjectList({ projects, formatDate, onCreateClick }: ProjectListProps) {
  if (projects.length === 0) {
    return (
      <div className={styles.emptyState} role="status" aria-live="polite">
        <p>{DASHBOARD_MESSAGES.INFO.NO_PROJECTS}</p>
        <Button 
          type="button" 
          onClick={onCreateClick}
          aria-label="Create first project"
        >
          Create now
        </Button>
      </div>
    );
  }

  return (
    <div 
      className={styles.projectList}
      role="list"
      aria-label="Project list"
    >
      {projects.map((project) => (
        <ProjectCard 
          key={project.id} 
          project={project} 
          formatDate={formatDate} 
        />
      ))}
    </div>
  );
}

export default memo(ProjectList);
