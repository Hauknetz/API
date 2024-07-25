const Partner = require('../models/partner.model');

// Create a new partner
exports.createPartner = async (req, res) => {
    try {
        const partner = new Partner(req.body);
        partner.createdBy = req.user._id;
        partner.updatedBy = req.user._id;

        if (req.file) {
            partner.logo = req.file.path;
        }

        await partner.save();
        res.status(201).json(partner);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all partners
exports.getPartners = async (req, res) => {
    try {
        const partners = await Partner.find().populate('createdBy', 'username').populate('updatedBy', 'username');
        res.status(200).json(partners);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a single partner by ID
exports.getPartnerById = async (req, res) => {
    try {
        const partner = await Partner.findById(req.params.id).populate('createdBy', 'username').populate('updatedBy', 'username');
        if (!partner) {
            return res.status(404).json({ error: 'Partner not found' });
        }
        res.status(200).json(partner);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a partner by ID
exports.updatePartner = async (req, res) => {
    try {
        const partner = await Partner.findById(req.params.id);
        if (!partner) {
            return res.status(404).json({ error: 'Partner not found' });
        }

        Object.assign(partner, req.body);
        partner.updatedBy = req.user._id;

        if (req.file) {
            partner.logo = req.file.path;
        }

        partner.updatedAt = Date.now();
        await partner.save();
        res.status(200).json(partner);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a partner by ID
exports.deletePartner = async (req, res) => {
    try {
        const partner = await Partner.findByIdAndDelete(req.params.id);
        if (!partner) {
            return res.status(404).json({ error: 'Partner not found' });
        }
        res.status(200).json({ message: 'Partner deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
