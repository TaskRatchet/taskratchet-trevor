#!/usr/bin/env node

import 'dotenv/config';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = resolve(__dirname, '../.env.local');

import * as dotenv from 'dotenv';
dotenv.config({ path: envPath });

const token = process.env.TELEGRAM_BOT_TOKEN;
if (!token) {
  console.error('TELEGRAM_BOT_TOKEN environment variable is not set');
  process.exit(1);
}

const webhookUrl = 'https://exciting-wolf-734.convex.site/telegram-webhook';

async function registerWebhook() {
  try {
    const response = await fetch(
      `https://api.telegram.org/bot${token}/setWebhook`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: webhookUrl }),
      }
    );

    const data = await response.json();
    
    if (data.ok) {
      console.log('✓ Webhook registered successfully!');
      console.log(`URL: ${webhookUrl}`);
    } else {
      console.error('✗ Failed to register webhook:', data.description);
    }
  } catch (error) {
    console.error('✗ Error registering webhook:', error.message);
  }
}

registerWebhook();
