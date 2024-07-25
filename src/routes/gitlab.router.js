const express = require('express');
const router = express.Router();
const gitlabController = require('../controllers/gitlab.controller');

// Get all projects
router.get('/projects', gitlabController.getProjects);

// Get project by ID
router.get('/projects/:projectId', gitlabController.getProjectById);

// Get issues for a project
router.get('/projects/:projectId/issues', gitlabController.getIssues);

// Create a new issue
router.post('/projects/:projectId/issues', gitlabController.createIssue);

// Get merge requests for a project
router.get('/projects/:projectId/merge_requests', gitlabController.getMergeRequests);

module.exports = router;
