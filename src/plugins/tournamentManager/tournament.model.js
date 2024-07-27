const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    members: [{
        type: String,
        required: true
    }]
});

const matchSchema = new mongoose.Schema({
    round: {
        type: Number,
        required: true
    },
    teams: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team'
    }],
    result: {
        type: String
    }
});

const tournamentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['single-elimination', 'double-elimination', 'round-robin'],
        required: true
    },
    teams: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team'
    }],
    matches: [matchSchema],
    currentRound: {
        type: Number,
        default: 1
    }
});

module.exports = mongoose.model('Team', teamSchema);
module.exports = mongoose.model('Tournament', tournamentSchema);
