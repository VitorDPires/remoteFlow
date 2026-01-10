import { useMemo, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

import { useAuth } from "@/features/auth/hooks";
import { logout } from "@/features/auth/services";

import styles from "./NavigationBar.module.css";

const navLinks = [
  { to: "/", label: "Home", end: true },
];

function NavigationBar() {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [signingOut, setSigningOut] = useState(false);

  const userLabel = useMemo(() => {
    if (!user) return null;
    return user.displayName || user.email || "User";
  }, [user]);

  const handleLogout = async () => {
    setSigningOut(true);
    try {
      await logout();
    } finally {
      setSigningOut(false);
    }
  };

  return (
    <header className={styles.navbar}>
      <div className={styles.inner}>
        <Link to="/" className={styles.brand}>
          <span className={styles.brandMark} aria-hidden>
            ●
          </span>
          RemoteFlow
        </Link>

        <nav className={styles.links} aria-label="Navegação principal">
          {navLinks.map(({ to, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                [styles.link, isActive ? styles.linkActive : ""].filter(Boolean).join(" ")
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <div className={styles.actions}>
          {loading ? (
            <span className={styles.status}>Checking session…</span>
          ) : user ? (
            <>
              <span className={styles.userChip} title={userLabel ?? undefined}>
                {userLabel}
              </span>
              <button
                type="button"
                onClick={handleLogout}
                className={styles.signOutButton}
                disabled={signingOut}
              >
                {signingOut ? "Signing out…" : "Sign out"}
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className={styles.ghostLink}>
                Login
              </Link>
              <button
                type="button"
                className={styles.primaryAction}
                onClick={() => navigate("/register")}
              >
                Create account
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default NavigationBar;
