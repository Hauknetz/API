const express = require('express');
const router = express.Router();
const upload = require('../utils/multer.util');

const tournamentController = require('../controllers/tournament.controller');

// Create a new tournament
router.post('/', upload.single('image'), tournamentController.createTournament);

// Get all tournaments
router.get('/', tournamentController.getAllTournaments);

// Get a single tournament by ID
router.get('/:id', tournamentController.getTournamentById);

// Update a tournament by ID
router.put('/:id', upload.single('image'), tournamentController.updateTournamentById);

// Delete a tournament by ID
router.delete('/:id', tournamentController.deleteTournamentById);

module.exports = router;
