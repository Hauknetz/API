const logger = require('../utils/winston.util');

// Middleware zum Protokollieren von Anfragen und Antworten
const requestLogger = (req, res, next) => {
    const start = Date.now();
    const { method, originalUrl, ip, headers } = req;

    // Log the incoming request
    logger.info(`Incoming request`, {
        timestamp: new Date().toISOString(),
        method,
        url: originalUrl,
        ip,
        headers,
        body: req.body,
        query: req.query
    });

    // Capture response
    res.on('finish', () => {
        const duration = Date.now() - start;
        const { statusCode, statusMessage } = res;

        logger.info(`Response sent`, {
            timestamp: new Date().toISOString(),
            method,
            url: originalUrl,
            statusCode,
            statusMessage,
            duration: `${duration}ms`
        });
    });

    // Capture errors
    res.on('error', (err) => {
        logger.error(`Error occurred`, {
            timestamp: new Date().toISOString(),
            method,
            url: originalUrl,
            error: err.message,
            stack: err.stack
        });
    });

    next();
};

module.exports = requestLogger;
