const express = require('express');
const router = express.Router();
const proxmoxController = require('../controllers/proxmox.controller');

// Route zum Abrufen aller Knoten
router.get('/nodes', proxmoxController.getNodes);

// Route zum Abrufen aller VMs eines bestimmten Knotens
router.get('/nodes/:node/vms', proxmoxController.getVMs);

// Route zum Starten einer VM auf einem bestimmten Knoten
router.post('/nodes/:node/vms/:vmid/start', proxmoxController.startVM);

// Route zum Stoppen einer VM auf einem bestimmten Knoten
router.post('/nodes/:node/vms/:vmid/stop', proxmoxController.stopVM);

// Route zum Erstellen einer VM auf einem bestimmten Knoten
router.post('/nodes/:node/vms', proxmoxController.createVM);

// Route zum Löschen einer VM auf einem bestimmten Knoten
router.delete('/nodes/:node/vms/:vmid', proxmoxController.deleteVM);

// Route zum Abrufen aller Container eines bestimmten Knotens
router.get('/nodes/:node/containers', proxmoxController.getContainers);

// Route zum Starten eines Containers auf einem bestimmten Knoten
router.post('/nodes/:node/containers/:ctid/start', proxmoxController.startContainer);

// Route zum Stoppen eines Containers auf einem bestimmten Knoten
router.post('/nodes/:node/containers/:ctid/stop', proxmoxController.stopContainer);

// Route zum Erstellen eines Containers auf einem bestimmten Knoten
router.post('/nodes/:node/containers', proxmoxController.createContainer);

// Route zum Löschen eines Containers auf einem bestimmten Knoten
router.delete('/nodes/:node/containers/:ctid', proxmoxController.deleteContainer);

// Route zum Abrufen von Cluster-Informationen
router.get('/cluster-info', proxmoxController.getClusterInfo);

// Route zum Abrufen der Ressourcennutzung
router.get('/resource-usage', proxmoxController.getResourceUsage);

module.exports = router;
