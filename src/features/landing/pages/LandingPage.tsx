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
      <h1 className={styles.title}>RemoteFlow</h1>
      <p className={styles.subtitle}>Remote team and project management with an elegant, secure interface.</p>

      {loading ? (
        <div className={styles.card}>
          <p>Checking session...</p>
        </div>
      ) : user ? (
        <div className={styles.card}>
          <p>Welcome back, {profile?.name || user.displayName || user.email || "RemoteFlow user"}!</p>
          <p>Head to your dashboard or continue where you left off.</p>
          <ul className={styles.profileList}>
            {profileLoading && <li>Loading profile...</li>}
            {!profileLoading && profile && (
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
            <Link to="/login" className={styles.link}>
              Go to login
            </Link>
            <Link to="/register" className={styles.link}>
              Manage account
            </Link>
            <Button type="button" disabled={signingOut} onClick={handleLogout}>
              {signingOut ? "Signing out..." : "Sign out"}
            </Button>
          </div>
        </div>
      ) : (
        <div className={styles.card}>
          <p>Get started by creating an account or logging in to explore the dashboard.</p>
          <div className={styles.actions}>
            <Link to="/login" className={styles.link}>
              Login
            </Link>
            <Link to="/register" className={styles.link}>
              Register
            </Link>
          </div>
        </div>
      )}
    </main>
  );
}

export default LandingPage;