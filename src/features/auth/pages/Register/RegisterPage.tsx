import { Link } from "react-router-dom";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { useRegister } from "@/features/auth/hooks/useRegister";

import styles from "./RegisterPage.module.css";

function RegisterPage() {
  const {
    formData,
    loading,
    statusMessage,
    error,
    isFormInvalid,
    handleChange,
    handleSubmit,
  } = useRegister();

  return (
    <main className={styles.page}>
      <section className={styles.card}>
        <header className={styles.header}>
          <p className={styles.subTitle}>Sign up</p>
          <h1 className={styles.title}>Create your RemoteFlow account</h1>
          <p className={styles.description}>
            Manage remote teams and projects through a secure and modern workspace.
          </p>
        </header>

        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <Input
            type="text"
            placeholder="Full name"
            value={formData.name}
            onChange={handleChange("name")}
            autoComplete="name"
          />
          <Input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange("email")}
            autoComplete="email"
          />
          <Input
            type="password"
            placeholder="Password (min 6 characters)"
            value={formData.password}
            onChange={handleChange("password")}
            autoComplete="new-password"
          />
          <div className={styles.actions}>
            <Button type="submit" disabled={isFormInvalid}>
              {loading ? "Creating account…" : "Register"}
            </Button>
          </div>
          {statusMessage && (
            <p className={`${styles.message} ${styles.success}`} aria-live="polite">
              {statusMessage}
            </p>
          )}
          {error && (
            <p className={`${styles.message} ${styles.error}`} aria-live="assertive">
              {error}
            </p>
          )}
        </form>

        <p className={styles.footer}>
          Already have an account? <Link className={styles.link} to="/login">Sign in</Link>
        </p>
      </section>
    </main>
  );
}

export default RegisterPage;