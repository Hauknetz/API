const express = require('express');
const router = express.Router();
const whatsappController = require('../controllers/whatsapp.controller');

// Route zum Senden einer Nachricht
router.post('/messages', whatsappController.sendMessage);

// Route zum Abrufen aller Nachrichten
router.get('/messages', whatsappController.getMessages);

// Route zum Hinzufügen eines Kontakts
router.post('/contacts', whatsappController.addContact);

// Route zum Abrufen aller Kontakte
router.get('/contacts', whatsappController.getContacts);

module.exports = router;
