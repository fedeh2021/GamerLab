const productsController = require("../controllers/productsController");
const multer = require ("multer");
const path = require ("path");
const express = require('express');
const router = express.Router();
//const categoriaMiddlewarre = require ("../middlewares/categoriaMiddleware");

//MULTER
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


//RUTEO

router.get('/', productsController.index); 

/****/
router.get("/producto", productsController.listadoProductos); 
router.get("/detail/:id", productsController.detalleProductos);


router.get("/edit/:id", productsController.edicionProducto);
router.put("/edit/:id", productsController.checkEdicionProducto);


router.get("/create", productsController.creacionProducto);
router.post("/create", uploadFile.single('usuario'), productsController.checkCreacionProducto); 


router.delete("/:id", productsController.delete)

module.exports = router;