import { describe, it, expect } from "vitest";

import {
  validateProjectName,
  validateProjectDescription,
  validateCreateProjectPayload,
} from "../validation";

describe("validation", () => {
  describe("validateProjectName", () => {
    it("should validate valid name", () => {
      const result = validateProjectName("Test Project");
      expect(result.valid).toBe(true);
      expect(result.error).toBeUndefined();
    });

    it("should reject empty name", () => {
      const result = validateProjectName("");
      expect(result.valid).toBe(false);
      expect(result.error).toBeTruthy();
    });

    it("should reject name with only spaces", () => {
      const result = validateProjectName("   ");
      expect(result.valid).toBe(false);
      expect(result.error).toBeTruthy();
    });

    it("should reject name too short", () => {
      const result = validateProjectName("AB");
      expect(result.valid).toBe(false);
      expect(result.error).toBeTruthy();
    });

    it("should accept name at minimum length (3 characters)", () => {
      const result = validateProjectName("ABC");
      expect(result.valid).toBe(true);
    });

    it("should reject name too long", () => {
      const result = validateProjectName("A".repeat(101));
      expect(result.valid).toBe(false);
      expect(result.error).toBeTruthy();
    });

    it("should accept name at maximum length (100 characters)", () => {
      const result = validateProjectName("A".repeat(100));
      expect(result.valid).toBe(true);
    });

    it("should trim spaces before validating", () => {
      const result = validateProjectName("  Test Project  ");
      expect(result.valid).toBe(true);
    });
  });

  describe("validateProjectDescription", () => {
    it("should validate valid description", () => {
      const result = validateProjectDescription("This is a valid description");
      expect(result.valid).toBe(true);
      expect(result.error).toBeUndefined();
    });

    it("should reject empty description", () => {
      const result = validateProjectDescription("");
      expect(result.valid).toBe(false);
      expect(result.error).toBeTruthy();
    });

    it("should reject description with only spaces", () => {
      const result = validateProjectDescription("   ");
      expect(result.valid).toBe(false);
      expect(result.error).toBeTruthy();
    });

    it("should reject description too short", () => {
      const result = validateProjectDescription("Short");
      expect(result.valid).toBe(false);
      expect(result.error).toBeTruthy();
    });

    it("should accept description at minimum length (10 characters)", () => {
      const result = validateProjectDescription("A".repeat(10));
      expect(result.valid).toBe(true);
    });

    it("should reject description too long", () => {
      const result = validateProjectDescription("A".repeat(501));
      expect(result.valid).toBe(false);
      expect(result.error).toBeTruthy();
    });

    it("should accept description at maximum length (500 characters)", () => {
      const result = validateProjectDescription("A".repeat(500));
      expect(result.valid).toBe(true);
    });

    it("should trim spaces before validating", () => {
      const result = validateProjectDescription("  Valid description  ");
      expect(result.valid).toBe(true);
    });
  });

  describe("validateCreateProjectPayload", () => {
    it("should validate valid payload", () => {
      const result = validateCreateProjectPayload({
        name: "Test Project",
        description: "This is a valid project description",
      });
      expect(result.valid).toBe(true);
      expect(result.error).toBeUndefined();
    });

    it("should reject payload with empty description", () => {
      const result = validateCreateProjectPayload({
        name: "Test Project",
        description: "",
      });
      expect(result.valid).toBe(false);
      expect(result.error).toBeTruthy();
    });

    it("should reject payload with invalid name", () => {
      const result = validateCreateProjectPayload({
        name: "AB",
        description: "Valid description here",
      });
      expect(result.valid).toBe(false);
      expect(result.error).toBeTruthy();
    });

    it("should reject payload with description too short", () => {
      const result = validateCreateProjectPayload({
        name: "Test Project",
        description: "Short",
      });
      expect(result.valid).toBe(false);
      expect(result.error).toBeTruthy();
    });

    it("should reject payload with invalid description", () => {
      const result = validateCreateProjectPayload({
        name: "Test Project",
        description: "A".repeat(501),
      });
      expect(result.valid).toBe(false);
      expect(result.error).toBeTruthy();
    });

    it("should return name error before description error", () => {
      const result = validateCreateProjectPayload({
        name: "",
        description: "A".repeat(501),
      });
      expect(result.valid).toBe(false);
      expect(result.error).toContain("name");
    });
  });
});
