const Sentry = require('@sentry/node');
const axios = require('axios');
const config = require('../config/app.config');
const logger = require('../utils/winston.util');

// Check if DSN is provided
if (config.Sentry.Dsn) {
    // Initialize Sentry
    Sentry.init({
        dsn: config.Sentry.Dsn,
        tracesSampleRate: 1.0,
    });

    logger.info('Sentry successfully initialized with DSN.');
} else {
    logger.warn('Sentry DSN is not provided. Sentry has been disabled.');
}

// Discord webhook URL
const DISCORD_WEBHOOK_URL = config.Discord.WebhookURL;

// Helper function to send message to Discord
const sendToDiscord = async (error) => {
    const embed = {
        title: "Error Notification",
        description: error.message,
        color: 16711680, // Red color for errors
        fields: [
            {
                name: "Stack Trace",
                value: `\`\`\`${error.stack}\`\`\``,
                inline: false,
            },
            {
                name: "More Info",
                value: `[View Sentry Issue](https://sentry.io/organizations/${config.Sentry.Organization}/issues/${error.sentryId}/)`,
                inline: false,
            },
        ],
        footer: {
            text: "Sent by Sentry"
        },
        timestamp: new Date(),
    };

    const buttons = {
        components: [
            {
                type: 1,
                components: [
                    {
                        type: 2,
                        style: 5,
                        label: "View Issue",
                        url: `https://sentry.io/organizations/${config.Sentry.Organization}/issues/${error.sentryId}/`
                    }
                ]
            }
        ]
    };

    try {
        await axios.post(DISCORD_WEBHOOK_URL, {
            embeds: [embed],
            ...buttons
        });
    } catch (err) {
        logger.error('Failed to send error to Discord:', err);
    }
};

// Function to capture and handle errors
const handleError = (err) => {
    if (config.Sentry.Dsn) {
        // Capture error in Sentry
        Sentry.captureException(err);
    }

    // Send error details to Discord
    sendToDiscord(err).catch(logger.error);
};

module.exports = {
    handleError,
};
