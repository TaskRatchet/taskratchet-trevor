import bot from "./index.js";
import { describe, it, expect, vi } from "vitest";

describe("bot", () => {
  it("resets conversation", async () => {
    const response = await bot("/reset");
    expect(response).toBe("Conversation reset");
  });

  it("tells user if no pending tasks", async () => {
    vi.mocked(fetch).mockResolvedValue({
      json: () => Promise.resolve([]),
    } as any);
    const response = await bot("/tasks");
    expect(response).toBe("No pending tasks!");
  });
});
