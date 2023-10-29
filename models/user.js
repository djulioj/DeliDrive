const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 100,
  },
  correoElectronico: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (correoElectronico) {
        return /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(
          correoElectronico
        );
      },
      message: (props) => `${props.value} no es un correo electrónico válido!`,
    },
  },
  contraseña: {
    type: String,
    required: true,
    minlength: 8,
  },
  numeroContacto: {
    type: String,
    require: true,
  },
  direccion: {
    calle: {
      type: String,
      require: true,
    },
    ciudad: {
      type: String,
      require: true,
    },
    codigoPostal: {
      type: String,
      require: true,
    },
    pais: {
      type: String,
      require: true,
    },
  },
  habilitado: {
    type: Boolean,
    default: true,
  },
  administrador: {
    type: Boolean,
    default: false,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;