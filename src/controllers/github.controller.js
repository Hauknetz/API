const githubService = require('../services/github.service');

// Get all repositories for a user
const getUserRepositories = async (req, res) => {
    const { username } = req.params;
    try {
        const repositories = await githubService.getUserRepositories(username);
        res.status(200).json(repositories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a repository by owner and repo name
const getRepository = async (req, res) => {
    const { owner, repo } = req.params;
    try {
        const repository = await githubService.getRepository(owner, repo);
        res.status(200).json(repository);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new issue
const createIssue = async (req, res) => {
    const { owner, repo } = req.params;
    const issueData = req.body;
    try {
        const issue = await githubService.createIssue(owner, repo, issueData);
        res.status(201).json(issue);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all issues for a repository
const getIssues = async (req, res) => {
    const { owner, repo } = req.params;
    try {
        const issues = await githubService.getIssues(owner, repo);
        res.status(200).json(issues);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a specific issue
const getIssue = async (req, res) => {
    const { owner, repo, issueNumber } = req.params;
    try {
        const issue = await githubService.getIssue(owner, repo, issueNumber);
        res.status(200).json(issue);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get pull requests for a repository
const getPullRequests = async (req, res) => {
    const { owner, repo } = req.params;
    try {
        const pullRequests = await githubService.getPullRequests(owner, repo);
        res.status(200).json(pullRequests);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a specific pull request
const getPullRequest = async (req, res) => {
    const { owner, repo, pullNumber } = req.params;
    try {
        const pullRequest = await githubService.getPullRequest(owner, repo, pullNumber);
        res.status(200).json(pullRequest);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all users
const getUsers = async (req, res) => {
    try {
        const users = await githubService.getUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a user by username
const getUser = async (req, res) => {
    const { username } = req.params;
    try {
        const user = await githubService.getUser(username);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get user followers
const getUserFollowers = async (req, res) => {
    const { username } = req.params;
    try {
        const followers = await githubService.getUserFollowers(username);
        res.status(200).json(followers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get user following
const getUserFollowing = async (req, res) => {
    const { username } = req.params;
    try {
        const following = await githubService.getUserFollowing(username);
        res.status(200).json(following);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getUserRepositories,
    getRepository,
    createIssue,
    getIssues,
    getIssue,
    getPullRequests,
    getPullRequest,
    getUsers,
    getUser,
    getUserFollowers,
    getUserFollowing
};
