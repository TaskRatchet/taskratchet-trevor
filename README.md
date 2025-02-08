# TaskRatchet Telegram Bot

A Telegram bot for [TaskRatchet](https://taskratchet.com) built with [Convex](https://convex.dev).

## Development

1. Install dependencies:
```bash
npm install
```

2. Copy `.env.local.example` to `.env.local` and fill in your Telegram bot token:
```bash
TELEGRAM_BOT_TOKEN=your_bot_token_here
```

3. Start the development server:
```bash
npm run dev
```

4. Set up your Telegram bot webhook:
```bash
curl -X POST https://api.telegram.org/bot<YOUR_BOT_TOKEN>/setWebhook \
  -H "Content-Type: application/json" \
  -d '{"url": "https://exciting-wolf-734.convex.site/telegram-webhook"}'
```

## Architecture

- Backend: [Convex](https://convex.dev) serverless functions
- Bot Interface: Telegram Bot API via webhooks
- Database: Convex's built-in database

## Project Structure

```
├── convex/              # Convex backend code
│   ├── telegram.ts      # Telegram webhook handler
│   └── http.js         # HTTP routes
└── README.md           # This file
```
