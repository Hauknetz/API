const Role = require('../models/role.model');

// Erstelle eine neue Rolle
exports.createRole = async (req, res) => {
    try {
        const { name, description, permissions, createdBy, updatedBy, icon } = req.body;

        const role = new Role({
            name,
            description,
            permissions,
            createdBy,
            updatedBy,
            icon
        });

        const savedRole = await role.save();
        res.status(201).json(savedRole);
    } catch (error) {
        console.error('Error creating role:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Hole alle Rollen
exports.getAllRoles = async (req, res) => {
    try {
        const roles = await Role.find();
        res.status(200).json(roles);
    } catch (error) {
        console.error('Error fetching roles:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Hole eine Rolle nach ID
exports.getRoleById = async (req, res) => {
    try {
        const { id } = req.params;
        const role = await Role.findById(id);

        if (!role) {
            return res.status(404).json({ message: 'Role not found' });
        }

        res.status(200).json(role);
    } catch (error) {
        console.error('Error fetching role by ID:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Aktualisiere eine Rolle nach ID
exports.updateRole = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const role = await Role.findByIdAndUpdate(id, updates, { new: true });

        if (!role) {
            return res.status(404).json({ message: 'Role not found' });
        }

        res.status(200).json(role);
    } catch (error) {
        console.error('Error updating role:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Lösche eine Rolle nach ID
exports.deleteRole = async (req, res) => {
    try {
        const { id } = req.params;
        const role = await Role.findByIdAndDelete(id);

        if (!role) {
            return res.status(404).json({ message: 'Role not found' });
        }

        res.status(200).json({ message: 'Role deleted successfully' });
    } catch (error) {
        console.error('Error deleting role:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
