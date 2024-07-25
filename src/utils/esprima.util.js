const esprima = require('esprima');
const logger = require('./winston.util');

/**
 * Parses JavaScript code into an abstract syntax tree (AST).
 * @param {string} code - The JavaScript code to parse.
 * @returns {Object} - The parsed AST.
 */
const parseCode = (code) => {
    return esprima.parseScript(code);
};

/**
 * Example usage of Esprima utility functions.
 */
const exampleUsage = () => {
    const code = `
        function greet(name) {
            return 'Hello, ' + name;
        }
    `;

    const ast = parseCode(code);
    logger.info('AST:', JSON.stringify(ast, null, 2));
};

module.exports = {
    parseCode,
    exampleUsage
};
