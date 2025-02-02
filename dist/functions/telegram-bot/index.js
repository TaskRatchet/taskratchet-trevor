// Basic Telegram bot edge function
export const handler = async (req) => {
    try {
        // Only allow POST requests
        if (req.method !== 'POST') {
            return new Response('Method not allowed', { status: 405 });
        }
        // Parse the incoming webhook data
        const update = await req.json();
        console.log('Received update:', update);
        // Basic hello world response
        return new Response(JSON.stringify({
            method: 'sendMessage',
            chat_id: update.message?.chat?.id,
            text: 'Hello from TaskRatchet bot!'
        }), {
            headers: { 'Content-Type': 'application/json' }
        });
    }
    catch (error) {
        console.error('Error processing webhook:', error);
        return new Response('Internal Server Error', { status: 500 });
    }
};
