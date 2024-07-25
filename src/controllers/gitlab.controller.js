const gitlabService = require('../services/gitlab.service');

// Get all projects
const getProjects = async (req, res) => {
    try {
        const projects = await gitlabService.getProjects();
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get project by ID
const getProjectById = async (req, res) => {
    const { projectId } = req.params;
    try {
        const project = await gitlabService.getProjectById(projectId);
        res.status(200).json(project);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get issues for a project
const getIssues = async (req, res) => {
    const { projectId } = req.params;
    try {
        const issues = await gitlabService.getIssues(projectId);
        res.status(200).json(issues);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new issue
const createIssue = async (req, res) => {
    const { projectId } = req.params;
    const issueData = req.body;
    try {
        const issue = await gitlabService.createIssue(projectId, issueData);
        res.status(201).json(issue);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get merge requests for a project
const getMergeRequests = async (req, res) => {
    const { projectId } = req.params;
    try {
        const mergeRequests = await gitlabService.getMergeRequests(projectId);
        res.status(200).json(mergeRequests);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getProjects,
    getProjectById,
    getIssues,
    createIssue,
    getMergeRequests
};
