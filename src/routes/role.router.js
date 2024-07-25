const express = require('express');
const router = express.Router();
const roleController = require('../controllers/role.controller');
const multerUpload = require('../utils/multer.util');

// Erstelle eine neue Rolle
router.post('/', multerUpload.single('icon'), (req, res, next) => {
    if (req.file) {
        req.body.icon = req.file.path;
    }
    roleController.createRole(req, res);
});

// Hole alle Rollen
router.get('/', roleController.getAllRoles);

// Hole eine Rolle nach ID
router.get('/:id', roleController.getRoleById);

// Aktualisiere eine Rolle nach ID
router.put('/:id', multerUpload.single('icon'), (req, res, next) => {
    if (req.file) {
        req.body.icon = req.file.path;
    }
    roleController.updateRole(req, res);
});

// Lösche eine Rolle nach ID
router.delete('/:id', roleController.deleteRole);

module.exports = router;
