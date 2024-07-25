const Tag = require('../models/tag.model');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

// Create a new tag with image upload
exports.createTag = async (req, res) => {
    try {
        const { name, description, createdBy, updatedBy } = req.body;
        const iconFile = req.file;

        if (!iconFile) {
            return res.status(400).json({ message: 'Image file is required' });
        }

        const iconPath = `/uploads/tags/${iconFile.filename}`;

        const newTag = new Tag({
            icon: iconPath,
            name,
            description,
            createdBy,
            updatedBy,
        });

        await newTag.save();
        res.status(201).json({ message: 'Tag created successfully!', tag: newTag });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all tags
exports.getAllTags = async (req, res) => {
    try {
        const tags = await Tag.find().populate('createdBy updatedBy');
        res.status(200).json(tags);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get a tag by ID
exports.getTagById = async (req, res) => {
    try {
        const tag = await Tag.findById(req.params.id).populate('createdBy updatedBy');
        if (!tag) {
            return res.status(404).json({ message: 'Tag not found' });
        }
        res.status(200).json(tag);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Update a tag
exports.updateTag = async (req, res) => {
    try {
        const updatedData = req.body;
        const iconFile = req.file;

        if (iconFile) {
            const iconPath = `/uploads/tags/${iconFile.filename}`;
            updatedData.icon = iconPath;
        }

        const updatedTag = await Tag.findByIdAndUpdate(
            req.params.id,
            updatedData,
            { new: true, runValidators: true }
        ).populate('createdBy updatedBy');

        if (!updatedTag) {
            return res.status(404).json({ message: 'Tag not found' });
        }

        res.status(200).json(updatedTag);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a tag
exports.deleteTag = async (req, res) => {
    try {
        const deletedTag = await Tag.findByIdAndDelete(req.params.id);
        if (!deletedTag) {
            return res.status(404).json({ message: 'Tag not found' });
        }

        const iconPath = deletedTag.icon;
        if (iconPath) {
            const fullPath = path.join(__dirname, '..', 'public', iconPath);
            if (fs.existsSync(fullPath)) {
                fs.unlinkSync(fullPath);
            }
        }

        res.status(200).json({ message: 'Tag deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
