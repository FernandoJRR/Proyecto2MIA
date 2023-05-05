const express = require("express");
const ObjectId = require("mongoose").Types.ObjectId;
const Pedido = require("../../model/Pedido");
const Producto = require("../../model/Producto");

const router = express.Router();

router.get("/:reporte", async (req, res) => {
  const reporte = req.params.reporte;
  switch (reporte) {
    case "1":
      //Ultimos 10 productos vendidos en un intervalo de tiempo
      const pedidos_en_fechas = await Pedido.aggregate([
        {
          $match: {
            fechaPedido: {
              $gte: new Date(req.query.fechaInicial.toString() + " 00:00"),
              $lte: new Date(req.query.fechaFinal.toString() + " 24:00"),
            },
          },
        },
      ]);
      let productosArray = [];
      pedidos_en_fechas.forEach((pedido) => {
        productosArray = productosArray.concat(pedido.productos);
      });
      productosArray = productosArray.slice(0,10)
      let codigosProductos = [];
      productosArray.forEach(codigo => {
        codigosProductos.push({ _id: codigo });
      });
      res.json({ ok: codigosProductos });
      break;
    case "2":
      //Top 5 clientes que más ganancias por compras han generado en un intervalo de tiempo.
      const reporte_2 = await Pedido.aggregate([
        {
          $match: {
            fechaPedido: {
              $gte: new Date(req.query.fechaInicial.toString() + " 00:00"),
              $lte: new Date(req.query.fechaFinal.toString() + " 24:00"),
            },
          },
        },
        {
          $group: {
            _id: "$comprador",
            "Total Gastado": { $sum: { $multiply: ["$total", 0.05] } },
          },
        },
        { $limit: 5 },
        { $sort: { "Total Gastado": -1 } },
      ]);
      res.json({ ok: reporte_2 });
      return;
    case "3":
      //Top 5 clientes que mas productos han vendido en un intervalo de tiempo
      const pedidos_fechas = await Pedido.aggregate([
        {
          $match: {
            fechaPedido: {
              $gte: new Date(req.query.fechaInicial.toString() + " 00:00"),
              $lte: new Date(req.query.fechaFinal.toString() + " 24:00"),
            },
          },
        },
      ]);
      let productos = [];
      let productos_clientes = new Map();
      pedidos_fechas.forEach((pedido) => {
        productos = productos.concat(pedido.productos);
      });
      for await (const codigo_producto of productos) {
        const productoModel = await Producto.findOne({
          _id: new ObjectId(codigo_producto),
        });
        const vendedor = productoModel.vendedor;
        if (productos_clientes.has(vendedor)) {
          productos_clientes.set(
            vendedor,
            productos_clientes.get(vendedor) + 1
          );
        } else {
          productos_clientes.set(vendedor, 1);
        }
      }
      productos_clientes = new Map(
        [...productos_clientes].sort((a, b) => {
          return b[1] - a[1];
        })
      );
      let productos_total = [];
      productos_clientes.forEach((value, key) => {
        productos_total.push({ _id: key, "Productos Vendidos": value });
      });
      res.json({ ok: productos_total.slice(0,5) });
      break;
    case "4":
      //Top 10 clientes que mas pedidos han realizado en un intevrvalo de tiempo
      const reporte_4 = await Pedido.aggregate([
        {
          $match: {
            fechaPedido: {
              $gte: new Date(req.query.fechaInicial.toString() + " 00:00"),
              $lte: new Date(req.query.fechaFinal.toString() + " 24:00"),
            },
          },
        },
        { $group: { _id: "$comprador", "Total de Pedidos": { $count: {} } } },
        { $limit: 5 },
        { $sort: { "Total de Pedidos": -1 } },
      ]);
      res.json({ ok: reporte_4 });
      break;
    case "5":
      const reporte_5 = await Producto.aggregate([
        { $group: { _id: "$vendedor", "Productos en Venta": { $count: {} } } },
        { $limit: 5 },
        { $sort: { "Productos en Venta": -1 } },
      ]);
      res.json({ ok: reporte_5 });
      break;
    default:
      break;
  }
});

module.exports = router;
