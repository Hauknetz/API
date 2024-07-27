const express = require('express');
const router = express.Router();
const hubspotController = require('../controllers/hubspot.controller');

router.get('/auth/url', hubspotController.getAuthUrl);

router.post('/auth/token', hubspotController.getToken);

router.get('/contacts', hubspotController.getContacts);

router.get('/companies', hubspotController.getCompanies);

router.get('/deals', hubspotController.getDeals);

router.post('/contacts', hubspotController.createContact);

router.post('/companies', hubspotController.createCompany);

router.post('/deals', hubspotController.createDeal);

module.exports = router;
