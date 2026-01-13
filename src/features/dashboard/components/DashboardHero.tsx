import { memo } from "react";

import Button from "@/components/ui/Button";

import styles from "../pages/DashboardPage.module.css";

interface DashboardHeroProps {
  totalProjects: number;
  activeProjects: number;
  onCreateClick: () => void;
  disabled?: boolean;
}

function DashboardHero({ totalProjects, activeProjects, onCreateClick, disabled = false }: DashboardHeroProps) {
  return (
    <header className={styles.hero}>
      <div>
        <h1 className={styles.title}>Dashboard</h1>
        <p className={styles.subtitle}>
          Track projects you participate in and create new ones.
        </p>
        <div className={styles.chips} role="list" aria-label="Project statistics">
          <span className={styles.chip} role="listitem" aria-label={`${totalProjects} total projects`}>
            {totalProjects} {totalProjects === 1 ? "project" : "projects"}
          </span>
          <span className={styles.chip} role="listitem" aria-label={`${activeProjects} active projects`}>
            {activeProjects} active
          </span>
        </div>
      </div>
      <div className={styles.heroAction}>
        <Button 
          type="button" 
          onClick={onCreateClick}
          disabled={disabled}
          aria-label="Create new project"
        >
          Create project
        </Button>
      </div>
    </header>
  );
}

export default memo(DashboardHero);
