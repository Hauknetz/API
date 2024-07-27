const googleService = require('../services/google.service');

const getAuthUrl = (req, res) => {
    const url = googleService.getAuthUrl();
    res.status(200).json({ url });
};

const getToken = async (req, res) => {
    try {
        const tokens = await googleService.getToken(req.body.code);
        res.status(200).json(tokens);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getDriveFiles = async (req, res) => {
    try {
        const files = await googleService.getDriveFiles();
        res.status(200).json(files);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getGmailMessages = async (req, res) => {
    try {
        const messages = await googleService.getGmailMessages();
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getCalendarEvents = async (req, res) => {
    try {
        const events = await googleService.getCalendarEvents();
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getYoutubeSubscriptions = async (req, res) => {
    try {
        const subscriptions = await googleService.getYoutubeSubscriptions();
        res.status(200).json(subscriptions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAuthUrl,
    getToken,
    getDriveFiles,
    getGmailMessages,
    getCalendarEvents,
    getYoutubeSubscriptions,
};
