const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 100,
  },
  correo: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  contraseña: {
    type: String,
    required: true,
    minlength: 8,
  },
  numeroContacto: {
    type: String,
  },
  direccion: {
    calle: {
      type: String,
    },
    ciudad: {
      type: String,
    },
    codigoPostal: {
      type: String,
    },
    pais: {
      type: String,
    },
  },
  estado: {
    type: String,
    default: 'activo',
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;