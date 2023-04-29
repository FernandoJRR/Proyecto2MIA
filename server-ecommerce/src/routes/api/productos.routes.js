const express = require("express");
const ObjectId = require("mongoose").Types.ObjectId;
const Producto = require("../../model/Producto");
const multer = require("multer");
const fs = require("fs");

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./tmp/");
  },
  filename: function (req, file, cb) {
    const extension =
      file.mimetype.split("/")[1] === "jpeg"
        ? "jpg"
        : file.mimetype.split("/")[1];

    filename = "tempImage." + extension;
    cb(null, filename);
  },
});

router.get("/", async (_req, res) => {
  const productos = await Producto.find();
  res.json(productos);
});

router.post(
  "/",
  multer({ storage: storage }).single("imagen"),
  async (req, res) => {
    const image = req.file;

    console.log(req.body);
    //Se procesa la imagen
    const extension =
      image.mimetype.split("/")[1] === "jpeg"
        ? "jpg"
        : image.mimetype.split("/")[1];

    const insert = new Producto({
      nombre: req.body.nombre,
      precio: req.body.precio,
      descripcion: req.body.descripcion,
      categoria: req.body.categoria,
      vendedor: req.body.vendedor,
      urlImagen: null,
      pedido: null,
      aceptado: false,
    });

    try {
      const result = await insert.save();
      const nombreImagen = result._id + "." + extension;

      fs.rename(
        "./tmp/" + image.filename,
        "./images/" + nombreImagen,
        function (err) {
          if (err) console.log("ERROR: " + err);
        }
      );

      await Producto.updateOne(
        { _id: result._id },
        { $set: { urlImagen: nombreImagen } }
      );
      res.json({ ok: "Solicitud Enviada" });
    } catch (error) {
      res.json({ error: err });
    }
  }
);

router.get("/:producto", async (req, res) => {
  const idProducto = req.params.producto;
  const producto = await Producto.findOne({ _id: new ObjectId(idProducto) });
  if (producto == null) {
    res.json({ error: "Producto no existe" });
    return;
  }
  res.json(producto);
});

router.patch(
  "/:producto",
  multer({ storage: storage }).single("imagen"),
  async (req, res) => {
    const idProducto = req.params.producto;
    const producto = await Producto.findOne({ _id: new ObjectId(idProducto) });
    const body = req.body;
    const image = req.file;

    if (producto == null) {
      fs.rm("./tmp/" + image.filename);
      res.json({ error: "Producto no existe" });
      return;
    } else {
      //Si se envio una imagen
      if (image !== undefined) {
        const extension =
          image.mimetype.split("/")[1] === "jpeg"
            ? "jpg"
            : image.mimetype.split("/")[1];

        const nuevoNombre = idProducto + "." + extension;
        const antiguoNombre = producto.urlImagen;

        try {
          const update = await Producto.updateOne(
            { _id: idProducto },
            {
              $set: {
                nombre: body.nombre,
                precio: body.precio,
                descripcion: body.descripcion,
                categoria: body.categoria,
                urlImagen: nuevoNombre,
              },
            }
          );

          fs.rm("./images/" + antiguoNombre, function (err) {
            if (err) console.log("ERROR: " + err);
            fs.rename(
              "./tmp/" + image.filename,
              "./images/" + nuevoNombre,
              function (err) {
                if (err) console.log("ERROR: " + err);
              }
            );
          });

          res.json({ ok: "Producto modificado exitosamente" });
          return;
        } catch (error) {
          res.json({ error: error });
          return;
        }
      } else {
        try {
          const update = await Producto.updateOne(
            { _id: new ObjectId(idProducto) },
            {
              $set: {
                nombre: body.nombre,
                precio: body.precio,
                descripcion: body.descripcion,
                categoria: body.categoria,
              },
            }
          );
          if (update.modifiedCount === 0) {
            res.json({ ok: "No se ha modificado el producto" });
            return;
          } else {
            res.json({ ok: "Producto modificado exitosamente" });
            return;
          }
        } catch (error) {
          res.json({ error: error });
          return;
        }
      }
    }
  }
);

module.exports = router;
