const express = require('express');
const router = express.Router();
const googleController = require('../controllers/google.controller');

router.get('/auth/url', googleController.getAuthUrl);

router.post('/auth/token', googleController.getToken);

router.get('/drive/files', googleController.getDriveFiles);

router.get('/gmail/messages', googleController.getGmailMessages);

router.get('/calendar/events', googleController.getCalendarEvents);

router.get('/youtube/subscriptions', googleController.getYoutubeSubscriptions);

module.exports = router;
