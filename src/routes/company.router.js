const express = require('express');
const router = express.Router();
const upload = require('../utils/multer.util');

const companyController = require('../controllers/company.controller');

// Create a new company
router.post('/', upload.single('logo'), companyController.createCompany);

// Get all companies
router.get('/', companyController.getAllCompanies);

// Get a single company by ID
router.get('/:id', companyController.getCompanyById);

// Update a company by ID
router.put('/:id', upload.single('logo'), companyController.updateCompanyById);

// Delete a company by ID
router.delete('/:id', companyController.deleteCompanyById);

module.exports = router;
