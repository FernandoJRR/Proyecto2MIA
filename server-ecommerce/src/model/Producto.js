const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const model = mongoose.model;

const productoSchema = new Schema(
  {
    nombre: String,
    precio: Number,
    descripcion: String,
    categoria: String,
    vendedor: String,
    urlImagen: String,
    pedido: String,
    aceptado: Boolean,
  },
  { versionKey: false }
);

module.exports = model("productos", productoSchema);
