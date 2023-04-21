import Usuario from "../../model/Usuario";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const usuario = await Usuario.findOne({ username: body.username });
  if (usuario == null) {
    return {ok: "Username no existe"}
  }
  return {error: "Username existe"}
});
