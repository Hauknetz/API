const express = require('express');
const router = express.Router();
const sentryController = require('../controllers/sentry.controller');

// Example route for testing error handling
router.get('/debug-sentry', sentryController.handleExampleError);

module.exports = router;
