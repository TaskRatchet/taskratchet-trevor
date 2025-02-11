import { httpRouter } from "convex/server";
import { telegramWebhook } from "./telegram";
import { discordWebhook } from "./discord";

const http = httpRouter();

http.route({
  path: "/telegram-webhook",
  method: "POST",
  handler: telegramWebhook,
});

http.route({
  path: "/discord-webhook",
  method: "POST",
  handler: discordWebhook,
});

export default http;
