const express = require('express');
const upload = require('../utils/multer.util');
const partnerController = require('../controllers/partner.controller');

const router = express.Router();

// Create a new partner
router.post('/', upload.single('logo'), partnerController.createPartner);

// Get all partners
router.get('/', partnerController.getPartners);

// Get a single partner by ID
router.get('/:id', partnerController.getPartnerById);

// Update a partner by ID
router.put('/:id', upload.single('logo'), partnerController.updatePartner);

// Delete a partner by ID
router.delete('/:id', partnerController.deletePartner);

module.exports = router;
