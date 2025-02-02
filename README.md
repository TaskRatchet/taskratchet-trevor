# TaskRatchet Bot

A Telegram and Discord bot for interacting with TaskRatchet. Built with Supabase Edge Functions.

## Features

- Create and manage TaskRatchet tasks via Telegram
- View upcoming deadlines
- Get notifications for task updates

## Setup

### Prerequisites

- Node.js 18+
- pnpm
- Supabase CLI (`brew install supabase/tap/supabase`)
- Telegram Bot Token (from [@BotFather](https://t.me/botfather))
- TaskRatchet API credentials

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Copy environment template:
   ```bash
   cp supabase/.env.example supabase/.env
   ```
4. Fill in environment variables in `supabase/.env`

## Development

### Local Development

1. Start Supabase functions:
   ```bash
   pnpm run dev
   ```

2. Expose local endpoint (using ngrok):
   ```bash
   ngrok http 54321
   ```

3. Set Telegram webhook URL:
   ```
   https://<your-ngrok-url>/functions/v1/telegram-bot
   ```

4. Monitor logs:
   ```bash
   supabase logs
   ```

### Testing

Run the test suite:
```bash
pnpm test
```

## Deployment

### Manual Deployment

Deploy to Supabase:
```bash
pnpm run deploy
```

### CI/CD

The project uses GitHub Actions for automated deployments. Pushes to `main` trigger automatic deployments to Supabase.

Required secrets:
- `SUPABASE_ACCESS_TOKEN`
- `SUPABASE_PROJECT_ID`

## Architecture

- Built on Supabase Edge Functions
- TypeScript for type safety
- Platform-agnostic core for multi-platform support
- Automated testing with Vitest

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests
5. Submit a pull request

## License

MIT
