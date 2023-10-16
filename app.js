const express = require('express');
const app = express();
const mongoose = require('mongoose'); // Para conectar a MongoDB

// Configuración de Express
app.use(express.json()); // Middleware para analizar solicitudes JSON
app.use(express.urlencoded({ extended: true })); // Middleware para analizar datos de formularios
app.use(cors()); // Middleware para manejar solicitudes CORS

// Manejo de errores
app.use((req, res, next) => {
  const error = new Error('Ruta no encontrada');
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