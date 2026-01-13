import { FormEvent, MouseEvent, useEffect, useState } from "react";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

import { DASHBOARD_CONSTANTS } from "../constants";
import type { CreateProjectPayload } from "../types";
import { validateProjectDescription, validateProjectName } from "../utils";
import styles from "../pages/DashboardPage.module.css";

interface CreateProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (payload: CreateProjectPayload) => Promise<void>;
  isCreating?: boolean;
}

function CreateProjectModal({ isOpen, onClose, onCreate, isCreating = false }: CreateProjectModalProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [nameError, setNameError] = useState<string | null>(null);
  const [descriptionError, setDescriptionError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setName("");
      setDescription("");
      setNameError(null);
      setDescriptionError(null);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return undefined;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !isCreating) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, isCreating]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nameValidation = validateProjectName(name);
    if (!nameValidation.valid) {
      setNameError(nameValidation.error || null);
      return;
    }
    setNameError(null);

    const descriptionValidation = validateProjectDescription(description);
    if (!descriptionValidation.valid) {
      setDescriptionError(descriptionValidation.error || null);
      return;
    }
    setDescriptionError(null);

    await onCreate({
      name: name.trim(),
      description: description.trim(),
    });
  };

  const handleOverlayClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget && !isCreating) {
      onClose();
    }
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
    if (nameError) setNameError(null);
  };

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value);
    if (descriptionError) setDescriptionError(null);
  };

  const remainingNameChars = DASHBOARD_CONSTANTS.PROJECT_NAME_MAX_LENGTH - name.length;
  const remainingDescChars = DASHBOARD_CONSTANTS.PROJECT_DESCRIPTION_MAX_LENGTH - description.length;

  return (
    <div
      className={styles.modalOverlay}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <div className={styles.modal}>
        <header className={styles.modalHeader}>
          <div>
            <p className={styles.kicker}>New project</p>
            <h2 id="modal-title" className={styles.sectionTitle}>
              Create a new project
            </h2>
            <p id="modal-description" className={styles.sectionText}>
              Add a name and a brief description. The project will be saved to Firestore.
            </p>
          </div>
          <button
            type="button"
            className={styles.closeButton}
            aria-label="Close modal"
            onClick={onClose}
            disabled={isCreating}
          >
            ×
          </button>
        </header>

        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.field}>
            <span>Project name *</span>
            <Input
              type="text"
              placeholder="e.g. Mobile Platform"
              value={name}
              onChange={handleNameChange}
              required
              autoFocus
              maxLength={DASHBOARD_CONSTANTS.PROJECT_NAME_MAX_LENGTH}
              disabled={isCreating}
              aria-invalid={!!nameError}
              aria-describedby={nameError ? "name-error" : "name-hint"}
            />
            {nameError ? (
              <span id="name-error" className={styles.errorText} role="alert">
                {nameError}
              </span>
            ) : (
              <span id="name-hint" className={styles.muted}>
                {remainingNameChars} characters remaining
              </span>
            )}
          </label>

          <label className={styles.field}>
            <span>Description *</span>
            <textarea
              className={styles.textarea}
              placeholder="Quick context to remember the main goal."
              value={description}
              onChange={handleDescriptionChange}
              rows={3}
              maxLength={DASHBOARD_CONSTANTS.PROJECT_DESCRIPTION_MAX_LENGTH}
              disabled={isCreating}
              required
              aria-invalid={!!descriptionError}
              aria-describedby={descriptionError ? "desc-error" : "desc-hint"}
            />
            {descriptionError ? (
              <span id="desc-error" className={styles.errorText} role="alert">
                {descriptionError}
              </span>
            ) : (
              <span id="desc-hint" className={styles.muted}>
                {remainingDescChars} characters remaining
              </span>
            )}
          </label>

          <div className={styles.formActions}>
            <Button type="submit" disabled={isCreating}>
              {isCreating ? "Creating..." : "Create project"}
            </Button>
            <Button 
              type="button" 
              className={styles.secondaryGhost} 
              onClick={onClose}
              disabled={isCreating}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateProjectModal;
