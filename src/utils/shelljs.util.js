const shell = require('shelljs');

// Function to execute a shell command and return the output
const execCommand = (command) => {
    const result = shell.exec(command, { silent: true });
    if (result.code !== 0) {
        throw new Error(`Command failed with exit code ${result.code}: ${result.stderr}`);
    }
    return result.stdout;
};

// Function to create a directory if it doesn't exist
const createDirectory = (dirPath) => {
    if (!shell.test('-d', dirPath)) {
        shell.mkdir('-p', dirPath);
    }
};

// Function to delete a file or directory
const deletePath = (path) => {
    if (shell.test('-e', path)) {
        shell.rm('-rf', path);
    }
};

// Function to copy a file or directory
const copyPath = (source, destination) => {
    shell.cp('-r', source, destination);
};

module.exports = {
    execCommand,
    createDirectory,
    deletePath,
    copyPath
};
