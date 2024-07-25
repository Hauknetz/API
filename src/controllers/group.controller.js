const Group = require('../models/group.model');

// Create a new group
exports.createGroup = async (req, res) => {
    try {
        const group = new Group(req.body);
        group.createdBy = req.user._id;
        group.updatedBy = req.user._id;

        if (req.file) {
            group.icon = req.file.path;
        }

        await group.save();
        res.status(201).json(group);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all groups
exports.getGroups = async (req, res) => {
    try {
        const groups = await Group.find()
            .populate('createdBy', 'username')
            .populate('updatedBy', 'username')
            .populate('members', 'username'); // Populate members with usernames
        res.status(200).json(groups);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a single group by ID
exports.getGroupById = async (req, res) => {
    try {
        const group = await Group.findById(req.params.id)
            .populate('createdBy', 'username')
            .populate('updatedBy', 'username')
            .populate('members', 'username'); // Populate members with usernames
        if (!group) {
            return res.status(404).json({ error: 'Group not found' });
        }
        res.status(200).json(group);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a group by ID
exports.updateGroup = async (req, res) => {
    try {
        const group = await Group.findById(req.params.id);
        if (!group) {
            return res.status(404).json({ error: 'Group not found' });
        }

        Object.assign(group, req.body);
        group.updatedBy = req.user._id;

        if (req.file) {
            group.icon = req.file.path;
        }

        group.updatedAt = Date.now();
        await group.save();
        res.status(200).json(group);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a group by ID
exports.deleteGroup = async (req, res) => {
    try {
        const group = await Group.findByIdAndDelete(req.params.id);
        if (!group) {
            return res.status(404).json({ error: 'Group not found' });
        }
        res.status(200).json({ message: 'Group deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Add a member to a group
exports.addMember = async (req, res) => {
    try {
        const { groupId, userId } = req.body;
        const group = await Group.findById(groupId);
        if (!group) {
            return res.status(404).json({ error: 'Group not found' });
        }

        if (group.members.includes(userId)) {
            return res.status(400).json({ error: 'User already a member' });
        }

        group.members.push(userId);
        await group.save();
        res.status(200).json(group);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Remove a member from a group
exports.removeMember = async (req, res) => {
    try {
        const { groupId, userId } = req.body;
        const group = await Group.findById(groupId);
        if (!group) {
            return res.status(404).json({ error: 'Group not found' });
        }

        group.members = group.members.filter(member => member.toString() !== userId);
        await group.save();
        res.status(200).json(group);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
