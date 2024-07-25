const express = require('express');
const router = express.Router();
const plexController = require('../controllers/plex.controller');

// Route zum Abrufen von Server-Informationen
router.get('/server-info', plexController.getServerInfo);

// Route zum Abrufen der Bibliothek
router.get('/library', plexController.getLibrary);

// Route zum Abrufen eines bestimmten Medienobjekts
router.get('/media/:mediaId', plexController.getMedia);

// Route zum Starten eines Medienstreams
router.post('/media/play/:mediaId', plexController.playMedia);

// Route zum Stoppen eines Medienstreams
router.post('/media/stop', plexController.stopMedia);

module.exports = router;
