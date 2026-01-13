export const DASHBOARD_CONSTANTS = {
  PROJECT_NAME_MAX_LENGTH: 100,
  PROJECT_NAME_MIN_LENGTH: 3,
  PROJECT_DESCRIPTION_MAX_LENGTH: 500,
  PROJECT_DESCRIPTION_MIN_LENGTH: 10,
  PROJECTS_COLLECTION: "projects",
} as const;

export const DASHBOARD_MESSAGES = {
  ERRORS: {
    LOAD_PROJECTS: "Failed to load projects. Please try again.",
    CREATE_PROJECT: "Failed to create project. Please try again.",
    NOT_AUTHENTICATED: "You must be authenticated to perform this action.",
    INVALID_NAME: "Project name must be between 3 and 100 characters.",
    NAME_REQUIRED: "Project name is required.",
    DESCRIPTION_REQUIRED: "Project description is required.",
    INVALID_DESCRIPTION: "Project description must be between 10 and 500 characters.",
  },
  SUCCESS: {
    PROJECT_CREATED: "Project created successfully!",
  },
  INFO: {
    NO_PROJECTS: "No projects yet. Create the first one to get started.",
    LOADING: "Loading projects…",
    NOT_LOGGED_IN: "You must be logged in to view your projects.",
  },
} as const;

export const PROJECT_STATUS_LABELS: Record<string, string> = {
  active: "Active",
  paused: "Paused",
  planning: "Planning",
} as const;
