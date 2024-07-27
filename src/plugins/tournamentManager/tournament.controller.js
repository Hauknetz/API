const TournamentManager = require('./tournamentManager');
const tournamentManager = new TournamentManager();

exports.createTournament = async (req, res) => {
    const { name, type } = req.body;
    try {
        const tournament = await tournamentManager.createTournament(name, type);
        res.status(201).json(tournament);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.addTeam = async (req, res) => {
    const { tournamentId, teamName, members } = req.body;
    try {
        const team = await tournamentManager.addTeam(tournamentId, teamName, members);
        res.status(201).json(team);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createMatch = async (req, res) => {
    const { tournamentId, round, teamIds } = req.body;
    try {
        const match = await tournamentManager.createMatch(tournamentId, round, teamIds);
        res.status(201).json(match);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getTournament = async (req, res) => {
    const { tournamentId } = req.params;
    try {
        const tournament = await tournamentManager.getTournament(tournamentId);
        res.status(200).json(tournament);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateMatchResult = async (req, res) => {
    const { tournamentId, matchId, result } = req.body;
    try {
        const match = await tournamentManager.updateMatchResult(tournamentId, matchId, result);
        res.status(200).json(match);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
