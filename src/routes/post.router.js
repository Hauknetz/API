const express = require('express');
const upload = require('../utils/multer.util');
const postController = require('../controllers/post.controller');

const router = express.Router();

// Create a new post
router.post('/', upload.array('images', 5), postController.createPost);

// Get all posts
router.get('/', postController.getPosts);

// Get a single post by ID
router.get('/:id', postController.getPostById);

// Update a post by ID
router.put('/:id', upload.array('images', 5), postController.updatePost);

// Delete a post by ID
router.delete('/:id', postController.deletePost);

module.exports = router;
