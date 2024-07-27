const express = require('express');
const router = express.Router();
const tournamentController = require('./tournament.controller');

router.post('/create', tournamentController.createTournament);

router.post('/add-team', tournamentController.addTeam);

router.post('/create-match', tournamentController.createMatch);

router.get('/:tournamentId', tournamentController.getTournament);

router.post('/update-match-result', tournamentController.updateMatchResult);

module.exports = router;
