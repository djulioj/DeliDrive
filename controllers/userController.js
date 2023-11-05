const User = require("../models/user"); // Importa el modelo de usuario

const userController = {
  // Endpoint para crear un usuario
  createUser: async (req, res) => {
    try {
      // Aquí se recogen los datos del cuerpo de la solicitud
      const userData = req.body;

      // Lógica para crear un nuevo usuario en la base de datos
      const newUser = new User(userData);
      await newUser.save();

      res.status(201).json(newUser); // 201 significa "Creado con éxito"
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "No se pudo crear el usuario" });
    }
  },

  // Endpoint para leer todos los usuarios
  getAllUsers: async (req, res) => {
    try {
      let query = {habilitado:true};

      const { correo, contraseña } = req.query;

      if (correo & contraseña) {
        query.correo = correo;
        query.contraseña = contraseña;
      }

      // Lógica para obtener todos los usuarios
      const users = await User.find(query);

      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "No se pudo recuperar los usuarios" });
    }
  },

  // Endpoint para leer un usuario por ID
  getUserById: async (req, res) => {
    try {
      const userId = req.params.userId;

      // Lógica para buscar y devolver un usuario por ID
      const user = await User.findOne({_id:userId,habilitado:true});

      if (!user) {
        return res.status(404).json({ error: "Usuario no encontrado" });
      }

      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "No se pudo recuperar el usuario" });
    }
  },

  // Endpoint para actualizar un usuario por ID
  updateUser: async (req, res) => {
    try {
      const userId = req.params.userId;
      const updatedUserData = req.body;

      // Lógica para actualizar los datos del usuario
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        updatedUserData,
        { new: true }
      );

      if (!updatedUser) {
        return res.status(404).json({ error: "Usuario no encontrado" });
      }

      res.json(updatedUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "No se pudo actualizar el usuario" });
    }
  },

  // Endpoint para inhabilitar un usuario por ID
  disableUser: async (req, res) => {
    try {
      const userId = req.params.userId;

      // Lógica para inhabilitar un usuario (cambiar su habilitado a "inhabilitado")
      const disabledUser = await User.findByIdAndUpdate(
        userId,
        { habilitado: false },
        { new: true }
      );

      if (!disabledUser) {
        return res.status(404).json({ error: "Usuario no encontrado" });
      }

      res.json(disabledUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "No se pudo inhabilitar el usuario" });
    }
  },
};

module.exports = userController;