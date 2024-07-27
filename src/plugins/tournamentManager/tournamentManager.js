const { Tournament, Team } = require('./tournament.model');

class TournamentManager {
    async createTournament(name, type) {
        const tournament = new Tournament({ name, type });
        await tournament.save();
        return tournament;
    }

    async addTeam(tournamentId, teamName, members) {
        const team = new Team({ name: teamName, members });
        await team.save();

        const tournament = await Tournament.findById(tournamentId);
        tournament.teams.push(team);
        await tournament.save();

        return team;
    }

    async createMatch(tournamentId, round, teamIds) {
        const tournament = await Tournament.findById(tournamentId);

        const match = {
            round,
            teams: teamIds,
            result: null
        };

        tournament.matches.push(match);
        await tournament.save();

        return match;
    }

    async getTournament(tournamentId) {
        return Tournament.findById(tournamentId).populate('teams');
    }

    async updateMatchResult(tournamentId, matchId, result) {
        const tournament = await Tournament.findById(tournamentId);
        const match = tournament.matches.id(matchId);
        match.result = result;
        await tournament.save();

        return match;
    }
}

module.exports = TournamentManager;
