const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Ruta para crear un usuario
router.post('/usuarios', userController.createUser);

// Ruta para leer todos los usuarios
router.get('/usuarios', userController.getAllUsers);

// Ruta para leer un usuario por ID
router.get('/usuarios/:userId', userController.getUserById);

// Ruta para actualizar un usuario por ID
router.put('/usuarios/:userId', userController.updateUser);

// Ruta para inhabilitar un usuario por ID
router.delete('/usuarios/:userId', userController.disableUser);

module.exports = router;