const Product = require("../models/product"); // Importa el modelo de producto
const Restaurant = require("../models/restaurant"); // Importa el modelo de producto

const productController = {
  // Endpoint para crear un producto
  createProduct: async (req, res) => {
    try {
      // Aquí se recogen los datos del cuerpo de la solicitud
      const productData = req.body;

      const restaurant = await Restaurant.findOne({
        _id: productData.restaurante,
        habilitado: true,
      });

      if (!restaurant) {
        return res.status(404).json({ message: "restaurante no encontrado" });
      }

      // Lógica para crear un nuevo restaurante en la base de datos
      const newProduct = new Product(productData);
      await newProduct.save();

      res.status(201).json(newProduct); // 201 significa "Creado con éxito"
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "No se pudo crear el producto" });
    }
  },

  // Endpoint para leer todos los productos que correspondan al restaurante y/o categoría proveída
  getAllProducts: async (req, res) => {
    try {
      let query = { habilitado: true };

      if (req.query.categorias) {
        const categorias = req.query.categorias.split(",");
        query.categorias = { $in: categorias };
      }

      if (req.query.restaurante) {
        query.restaurante = req.query.restaurante;
      }

      const products = await Product.find(query);

      res.status(200).json(products);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "No se pudieron recuperar los productos" });
    }
  },

  // Endpoint para leer un producto por ID
  getProductById: async (req, res) => {
    try {
      const productId = req.params.productId;

      // Lógica para buscar y devolver un producto por ID
      const product = await Product.findOne({
        _id: productId,
        habilitado: true,
      });

      if (!product) {
        return res.status(404).json({ error: "Producto no encontrado" });
      }

      res.json(product);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "No se pudo recuperar el producto" });
    }
  },

  // Endpoint para actualizar un producto por ID
  updateProduct: async (req, res) => {
    try {
      const productId = req.params.productId;
      const {restaurante,...updatedProductData} = req.body;

      // Lógica para actualizar los datos del producto
      const updatedProduct = await Product.findByIdAndUpdate(
        productId,
        updatedProductData,
        { new: true }
      );

      if (!updatedProduct) {
        return res.status(404).json({ error: "restaurante no encontrado" });
      }

      res.json(updatedProduct);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "No se pudo actualizar el producto" });
    }
  },

  // Endpoint para inhabilitar un producto por ID
  disableProduct: async (req, res) => {
    try {
      const productId = req.params.productId;

      // Lógica para inhabilitar un producto (cambiar su habilitado a "inhabilitado")
      const disabledProduct = await Product.findByIdAndUpdate(
        productId,
        { habilitado: false },
        { new: true }
      );

      if (!disabledProduct) {
        return res.status(404).json({ error: "Producto no encontrado" });
      }

      res.json(disabledProduct);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "No se pudo inhabilitar el Producto" });
    }
  },
};

module.exports = productController;