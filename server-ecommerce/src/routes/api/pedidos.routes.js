const express = require("express");
const ObjectId = require("mongoose").Types.ObjectId;
const Pedido = require("../../model/Pedido");
const Producto = require("../../model/Producto");

const router = express.Router();

router.get("/", async (_req, res) => {
  const pedidos = await Pedido.find();
  res.json(pedidos);
});

router.post("/", async (req, res) => {
  const insert = new Pedido({
    comprador: req.body.comprador,
    productos: req.body.productos,
    idTarjeta: req.body.tarjeta,
    total: req.body.total,
    fechaPedido: req.body.fechaPedido,
    fechaEntrega: req.body.fechaEntrega,
    entregado: false,
  });

  try {
    const result = await insert.save();
    //Pedido okay
    //Se cambia el estado de los productos
    req.body.productos.forEach(async (idProducto) => {
      await Producto.updateOne(
        { _id: idProducto },
        { $set: { pedido: result._id } }
      );
    });
    res.json({ ok: "Pedido realizado" });
  } catch (err) {
    res.json({ error: err });
  }
});

module.exports = router;
