// ************ Require's ************
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { body } = require('express-validator');
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

const validations = [
    body('name').notEmpty().withMessage('Tienes que escribir un nombre'),
    body('email').notEmpty().withMessage('Tienes que escribir un email').bail().isEmail().withMessage('Tenes escribir un formato de email'),
    body('password').notEmpty().withMessage('Tienes que escribir un password'),
    body('birthdate').notEmpty().withMessage('Tienes que seleccionar una fecha'),
    body('avatar').custom((value, { req }) => {
        let file = req.file;
        let acceptedExtensions = ['.jpg', '.png', '.gif'];
        if (!file) {
            throw new Error('Tenes que subir una imagen');
        } else {
           let fileExtension = path.extname(file.originalname);
           if (!acceptedExtensions.includes(fileExtension)) {
            throw new Error ('Las extensiones de archivo permitidas son ${acceptedExtensions.join(',')}');

        }
        }
        return true;
    })
];

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