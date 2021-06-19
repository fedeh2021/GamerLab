const productsController = require("../controllers/productsController");

const express = require('express');
const router = express.Router();

//RUTEO
router.get("/detalle", productsController.detalleProductos);

router.get("/edicionProducto", productsController.edicionProducto);

router.get("/creacionProducto", productsController.creacionProducto);

router.get("/listado", productsController.listadoProductos); //no existe

module.exports = router;