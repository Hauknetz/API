const axios = require('axios');
const config = require('../config/app.config');

// Konfigurieren der Proxmox API URL und Authentifizierung
const PROXMOX_API_URL = `https://${config.Proxmox.Host}:${config.Proxmox.Port}/api2/json`;
const AUTH = {
    username: config.Proxmox.Username,
    password: config.Proxmox.Password
};

// Funktion zur Authentifizierung bei Proxmox
const authenticate = async () => {
    try {
        const response = await axios.post(`${PROXMOX_API_URL}/access/ticket`, {
            username: AUTH.username,
            password: AUTH.password
        });
        return response.data.data;
    } catch (error) {
        throw new Error(`Failed to authenticate: ${error.message}`);
    }
};

// Helper Function to make API requests
const makeApiRequest = async (endpoint, method = 'GET', data = {}) => {
    const auth = await authenticate();
    const { ticket, csrf_token } = auth;

    try {
        const response = await axios({
            method,
            url: `${PROXMOX_API_URL}${endpoint}`,
            headers: {
                'CSRFPreventionToken': csrf_token,
                'Cookie': `PVEAuthCookie=${ticket}`
            },
            data
        });
        return response.data;
    } catch (error) {
        throw new Error(`API request failed: ${error.message}`);
    }
};

// Funktionen für die Proxmox API

const getNodes = async () => {
    return await makeApiRequest('/nodes');
};

const getVMs = async (node) => {
    return await makeApiRequest(`/nodes/${node}/qemu`);
};

const startVM = async (node, vmid) => {
    return await makeApiRequest(`/nodes/${node}/qemu/${vmid}/status/start`, 'POST');
};

const stopVM = async (node, vmid) => {
    return await makeApiRequest(`/nodes/${node}/qemu/${vmid}/status/stop`, 'POST');
};

const createVM = async (node, vmConfig) => {
    return await makeApiRequest(`/nodes/${node}/qemu`, 'POST', vmConfig);
};

const deleteVM = async (node, vmid) => {
    return await makeApiRequest(`/nodes/${node}/qemu/${vmid}`, 'DELETE');
};

const getContainers = async (node) => {
    return await makeApiRequest(`/nodes/${node}/lxc`);
};

const startContainer = async (node, ctid) => {
    return await makeApiRequest(`/nodes/${node}/lxc/${ctid}/status/start`, 'POST');
};

const stopContainer = async (node, ctid) => {
    return await makeApiRequest(`/nodes/${node}/lxc/${ctid}/status/stop`, 'POST');
};

const createContainer = async (node, containerConfig) => {
    return await makeApiRequest(`/nodes/${node}/lxc`, 'POST', containerConfig);
};

const deleteContainer = async (node, ctid) => {
    return await makeApiRequest(`/nodes/${node}/lxc/${ctid}`, 'DELETE');
};

const getClusterInfo = async () => {
    return await makeApiRequest('/cluster/status');
};

const getResourceUsage = async () => {
    return await makeApiRequest('/nodes');
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
