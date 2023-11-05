const Product = require("../models/product"); // Importa el modelo de producto
const Restaurant = require("../models/restaurant"); // Importa el modelo de producto
const Order = require("../models/order"); // Importa el modelo de pedido
const User = require("../models/user"); // Importa el modelo de usuario

const orderController = {
  // Endpoint para crear un pedido
  createOrder: async (req, res) => {
    try {
      // Aquí se recogen los datos del cuerpo de la solicitud
      const orderData = req.body;

      const restaurant = await Restaurant.findOne({
        _id: orderData.restaurante,
        habilitado: true,
      });

      if (!restaurant) {
        return res.status(404).json({ message: "restaurante no encontrado" });
      }

      const user = await User.findOne({
        _id: orderData.usuario,
        habilitado: true,
      });

      if (!user) {
        return res.status(404).json({ message: "usuario no encontrado" });
      }

      orderData.items.forEach(async (element) => {
        let product = await Product.findOne({
          _id: element.producto,
          habilitado: true,
        });

        if (!product) {
          return res
            .status(404)
            .json({ message: `producto ${element.producto} no encontrado` });
        }
      });

      // Lógica para crear un nuevo pedido en la base de datos
      const newOrder = new Order(orderData);
      await newOrder.save();

      res.status(201).json(newOrder); // 201 significa "Creado con éxito"
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "No se pudo crear el pedido" });
    }
  },

  // Endpoint para leer todos los pedidos realizados por el usuario proveído, enviados por el usuario proveído, pedidos a un restaurante proveído, y/o entre las fechas proveídas.
  getAllOrder: async (req, res) => {
    try {
      let query = { habilitado: true };

      const { usuario, restaurante, startDate, endDate, repartidor } = req.query;

      if (usuario) query.usuario = usuario;
      if (restaurante) query.restaurante = restaurante;
      if (startDate && endDate) {
        query.createdAt = {
          $gte: new Date(startDate),
          $lte: new Date(endDate),
        };
      }

      if(repartidor) query.repartidor = repartidor;
      console.log(query);

      const orders = await Order.find(query);

      res.status(200).json(orders);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "No se pudo recuperar los pedidos" });
    }
  },



  // Endpoint para leer un pedido por ID
  getOrderById: async (req, res) => {
    try {
      const orderId = req.params.orderId;

      // Lógica para buscar y devolver un pedido por ID
      const order = await Order.findOne({
        _id: orderId,
        habilitado: true,
      });

      if (!order) {
        return res.status(404).json({ error: "Pedido no encontrado" });
      }

      res.json(order);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "No se pudo recuperar el pedido" });
    }
  },

  // Endpoint para actualizar un pedido por ID
  updateOrder: async (req, res) => {
    try {
      const orderId = req.params.orderId;
      const { restaurante, items, usuario, ...updatedOrderData } = req.body;

      // Lógica para actualizar los datos del producto

      const repartidor = await User.findOne({
        _id: updatedOrderData.repartidor,
        habilitado: true,
      });

      if (!repartidor) {
        return res.status(404).json({ message: "Repartidor no encontrado" });
      }

      const order = await Order.findById(orderId);
      console.log(order);
      if (!order) {
        return res.status(404).send({ error: "Pedido no encontrado" });
      }

      Object.assign(order, updatedOrderData);
      await order.save();

      res.json(order);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "No se pudo actualizar el pedido" });
    }
  },

  // Endpoint para inhabilitar un pedido por ID
  disableOrder: async (req, res) => {
    try {
      const orderId = req.params.orderId;

      // Lógica para inhabilitar un pedido (cambiar su habilitado a "inhabilitado")
      const disabledOrder = await Order.findByIdAndUpdate(
        orderId,
        { habilitado: false },
        { new: true }
      );

      if (!disabledOrder) {
        return res.status(404).json({ error: "Pedido no encontrado" });
      }

      res.json(disabledOrder);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "No se pudo inhabilitar el pedido" });
    }
  },
};

module.exports = orderController;