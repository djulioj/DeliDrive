const express = require("express");
const app = express();
const cors = require("cors");

//Configuración de las variables de entorno
require("dotenv").config();

//Configuración de la base de datos
require("./database");

// Configuración de Express
app.use(express.json()); // Middleware para analizar solicitudes JSON
app.use(express.urlencoded({ extended: true })); // Middleware para analizar datos de formularios
app.use(cors()); // Middleware para manejar solicitudes CORS

// Rutas
const userRoutes = require("./routes/userRoutes"); // Importa las rutas de usuario

app.use("/api", userRoutes); // Monta las rutas de usuario en /api/usuarios

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