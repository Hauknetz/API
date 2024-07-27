const IdGenerator = require('./idGenerator');

// Beispielkonfiguration
const format = '{prefix}-{roleId}/{uniqueId}-{year}';

const idGenerator = new IdGenerator(format);

// Controller-Funktion zum Generieren einer ID
const generateCustomId = (req, res) => {
    const { prefix, roleId, uniqueId } = req.body;

    const options = {
        prefix,
        roleId,
        uniqueId
    };

    try {
        const customId = idGenerator.generateId(options);
        res.status(200).json({ customId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    generateCustomId
};
