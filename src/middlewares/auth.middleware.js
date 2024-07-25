const jwt = require('jsonwebtoken');
const config = require('../config/app.config');
const User = require('../models/user.model'); // Importiere dein User Model

// Middleware zum Überprüfen der Authentifizierung
const authenticate = async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }
    
    try {
        const decoded = jwt.verify(token, config.JWT.Secret);
        req.user = decoded; // Füge die Benutzerinformationen zur Anfrage hinzu
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Invalid or expired token.' });
    }
};

// Middleware zum Überprüfen der Benutzerrolle
const authorize = (roles = []) => {
    // Rollen-Array in ein Set umwandeln für schnelleren Zugriff
    const allowedRoles = new Set(roles);

    return async (req, res, next) => {
        try {
            const user = await User.findById(req.user.id).select('role'); // Hole die Rolle des Benutzers
            if (!user || !allowedRoles.has(user.role)) {
                return res.status(403).json({ message: 'Access forbidden: insufficient permissions.' });
            }
            next();
        } catch (err) {
            res.status(500).json({ message: 'Server error.' });
        }
    };
};

module.exports = {
    authenticate,
    authorize
};
