// Basic Telegram bot integration using Supabase edge functions
// This function listens for Telegram updates and responds with a hello-world message.

export default async function handler(request: Request): Promise<Response> {
  // Allow only POST requests
  if (request.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  try {
    // Parse the incoming Telegram update
    const update = await request.json();
    console.log("Received Telegram update:", update);

    // A placeholder: in the future, you might add logic here to handle different
    // types of Telegram messages, commands, etc. For now, just return a hello message.
    return new Response("Hello, TaskRatchet Telegram Bot!", {
      status: 200,
      headers: { "Content-Type": "text/plain" }
    });
  } catch (error) {
    console.error("Error processing request:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
