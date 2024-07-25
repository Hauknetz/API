const axios = require('axios');
const config = require('../config/app.config');

// GitHub API Base URL
const BASE_URL = 'https://api.github.com';

// Initialize Axios instance with GitHub API token
const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Authorization': `token ${config.Github.ApiToken}`,
        'Accept': 'application/vnd.github.v3+json'
    }
});

// Function to get all repositories for a user
const getUserRepositories = async (username) => {
    try {
        const response = await api.get(`/users/${username}/repos`);
        return response.data;
    } catch (error) {
        throw new Error(`Error fetching repositories: ${error.message}`);
    }
};

// Function to get a repository by owner and repo name
const getRepository = async (owner, repo) => {
    try {
        const response = await api.get(`/repos/${owner}/${repo}`);
        return response.data;
    } catch (error) {
        throw new Error(`Error fetching repository: ${error.message}`);
    }
};

// Function to create a new issue
const createIssue = async (owner, repo, issueData) => {
    try {
        const response = await api.post(`/repos/${owner}/${repo}/issues`, issueData);
        return response.data;
    } catch (error) {
        throw new Error(`Error creating issue: ${error.message}`);
    }
};

// Function to get all issues for a repository
const getIssues = async (owner, repo) => {
    try {
        const response = await api.get(`/repos/${owner}/${repo}/issues`);
        return response.data;
    } catch (error) {
        throw new Error(`Error fetching issues: ${error.message}`);
    }
};

// Function to get a specific issue
const getIssue = async (owner, repo, issueNumber) => {
    try {
        const response = await api.get(`/repos/${owner}/${repo}/issues/${issueNumber}`);
        return response.data;
    } catch (error) {
        throw new Error(`Error fetching issue: ${error.message}`);
    }
};

// Function to get pull requests for a repository
const getPullRequests = async (owner, repo) => {
    try {
        const response = await api.get(`/repos/${owner}/${repo}/pulls`);
        return response.data;
    } catch (error) {
        throw new Error(`Error fetching pull requests: ${error.message}`);
    }
};

// Function to get a specific pull request
const getPullRequest = async (owner, repo, pullNumber) => {
    try {
        const response = await api.get(`/repos/${owner}/${repo}/pulls/${pullNumber}`);
        return response.data;
    } catch (error) {
        throw new Error(`Error fetching pull request: ${error.message}`);
    }
};

// Function to get all users
const getUsers = async () => {
    try {
        const response = await api.get(`/users`);
        return response.data;
    } catch (error) {
        throw new Error(`Error fetching users: ${error.message}`);
    }
};

// Function to get a user by username
const getUser = async (username) => {
    try {
        const response = await api.get(`/users/${username}`);
        return response.data;
    } catch (error) {
        throw new Error(`Error fetching user: ${error.message}`);
    }
};

// Function to get user followers
const getUserFollowers = async (username) => {
    try {
        const response = await api.get(`/users/${username}/followers`);
        return response.data;
    } catch (error) {
        throw new Error(`Error fetching user followers: ${error.message}`);
    }
};

// Function to get user following
const getUserFollowing = async (username) => {
    try {
        const response = await api.get(`/users/${username}/following`);
        return response.data;
    } catch (error) {
        throw new Error(`Error fetching user following: ${error.message}`);
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
