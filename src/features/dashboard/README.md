# Dashboard Feature

Project management dashboard with real-time Firestore sync.

## Structure

```
dashboard/
├── components/      # React components
├── hooks/          # Custom hooks (useProjects, useCreateProject)
├── pages/          # Dashboard page
├── services/       # Firebase/API services
├── utils/          # Validation utilities
├── constants.ts    # Configuration and messages
└── types.ts        # TypeScript definitions
```

## Usage

```tsx
import { DashboardPage } from '@/features/dashboard';
import { useProjects, useCreateProject } from '@/features/dashboard';
```

## Key Features

- **Project List** - View all user projects
- **Create Project** - Modal with validation
- **Statistics** - Real-time project counts by status
- **Real-time Sync** - Firestore integration
- **Validation** - Form validation with feedback
- **Accessibility** - ARIA labels and keyboard navigation
- **Testing** - 31 tests (100% passing)

## Components

### useProjects Hook
```tsx
const {
  projects,      // Project list
  loading,       // Loading state
  error,         // Error message
  stats,         // Project statistics
  refetch,       // Reload projects
  addProject,    // Add project locally
  clearError,    // Clear error
} = useProjects();
```

### useCreateProject Hook
```tsx
const {
  create,        // Create project function
  creating,      // Creating state
  error,         // Error message
  clearError,    // Clear error
} = useCreateProject();

const project = await create({
  name: "New Project",
  description: "Description"
});
```

## Types

```typescript
interface Project {
  id: string;
  name: string;
  role: ProjectRole;
  status: ProjectStatus;
  members: number;
  updatedAt: string;
  description: string;
  createdAt?: string;
}

type ProjectStatus = "active" | "paused" | "planning";
type ProjectRole = "Owner" | "Admin" | "Member" | "Viewer";
```

## Testing

```bash
npm test dashboard
```

All 31 tests passing ✅
