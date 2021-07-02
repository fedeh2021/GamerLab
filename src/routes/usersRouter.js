const usersController = require('../controllers/usersController');

const express = require('express');
const router = express.Router();

/* GET users listing. */

router.get('/login',usersController.login);

router.get('/register',usersController.registro);

router.get('/profile',usersController.perfil);

router.get('/carrito',usersController.carrito);

module.exports = router;
