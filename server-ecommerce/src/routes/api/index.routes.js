const express = require("express");
const router = express.Router();

router.use("/usuarios", require("./usuarios.routes"));

module.exports = router;
