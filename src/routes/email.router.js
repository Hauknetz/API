const express = require('express');
const router = express.Router();
const emailController = require('../controllers/email.controller');

// Endpunkt zum Senden einer E-Mail
router.post('/send', emailController.sendEmail);

module.exports = router;
