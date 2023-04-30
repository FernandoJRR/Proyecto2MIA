const express = require("express");
const ObjectId = require("mongoose").Types.ObjectId;
const Tarjeta = require("../../model/Tarjeta");

const router = express.Router();

router.get("/:cliente", async (req, res) => {
  const cliente = req.params.cliente;
  const tarjetas = await Tarjeta.find({ propietario: cliente });
  res.json(tarjetas);
});

router.post("/", async (req, res) => {
  const insert = new Tarjeta({
    propietario: req.body.propietario,
    numero: req.body.numero,
    cvv: req.body.cvv,
    fecha_vencimiento: new Date(req.body.año, req.body.mes, 0)
  });

  try {
    await insert.save();
    res.json({ ok: "Tarjeta agregada" });
  } catch (err) {
    res.json({ error: err });
  }
});

module.exports = router;
