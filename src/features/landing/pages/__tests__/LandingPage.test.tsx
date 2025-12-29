import { describe, it, expect, vi } from "vitest";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import LandingPage from "../LandingPage";
import { logout } from "@/features/auth/services";

vi.mock("@/features/auth/services", () => ({
  logout: vi.fn(),
}));

vi.mock("@/features/auth/hooks", () => ({
  useAuth: () => ({ user: { uid: "1", email: "test@user", displayName: "Tester" }, loading: false }),
  useUserProfile: () => ({ profile: { role: "member", createdAt: new Date("2024-01-01") }, loading: false }),
}));

describe("LandingPage", () => {
  it("shows profile info and handles logout", async () => {
    render(
      <MemoryRouter>
        <LandingPage />
      </MemoryRouter>
    );

    expect(screen.getByText("Welcome back, Tester!")).toBeInTheDocument();
    expect(screen.getByText("Role:")).toBeInTheDocument();
    expect(screen.getByText("Sign out")).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(screen.getByText("Sign out"));
    });

    expect(logout).toHaveBeenCalled();
  });
});

