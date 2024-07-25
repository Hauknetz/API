const File = require('../models/file.model');

// Create a new file entry
exports.createFile = async (req, res) => {
    try {
        const { filename, originalname, mimetype, size, path } = req.file;

        const file = new File({
            filename,
            originalname,
            mimetype,
            size,
            path
        });

        await file.save();
        res.status(201).json(file);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all files
exports.getAllFiles = async (req, res) => {
    try {
        const files = await File.find();
        res.status(200).json(files);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a single file by ID
exports.getFileById = async (req, res) => {
    try {
        const file = await File.findById(req.params.id);
        if (!file) {
            return res.status(404).json({ message: 'File not found' });
        }
        res.status(200).json(file);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a file by ID
exports.updateFileById = async (req, res) => {
    try {
        const { filename, originalname, mimetype, size, path } = req.file;
        const updateData = {
            filename,
            originalname,
            mimetype,
            size,
            path,
            updatedAt: Date.now()
        };

        const file = await File.findByIdAndUpdate(req.params.id, updateData, { new: true });
        if (!file) {
            return res.status(404).json({ message: 'File not found' });
        }
        res.status(200).json(file);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a file by ID
exports.deleteFileById = async (req, res) => {
    try {
        const file = await File.findByIdAndDelete(req.params.id);
        if (!file) {
            return res.status(404).json({ message: 'File not found' });
        }
        res.status(200).json({ message: 'File deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
