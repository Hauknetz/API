const express = require('express');
const upload = require('../utils/multer.util');
const groupController = require('../controllers/group.controller');

const router = express.Router();

// Create a new group
router.post('/', upload.single('icon'), groupController.createGroup);

// Get all groups
router.get('/', groupController.getGroups);

// Get a single group by ID
router.get('/:id', groupController.getGroupById);

// Update a group by ID
router.put('/:id', upload.single('icon'), groupController.updateGroup);

// Delete a group by ID
router.delete('/:id', groupController.deleteGroup);

// Add a member to a group
router.post('/members', groupController.addMember);

// Remove a member from a group
router.delete('/members', groupController.removeMember);

module.exports = router;
