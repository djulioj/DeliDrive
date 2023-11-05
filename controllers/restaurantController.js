const Restaurant = require("../models/restaurant"); // Importa el modelo de restaurante
const User = require("../models/user"); // Importa el modelo de usuario

const restaurantController = {
  // Endpoint para crear un Restaurante
  createRestaurant: async (req, res) => {
    try {
      // Aquí se recogen los datos del cuerpo de la solicitud
      const restaurantData = req.body;

      const user = await User.findOne({
        _id: restaurantData.administrador,
        habilitado: true,
      });
//      console.log(user);
      if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }

      // Lógica para crear un nuevo Restaurante en la base de datos
      const newRestaurant = new Restaurant(restaurantData);
      await newRestaurant.save();

      res.status(201).json(newRestaurant); // 201 significa "Creado con éxito"
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "No se pudo crear el Restaurante" });
    }
  },

  // Endpoint para leer todos los restaurantes que correspondan a la categoría proveída y/o su nombre se asemeje a la búsqueda.
  getAllRestaurant: async (req, res) => {
    try {
      let query = { habilitado: true };

      const { correo, contraseña } = req.query;

      if (req.query.categorias) {
        const categorias = req.query.categorias.split(",");
        console.log(categorias);
        query.categorias = { $in: categorias };
      }

      if (req.query.nombre) {
        query.nombre = new RegExp(req.query.nombre, "i");
      }

      if (req.query.administrador) {
        query.administrador = req.query.administrador;
      }

      // Lógica para obtener todos los restaurantes
      const restaurants = await Restaurant.find(query).sort({
        populadridad: -1,
      });

      res.json(restaurants);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "No se pudieron recuperar los restaurantes" });
    }
  },

  // Endpoint para leer un restaurante por ID
  getRestaurantById: async (req, res) => {
    try {
      const restaurantId = req.params.restaurantId;

      // Lógica para buscar y devolver un restaurantes por ID
      const restaurant = await Restaurant.findOne({
        _id: restaurantId,
        habilitado: true,
      });

      if (!restaurant) {
        return res.status(404).json({ error: "Restaurante no encontrado" });
      }

      res.json(restaurant);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "No se pudo recuperar el Restaurante" });
    }
  },

  // Endpoint para actualizar un restaurante por ID
  updateRestaurant: async (req, res) => {
    try {
      const restaurantId = req.params.restaurantId;
      const updatedRestaurantData = req.body;

      if (updatedRestaurantData.administrador) {
        const user = await User.findOne({
          _id: updatedRestaurantData.administrador,
          habilitado: true,
        });

        if (!user) {
          return res.status(404).json({ message: "Usuario no encontrado" });
        }
      }

      // Lógica para actualizar los datos del restaurante
      const updatedRestaurant = await Restaurant.findByIdAndUpdate(
        restaurantId,
        updatedRestaurantData,
        { new: true }
      );

      if (!updatedRestaurant) {
        return res.status(404).json({ error: "Restaurante no encontrado" });
      }

      res.json(updatedRestaurant);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "No se pudo actualizar el Restaurante" });
    }
  },

  // Endpoint para inhabilitar un restaurante por ID
  disableRestaurant: async (req, res) => {
    try {
      const restaurantId = req.params.restaurantId;

      // Lógica para inhabilitar un restaurante (cambiar su habilitado a "inhabilitado")
      const disabledRestaurant = await Restaurant.findByIdAndUpdate(
        restaurantId,
        { habilitado: false },
        { new: true }
      );

      if (!disabledRestaurant) {
        return res.status(404).json({ error: "Restaurante no encontrado" });
      }

      res.json(disabledRestaurant);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "No se pudo inhabilitar el restaurante" });
    }
  },
};

module.exports = restaurantController;