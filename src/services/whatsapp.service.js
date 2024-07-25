const axios = require('axios');
const config = require('../config/app.config');
const logger = require('../utils/winston.util');

const WHATSAPP_API_URL = config.WhatsApp.ApiUrl;
const WHATSAPP_API_TOKEN = config.WhatsApp.ApiToken;

// Funktion zum Senden einer Nachricht
const sendMessage = async (to, message) => {
    try {
        const response = await axios.post(`${WHATSAPP_API_URL}/messages`, {
            messaging_product: "whatsapp",
            to: to,
            type: "text",
            text: { body: message }
        }, {
            headers: {
                'Authorization': `Bearer ${WHATSAPP_API_TOKEN}`,
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        logger.error('Error sending message:', error);
        throw error;
    }
};

// Funktion zum Abrufen von Nachrichten
const getMessages = async () => {
    try {
        const response = await axios.get(`${WHATSAPP_API_URL}/messages`, {
            headers: {
                'Authorization': `Bearer ${WHATSAPP_API_TOKEN}`
            }
        });
        return response.data;
    } catch (error) {
        logger.error('Error getting messages:', error);
        throw error;
    }
};

// Funktion zum Hinzufügen eines Kontakts
const addContact = async (name, phone) => {
    try {
        const response = await axios.post(`${WHATSAPP_API_URL}/contacts`, {
            name: name,
            phone: phone
        }, {
            headers: {
                'Authorization': `Bearer ${WHATSAPP_API_TOKEN}`,
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        logger.error('Error adding contact:', error);
        throw error;
    }
};

// Funktion zum Abrufen von Kontakten
const getContacts = async () => {
    try {
        const response = await axios.get(`${WHATSAPP_API_URL}/contacts`, {
            headers: {
                'Authorization': `Bearer ${WHATSAPP_API_TOKEN}`
            }
        });
        return response.data;
    } catch (error) {
        logger.error('Error getting contacts:', error);
        throw error;
    }
};

module.exports = {
    sendMessage,
    getMessages,
    addContact,
    getContacts
};
