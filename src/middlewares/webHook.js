const axios = require('axios');
const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL; // Assuming this is set in environment variables

const handleSePay = async (req, res) => {
    try {
        console.log('[WebHook] Request received:', JSON.stringify(req.body, null, 2));
        
        const {
            transactionId,
            bank,
            transactionDate,
            accountNumber,
            content,
            transferType,
            transferAmount,
            accumulated,
            referenceCode,
            description,
            timestamp
        } = req.body;

        console.log('[WebHook] Processing transaction data');
        
        // Debug log to see what values we have
        console.log('[WebHook] Transaction values:', {
            transactionId,
            transferType,
            transferAmount
        });

        const discordMessage = {
            username: 'SePay Bot',
            embeds: [
                {
                    title: 'SePay Transaction Notification',
                    color: transferType === 'CREDIT' ? 3066993 : 15158332, // Green for credit, red for debit
                    fields: [
                        { name: 'Transaction ID', value: transactionId ? transactionId.toString() : 'N/A', inline: true },
                        { name: 'Bank', value: bank || 'N/A', inline: true },
                        { name: 'Transaction Date', value: transactionDate || 'N/A', inline: true },
                        { name: 'Account Number', value: accountNumber || 'N/A', inline: true },
                        { name: 'Type', value: transferType || 'N/A', inline: true },
                        { name: 'Amount', value: transferAmount ? transferAmount.toString() : 'N/A', inline: true },
                        { name: 'Accumulated', value: accumulated ? accumulated.toString() : 'N/A', inline: true },
                        { name: 'Reference Code', value: referenceCode || 'N/A', inline: true },
                        { name: 'Content', value: content || 'N/A', inline: false },
                        { name: 'Description', value: description || 'N/A', inline: false }
                    ],
                    timestamp: timestamp || new Date().toISOString(),
                }
            ]
        };

        console.log('[WebHook] Sending message to Discord webhook...');
        
        if (!DISCORD_WEBHOOK_URL) {
            console.error('[WebHook] DISCORD_WEBHOOK_URL is not defined in environment variables');
            return res.status(500).json({
                message: 'Discord webhook URL is not configured'
            });
        }
        
        const response = await axios.post(DISCORD_WEBHOOK_URL, discordMessage);
        console.log('[WebHook] Discord response status:', response.status);
        console.log('[WebHook] Notification sent to Discord successfully.');
        return res.status(200).send('Notification forwarded to Discord');

    } catch (error) {
        console.error('[WebHook] Error sending message to Discord:', error);
        
        // Log additional error details if available
        if (error.response) {
            console.error('[WebHook] Discord API response:', error.response.status, error.response.data);
        } else if (error.request) {
            console.error('[WebHook] No response received from Discord API');
        }
        
        return res.status(500).json({
            message: error.message || 'Failed to send notification to Discord'
        });
    }
}

module.exports = { handleSePay };