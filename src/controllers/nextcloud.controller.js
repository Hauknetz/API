const nextcloudService = require('../services/nextcloud.service');

const getUser = async (req, res) => {
    try {
        const user = await nextcloudService.getUser(req.params.username);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const newUser = await nextcloudService.createUser(username, password);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        const result = await nextcloudService.deleteUser(req.params.username);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const listUsers = async (req, res) => {
    try {
        const users = await nextcloudService.listUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const shareFile = async (req, res) => {
    try {
        const { path, shareType, shareWith } = req.body;
        const share = await nextcloudService.shareFile(path, shareType, shareWith);
        res.status(201).json(share);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const listShares = async (req, res) => {
    try {
        const shares = await nextcloudService.listShares();
        res.status(200).json(shares);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getUser,
    createUser,
    deleteUser,
    listUsers,
    shareFile,
    listShares,
};
