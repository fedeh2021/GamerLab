// ************ Require's ************
const express = require('express');
const router = express.Router();
const path = require ("path");

// ************ Controller Require ************
const productsController = require("../controllers/productsController");


// ************ Middlewares ************
const uploadFile = require ("../middlewares/imageMiddleware");
const validations = require('../middlewares/validateProductMiddleware');

// ************ Views ************

/*** HOME PAGE ***/
router.get('/', productsController.index); 

/*** TODOS LOS PRODUCTOS Y DETALLE DE PRODUCTO ***/
router.get("/producto", productsController.listadoProductos); 
router.get("/detail/:id", productsController.detalleProductos);

/*** EDITAR UN PRODUCTO***/
router.get("/edit/:id", productsController.edicionProducto);
router.put("/edit/:id", uploadFile.single('image'), productsController.checkEdicionProducto);

/*** CREAR UN NUEVO PRODUCTO ***/
router.get("/create", productsController.creacionProducto);
router.post("/create", uploadFile.single('image'), validations, productsController.checkCreacionProducto); 
 
/*** ELIMINAR UN PRODUCTO ***/
router.delete("/delete/:id", productsController.delete)

router.get("/search", productsController.search)


// ************ Export ************
module.exports = router;