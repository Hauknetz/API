const express = require('express');
const router = express.Router();
const multerUtil = require('../utils/multer.util');
const fileController = require('../controllers/file.controller');

// Create a new file entry
router.post('/', multerUtil.single('file'), fileController.createFile);

// Get all files
router.get('/', fileController.getAllFiles);

// Get a single file by ID
router.get('/:id', fileController.getFileById);

// Update a file by ID
router.put('/:id', multerUtil.single('file'), fileController.updateFileById);

// Delete a file by ID
router.delete('/:id', fileController.deleteFileById);

module.exports = router;
