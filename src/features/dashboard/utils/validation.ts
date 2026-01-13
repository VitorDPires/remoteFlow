import { DASHBOARD_CONSTANTS, DASHBOARD_MESSAGES } from "../constants";
import type { ValidationResult } from "../types";

export const validateProjectName = (name: string): ValidationResult => {
  const trimmedName = name.trim();

  if (!trimmedName) {
    return {
      valid: false,
      error: DASHBOARD_MESSAGES.ERRORS.NAME_REQUIRED,
    };
  }

  if (
    trimmedName.length < DASHBOARD_CONSTANTS.PROJECT_NAME_MIN_LENGTH ||
    trimmedName.length > DASHBOARD_CONSTANTS.PROJECT_NAME_MAX_LENGTH
  ) {
    return {
      valid: false,
      error: DASHBOARD_MESSAGES.ERRORS.INVALID_NAME,
    };
  }

  return { valid: true };
};

export const validateProjectDescription = (description: string): ValidationResult => {
  const trimmedDescription = description.trim();

  if (!trimmedDescription) {
    return {
      valid: false,
      error: DASHBOARD_MESSAGES.ERRORS.DESCRIPTION_REQUIRED,
    };
  }

  if (
    trimmedDescription.length < DASHBOARD_CONSTANTS.PROJECT_DESCRIPTION_MIN_LENGTH ||
    trimmedDescription.length > DASHBOARD_CONSTANTS.PROJECT_DESCRIPTION_MAX_LENGTH
  ) {
    return {
      valid: false,
      error: DASHBOARD_MESSAGES.ERRORS.INVALID_DESCRIPTION,
    };
  }

  return { valid: true };
};

export const validateCreateProjectPayload = (payload: {
  name: string;
  description: string;
}): ValidationResult => {
  const nameValidation = validateProjectName(payload.name);
  if (!nameValidation.valid) {
    return nameValidation;
  }

  const descriptionValidation = validateProjectDescription(payload.description);
  if (!descriptionValidation.valid) {
    return descriptionValidation;
  }

  return { valid: true };
};
