const express = require('express');
const router = express.Router();
const multer = require('../utils/multer.util');
const path = require('path');
const certificateController = require('../controllers/certificate.controller');

// Create a new certificate
router.post('/', multer.single('certificateFile'), certificateController.createCertificate);

// Get all certificates
router.get('/', certificateController.getAllCertificates);

// Get a single certificate by ID
router.get('/:id', certificateController.getCertificateById);

// Update a certificate by ID
router.put('/:id', multer.single('certificateFile'), certificateController.updateCertificateById);

// Delete a certificate by ID
router.delete('/:id', certificateController.deleteCertificateById);

module.exports = router;
