const mongoose = require('mongoose');

// Schema für Servermetriken
const serverMetricsSchema = new mongoose.Schema({
    cpuUsage: {
        type: Number,
        required: true,
    },
    cpuCores: {
        type: Number,
        required: true,
    },
    memoryTotal: {
        type: Number,
        required: true,
    },
    memoryFree: {
        type: Number,
        required: true,
    },
    memoryUsed: {
        type: Number,
        required: true,
    },
    networkInterfaces: {
        type: Map,
        of: new mongoose.Schema({
            iface: String,
            family: String,
            internal: Boolean,
            address: String,
            netmask: String,
            mac: String,
            cidr: String
        }),
        default: {}
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
    commandOutput: {
        type: String,
        default: ''
    }
});

// Modell für Servermetriken erstellen
module.exports = mongoose.model('ServerMetrics', serverMetricsSchema);