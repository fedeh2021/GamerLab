var express = require('express');
var router = express.Router();
var usersControllers = require ("../controllers/usersControllers")

/* GET users listing. */
router.get('/login', usersControllers.login);

router.get("/register", usersControllers.registro);

router.get("/profile", usersControllers.perfil);

module.exports = userRouter;
