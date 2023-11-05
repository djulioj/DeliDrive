const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    immutable: true,
  },
  restaurante: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
    required: true,
    immutable: true,
  },
  items: [
    {
      producto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      cantidad: { type: Number, required: true },
    },
  ],
  estado: {
    type: String,
    enum: ["Creado", "En Curso", "En Camino", "Entregado"],
    default: "Creado",
  },
  total: {
    type: Number,
    required: true,
  },
  habilitado: {
    type: Boolean,
    default: true,
  },
  fechaCreado: {
    type: Date,
    // Quitamos 5h para que sea hora colombiana
    default: Date.now() - 1000 * 60 * 60 * 5,
  },
  repartidor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    //required: false,
  },
  calificacion: {
    type: Number,
    min: 0,
    max: 5,
  },
});

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;
