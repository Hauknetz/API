const semver = require('semver');
const logger = require('./winston.util');

/**
 * Compares two version strings.
 * @param {string} version1 - The first version string.
 * @param {string} version2 - The second version string.
 * @returns {number} - Returns -1 if version1 < version2, 0 if equal, 1 if version1 > version2.
 */
const compareVersions = (version1, version2) => {
    return semver.compare(version1, version2);
};

/**
 * Checks if a version is valid.
 * @param {string} version - The version string.
 * @returns {boolean} - True if the version is valid, otherwise false.
 */
const isValidVersion = (version) => {
    return semver.valid(version) !== null;
};

/**
 * Gets the latest version from a list of versions.
 * @param {Array<string>} versions - Array of version strings.
 * @returns {string} - The latest version.
 */
const getLatestVersion = (versions) => {
    return semver.maxSatisfying(versions, '*');
};

/**
 * Example usage of semver utility functions.
 */
const exampleUsage = () => {
    const version1 = '1.2.3';
    const version2 = '2.0.0';
    logger.info('Compare Versions:', compareVersions(version1, version2)); // -1
    logger.info('Is Valid Version:', isValidVersion(version1)); // true
    logger.info('Latest Version:', getLatestVersion([version1, version2])); // 2.0.0
};

module.exports = {
    compareVersions,
    isValidVersion,
    getLatestVersion,
    exampleUsage
};
