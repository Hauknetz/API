const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    },
    issuedBy: {
        type: String,
        required: true,
        trim: true,
    },
    issueDate: {
        type: Date,
        required: true,
    },
    expirationDate: {
        type: Date,
    },
    certificateFile: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model('Certificate', certificateSchema);
