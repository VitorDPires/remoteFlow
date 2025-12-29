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
    <div className={styles.container}>
      <header className={styles.header}>
        <h2>Welcome back</h2>
        <p className={styles.subTitle}>Log into RemoteFlow</p>
      </header>

      <form className={styles.form} onSubmit={handleLogin}>
        <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
        <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" />
        <Button type="submit" disabled={isFormInvalid}>
          {loading ? "Signing in..." : "Sign in"}
        </Button>
        <Button type="button" onClick={signInWithGoogle}>
          Sign in with Google
        </Button>
      </form>

      {error && (
        <p className={styles.errorMessage} role="alert">
          {error}
        </p>
      )}

      <p className={styles.footer}>
        New to RemoteFlow? <Link to="/register">Create an account</Link>
      </p>
    </div>
  );
}

export default LoginPage;
