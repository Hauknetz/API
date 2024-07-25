const Company = require('../models/company.model');

// Create a new company
exports.createCompany = async (req, res) => {
    try {
        const { name, description, address, contact, website } = req.body;
        const logo = req.file ? req.file.path : null;

        const company = new Company({ name, description, address, contact, website, logo });
        await company.save();
        res.status(201).json({ message: 'Company created successfully', company });
    } catch (error) {
        res.status(500).json({ message: 'Error creating company', error });
    }
};

// Get all companies
exports.getAllCompanies = async (req, res) => {
    try {
        const companies = await Company.find();
        res.status(200).json(companies);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching companies', error });
    }
};

// Get a single company by ID
exports.getCompanyById = async (req, res) => {
    try {
        const company = await Company.findById(req.params.id);

        if (!company) {
            return res.status(404).json({ message: 'Company not found' });
        }
        res.status(200).json(company);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching company', error });
    }
};

// Update a company by ID
exports.updateCompanyById = async (req, res) => {
    try {
        const { name, description, address, contact, website } = req.body;
        const logo = req.file ? req.file.path : null;

        const company = await Company.findByIdAndUpdate(
            req.params.id,
            { name, description, address, contact, website, logo, updatedAt: new Date() },
            { new: true }
        );

        if (!company) {
            return res.status(404).json({ message: 'Company not found' });
        }

        res.status(200).json({ message: 'Company updated successfully', company });
    } catch (error) {
        res.status(500).json({ message: 'Error updating company', error });
    }
};

// Delete a company by ID
exports.deleteCompanyById = async (req, res) => {
    try {
        const company = await Company.findByIdAndDelete(req.params.id);
        if (!company) {
            return res.status(404).json({ message: 'Company not found' });
        }
        res.status(200).json({ message: 'Company deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting company', error });
    }
};
