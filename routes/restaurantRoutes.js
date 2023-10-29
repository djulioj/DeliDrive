const express = require('express');
const router = express.Router();
const restaurantController = require('../controllers/restaurantController');

// Ruta para crear un usuario
router.post('/restaurantes', restaurantController.createRestaurant);

// Ruta para leer todos los usuarios
router.get('/restaurantes', restaurantController.getAllRestaurant);

// Ruta para leer un usuario por ID
router.get('/restaurantes/:restaurantId', restaurantController.getRestaurantById);

// Ruta para actualizar un usuario por ID
router.put('/restaurantes/:restaurantId', restaurantController.updateRestaurant);

// Ruta para inhabilitar un usuario por ID
router.delete('/restaurantes/:restaurantId', restaurantController.disableRestaurant);

module.exports = router;