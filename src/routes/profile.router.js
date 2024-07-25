const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profile.controller');

// Endpunkt zum Abrufen aller Profile
router.get('/', profileController.getAllProfiles);

// Endpunkt zum Abrufen eines Profils anhand der ID
router.get('/:id', profileController.getProfileById);

// Endpunkt zum Erstellen eines neuen Profils
router.post('/', profileController.createProfile);

// Endpunkt zum Aktualisieren eines Profils anhand der ID
router.put('/:id', profileController.updateProfile);

// Endpunkt zum Löschen eines Profils anhand der ID
router.delete('/:id', profileController.deleteProfile);

module.exports = router;
