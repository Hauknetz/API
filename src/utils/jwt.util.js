const jwt = require('jsonwebtoken');
const config = require('../config/app.config');

// Generate JWT token
exports.generateToken = (userId, role) => {
    return jwt.sign({ id: userId, role: role }, config.Security.JWT.Secret, {
        expiresIn: config.Security.JWT.ExpirationTime
    });
};

// Verify JWT token
exports.verifyToken = (token) => {
    return jwt.verify(token, config.Security.JWT.Secret);
};
