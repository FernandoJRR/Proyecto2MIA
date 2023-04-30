const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const model = mongoose.model;

const tarjetaSchema = new Schema(
  {
    propietario: String,
    numero: Number,
    cvv: Number,
    fecha_vencimiento: Date,
  },
  { versionKey: false }
);

module.exports = model("tarjetas", tarjetaSchema);
