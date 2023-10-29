const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 100,
  },
  descripcion: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 700,
  },
  categorias: [
    {
      type: String,
      required: true,
    },
  ],
  precio: {
    type: Number,
    required: true,
  },
  restaurante: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
    required: true,
    immutable: true,
  },
  habilitado: {
    type: Boolean,
    default: true,
  },
});

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;