import Usuario from "../../model/Usuario";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const usuario = await Usuario.findOne({ username: body.username });
  if (usuario == null) {
    return {error: "Username no existe"}
  }
  if (usuario.password !== body.password) {
    return {error: "Password incorrecto"}
  }
  return {ok: "Credenciales validas"}
})
