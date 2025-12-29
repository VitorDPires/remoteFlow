import { describe, it, beforeEach, expect, vi } from "vitest";
import { act, renderHook } from "@testing-library/react";
import type { User } from "firebase/auth";

import { useRegister } from "../useRegister";

const navigateMock = vi.fn();

vi.mock("react-router-dom", () => ({
  useNavigate: () => navigateMock,
}));

import { registerWithEmailAndPassword } from "@/features/auth/services";

vi.mock("@/features/auth/services", () => ({
  registerWithEmailAndPassword: vi.fn(),
}));

describe("useRegister", () => {
  const name = "Test User";
  const email = "new@user.com";
  const password = "strongpass";

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("registers a user and resets state", async () => {
    vi.mocked(registerWithEmailAndPassword).mockResolvedValue({} as User);

    const { result } = renderHook(() => useRegister());

    act(() => {
      result.current.handleChange("name")({ target: { value: name } } as any);
      result.current.handleChange("email")({ target: { value: email } } as any);
      result.current.handleChange("password")({ target: { value: password } } as any);
    });

    await act(async () => {
      await result.current.handleSubmit({ preventDefault: vi.fn() } as any);
    });

    expect(registerWithEmailAndPassword).toHaveBeenCalledWith(name, email, password);
    expect(result.current.statusMessage).toBe("Account created successfully! You can now log in.");
    expect(result.current.error).toBeNull();
  });

  it("validates required fields", async () => {
    const { result } = renderHook(() => useRegister());
    await act(async () => {
      await result.current.handleSubmit({ preventDefault: vi.fn() } as any);
    });
    expect(result.current.error).toBe("Name and email are required.");
  });
});

