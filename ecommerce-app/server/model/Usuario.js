import { Schema, model } from "mongoose";

const usuarioSchema = new Schema({
  username: String,
  tipo: String,
  password: String
})

export default model('usuarios', usuarioSchema)
