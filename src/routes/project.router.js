const express = require('express');
const upload = require('../utils/multer.util');
const projectController = require('../controllers/project.controller');

const router = express.Router();

// Create a new project
router.post('/', upload.single('image'), projectController.createProject);

// Get all projects
router.get('/', projectController.getProjects);

// Get a single project by ID
router.get('/:id', projectController.getProjectById);

// Update a project by ID
router.put('/:id', upload.single('image'), projectController.updateProject);

// Delete a project by ID
router.delete('/:id', projectController.deleteProject);

module.exports = router;
