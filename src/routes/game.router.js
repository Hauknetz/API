const express = require('express');
const upload = require('../utils/multer.util');
const gameController = require('../controllers/game.controller');

const router = express.Router();

// Create a new game
router.post('/', upload.single('coverImage'), gameController.createGame);

// Get all games
router.get('/', gameController.getGames);

// Get a single game by ID
router.get('/:id', gameController.getGameById);

// Update a game by ID
router.put('/:id', upload.single('coverImage'), gameController.updateGame);

// Delete a game by ID
router.delete('/:id', gameController.deleteGame);

module.exports = router;
