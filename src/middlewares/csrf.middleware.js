const csrf = require('csurf');
const express = require('express');

// Create a CSRF protection middleware instance
const csrfProtection = csrf({ cookie: true });

/**
 * Middleware function to set up CSRF protection.
 * @param {express.Request} req - The request object.
 * @param {express.Response} res - The response object.
 * @param {express.NextFunction} next - The next middleware function.
 */
const csrfMiddleware = (req, res, next) => {
    csrfProtection(req, res, (err) => {
        if (err) {
            res.status(403).json({ error: 'CSRF token validation failed' });
        } else {
            next();
        }
    });
};

module.exports = csrfMiddleware;
