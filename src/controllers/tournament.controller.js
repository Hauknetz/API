const Tournament = require('../models/tournament.model');

// Create a new tournament
exports.createTournament = async (req, res) => {
    try {
        const { name, description, startDate, endDate, location, prizePool, teams } = req.body;
        const image = req.file ? req.file.path : null;

        const tournament = new Tournament({ name, description, startDate, endDate, location, prizePool, teams, image });
        await tournament.save();
        res.status(201).json({ message: 'Tournament created successfully', tournament });
    } catch (error) {
        res.status(500).json({ message: 'Error creating tournament', error });
    }
};

// Get all tournaments
exports.getAllTournaments = async (req, res) => {
    try {
        const tournaments = await Tournament.find().populate('teams');
        res.status(200).json(tournaments);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching tournaments', error });
    }
};

// Get a single tournament by ID
exports.getTournamentById = async (req, res) => {
    try {
        const tournament = await Tournament.findById(req.params.id).populate('teams');

        if (!tournament) {
            return res.status(404).json({ message: 'Tournament not found' });
        }
        res.status(200).json(tournament);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching tournament', error });
    }
};

// Update a tournament by ID
exports.updateTournamentById = async (req, res) => {
    try {
        const { name, description, startDate, endDate, location, prizePool, teams } = req.body;
        const image = req.file ? req.file.path : null; // Handle file upload

        const tournament = await Tournament.findByIdAndUpdate(
            req.params.id,
            { name, description, startDate, endDate, location, prizePool, teams, image, updatedAt: new Date() },
            { new: true }
        ).populate('teams');

        if (!tournament) {
            return res.status(404).json({ message: 'Tournament not found' });
        }

        res.status(200).json({ message: 'Tournament updated successfully', tournament });
    } catch (error) {
        res.status(500).json({ message: 'Error updating tournament', error });
    }
};

// Delete a tournament by ID
exports.deleteTournamentById = async (req, res) => {
    try {
        const tournament = await Tournament.findByIdAndDelete(req.params.id);
        if (!tournament) {
            return res.status(404).json({ message: 'Tournament not found' });
        }
        res.status(200).json({ message: 'Tournament deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting tournament', error });
    }
};
