const proxmoxService = require('../services/proxmox.service');
const logger = require('../utils/winston.util');

const getNodes = async (req, res) => {
    try {
        const nodes = await proxmoxService.getNodes();
        res.status(200).json(nodes);
    } catch (error) {
        logger.error('Failed to fetch nodes:', error);
        res.status(500).json({ error: 'Failed to fetch nodes' });
    }
};

const getVMs = async (req, res) => {
    const { node } = req.params;
    try {
        const vms = await proxmoxService.getVMs(node);
        res.status(200).json(vms);
    } catch (error) {
        logger.error(`Failed to fetch VMs for node ${node}:`, error);
        res.status(500).json({ error: `Failed to fetch VMs for node ${node}` });
    }
};

const startVM = async (req, res) => {
    const { node, vmid } = req.params;
    try {
        const response = await proxmoxService.startVM(node, vmid);
        res.status(200).json(response);
    } catch (error) {
        logger.error(`Failed to start VM ${vmid} on node ${node}:`, error);
        res.status(500).json({ error: `Failed to start VM ${vmid} on node ${node}` });
    }
};

const stopVM = async (req, res) => {
    const { node, vmid } = req.params;
    try {
        const response = await proxmoxService.stopVM(node, vmid);
        res.status(200).json(response);
    } catch (error) {
        logger.error(`Failed to stop VM ${vmid} on node ${node}:`, error);
        res.status(500).json({ error: `Failed to stop VM ${vmid} on node ${node}` });
    }
};

const createVM = async (req, res) => {
    const { node } = req.params;
    const vmConfig = req.body;
    try {
        const response = await proxmoxService.createVM(node, vmConfig);
        res.status(201).json(response);
    } catch (error) {
        logger.error(`Failed to create VM on node ${node}:`, error);
        res.status(500).json({ error: `Failed to create VM on node ${node}` });
    }
};

const deleteVM = async (req, res) => {
    const { node, vmid } = req.params;
    try {
        const response = await proxmoxService.deleteVM(node, vmid);
        res.status(200).json(response);
    } catch (error) {
        logger.error(`Failed to delete VM ${vmid} on node ${node}:`, error);
        res.status(500).json({ error: `Failed to delete VM ${vmid} on node ${node}` });
    }
};

const getContainers = async (req, res) => {
    const { node } = req.params;
    try {
        const containers = await proxmoxService.getContainers(node);
        res.status(200).json(containers);
    } catch (error) {
        logger.error(`Failed to fetch containers for node ${node}:`, error);
        res.status(500).json({ error: `Failed to fetch containers for node ${node}` });
    }
};

const startContainer = async (req, res) => {
    const { node, ctid } = req.params;
    try {
        const response = await proxmoxService.startContainer(node, ctid);
        res.status(200).json(response);
    } catch (error) {
        logger.error(`Failed to start container ${ctid} on node ${node}:`, error);
        res.status(500).json({ error: `Failed to start container ${ctid} on node ${node}` });
    }
};

const stopContainer = async (req, res) => {
    const { node, ctid } = req.params;
    try {
        const response = await proxmoxService.stopContainer(node, ctid);
        res.status(200).json(response);
    } catch (error) {
        logger.error(`Failed to stop container ${ctid} on node ${node}:`, error);
        res.status(500).json({ error: `Failed to stop container ${ctid} on node ${node}` });
    }
};

const createContainer = async (req, res) => {
    const { node } = req.params;
    const containerConfig = req.body;
    try {
        const response = await proxmoxService.createContainer(node, containerConfig);
        res.status(201).json(response);
    } catch (error) {
        logger.error(`Failed to create container on node ${node}:`, error);
        res.status(500).json({ error: `Failed to create container on node ${node}` });
    }
};

const deleteContainer = async (req, res) => {
    const { node, ctid } = req.params;
    try {
        const response = await proxmoxService.deleteContainer(node, ctid);
        res.status(200).json(response);
    } catch (error) {
        logger.error(`Failed to delete container ${ctid} on node ${node}:`, error);
        res.status(500).json({ error: `Failed to delete container ${ctid} on node ${node}` });
    }
};

const getClusterInfo = async (req, res) => {
    try {
        const clusterInfo = await proxmoxService.getClusterInfo();
        res.status(200).json(clusterInfo);
    } catch (error) {
        logger.error('Failed to fetch cluster info:', error);
        res.status(500).json({ error: 'Failed to fetch cluster info' });
    }
};

const getResourceUsage = async (req, res) => {
    try {
        const usage = await proxmoxService.getResourceUsage();
        res.status(200).json(usage);
    } catch (error) {
        logger.error('Failed to fetch resource usage:', error);
        res.status(500).json({ error: 'Failed to fetch resource usage' });
    }
};

module.exports = {
    getNodes,
    getVMs,
    startVM,
    stopVM,
    createVM,
    deleteVM,
    getContainers,
    startContainer,
    stopContainer,
    createContainer,
    deleteContainer,
    getClusterInfo,
    getResourceUsage
};
