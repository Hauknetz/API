const express = require('express');
const router = express.Router();
const taskController = require('../controllers/task.controller');

// Endpunkt zum Abrufen aller Aufgaben
router.get('/', taskController.getAllTasks);

// Endpunkt zum Abrufen einer Aufgabe anhand der ID
router.get('/:id', taskController.getTaskById);

// Endpunkt zum Erstellen einer neuen Aufgabe
router.post('/', taskController.createTask);

// Endpunkt zum Aktualisieren einer Aufgabe anhand der ID
router.put('/:id', taskController.updateTask);

// Endpunkt zum Löschen einer Aufgabe anhand der ID
router.delete('/:id', taskController.deleteTask);

module.exports = router;
