const express = require("express");
const cors = require('cors')
const mongoose = require("mongoose");
const apiRoutes = require("./routes/api/index.routes");

const app = express();
app.use(express.json());
app.use(cors())
app.use(express.static('public'));
app.use('/images', express.static('images'));

async function start() {
  try {
    const db = await mongoose.connect("mongodb://127.0.0.1:27017/eCommerceDB");
    console.log("Conectado a MongoDB a: " + db.connection.name);
  } catch (e) {
    console.error(e);
  }
}
start();

app.use("/api", apiRoutes);

app.listen(3100);
console.log("Listening on port: 3100");
