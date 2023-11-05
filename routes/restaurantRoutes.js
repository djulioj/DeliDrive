const express = require('express');
const router = express.Router();
const restaurantController = require('../controllers/restaurantController');

// Ruta para crear un restaurante
router.post('/restaurantes', restaurantController.createRestaurant);

// Ruta para leer todos los restaurantes que correspondan a la categoría proveída y/o su nombre se asemeje a la búsqueda.
router.get('/restaurantes', restaurantController.getAllRestaurant);

// Ruta para leer un restaurante por ID
router.get('/restaurantes/:restaurantId', restaurantController.getRestaurantById);

// Ruta para actualizar un restaurante por ID
router.put('/restaurantes/:restaurantId', restaurantController.updateRestaurant);

// Ruta para inhabilitar un restaurante por ID
router.delete('/restaurantes/:restaurantId', restaurantController.disableRestaurant);

module.exports = router;