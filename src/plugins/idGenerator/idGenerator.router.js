const express = require('express');
const router = express.Router();
const idGeneratorController = require('./idGenerator.controller');

router.post('/generate', idGeneratorController.generateCustomId);

module.exports = router;
