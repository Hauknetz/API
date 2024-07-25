const Certificate = require('../models/certificate.model');

// Create a new certificate
exports.createCertificate = async (req, res) => {
    try {
        const { title, description, issuedBy, issueDate, expirationDate } = req.body;
        const certificateFile = req.file.path;

        const certificate = new Certificate({
            title,
            description,
            issuedBy,
            issueDate,
            expirationDate,
            certificateFile
        });

        await certificate.save();
        res.status(201).json(certificate);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all certificates
exports.getAllCertificates = async (req, res) => {
    try {
        const certificates = await Certificate.find();
        res.status(200).json(certificates);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a single certificate by ID
exports.getCertificateById = async (req, res) => {
    try {
        const certificate = await Certificate.findById(req.params.id);
        if (!certificate) {
            return res.status(404).json({ message: 'Certificate not found' });
        }
        res.status(200).json(certificate);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a certificate by ID
exports.updateCertificateById = async (req, res) => {
    try {
        const { title, description, issuedBy, issueDate, expirationDate } = req.body;
        const updateData = {
            title,
            description,
            issuedBy,
            issueDate,
            expirationDate,
            updatedAt: Date.now()
        };

        if (req.file) {
            updateData.certificateFile = req.file.path;
        }

        const certificate = await Certificate.findByIdAndUpdate(req.params.id, updateData, { new: true });
        if (!certificate) {
            return res.status(404).json({ message: 'Certificate not found' });
        }
        res.status(200).json(certificate);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a certificate by ID
exports.deleteCertificateById = async (req, res) => {
    try {
        const certificate = await Certificate.findByIdAndDelete(req.params.id);
        if (!certificate) {
            return res.status(404).json({ message: 'Certificate not found' });
        }
        res.status(200).json({ message: 'Certificate deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
