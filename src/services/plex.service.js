const axios = require('axios');
const config = require('../config/app.config');
const logger = require('../utils/winston.util');

const PLEX_API_URL = `http://${config.Plex.Host}:${config.Plex.Port}`;
const PLEX_API_TOKEN = config.Plex.ApiToken;

// Funktion zum Abrufen von Informationen über den Plex-Server
const getServerInfo = async () => {
    try {
        const response = await axios.get(`${PLEX_API_URL}/status/sessions`, {
            headers: {
                'X-Plex-Token': PLEX_API_TOKEN
            }
        });
        return response.data;
    } catch (error) {
        logger.error('Error retrieving server info:', error);
        throw error;
    }
};

// Funktion zum Abrufen der Bibliothek
const getLibrary = async () => {
    try {
        const response = await axios.get(`${PLEX_API_URL}/library/sections`, {
            headers: {
                'X-Plex-Token': PLEX_API_TOKEN
            }
        });
        return response.data;
    } catch (error) {
        logger.error('Error retrieving library:', error);
        throw error;
    }
};

// Funktion zum Abrufen eines bestimmten Medienobjekts
const getMedia = async (mediaId) => {
    try {
        const response = await axios.get(`${PLEX_API_URL}/library/metadata/${mediaId}`, {
            headers: {
                'X-Plex-Token': PLEX_API_TOKEN
            }
        });
        return response.data;
    } catch (error) {
        logger.error('Error retrieving media:', error);
        throw error;
    }
};

// Funktion zum Starten eines Medienstreams
const playMedia = async (mediaId) => {
    try {
        const response = await axios.post(`${PLEX_API_URL}/player/playback/play`, {
            key: `/library/metadata/${mediaId}`
        }, {
            headers: {
                'X-Plex-Token': PLEX_API_TOKEN
            }
        });
        return response.data;
    } catch (error) {
        logger.error('Error playing media:', error);
        throw error;
    }
};

// Funktion zum Stoppen eines Medienstreams
const stopMedia = async () => {
    try {
        const response = await axios.post(`${PLEX_API_URL}/player/playback/stop`, {}, {
            headers: {
                'X-Plex-Token': PLEX_API_TOKEN
            }
        });
        return response.data;
    } catch (error) {
        logger.error('Error stopping media:', error);
        throw error;
    }
};

module.exports = {
    getServerInfo,
    getLibrary,
    getMedia,
    playMedia,
    stopMedia
};
