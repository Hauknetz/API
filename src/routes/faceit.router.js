const express = require('express');
const router = express.Router();
const faceitController = require('../controllers/faceit.controller');

router.get('/players/:nickname', faceitController.getPlayerByNickname);

router.get('/players/:playerId/stats/:gameId', faceitController.getPlayerStats);

router.get('/matches/:matchId', faceitController.getMatchDetails);

router.get('/tournaments/:tournamentId', faceitController.getTournamentDetails);

router.get('/tournaments/ongoing', faceitController.getOngoingTournaments);

// Other FaceIT routes can be added here...

module.exports = router;
