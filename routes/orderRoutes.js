const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Ruta para crear un pedido
router.post('/pedidos', orderController.createOrder);

// Ruta para leer todos los pedidos realizados por el usuario proveído, enviados por el usuario proveído, pedidos a un restaurante proveído, y/o entre las fechas proveídas.
router.get('/pedidos', orderController.getAllOrder);

// Ruta para leer un usuario por ID
router.get('/pedidos/:orderId', orderController.getOrderById);

// Ruta para actualizar un usuario por ID
router.put('/pedidos/:orderId', orderController.updateOrder);

// Ruta para inhabilitar un usuario por ID
router.delete('/pedidos/:orderId', orderController.disableOrder);

module.exports = router;