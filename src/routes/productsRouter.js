// ************ Require's ************
const express = require('express');
const router = express.Router();
const path = require ("path");

const multer = require ("multer");


// ************ Controller Require ************
const productsController = require("../controllers/productsController");


// ************ Middlewares ************
//const categoriaMiddlewarre = require ("../middlewares/categoriaMiddleware");


// ************ Multer ************
const multerDS = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, path.join(__dirname, '../../public/img'));
    },
    filename: function(req, file, cb){
        let nameImage = Date.now() + path.extname(file.originalname);
        cb(null, nameImage);
    }
});
const uploadFile = multer({ storage: multerDS });


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
router.post("/create", uploadFile.single('image'), productsController.checkCreacionProducto); 
 
/*** ELIMINAR UN PRODUCTO ***/
router.delete("/delete/:id", productsController.delete)


// ************ Export ************
module.exports = router;