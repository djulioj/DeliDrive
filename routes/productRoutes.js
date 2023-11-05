const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Ruta para crear un producto
router.post('/productos', productController.createProduct);

// Ruta para leer todos los productos que correspondan al restaurante y/o categoría proveída
router.get('/productos', productController.getAllProducts);

// Ruta para leer un producto por ID
router.get('/productos/:productId', productController.getProductById);

// Ruta para actualizar un producto por ID
router.put('/productos/:productId', productController.updateProduct);

// Ruta para inhabilitar un producto por ID
router.delete('/productos/:productId', productController.disableProduct);

module.exports = router;