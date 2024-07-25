const express = require('express');
const router = express.Router();
const serverController = require('../controllers/server.controller');

// Route zum Abrufen der Servermetriken
router.get('/metrics', serverController.getMetrics);

// Route zur Ausführung eines Konsolenbefehls
router.post('/execute-command', serverController.executeCommand);

// Route zum Abrufen des Serverstatus und Speichern der Metriken
router.get('/status', serverController.serverStatus);

module.exports = router;
