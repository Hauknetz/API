const axios = require('axios');
const config = require('../config/app.config');

const faceitApi = axios.create({
    baseURL: 'https://open.faceit.com/data/v4',
    headers: {
        'Authorization': `Bearer ${config.Faceit.apiKey}`,
        'Content-Type': 'application/json'
    }
});

// Get player details by nickname
const getPlayerByNickname = async (nickname) => {
    try {
        const response = await faceitApi.get(`/players?nickname=${nickname}`);
        return response.data;
    } catch (error) {
        throw new Error(`Error fetching player details: ${error.response.data.message}`);
    }
};

// Get player stats by game
const getPlayerStats = async (playerId, gameId) => {
    try {
        const response = await faceitApi.get(`/players/${playerId}/stats/${gameId}`);
        return response.data;
    } catch (error) {
        throw new Error(`Error fetching player stats: ${error.response.data.message}`);
    }
};

// Get match details
const getMatchDetails = async (matchId) => {
    try {
        const response = await faceitApi.get(`/matches/${matchId}`);
        return response.data;
    } catch (error) {
        throw new Error(`Error fetching match details: ${error.response.data.message}`);
    }
};

// Get tournament details
const getTournamentDetails = async (tournamentId) => {
    try {
        const response = await faceitApi.get(`/tournaments/${tournamentId}`);
        return response.data;
    } catch (error) {
        throw new Error(`Error fetching tournament details: ${error.response.data.message}`);
    }
};

// Get ongoing tournaments
const getOngoingTournaments = async () => {
    try {
        const response = await faceitApi.get('/tournaments?status=ongoing');
        return response.data.items;
    } catch (error) {
        throw new Error(`Error fetching ongoing tournaments: ${error.response.data.message}`);
    }
};

// Other FaceIT API functions can be added here...

module.exports = {
    getPlayerByNickname,
    getPlayerStats,
    getMatchDetails,
    getTournamentDetails,
    getOngoingTournaments,
};
