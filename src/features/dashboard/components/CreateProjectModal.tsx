import { FormEvent, MouseEvent, useEffect, useState } from "react";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

import styles from "../pages/DashboardPage.module.css";

type CreateProjectModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (payload: { name: string; description: string }) => void;
};

function CreateProjectModal({ isOpen, onClose, onCreate }: CreateProjectModalProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (isOpen) {
      setName("");
      setDescription("");
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return undefined;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedName = name.trim();
    if (!trimmedName) return;

    onCreate({
      name: trimmedName,
      description: description.trim(),
    });
    onClose();
  };

  const handleOverlayClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={styles.modalOverlay}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-label="Create project"
    >
      <div className={styles.modal}>
        <header className={styles.modalHeader}>
          <div>
            <p className={styles.kicker}>New project</p>
            <h2 className={styles.sectionTitle}>Create a mock project</h2>
            <p className={styles.sectionText}>
              Add a name and a short description. The project will be available locally only.
            </p>
          </div>
          <button
            type="button"
            className={styles.closeButton}
            aria-label="Close modal"
            onClick={onClose}
          >
            ×
          </button>
        </header>

        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.field}>
            <span>Project name</span>
            <Input
              type="text"
              placeholder="Ex: Mobile Platform"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
              autoFocus
            />
          </label>

          <label className={styles.field}>
            <span>Description</span>
            <textarea
              className={styles.textarea}
              placeholder="Quick context to remember the main goal."
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              rows={3}
            />
          </label>

          <div className={styles.formActions}>
            <Button type="submit">Create project</Button>
            <Button type="button" className={styles.secondaryGhost} onClick={onClose}>
              Cancel
            </Button>
            <span className={styles.muted}>Mocked only on the front-end.</span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateProjectModal;
