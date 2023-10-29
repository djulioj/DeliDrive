const mongoose = require("mongoose");

const RestaurantSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 100,
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
  categorias: [
    {
      type: String,
      required: true,
    },
  ],
  populadridad: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },
  administrador: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  habilitado: {
    type: Boolean,
    default: true,
  },
});

const Restaurant = mongoose.model("Restaurant", RestaurantSchema);

module.exports = Restaurant;
