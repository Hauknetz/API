const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

// CRUD Routes
router.post('/', userController.createUser);
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.get('/username/:username', userController.getUserByUsername);
router.get('/email/:email', userController.getUserByEmail);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;
