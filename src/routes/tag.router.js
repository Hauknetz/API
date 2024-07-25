const express = require('express');
const router = express.Router();
const tagController = require('../controllers/tag.controller');
const upload = require('../utils/multer.util');

// CRUD-Routen mit Datei-Upload-Verarbeitung
router.post('/', upload.single('icon'), tagController.createTag);
router.get('/', tagController.getAllTags);
router.get('/:id', tagController.getTagById);
router.put('/:id', upload.single('icon'), tagController.updateTag);
router.delete('/:id', tagController.deleteTag);

module.exports = router;
