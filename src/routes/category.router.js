const express = require('express');
const router = express.Router();
const upload = require('../utils/multer.util');

const categoryController = require('../controllers/category.controller');

// Create a new category
router.post('/', upload.single('icon'), categoryController.createCategory);

// Get all categories
router.get('/', categoryController.getAllCategories);

// Get a single category by ID
router.get('/:id', categoryController.getCategoryById);

// Update a category by ID
router.put('/:id', upload.single('icon'), categoryController.updateCategoryById);

// Delete a category by ID
router.delete('/:id', categoryController.deleteCategoryById);

module.exports = router;
