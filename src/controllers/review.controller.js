const Review = require('../models/review.model');

// Create a new review
const createReview = async (req, res) => {
    try {
        const review = new Review({
            reviewerId: req.body.reviewerId,
            productId: req.body.productId,
            rating: req.body.rating,
            comment: req.body.comment
        });
        const savedReview = await review.save();
        res.status(201).json(savedReview);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all reviews for a product
const getReviewsForProduct = async (req, res) => {
    try {
        const reviews = await Review.find({ productId: req.params.productId });
        res.status(200).json(reviews);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get a specific review by ID
const getReviewById = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);
        if (!review) return res.status(404).json({ error: 'Review not found' });
        res.status(200).json(review);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Update a review
const updateReview = async (req, res) => {
    try {
        const review = await Review.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!review) return res.status(404).json({ error: 'Review not found' });
        res.status(200).json(review);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a review
const deleteReview = async (req, res) => {
    try {
        const review = await Review.findByIdAndDelete(req.params.id);
        if (!review) return res.status(404).json({ error: 'Review not found' });
        res.status(200).json({ message: 'Review deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    createReview,
    getReviewsForProduct,
    getReviewById,
    updateReview,
    deleteReview
};
