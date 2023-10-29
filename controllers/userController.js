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
        isActive: true,
      });

      if (!restaurant) {
        return res.status(404).json({ message: "restaurante no encontrado" });
      }

      const user = await User.findOne({
        _id: orderData.usuario,
        isActive: true,
      });

      if (!user) {
        return res.status(404).json({ message: "usuario no encontrado" });
      }

      orderData.items.forEach(async (element) => {
        let product = await Product.findOne({
          _id: element.producto,
          isActive: true,
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

  // Endpoint para leer todos los pedidos
  getAllOrder: async (req, res) => {
    try {
      let query = { habilitado: true };

      const { userId, restaurantId, startDate, endDate } = req.query;

      if (userId) query.userId = userId;
      if (restaurantId) query.restaurantId = restaurantId;
      if (startDate && endDate) {
        query.createdAt = {
          $gte: new Date(startDate),
          $lte: new Date(endDate),
        };
      }

      const orders = await Order.find(query);

      res.status(200).json(orders);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "No se pudieron recuperar los pedidos" });
    }
  },



  // Endpoint para leer un pedido por ID
  getOrderById: async (req, res) => {
    try {
      const orderId = req.params.orderId;

      // Lógica para buscar y devolver un pedido por ID
      const order = await Product.findOne({
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

      const order = await Order.findById(orderId);
      if (!order) {
        return res.status(404).send({ error: "Pedido no encontrado" });
      }

      if (order.estado === "En Camino") {
        return res.status(400).send({
          error: "No se puede modificar un pedido en estado 'En Curso'",
        });
      }

      Object.assign(order, updates);
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