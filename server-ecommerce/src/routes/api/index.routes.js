const express = require("express");
const router = express.Router();

router.use("/usuarios", require("./usuarios.routes"));
router.use("/productos", require("./productos.routes"));

module.exports = router;
