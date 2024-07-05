import { vi } from "vitest";

vi.stubGlobal(
  "fetch",
  vi.fn(() =>
    Promise.resolve({ text: () => "the_response_text", json: () => ({}) }),
  ),
);

vi.mock("openai", () => {
  const OpenAI = vi.fn();
  OpenAI.prototype.beta = {
    threads: {
      create: vi.fn(() => ({ id: "the_thread_id" })),
      messages: {
        create: vi.fn(),
      },
    },
  };
  return {
    default: OpenAI,
  };
});
