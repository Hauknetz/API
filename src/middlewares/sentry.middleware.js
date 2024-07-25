const sentryService = require('../services/sentry.service');

// Middleware to handle errors and send them to Sentry and Discord
const errorHandler = (err, req, res, next) => {
    // Use the service to handle the error
    sentryService.handleError(err);

    // Respond with the error message
    res.status(err.status || 500).json({
        error: {
            message: err.message || 'Internal Server Error'
        }
    });
};

module.exports = {
    errorHandler,
};
