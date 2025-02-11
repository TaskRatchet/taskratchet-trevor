# TaskRatchet Telegram Bot Knowledge Base

## Project Mission
Build a Telegram bot interface for TaskRatchet to allow users to manage their tasks and commitments directly through Telegram.

## Key Technologies
- Convex for backend & database
- Telegram & Discord Bot APIs for messaging
- TaskRatchet API v2 for task management
- Beeminder API for goal tracking
- TypeScript for type safety

## Development Guidelines
- Use TypeScript for all new files
- Add JSDoc comments for public functions
- Keep webhook handlers focused - move business logic to separate functions
- Log important events and errors
- Use platform-agnostic messaging interface for all commands

## Environment Setup
- TELEGRAM_BOT_TOKEN required in .env.local
- DISCORD_BOT_TOKEN required in .env.local
- Convex deployment configuration managed automatically
- Webhook URLs:
  - Telegram: https://exciting-wolf-734.convex.site/telegram-webhook
  - Discord: https://exciting-wolf-734.convex.site/discord-webhook

## Testing
- Test webhook locally using `curl` or bot platform test interfaces
- Verify bot responses in both Telegram and Discord
- Check Convex dashboard logs for debugging

## Resources
- [Convex Documentation](https://docs.convex.dev)
- [Telegram Bot API](https://core.telegram.org/bots/api)
- [Discord Bot API](https://discord.com/developers/docs/intro)
- [TaskRatchet API v2](https://docs.taskratchet.com/help/api-v2.html)
- [Beeminder API](https://api.beeminder.com/v1/)

## API Integration
- TaskRatchet: Uses API v2 endpoints with v2 authentication
  - Base URL: https://api.taskratchet.com/api2/
  - Authentication: Uses Authorization header
    - Format: Authorization: ApiKey-v2 <token>
  - Key endpoints:
    - GET /me/tasks - List tasks
    - POST /me/tasks - Create task
- Beeminder: Uses API v1 with auth_token parameter

## Bot Platform Integration
- Common message interface for all commands
- Platform-specific message handling in webhook handlers
- Unified command execution flow
