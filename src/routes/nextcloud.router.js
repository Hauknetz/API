const express = require('express');
const router = express.Router();
const nextcloudController = require('../controllers/nextcloud.controller');

router.get('/users', nextcloudController.listUsers);

router.get('/users/:username', nextcloudController.getUser);

router.post('/users', nextcloudController.createUser);

router.delete('/users/:username', nextcloudController.deleteUser);

router.post('/shares', nextcloudController.shareFile);

router.get('/shares', nextcloudController.listShares);

module.exports = router;
