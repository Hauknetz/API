const axios = require('axios');
const config = require('../config/app.config');
const logger = require('../utils/winston.util');

// GitLab API Base URL and Token
const GITLAB_BASE_URL = config.GitLab.BaseURL;
const GITLAB_TOKEN = config.GitLab.Token;

// Axios instance for GitLab API
const gitlabApi = axios.create({
    baseURL: GITLAB_BASE_URL,
    headers: {
        'Private-Token': GITLAB_TOKEN
    }
});

// Function to get all projects
const getProjects = async () => {
    try {
        const response = await gitlabApi.get('/projects');
        return response.data;
    } catch (error) {
        logger.error('Failed to get projects:', error);
        throw new Error('Error fetching projects from GitLab');
    }
};

// Function to get project by ID
const getProjectById = async (projectId) => {
    try {
        const response = await gitlabApi.get(`/projects/${projectId}`);
        return response.data;
    } catch (error) {
        logger.error(`Failed to get project with ID ${projectId}:`, error);
        throw new Error('Error fetching project from GitLab');
    }
};

// Function to get all issues for a project
const getIssues = async (projectId) => {
    try {
        const response = await gitlabApi.get(`/projects/${projectId}/issues`);
        return response.data;
    } catch (error) {
        logger.error(`Failed to get issues for project ID ${projectId}:`, error);
        throw new Error('Error fetching issues from GitLab');
    }
};

// Function to create a new issue
const createIssue = async (projectId, issueData) => {
    try {
        const response = await gitlabApi.post(`/projects/${projectId}/issues`, issueData);
        return response.data;
    } catch (error) {
        logger.error(`Failed to create issue for project ID ${projectId}:`, error);
        throw new Error('Error creating issue in GitLab');
    }
};

// Function to get merge requests
const getMergeRequests = async (projectId) => {
    try {
        const response = await gitlabApi.get(`/projects/${projectId}/merge_requests`);
        return response.data;
    } catch (error) {
        logger.error(`Failed to get merge requests for project ID ${projectId}:`, error);
        throw new Error('Error fetching merge requests from GitLab');
    }
};

module.exports = {
    getProjects,
    getProjectById,
    getIssues,
    createIssue,
    getMergeRequests
};
