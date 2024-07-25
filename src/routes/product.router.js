const express = require('express');
const upload = require('../utils/multer.util');
const productController = require('../controllers/product.controller');

const router = express.Router();

// Create a new product
router.post('/', upload.array('images', 5), productController.createProduct);

// Get all products
router.get('/', productController.getProducts);

// Get a single product by ID
router.get('/:id', productController.getProductById);

// Update a product by ID
router.put('/:id', upload.array('images', 5), productController.updateProduct);

// Delete a product by ID
router.delete('/:id', productController.deleteProduct);

module.exports = router;
