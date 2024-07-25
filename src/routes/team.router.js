const express = require('express');
const router = express.Router();
const upload = require('../utils/multer.util');

const teamController = require('../controllers/team.controller');

// Create a new team
router.post('/', upload.single('image'), teamController.createTeam);

// Get all teams
router.get('/', teamController.getAllTeams);

// Get a single team by ID
router.get('/:id', teamController.getTeamById);

// Update a team by ID
router.put('/:id', upload.single('image'), teamController.updateTeamById);

// Delete a team by ID
router.delete('/:id', teamController.deleteTeamById);

module.exports = router;
