const Game = require('../models/game.model');

// Create a new game
exports.createGame = async (req, res) => {
    try {
        const game = new Game(req.body);
        game.createdBy = req.user._id;
        game.updatedBy = req.user._id;

        if (req.file) {
            game.coverImage = req.file.path;
        }

        await game.save();
        res.status(201).json(game);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all games
exports.getGames = async (req, res) => {
    try {
        const games = await Game.find()
            .populate('createdBy', 'username')
            .populate('updatedBy', 'username');
        res.status(200).json(games);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a single game by ID
exports.getGameById = async (req, res) => {
    try {
        const game = await Game.findById(req.params.id)
            .populate('createdBy', 'username')
            .populate('updatedBy', 'username');
        if (!game) {
            return res.status(404).json({ error: 'Game not found' });
        }
        res.status(200).json(game);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a game by ID
exports.updateGame = async (req, res) => {
    try {
        const game = await Game.findById(req.params.id);
        if (!game) {
            return res.status(404).json({ error: 'Game not found' });
        }

        Object.assign(game, req.body);
        game.updatedBy = req.user._id;

        if (req.file) {
            game.coverImage = req.file.path;
        }

        game.updatedAt = Date.now();
        await game.save();
        res.status(200).json(game);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a game by ID
exports.deleteGame = async (req, res) => {
    try {
        const game = await Game.findByIdAndDelete(req.params.id);
        if (!game) {
            return res.status(404).json({ error: 'Game not found' });
        }
        res.status(200).json({ message: 'Game deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
