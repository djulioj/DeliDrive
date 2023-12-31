const express = require("express");
const app = express();
const cors = require("cors");

//Configuración de las variables de entorno
require("dotenv").config();

//Configuración de la base de datos
require("./Database/config");

// Configuración de Express
app.use(express.json()); // Middleware para analizar solicitudes JSON
app.use(express.urlencoded({ extended: true })); // Middleware para analizar datos de formularios
app.use(cors()); // Middleware para manejar solicitudes CORS

// Rutas
const userRoutes = require("./routes/userRoutes"); // Importa las rutas de usuario
const restaurantRoutes = require("./routes/restaurantRoutes"); // Importa las rutas de restaurante
const productRoutes = require("./routes/productRoutes"); // Importa las rutas de producto
const orderRoutes = require("./routes/orderRoutes"); // Importa las rutas de pedido

app.use("/api", userRoutes); // Monta las rutas de usuario en /api/usuarios
app.use("/api", restaurantRoutes); // Monta las rutas de usuario en /api/restaurantes
app.use("/api", productRoutes); // Monta las rutas de usuario en /api/productos
app.use("/api", orderRoutes); // Monta las rutas de usuario en /api/pedidos

// Manejo de errores
app.use((req, res, next) => {
  const error = new Error("Ruta no encontrada");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    error: {
      message: error.message,
    },
  });
});

// Inicia el servidor
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`La aplicación está escuchando en el puerto ${port}`);
});