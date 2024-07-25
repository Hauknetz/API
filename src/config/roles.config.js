module.exports = {
    roles: [
        {
            name: 'admin',
            description: 'Administrator with full access',
            permissions: [
                'read',
                'write',
                'delete',
                'update'
            ]
        },
        {
            name: 'user',
            description: 'Regular user with limited access',
            permissions: [
                'read'
            ]
        },
        {
            name: 'moderator',
            description: 'Moderator with permission to manage content',
            permissions: [
                'read',
                'write',
                'update'
            ]
        }
    ]
};
