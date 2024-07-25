const os = require('os');
const { exec } = require('child_process');
const si = require('systeminformation');
const logger = require('../utils/winston.util');

// Funktion zur Überwachung der Serverressourcen
const getServerMetrics = async () => {
    try {
        const cpuLoad = await si.currentLoad();
        const memory = await si.mem();
        const network = await si.networkInterfaces();

        return {
            cpu: {
                usage: cpuLoad.currentLoad,
                cores: os.cpus().length
            },
            memory: {
                total: memory.total,
                free: memory.free,
                used: memory.used
            },
            network: network
        };
    } catch (error) {
        logger.error('Error retrieving server metrics:', error);
        return null;
    }
};

// Funktion zur Ausführung von Konsolenbefehlen
const executeCommand = (command) => {
    return new Promise((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
            if (error) {
                return reject(`Error executing command: ${error.message}`);
            }
            if (stderr) {
                return reject(`Command stderr: ${stderr}`);
            }
            resolve(stdout);
        });
    });
};

// Beispiel-Funktion zum Abrufen der aktuellen Servermetriken und Befehlsausführung
const serverStatus = async () => {
    const metrics = await getServerMetrics();
    logger.info('Server Metrics:', metrics);

    // Beispielbefehl ausführen
    try {
        const result = await executeCommand('uptime');
        logger.info('Command Output:', result);
    } catch (error) {
        logger.error(error);
    }
};

// Exportieren der Funktionen
module.exports = {
    getServerMetrics,
    executeCommand,
    serverStatus
};
