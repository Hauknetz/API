const express = require('express');
const router = express.Router();
const githubController = require('../controllers/github.controller');

// Get all repositories for a user
router.get('/users/:username/repos', githubController.getUserRepositories);

// Get a repository by owner and repo name
router.get('/repos/:owner/:repo', githubController.getRepository);

// Create a new issue
router.post('/repos/:owner/:repo/issues', githubController.createIssue);

// Get all issues for a repository
router.get('/repos/:owner/:repo/issues', githubController.getIssues);

// Get a specific issue
router.get('/repos/:owner/:repo/issues/:issueNumber', githubController.getIssue);

// Get pull requests for a repository
router.get('/repos/:owner/:repo/pulls', githubController.getPullRequests);

// Get a specific pull request
router.get('/repos/:owner/:repo/pulls/:pullNumber', githubController.getPullRequest);

// Get all users
router.get('/users', githubController.getUsers);

// Get a user by username
router.get('/users/:username', githubController.getUser);

// Get user followers
router.get('/users/:username/followers', githubController.getUserFollowers);

// Get user following
router.get('/users/:username/following', githubController.getUserFollowing);

module.exports = router;
