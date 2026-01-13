import { renderHook, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";

import * as authHooks from "@/features/auth/hooks";

import * as projectService from "../../services/projectService";
import { useCreateProject } from "../useCreateProject";
import type { Project } from "../../types";

vi.mock("@/features/auth/hooks");
vi.mock("../../services/projectService");

describe("useCreateProject", () => {
  const mockUser = {
    uid: "test-user-id",
    email: "test@example.com",
  } as any;

  const mockProject: Project = {
    id: "new-id",
    name: "New Project",
    description: "This is a new project description",
    status: "planning",
    role: "Owner",
    members: 1,
    updatedAt: new Date().toISOString(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should create project successfully", async () => {
    vi.mocked(authHooks.useAuth).mockReturnValue({
      user: mockUser,
      loading: false,
      error: null,
    } as any);

    vi.mocked(projectService.createProject).mockResolvedValue(mockProject);

    const { result } = renderHook(() => useCreateProject());

    const payload = {
      name: "New Project",
      description: "This is a new project description",
    };

    const createdProject = await result.current.create(payload);

    await waitFor(() => {
      expect(result.current.creating).toBe(false);
    });

    expect(createdProject).toEqual(mockProject);
    expect(result.current.error).toBeNull();
    expect(projectService.createProject).toHaveBeenCalledWith(mockUser, payload);
  });

  it("should validate empty name", async () => {
    vi.mocked(authHooks.useAuth).mockReturnValue({
      user: mockUser,
      loading: false,
      error: null,
    } as any);

    const { result } = renderHook(() => useCreateProject());

    const payload = {
      name: "",
      description: "This is a valid description",
    };

    const createdProject = await result.current.create(payload);

    await waitFor(() => {
      expect(createdProject).toBeNull();
      expect(result.current.error).toBeTruthy();
    });
    expect(projectService.createProject).not.toHaveBeenCalled();
  });

  it("should validate name too short", async () => {
    vi.mocked(authHooks.useAuth).mockReturnValue({
      user: mockUser,
      loading: false,
      error: null,
    } as any);

    const { result } = renderHook(() => useCreateProject());

    const payload = {
      name: "Ab",
      description: "This is a valid description",
    };

    const createdProject = await result.current.create(payload);

    await waitFor(() => {
      expect(createdProject).toBeNull();
      expect(result.current.error).toBeTruthy();
    });
    expect(projectService.createProject).not.toHaveBeenCalled();
  });

  it("should validate empty description", async () => {
    vi.mocked(authHooks.useAuth).mockReturnValue({
      user: mockUser,
      loading: false,
      error: null,
    } as any);

    const { result } = renderHook(() => useCreateProject());

    const payload = {
      name: "Valid Name",
      description: "",
    };

    const createdProject = await result.current.create(payload);

    await waitFor(() => {
      expect(createdProject).toBeNull();
      expect(result.current.error).toBeTruthy();
    });
    expect(projectService.createProject).not.toHaveBeenCalled();
  });

  it("should validate description too short", async () => {
    vi.mocked(authHooks.useAuth).mockReturnValue({
      user: mockUser,
      loading: false,
      error: null,
    } as any);

    const { result } = renderHook(() => useCreateProject());

    const payload = {
      name: "Valid Name",
      description: "Short",
    };

    const createdProject = await result.current.create(payload);

    await waitFor(() => {
      expect(createdProject).toBeNull();
      expect(result.current.error).toBeTruthy();
    });
    expect(projectService.createProject).not.toHaveBeenCalled();
  });

  it("should validate name too long", async () => {
    vi.mocked(authHooks.useAuth).mockReturnValue({
      user: mockUser,
      loading: false,
      error: null,
    } as any);

    const { result } = renderHook(() => useCreateProject());

    const payload = {
      name: "A".repeat(101),
      description: "This is a valid description",
    };

    const createdProject = await result.current.create(payload);

    await waitFor(() => {
      expect(createdProject).toBeNull();
      expect(result.current.error).toBeTruthy();
    });
    expect(projectService.createProject).not.toHaveBeenCalled();
  });

  it("should validate description too long", async () => {
    vi.mocked(authHooks.useAuth).mockReturnValue({
      user: mockUser,
      loading: false,
      error: null,
    } as any);

    const { result } = renderHook(() => useCreateProject());

    const payload = {
      name: "Valid name",
      description: "A".repeat(501),
    };

    const createdProject = await result.current.create(payload);

    await waitFor(() => {
      expect(createdProject).toBeNull();
      expect(result.current.error).toBeTruthy();
    });
    expect(projectService.createProject).not.toHaveBeenCalled();
  });

  it("should return error when user is not authenticated", async () => {
    vi.mocked(authHooks.useAuth).mockReturnValue({
      user: null,
      loading: false,
      error: null,
    } as any);

    const { result } = renderHook(() => useCreateProject());

    const payload = {
      name: "Test Project",
      description: "Valid project description",
    };

    const createdProject = await result.current.create(payload);

    await waitFor(() => {
      expect(createdProject).toBeNull();
      expect(result.current.error).toBeTruthy();
    });
    expect(projectService.createProject).not.toHaveBeenCalled();
  });

  it("should handle error when creating project", async () => {
    vi.mocked(authHooks.useAuth).mockReturnValue({
      user: mockUser,
      loading: false,
      error: null,
    } as any);

    vi.mocked(projectService.createProject).mockRejectedValue(new Error("Create error"));

    const { result } = renderHook(() => useCreateProject());

    const payload = {
      name: "Test Project",
      description: "Valid project description",
    };

    const createdProject = await result.current.create(payload);

    await waitFor(() => {
      expect(result.current.creating).toBe(false);
      expect(result.current.error).toBeTruthy();
    });

    expect(createdProject).toBeNull();
  });

  it("should clear error", async () => {
    vi.mocked(authHooks.useAuth).mockReturnValue({
      user: null,
      loading: false,
      error: null,
    } as any);

    const { result } = renderHook(() => useCreateProject());

    await result.current.create({ name: "Test", description: "Test description here" });

    await waitFor(() => {
      expect(result.current.error).toBeTruthy();
    });

    result.current.clearError();

    await waitFor(() => {
      expect(result.current.error).toBeNull();
    });
  });
});
