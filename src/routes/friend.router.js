const express = require('express');
const router = express.Router();
const friendController = require('../controllers/friend.controller');
const authMiddleware = require('../middlewares/auth.middleware');

// Middleware für Authentifizierung
router.use(authMiddleware.authenticate);

// Freundschaftsanfrage senden
router.post('/request', friendController.sendFriendRequest);

// Freundschaftsanfrage akzeptieren
router.put('/request/:requestId/accept', friendController.acceptFriendRequest);

// Freundschaftsanfrage ablehnen
router.put('/request/:requestId/reject', friendController.rejectFriendRequest);

// Freunde abrufen
router.get('/list', friendController.getFriends);

module.exports = router;
