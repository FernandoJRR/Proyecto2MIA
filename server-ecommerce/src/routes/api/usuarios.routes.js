const express = require("express");
const crypto = require("crypto");
const Usuario = require("../../model/Usuario");

const router = express.Router();

router.get("/", async (_req, res) => {
  const usuarios = await Usuario.find();
  res.json(usuarios);
});

router.post("/", async (req, res) => {
  const hashPassword = crypto
    .createHash("sha256")
    .update(req.body.password)
    .digest("hex");
  const insert = new Usuario({
    username: req.body.username,
    tipo: req.body.tipo,
    password: hashPassword,
  });

  try {
    await insert.save();
    res.json({ ok: "Usuario registrado" });
  } catch (err) {
    res.json({ error: err });
  }
});

router.post("/verificarUsernameLogin", async (req, res) => {
  const body = req.body
  const usuario = await Usuario.findOne({ username: body.username });
  if (usuario == null) {
    res.json({error: "Username no existe"})
    return
  }
  res.json({ok: "Credenciales validas"})
})

router.post("/verificarRegistro", async (req, res) => {
  const body = req.body
  const usuario = await Usuario.findOne({ username: body.username });
  if (usuario == null) {
    res.json({ok: "Username no existe"})
    return
  }
  res.json({error: "Username existe"})
})

router.post("/verificarLogin", async (req, res) => {
  const body = req.body;
  const usuario = await Usuario.findOne({ username: body.username });
  if (usuario == null) {
    res.json({ error: "Username no existe" });
    return;
  }
  if (
    usuario.password !==
    crypto.createHash("sha256").update(body.password).digest("hex")
  ) {
    res.json({ error: "Password incorrecto" });
    return;
  }
  res.json({ ok: "Credenciales validas" });
});

router.get("/:username", async (req, res) => {
  const username = req.params.username
  const usuario = await Usuario.findOne({ username: username });
  if (usuario == null) {
    res.json({error: "Usuario no existe"})
    return
  }
  res.json(usuario)
})

module.exports = router;
