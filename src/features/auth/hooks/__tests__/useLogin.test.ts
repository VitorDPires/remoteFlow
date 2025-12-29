import { describe, it, beforeEach, expect, vi } from "vitest";
import { act, renderHook } from "@testing-library/react";
import type { User } from "firebase/auth";

import { useLogin } from "../useLogin";

const navigateMock = vi.fn();

vi.mock("react-router-dom", () => ({
  useNavigate: () => navigateMock,
}));

import { loginWithEmailAndPassword } from "@/features/auth/services/authService";

vi.mock("@/features/auth/services/authService", () => ({
  loginWithEmailAndPassword: vi.fn(),
}));

describe("useLogin", () => {
  const email = "user@example.com";
  const password = "secret";
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("allows login and redirects when credentials are valid", async () => {
    vi.mocked(loginWithEmailAndPassword).mockResolvedValue({} as User);

    const { result } = renderHook(() => useLogin());
    act(() => {
      result.current.setEmail(email);
      result.current.setPassword(password);
    });

    await act(async () => {
      await result.current.handleLogin({ preventDefault: vi.fn() } as any);
    });

    expect(loginWithEmailAndPassword).toHaveBeenCalledWith(email, password);
    expect(navigateMock).toHaveBeenCalledWith("/", { replace: true });
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it("shows error if input is missing", async () => {
    const { result } = renderHook(() => useLogin());
    await act(async () => {
      await result.current.handleLogin({ preventDefault: vi.fn() } as any);
    });

    expect(result.current.error).toBe("Please fill in both email and password.");
  });
});

