const debug = require('debug');

// Set up different debug namespaces
const debugInfo = debug('app:info');
const debugError = debug('app:error');
const debugVerbose = debug('app:verbose');

// Enable debug logs for all namespaces
debug.enable('app:*');

// Function to log an info message
const logInfo = (message) => {
    debugInfo(`[INFO] ${message}`);
};

// Function to log an error message
const logError = (message) => {
    debugError(`[ERROR] ${message}`);
};

// Function to log a verbose message
const logVerbose = (message) => {
    debugVerbose(`[VERBOSE] ${message}`);
};

module.exports = {
    logInfo,
    logError,
    logVerbose
};
