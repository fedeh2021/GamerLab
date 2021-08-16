// ************ Require's ************
const express = require('express');
const router = express.Router();
const path = require('path');

const { body } = require('express-validator');


// ************ Controller Require ************
const usersController = require('../controllers/usersController');


// ************ Middlewares ************
const validations = require('../middlewares/validateRegisterMiddleware');
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');
const uploadFile = require('../middlewares/multerMiddleware');


// ESTO SE PUEDE BORRAR? YA ES UN MIDDLEWARE, NO? 
/*const validations = [
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
*/


// ************ Views ************

/*** LOGIN DE USUARIO EXISTENTE ***/
router.get('/login', guestMiddleware, usersController.login);
router.post('/login', usersController.checkLogin);

/*** REGISTRAR UN NUEVO USUARIO ***/
router.get('/register', guestMiddleware ,usersController.registro);
router.post('/register', uploadFile.single('imagen'), validations, usersController.checkRegistro);

/*** VER TU INFORMACION Y EDITAR ***/ 
router.get('/profile/', authMiddleware ,usersController.perfil);
router.put('/profile/:id', usersController.update);

/*** VER EL CARRITO ***/
router.get('/cart', usersController.carrito);

/*** CERRAR SESION ***/
router.get('/logout',usersController.logout)


// ************ Export ************
module.exports = router;