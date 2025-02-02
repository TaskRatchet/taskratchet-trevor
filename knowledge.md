# Knowledge

## Description

A bot for use with TaskRatchet. Built with Supabase. Deployed to edge functions. Supports Telegram and Discord.

## Stack

- supabase
- pnpm
- typescript

## Architecture

- Create an abstraction on top of Discord and Telegram to make it easier to add new platforms in the future.

## Development Guidelines

- Use pnpm for package management
- Deploy as Supabase edge functions
- Follow platform-specific best practices for bot development

## Resources

### Discord Bot Development
- https://supabase.com/docs/guides/functions/examples/discord-bot
- https://github.com/supabase/supabase/tree/master/examples/edge-functions/supabase/functions/discord-bot
- https://github.com/supabase/supabase/blob/master/examples/edge-functions/supabase/functions/discord-bot/index.ts

### Telegram Bot Development
- https://supabase.com/docs/guides/functions/examples/telegram-bot
- https://github.com/supabase/supabase/tree/master/examples/edge-functions/supabase/functions/telegram-bot
- https://github.com/supabase/supabase/blob/master/examples/edge-functions/supabase/functions/telegram-bot/index.ts

### TaskRatchet Integration
- API Documentation: https://docs.taskratchet.com/help/api-v2.html

## Key Concepts

### Multi-Platform Support
- Abstract bot interactions to support multiple platforms
- Keep platform-specific code isolated
- Share core business logic across platforms

### Edge Function Architecture
- Leverage Supabase edge functions for deployment
- Optimize for serverless execution
- Keep functions small and focused

## Best Practices

### Code Organization
- Keep platform-specific code in separate modules
- Share common utilities and interfaces
- Use TypeScript for type safety

### Security
- Never commit sensitive credentials
- Use environment variables for configuration
- Follow platform security best practices

### Testing
- Write tests for core business logic
- Test platform-specific integrations
- Ensure proper error handling

## Deployment

- Deploy via Supabase edge functions
- Follow Supabase deployment best practices
- Monitor function execution and errors
