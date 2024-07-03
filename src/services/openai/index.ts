import OpenAI from "openai";
import { AssistantStreamEvents } from "openai/lib/AssistantStream";
import { Thread } from "openai/resources/beta/threads/threads";

let client: OpenAI;
let thread: Thread;

function getClient() {
  if (!client) {
    client = new OpenAI();
  }
  return client;
}

async function getThread() {
  if (!thread) {
    thread = await getClient().beta.threads.create();
  }

  return thread;
}

export async function addMessage(
  body: OpenAI.Beta.Threads.Messages.MessageCreateParams,
) {
  const c = getClient();
  const t = await getThread();

  await c.beta.threads.messages.create(t.id, body);
}

export async function getGptResponse(message: string): Promise<string> {
  const c = getClient();
  const t = await getThread();

  await addMessage({
    role: "user",
    content: message,
  });

  const r = c.beta.threads.runs.stream(t.id, {
    assistant_id: process.env.OPENAI_ASSISTANT_ID || "",
  });

  return new Promise((resolve) => {
    const event: keyof AssistantStreamEvents = "textDone";
    r.on(event, (text) => resolve(text.value));
  });
}
