const moment = require('moment');

class IdGenerator {
    constructor(format) {
        this.format = format;
    }

    generateId(options) {
        let id = this.format;

        // Ersetze alle Platzhalter im Format
        for (const [key, value] of Object.entries(options)) {
            id = id.replace(`{${key}}`, value);
        }

        // Ersetze das Jahr, falls es im Format vorhanden ist
        if (id.includes('{year}')) {
            id = id.replace('{year}', moment().format('YYYY'));
        }

        return id;
    }
}

module.exports = IdGenerator;
