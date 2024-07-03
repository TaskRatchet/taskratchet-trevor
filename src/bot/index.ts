import { addMessage, getGptResponse } from "../services/openai";
import "dotenv/config";
import { getTasks } from "../services/taskratchet";

function formatCents(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}

async function getResponse(message: string): Promise<string | null> {
  if (message.includes("hello")) {
    return "Hello, World!";
  } else if (message.includes("/tasks")) {
    const tasks = await getTasks();
    return tasks
      .filter((t) => t.status === "pending")
      .map(
        (t) => `${t.task} by ${t.due} or pay ${formatCents(Number(t.cents))}`,
      )
      .join("\n");
  } else {
    return null;
  }
}

export default async function bot(message: string): Promise<string> {
  const response = await getResponse(message);

  if (!response) {
    return getGptResponse(message);
  }

  addMessage({
    role: "user",
    content: message,
  });

  addMessage({
    role: "assistant",
    content: response,
  });

  return response;
}
