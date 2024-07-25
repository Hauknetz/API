const { authorize } = require('./auth.middleware');

const founderRole = authorize(['founder']);
const ceoRole = authorize(['ceo']);
const cooRole = authorize(['coo']);
const cfoRole = authorize(['cfo']);
const cioRole = authorize(['cio']);
const ctoRole = authorize(['cto']);
const chroRole = authorize(['chro']);
const marketingRole = authorize(['marketing']);
const developerRole = authorize(['developer']);
const supportRole = authorize(['supporter']);
const testerRole = authorize(['tester']);

module.exports = {
    founderRole,
    ceoRole,
    cooRole,
    cfoRole,
    cioRole,
    ctoRole,
    chroRole,
    marketingRole,
    developerRole,
    supportRole,
    testerRole,
};
