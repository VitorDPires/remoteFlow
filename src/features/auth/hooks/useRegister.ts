import { useState, type FormEvent, type ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";

import { registerWithEmailAndPassword } from "@/features/auth/services";

type RegisterForm = {
  name: string;
  email: string;
  password: string;
};

const MIN_PASSWORD_LENGTH = 6;

export const useRegister = () => {
  const [formData, setFormData] = useState<RegisterForm>({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleChange =
    (field: keyof RegisterForm) => (event: ChangeEvent<HTMLInputElement>) => {
      setFormData((current) => ({ ...current, [field]: event.target.value }));
    };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatusMessage(null);
    setError(null);

    if (!formData.name.trim() || !formData.email.trim()) {
      setError("Name and email are required.");
      return;
    }

    if (formData.password.length < MIN_PASSWORD_LENGTH) {
      setError(`Password must be at least ${MIN_PASSWORD_LENGTH} characters.`);
      return;
    }

    try {
      setLoading(true);
      await registerWithEmailAndPassword(formData.name, formData.email, formData.password);
      setStatusMessage("Account created successfully! You can now log in.");
      setFormData({ name: "", email: "", password: "" });
      navigate("/", { replace: true });
    } catch (err) {
      const message = err instanceof Error ? err.message : "An unexpected error occurred.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const isFormInvalid =
    loading ||
    !formData.name.trim() ||
    !formData.email.trim() ||
    formData.password.length < MIN_PASSWORD_LENGTH;

  return {
    formData,
    loading,
    statusMessage,
    error,
    isFormInvalid,
    handleChange,
    handleSubmit,
  };
};

