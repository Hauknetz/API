const Team = require('../models/team.model');

// Create a new team
exports.createTeam = async (req, res) => {
    try {
        const { name, description, members } = req.body;
        const image = req.file ? req.file.path : null;

        const team = new Team({ name, description, members, image });
        await team.save();
        res.status(201).json({ message: 'Team created successfully', team });
    } catch (error) {
        res.status(500).json({ message: 'Error creating team', error });
    }
};

// Get all teams
exports.getAllTeams = async (req, res) => {
    try {
        const teams = await Team.find().populate('members');
        res.status(200).json(teams);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching teams', error });
    }
};

// Get a single team by ID
exports.getTeamById = async (req, res) => {
    try {
        const team = await Team.findById(req.params.id).populate('members');

        if (!team) {
            return res.status(404).json({ message: 'Team not found' });
        }
        res.status(200).json(team);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching team', error });
    }
};

// Update a team by ID
exports.updateTeamById = async (req, res) => {
    try {
        const { name, description, members } = req.body;
        const image = req.file ? req.file.path : null;

        const team = await Team.findByIdAndUpdate(
            req.params.id,
            { name, description, members, image, updatedAt: new Date() },
            { new: true }
        ).populate('members');

        if (!team) {
            return res.status(404).json({ message: 'Team not found' });
        }

        res.status(200).json({ message: 'Team updated successfully', team });
    } catch (error) {
        res.status(500).json({ message: 'Error updating team', error });
    }
};

// Delete a team by ID
exports.deleteTeamById = async (req, res) => {
    try {
        const team = await Team.findByIdAndDelete(req.params.id);
        if (!team) {
            return res.status(404).json({ message: 'Team not found' });
        }
        res.status(200).json({ message: 'Team deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting team', error });
    }
};
