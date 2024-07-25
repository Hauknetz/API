const winston = require('winston');
const path = require('path');

// Define log file paths
const errorLogFilePath = path.join(__dirname, '../../logs/error.log');
const combinedLogFilePath = path.join(__dirname, '../../logs/combined.log');

// Create a Winston logger
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        // Console transport
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple()
            )
        }),
        // File transports for info and error logs
        new winston.transports.File({
            level: 'info',
            filename: combinedLogFilePath,
            handleExceptions: true,
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.json()
            )
        }),
        new winston.transports.File({
            level: 'error',
            filename: errorLogFilePath,
            handleExceptions: true,
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.json()
            )
        })
    ],
    exceptionHandlers: [
        new winston.transports.File({
            filename: errorLogFilePath,
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.json()
            )
        }),
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple()
            )
        })
    ],
    rejectionHandlers: [
        new winston.transports.File({
            filename: errorLogFilePath,
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.json()
            )
        }),
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple()
            )
        })
    ],
    exitOnError: false // Do not exit on handled exceptions
});

// Ensure logs directory exists
const fs = require('fs');
const logsDir = path.join(__dirname, '../../logs');
if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir);
}

module.exports = logger;
