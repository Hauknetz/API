const yargs = require('yargs');
const { hideBin } = require('yargs/helpers');
const logger = require('./winston.util');

// Initialize yargs with basic configuration
const argv = yargs(hideBin(process.argv))
    .option('verbose', {
        alias: 'v',
        type: 'boolean',
        description: 'Enable verbose logging',
        default: false
    })
    .option('port', {
        alias: 'p',
        type: 'number',
        description: 'Port number to use',
        default: 3000
    })
    .option('env', {
        alias: 'e',
        type: 'string',
        description: 'Environment to run the application in',
        choices: ['development', 'production', 'test'],
        default: 'development'
    })
    .option('config', {
        alias: 'c',
        type: 'string',
        description: 'Path to configuration file'
    })
    .option('log-level', {
        alias: 'l',
        type: 'string',
        description: 'Set the logging level',
        choices: ['info', 'warn', 'error', 'debug'],
        default: 'info'
    })
    .help()
    .alias('help', 'h')
    .argv;

// Function to get the value of a specific option
const getOption = (option) => {
    return argv[option];
};

// Function to get all parsed options
const getAllOptions = () => {
    return argv;
};

// Example usage of the utility functions
const logOptions = () => {
    logger.info('Parsed Command Line Options:', getAllOptions());
};

module.exports = {
    getOption,
    getAllOptions,
    logOptions
};
