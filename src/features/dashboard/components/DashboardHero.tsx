import Button from "@/components/ui/Button";

import styles from "../pages/DashboardPage.module.css";

type DashboardHeroProps = {
  totalProjects: number;
  activeProjects: number;
  onCreateClick: () => void;
};

function DashboardHero({ totalProjects, activeProjects, onCreateClick }: DashboardHeroProps) {
  return (
    <header className={styles.hero}>
      <div>
        <p className={styles.kicker}>Overview</p>
        <h1 className={styles.title}>Dashboard</h1>
        <p className={styles.subtitle}>Track the projects you are part of and spin up new drafts.</p>
        <div className={styles.chips}>
          <span className={styles.chip}>{totalProjects} projects</span>
          <span className={styles.chip}>{activeProjects} active</span>
        </div>
      </div>
      <div className={styles.heroAction}>
        <Button type="button" onClick={onCreateClick}>
          Create project
        </Button>
        <p className={styles.hint}>Local mock only, no persistence.</p>
      </div>
    </header>
  );
}

export default DashboardHero;
