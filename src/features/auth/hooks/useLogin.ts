import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";

import { loginWithEmailAndPassword } from "@/features/auth/services/authService";

export const useLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    if (!email.trim() || !password.trim()) {
      setError("Please fill in both email and password.");
      return;
    }

    try {
      setLoading(true);
      await loginWithEmailAndPassword(email, password);
      navigate("/", { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to sign in right now.");
    } finally {
      setLoading(false);
    }
  };

  const isFormInvalid = loading || !email.trim() || !password.trim();

  return {
    email,
    password,
    loading,
    error,
    isFormInvalid,
    setEmail,
    setPassword,
    handleLogin,
  };
};

