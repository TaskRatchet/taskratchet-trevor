# TaskRatchet Telegram Bot Knowledge Base

## Project Mission
Build a Telegram bot interface for TaskRatchet to allow users to manage their tasks and commitments directly through Telegram.

## Key Technologies
- Convex for backend & database
- Telegram Bot API for messaging
- TaskRatchet API v2 for task management
- Beeminder API for goal tracking
- TypeScript for type safety

## Development Guidelines
- Use TypeScript for all new files
- Add JSDoc comments for public functions
- Keep webhook handlers focused - move business logic to separate functions
- Log important events and errors

## Environment Setup
- TELEGRAM_BOT_TOKEN required in .env.local
- Convex deployment configuration managed automatically
- Webhook URL: https://exciting-wolf-734.convex.site/telegram-webhook

## Testing
- Test webhook locally using `curl` or Telegram's test interface
- Verify bot responses in Telegram
- Check Convex dashboard logs for debugging

## Resources
- [Convex Documentation](https://docs.convex.dev)
- [Telegram Bot API](https://core.telegram.org/bots/api)
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
