const sentryService = require('../services/sentry.service');

// Example controller function to demonstrate error handling
const handleExampleError = async (req, res) => {
    try {
        // Example logic that throws an error
        throw new Error('This is an example error');
    } catch (error) {
        // Use the service to handle the error
        sentryService.handleError(error);

        res.status(500).json({
            error: {
                message: 'An error occurred, and it has been logged.'
            }
        });
    }
};

module.exports = {
    handleExampleError,
};
