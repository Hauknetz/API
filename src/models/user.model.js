const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    profilePicture: String,
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    isActive: {
        type: Boolean,
        default: false,
    },
    resetToken: String,
    resetTokenExpiration: Date,
    phone: String,
}, {
    timestamps: true,
});

module.exports = mongoose.model('User', userSchema);
