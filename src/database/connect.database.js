const mongoose = require('mongoose');
const mysql = require('mysql2/promise');
const config = require('../config/app.config');
const logger = require('../utils/winston.util');

const connectDatabase = async () => {
    try {
        const mongodbEnabled = config.Database.MongoDB.Enabled === 'true';
        const mysqlEnabled = config.Database.MySQL.Enabled === 'true';

        if (mongodbEnabled && mysqlEnabled) {
            throw new Error('Both MongoDB and MySQL cannot be enabled at the same time.');
        }

        if (mongodbEnabled) {
            const uri = config.Database.MongoDB.ConnectionString.URI;

            if (!uri) {
                throw new Error('MongoDB URI not defined in configuration.');
            }

            await mongoose.connect(uri, { });

            logger.info('MongoDB connected successfully.');
        } else if (mysqlEnabled) {
            const mysqlConfig = {
                host: config.Database.MySQL.ConnectionString.Host,
                port: config.Database.MySQL.ConnectionString.Port,
                user: config.Database.MySQL.ConnectionString.User,
                password: config.Database.MySQL.ConnectionString.Password,
                database: config.Database.MySQL.ConnectionString.Database,
            };

            if (!mysqlConfig.host || !mysqlConfig.user || !mysqlConfig.password || !mysqlConfig.database) {
                throw new Error('MySQL configuration is incomplete.');
            }

            const connection = await mysql.createConnection(mysqlConfig);

            logger.info('MySQL connected successfully.');

            module.exports.mysqlConnection = connection;
        } else {
            throw new Error('No database is enabled. Please set either MongoDB or MySQL to true.');
        }
    } catch (error) {
        logger.error('Database connection error:', error);
        process.exit(1);
    }
};

module.exports = connectDatabase;
