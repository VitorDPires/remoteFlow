import { renderHook, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";

import * as authHooks from "@/features/auth/hooks";

import * as projectService from "../../services/projectService";
import { useProjects } from "../useProjects";
import type { Project } from "../../types";

vi.mock("@/features/auth/hooks");
vi.mock("../../services/projectService");

describe("useProjects", () => {
  const mockUser = {
    uid: "test-user-id",
    email: "test@example.com",
  } as any;

  const mockProjects: Project[] = [
    {
      id: "1",
      name: "Project 1",
      description: "Description 1",
      status: "active",
      role: "Owner",
      members: 3,
      updatedAt: new Date().toISOString(),
    },
    {
      id: "2",
      name: "Project 2",
      description: "Description 2",
      status: "planning",
      role: "Member",
      members: 2,
      updatedAt: new Date().toISOString(),
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should load projects when user is authenticated", async () => {
    vi.mocked(authHooks.useAuth).mockReturnValue({
      user: mockUser,
      loading: false,
      error: null,
    } as any);

    vi.mocked(projectService.fetchUserProjects).mockResolvedValue(mockProjects);

    const { result } = renderHook(() => useProjects());

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.projects).toEqual(mockProjects);
    expect(result.current.error).toBeNull();
    expect(projectService.fetchUserProjects).toHaveBeenCalledWith(mockUser.uid);
  });

  it("should calculate statistics correctly", async () => {
    vi.mocked(authHooks.useAuth).mockReturnValue({
      user: mockUser,
      loading: false,
      error: null,
    } as any);

    vi.mocked(projectService.fetchUserProjects).mockResolvedValue(mockProjects);

    const { result } = renderHook(() => useProjects());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.stats).toEqual({
      total: 2,
      active: 1,
      paused: 0,
      planning: 1,
    });
  });

  it("should handle errors when loading projects", async () => {
    vi.mocked(authHooks.useAuth).mockReturnValue({
      user: mockUser,
      loading: false,
      error: null,
    } as any);

    const mockError = new Error("Load error");
    vi.mocked(projectService.fetchUserProjects).mockRejectedValue(mockError);

    const { result } = renderHook(() => useProjects());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBeTruthy();
    expect(result.current.projects).toEqual([]);
  });

  it("should add project locally", async () => {
    vi.mocked(authHooks.useAuth).mockReturnValue({
      user: mockUser,
      loading: false,
      error: null,
    } as any);

    vi.mocked(projectService.fetchUserProjects).mockResolvedValue(mockProjects);

    const { result } = renderHook(() => useProjects());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    const newProject: Project = {
      id: "3",
      name: "New Project",
      description: "New description",
      status: "planning",
      role: "Owner",
      members: 1,
      updatedAt: new Date().toISOString(),
    };

    result.current.addProject(newProject);

    await waitFor(() => {
      expect(result.current.projects[0]).toEqual(newProject);
      expect(result.current.projects.length).toBe(3);
    });
  });

  it("should clear error", async () => {
    vi.mocked(authHooks.useAuth).mockReturnValue({
      user: mockUser,
      loading: false,
      error: null,
    } as any);

    vi.mocked(projectService.fetchUserProjects).mockRejectedValue(new Error("Error"));

    const { result } = renderHook(() => useProjects());

    await waitFor(() => {
      expect(result.current.error).toBeTruthy();
    });

    result.current.clearError();

    await waitFor(() => {
      expect(result.current.error).toBeNull();
    });
  });

  it("should not load projects when user is not authenticated", async () => {
    vi.mocked(authHooks.useAuth).mockReturnValue({
      user: null,
      loading: false,
      error: null,
    } as any);

    const { result } = renderHook(() => useProjects());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.projects).toEqual([]);
    expect(projectService.fetchUserProjects).not.toHaveBeenCalled();
  });
});
