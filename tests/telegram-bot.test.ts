import { describe, it, expect } from 'vitest';
import { handler } from '../functions/telegram-bot/index';

describe('Telegram Bot Edge Function', () => {
  it('returns hello message on valid POST request', async () => {
    const request = new Request("http://localhost", {
      method: "POST",
      body: JSON.stringify({ message: "Test update" }),
      headers: { "Content-Type": "application/json" }
    });
    const response = await handler(request);
    expect(response.status).toBe(200);
    const text = await response.text();
    expect(text).toContain("Hello from TaskRatchet bot!");
  });

  it('returns 405 for non-POST requests', async () => {
    const request = new Request("http://localhost", { method: "GET" });
    const response = await handler(request);
    expect(response.status).toBe(405);
  });
});
