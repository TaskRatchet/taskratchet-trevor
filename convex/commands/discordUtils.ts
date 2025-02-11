export async function sendDiscordMessage(botToken: string, channelId: string, text: string): Promise<void> {
  await fetch(`https://discord.com/api/channels/${channelId}/messages`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bot ${botToken}`
    },
    body: JSON.stringify({
      content: text,
    }),
  });
}
