const whatsappService = require('../services/whatsapp.service');

const sendMessage = async (req, res) => {
    const { to, message } = req.body;
    try {
        const result = await whatsappService.sendMessage(to, message);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getMessages = async (req, res) => {
    try {
        const result = await whatsappService.getMessages();
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const addContact = async (req, res) => {
    const { name, phone } = req.body;
    try {
        const result = await whatsappService.addContact(name, phone);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getContacts = async (req, res) => {
    try {
        const result = await whatsappService.getContacts();
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    sendMessage,
    getMessages,
    addContact,
    getContacts
};
