var express = require('express');
var router = express.Router();
var productsControllers = require ("../controllers/productosController");


//RUTEO
router.get("/detalle", productsControllers.detalleProductos);

router.get("/edicionProducto", productsControllers.edicionProducto);

router.get("/creacionProducto", productsControllers.creacionProducto);

router.get("/listado", productsControllers.listadoProductos);