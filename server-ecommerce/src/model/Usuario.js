const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const model = mongoose.model;

const usuarioSchema = new Schema(
  {
    username: String,
    tipo: String,
    password: String,
  },
  { versionKey: false }
);

module.exports = model("usuarios", usuarioSchema);
