const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chat.controller');

// Route zum Senden einer Nachricht
router.post('/send', chatController.sendMessage);

// Route zum Abrufen aller Nachrichten eines Benutzers
router.get('/messages/:userId', chatController.getMessages);

module.exports = router;
