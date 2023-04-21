import Usuario from "../model/Usuario";
import { createHash } from "crypto";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const hashPassword = createHash("sha256").update(body.password).digest("hex");
  const insert = new Usuario({
    username: body.username,
    tipo: body.tipo,
    password: hashPassword,
  });

  try {
    insert.save();
    return { ok: "Usuario registrado" };
  } catch (err) {
    return {error: err};
  }
});
