import { Link } from "react-router-dom";
import { useState } from "react";

import styles from "./LandingPage.module.css";
import Button from "@/components/ui/Button";
import { useAuth, useUserProfile, type UserProfile } from "@/features/auth/hooks";
import { logout } from "@/features/auth/services";

const resolveJoinedDate = (value?: UserProfile["createdAt"]): string | null => {
  if (!value) {
    return null;
  }

  if (value instanceof Date) {
    return value.toLocaleDateString();
  }

  if (typeof value === "string") {
    const parsed = new Date(value);
    return Number.isNaN(parsed.getTime()) ? null : parsed.toLocaleDateString();
  }

  if ("toDate" in value && typeof value.toDate === "function") {
    return value.toDate().toLocaleDateString();
  }

  return null;
};

function LandingPage() {
  const { user, loading } = useAuth();
  const { profile, loading: profileLoading } = useUserProfile();
  const [signingOut, setSigningOut] = useState(false);
  const joinedLabel = resolveJoinedDate(profile?.createdAt);

  const handleLogout = async () => {
    setSigningOut(true);
    try {
      await logout();
    } finally {
      setSigningOut(false);
    }
  };

  return (
    <main className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.projectTitle}>Remote Flow</h1>
        <p className={styles.projectSubtitle}>Modern coordination for distributed teams</p>
      </div>
      <div className={styles.grid}>
        <section className={styles.intro}>
          <p className={styles.introTag}>Remote-first, secure, performance-driven</p>
          <h2 className={styles.introHeading}>Manage distributed teams and projects with confidence.</h2>
          <p className={styles.introText}>
            Plan sprints, align releases, and track metrics in a unified workspace with granular access controls.
            Every interaction stays encrypted and logged for effortless audits.
          </p>
          <ul className={styles.featureList}>
            <li>Role-based permissions with trust-level safeguards</li>
            <li>Live task management with synchronized updates</li>
            <li>Clear time and delivery reports per initiative</li>
          </ul>
        </section>

        <section className={styles.card}>
          {loading ? (
            <p>Checando a sessão…</p>
          ) : user ? (
            <>
              <p className={styles.greeting}>
                Welcome back, {profile?.name || user.displayName || user.email || "RemoteFlow user"}!
              </p>
              <p className={styles.hint}>Visit your dashboard or pick up where you left off.</p>
              <ul className={styles.profileList}>
                {profileLoading && <li>Carregando perfil…</li>}
                {!profileLoading &&
                  profile && (
                    <>
                      <li>
                      <strong>Role:</strong> {profile.role ?? "user"}
                      </li>
                      <li>
                        <strong>Joined:</strong> {joinedLabel ?? "—"}
                      </li>
                    </>
                  )}
              </ul>
              <div className={styles.actions}>
                <Link to="/dashboard" className={styles.link}>
                  Dashboard
                </Link>
                <Link to="/register" className={styles.link}>
                  Account
                </Link>
                <Button type="button" disabled={signingOut} onClick={handleLogout}>
                  {signingOut ? "Signing out…" : "Sign out"}
                </Button>
              </div>
            </>
          ) : (
            <>
              <p className={styles.greeting}>Get started by creating an account or logging in to explore the dashboard.</p>
              <div className={styles.actions}>
                <Link to="/login" className={styles.link}>
                  Login
                </Link>
                <Link to="/register" className={styles.link}>
                  Register
                </Link>
              </div>
            </>
          )}
        </section>
      </div>
    </main>
  );
}

export default LandingPage;