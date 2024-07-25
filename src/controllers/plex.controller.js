const plexService = require('../services/plex.service');

const getServerInfo = async (req, res) => {
    try {
        const data = await plexService.getServerInfo();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getLibrary = async (req, res) => {
    try {
        const data = await plexService.getLibrary();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getMedia = async (req, res) => {
    const { mediaId } = req.params;
    try {
        const data = await plexService.getMedia(mediaId);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const playMedia = async (req, res) => {
    const { mediaId } = req.params;
    try {
        const data = await plexService.playMedia(mediaId);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const stopMedia = async (req, res) => {
    try {
        const data = await plexService.stopMedia();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getServerInfo,
    getLibrary,
    getMedia,
    playMedia,
    stopMedia
};
