const Category = require('../models/category.model');

// Create a new category
exports.createCategory = async (req, res) => {
    try {
        const { name, description } = req.body;
        const icon = req.file ? req.file.path : null;

        const category = new Category({ name, description, icon });
        await category.save();
        res.status(201).json({ message: 'Category created successfully', category });
    } catch (error) {
        res.status(500).json({ message: 'Error creating category', error });
    }
};

// Get all categories
exports.getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching categories', error });
    }
};

// Get a single category by ID
exports.getCategoryById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching category', error });
    }
};

// Update a category by ID
exports.updateCategoryById = async (req, res) => {
    try {
        const { name, description } = req.body;
        const icon = req.file ? req.file.path : null; // Handle file upload

        const category = await Category.findByIdAndUpdate(
            req.params.id,
            { name, description, icon, updatedAt: new Date() },
            { new: true }
        );

        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        res.status(200).json({ message: 'Category updated successfully', category });
    } catch (error) {
        res.status(500).json({ message: 'Error updating category', error });
    }
};

// Delete a category by ID
exports.deleteCategoryById = async (req, res) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json({ message: 'Category deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting category', error });
    }
};
