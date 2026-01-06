import { Link } from "react-router-dom";

import styles from "./LoginPage.module.css";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { signInWithGoogle } from "@/features/auth/services/authService";
import { useLogin } from "@/features/auth/hooks/useLogin";

function LoginPage() {
  const { email, password, loading, error, isFormInvalid, setEmail, setPassword, handleLogin } =
    useLogin();

  return (
    <main className={styles.page}>
      <section className={styles.card}>
        <header className={styles.header}>
          <p className={styles.subTitle}>Access RemoteFlow</p>
          <h1 className={styles.title}>Welcome back</h1>
          <p className={styles.description}>
            Log in to manage distributed teams, inspect dashboards, and keep work aligned from anywhere.
          </p>
        </header>

        <form className={styles.form} onSubmit={handleLogin} noValidate>
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
          <div className={styles.actions}>
            <Button type="submit" disabled={isFormInvalid}>
              {loading ? "Signing in…" : "Sign in"}
            </Button>
            <Button type="button" onClick={signInWithGoogle}>
              Sign in with Google
            </Button>
          </div>
        </form>

        {error && (
          <p className={`${styles.message} ${styles.error}`} role="alert">
            {error}
          </p>
        )}

        <p className={styles.footer}>
          New to RemoteFlow? <Link className={styles.link} to="/register">Create an account</Link>
        </p>
      </section>
    </main>
  );
}

export default LoginPage;
