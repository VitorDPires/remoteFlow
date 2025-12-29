import { describe, it, vi, beforeEach, expect } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";

import { useUserProfile } from "../useUserProfile";
import { fetchUserProfile } from "@/features/auth/services";

vi.mock("../useAuth", () => ({
  useAuth: () => ({ user: { uid: "123", email: "mock@user" } }),
}));

vi.mock("@/features/auth/services", () => ({
  fetchUserProfile: vi.fn(),
}));

describe("useUserProfile", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("fetches and exposes profile data", async () => {
    vi.mocked(fetchUserProfile).mockResolvedValue({ role: "user" });

    const { result } = renderHook(() => useUserProfile());
    await waitFor(() => {
      expect(fetchUserProfile).toHaveBeenCalledWith("123");
      expect(result.current.profile).toEqual({ role: "user" });
      expect(result.current.loading).toBe(false);
    });
  });
});

