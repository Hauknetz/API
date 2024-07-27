const { google } = require('googleapis');
const config = require('../config/app.config');

const oauth2Client = new google.auth.OAuth2(
    config.Google.clientId,
    config.Google.clientSecret,
    config.Google.redirectUri
);

// Set the OAuth2 client credentials
const setCredentials = (tokens) => {
    oauth2Client.setCredentials(tokens);
};

// Generate a URL for the user to authenticate with Google
const getAuthUrl = () => {
    const scopes = [
        'https://www.googleapis.com/auth/drive',
        'https://www.googleapis.com/auth/gmail.readonly',
        'https://www.googleapis.com/auth/calendar',
        'https://www.googleapis.com/auth/youtube.readonly',
    ];

    return oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: scopes,
    });
};

// Get the tokens after the user authenticates with Google
const getToken = async (code) => {
    const { tokens } = await oauth2Client.getToken(code);
    setCredentials(tokens);
    return tokens;
};

// Example: Get Google Drive files
const getDriveFiles = async () => {
    const drive = google.drive({ version: 'v3', auth: oauth2Client });
    const res = await drive.files.list();
    return res.data.files;
};

// Example: Get Gmail messages
const getGmailMessages = async () => {
    const gmail = google.gmail({ version: 'v1', auth: oauth2Client });
    const res = await gmail.users.messages.list({ userId: 'me' });
    return res.data.messages;
};

// Example: Get Google Calendar events
const getCalendarEvents = async () => {
    const calendar = google.calendar({ version: 'v3', auth: oauth2Client });
    const res = await calendar.events.list({ calendarId: 'primary' });
    return res.data.items;
};

// Example: Get YouTube subscriptions
const getYoutubeSubscriptions = async () => {
    const youtube = google.youtube({ version: 'v3', auth: oauth2Client });
    const res = await youtube.subscriptions.list({
        part: 'snippet',
        mine: true,
    });
    return res.data.items;
};

module.exports = {
    getAuthUrl,
    getToken,
    getDriveFiles,
    getGmailMessages,
    getCalendarEvents,
    getYoutubeSubscriptions,
};
