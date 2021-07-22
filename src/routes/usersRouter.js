// ************ Require's ************
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { body } = require('express-validator');
const validations = require('../middlewares/validateRegisterMiddleware');
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');

// ************ Multer ************
const multerDS = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, path.join(__dirname, '../../public/img/avatars'));
    },
    filename: function(req, file, cb){
        let nameImage = Date.now() + path.extname(file.originalname);
        cb(null, nameImage);
    }
});

const uploadFile = multer({ storage: multerDS });

// ************ Controller Require ************
const usersController = require('../controllers/usersController');

// ************ Views ************

/*** LOGIN DE USUARIO EXISTENTE ***/
router.get('/login', guestMiddleware ,usersController.login);
router.post('/login', usersController.checkLogin);


/*** REGISTRAR UN NUEVO USUARIO ***/
router.get('/register', guestMiddleware ,usersController.registro);
router.post('/register', uploadFile.single('avatar'), validations ,usersController.checkRegistro);

/*** VER TU INFORMACION Y EDITAR ***/ 
router.get('/profile/', authMiddleware ,usersController.perfil);
router.put('/profile/:id', usersController.update);

/*** VER EL CARRITO ***/
router.get('/cart',usersController.carrito);

/*** CERRAR SESION ***/
router.get('/logout',usersController.logout)

module.exports = router;