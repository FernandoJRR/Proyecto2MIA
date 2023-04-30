const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const model = mongoose.model;

const pedidoSchema = new Schema(
  {
    comprador: String,
    productos: Array,
    idTarjeta: String,
    total: Number,
    fechaPedido: Date,
    fechaEntrega: Date,
    entregado: Boolean,
  },
  { versionKey: false }
);

module.exports = model("pedidos", pedidoSchema);
