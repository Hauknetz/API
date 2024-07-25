const serverService = require('../services/server.service');
const ServerMetrics = require('../models/server.model');

// Controller-Funktion zum Abrufen der Servermetriken
const getMetrics = async (req, res) => {
    try {
        const metrics = await serverService.getServerMetrics();
        res.status(200).json(metrics);
    } catch (error) {
        console.error('Error in getMetrics controller:', error);
        res.status(500).json({ error: 'Failed to retrieve server metrics' });
    }
};

// Controller-Funktion zur Ausführung eines Konsolenbefehls
const executeCommand = async (req, res) => {
    const { command } = req.body;
    if (!command) {
        return res.status(400).json({ error: 'Command is required' });
    }

    try {
        const output = await serverService.executeCommand(command);
        res.status(200).json({ output });
    } catch (error) {
        console.error('Error in executeCommand controller:', error);
        res.status(500).json({ error: error.message });
    }
};

// Controller-Funktion zur Abrufung des Serverstatus und Speichern der Metriken
const serverStatus = async (req, res) => {
    try {
        // Abrufen der Metriken und Ausführen eines Beispielsbefehls
        const metrics = await serverService.getServerMetrics();
        const commandOutput = await serverService.executeCommand('uptime');

        // Speichern der Metriken in der Datenbank
        const metricsData = new ServerMetrics({
            cpuUsage: metrics.cpu.usage,
            cpuCores: metrics.cpu.cores,
            memoryTotal: metrics.memory.total,
            memoryFree: metrics.memory.free,
            memoryUsed: metrics.memory.used,
            networkInterfaces: metrics.network,
            commandOutput: commandOutput
        });
        await metricsData.save();

        res.status(200).json({ metrics, commandOutput });
    } catch (error) {
        console.error('Error in serverStatus controller:', error);
        res.status(500).json({ error: 'Failed to retrieve server status' });
    }
};

module.exports = {
    getMetrics,
    executeCommand,
    serverStatus
};
