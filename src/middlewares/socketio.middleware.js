const { initializeSocketIO } = require('../services/socketio.service');
const http = require('http');
const https = require('https');
const fs = require('fs');
const config = require('../config/app.config');
const logger = require('../utils/winston.util');

// Middleware für Socket.IO
const socketIOMiddleware = (app) => {
    // Erstellen des HTTP oder HTTPS Servers basierend auf der Konfiguration
    const server = config.Server.TLS.SSLNoSSL === 'https'
        ? https.createServer({
            key: fs.readFileSync(config.Server.TLS.KeyPath),
            cert: fs.readFileSync(config.Server.TLS.CertPath)
        }, app)
        : http.createServer(app);

    // Initialisieren von Socket.IO
    initializeSocketIO(server);

    // Starten des Servers
    server.listen(config.Server.Port || 3000, () => {
        logger.info(`Socket.IO server running on ${config.Server.TLS.SSLNoSSL}://${config.Server.BaseURL}:${config.Server.Port || 3000}`);
    });

    return server;
};

module.exports = socketIOMiddleware;
