const axios = require('axios');
const config = require('../config/app.config');

const nextcloudAPI = axios.create({
    baseURL: config.NextCloud.baseUrl,
    auth: {
        username: config.NextCloud.username,
        password: config.NextCloud.password,
    },
    headers: {
        'OCS-APIRequest': true,
    },
});

const getUser = async (username) => {
    try {
        const response = await nextcloudAPI.get(`/ocs/v1.php/cloud/users/${username}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data);
    }
};

const createUser = async (username, password) => {
    try {
        const response = await nextcloudAPI.post('/ocs/v1.php/cloud/users', null, {
            params: {
                userid: username,
                password: password,
            },
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data);
    }
};

const deleteUser = async (username) => {
    try {
        const response = await nextcloudAPI.delete(`/ocs/v1.php/cloud/users/${username}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data);
    }
};

const listUsers = async () => {
    try {
        const response = await nextcloudAPI.get('/ocs/v1.php/cloud/users');
        return response.data.ocs.data.users;
    } catch (error) {
        throw new Error(error.response.data);
    }
};

const shareFile = async (path, shareType, shareWith) => {
    try {
        const response = await nextcloudAPI.post('/ocs/v1.php/apps/files_sharing/api/v1/shares', null, {
            params: {
                path: path,
                shareType: shareType,
                shareWith: shareWith,
            },
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data);
    }
};

const listShares = async () => {
    try {
        const response = await nextcloudAPI.get('/ocs/v1.php/apps/files_sharing/api/v1/shares');
        return response.data.ocs.data;
    } catch (error) {
        throw new Error(error.response.data);
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
