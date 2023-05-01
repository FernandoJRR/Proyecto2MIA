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

router.get("/:pedido", async (req, res) => {
  const codigoPedido = req.params.pedido;
  const pedido = await Pedido.findOne({ _id: codigoPedido });
  res.json(pedido);
});

router.patch("/:pedido", async (req, res) => {
  const codigoPedido = req.params.pedido;

  const fechaPedido = new Date(req.body.fechaPedido);
  const fechaEntrega = new Date(req.body.fechaEntrega);
  fechaPedido.setHours(24);
  fechaEntrega.setHours(24);
  try {
    await Pedido.updateOne(
      { _id: codigoPedido },
      {
        $set: {
          fechaPedido: fechaPedido,
          fechaEntrega: fechaEntrega,
        },
      }
    );

    res.json({ ok: "Pedido Modificado" });
  } catch (error) {
    console.log(error);
    res.json({ error: error });
  }
});

router.put("/:pedido", async (req, res) => {
  const codigoPedido = req.params.pedido;
  const fieldACambiar = req.body.field;
  const nuevoValor = req.body.value;

  try {
    await Pedido.updateOne(
      { _id: codigoPedido },
      { $set: { [fieldACambiar]: nuevoValor } }
    );

    res.json({ ok: "Pedido Entregado" });
  } catch (error) {
    res.json({ error: err });
  }
});

module.exports = router;
