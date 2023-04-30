const express = require("express");
const router = express.Router();

router.use("/usuarios", require("./usuarios.routes"));
router.use("/productos", require("./productos.routes"));
router.use("/tarjetas", require("./tarjetas.routes"));
router.use("/pedidos", require("./pedidos.routes"));

module.exports = router;
