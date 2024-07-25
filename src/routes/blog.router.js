const express = require('express');
const router = express.Router();
const upload = require('../utils/multer.util');

const blogController = require('../controllers/blog.controller');

// Create a new blog
router.post('/', upload.single('image'), blogController.createBlog);

// Get all blogs
router.get('/', blogController.getAllBlogs);

// Get a single blog by ID
router.get('/:id', blogController.getBlogById);

// Update a blog by ID
router.put('/:id', upload.single('image'), blogController.updateBlogById);

// Delete a blog by ID
router.delete('/:id', blogController.deleteBlogById);

module.exports = router;
