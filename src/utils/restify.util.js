const restify = require('restify');
const logger = require('./winston.util');

/**
 * Creates a Restify server.
 * @returns {restify.Server} - The created Restify server.
 */
const createServer = () => {
    const server = restify.createServer({
        name: 'Hauknetz API',
        version: '1.0.0'
    });

    server.use(restify.plugins.bodyParser());
    server.use(restify.plugins.queryParser());

    server.on('uncaughtException', (req, res, route, err) => {
        logger.error(err.stack);
        res.send(500, { error: 'Internal Server Error' });
    });

    return server;
};

/**
 * Sets up basic routes for the Restify server.
 * @param {restify.Server} server - The Restify server.
 */
const setupRoutes = (server) => {
    server.get('/api/hello', (req, res, next) => {
        res.send('Hello, World!');
        return next();
    });

    // Add more routes as needed
};

/**
 * Example usage of Restify utility functions.
 */
const exampleUsage = () => {
    const server = createServer();
    setupRoutes(server);

    server.listen(8080, () => {
        logger.info('%s listening at %s', server.name, server.url);
    });
};

module.exports = {
    createServer,
    setupRoutes,
    exampleUsage
};
