const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/review.controller');

// Create a new review
router.post('/', reviewController.createReview);

// Get all reviews for a specific product
router.get('/product/:productId', reviewController.getReviewsForProduct);

// Get a specific review by ID
router.get('/:id', reviewController.getReviewById);

// Update a review
router.put('/:id', reviewController.updateReview);

// Delete a review
router.delete('/:id', reviewController.deleteReview);

module.exports = router;
