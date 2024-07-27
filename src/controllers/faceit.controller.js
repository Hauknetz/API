const faceitService = require('../services/faceit.service');

const getPlayerByNickname = async (req, res) => {
    try {
        const player = await faceitService.getPlayerByNickname(req.params.nickname);
        res.status(200).json(player);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getPlayerStats = async (req, res) => {
    try {
        const { playerId, gameId } = req.params;
        const stats = await faceitService.getPlayerStats(playerId, gameId);
        res.status(200).json(stats);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getMatchDetails = async (req, res) => {
    try {
        const match = await faceitService.getMatchDetails(req.params.matchId);
        res.status(200).json(match);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getTournamentDetails = async (req, res) => {
    try {
        const tournament = await faceitService.getTournamentDetails(req.params.tournamentId);
        res.status(200).json(tournament);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getOngoingTournaments = async (req, res) => {
    try {
        const tournaments = await faceitService.getOngoingTournaments();
        res.status(200).json(tournaments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Other FaceIT controller functions can be added here...

module.exports = {
    getPlayerByNickname,
    getPlayerStats,
    getMatchDetails,
    getTournamentDetails,
    getOngoingTournaments,
};
