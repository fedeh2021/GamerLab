// ************ Require's ************
const express = require('express');
const router = express.Router();


// ************ Controller Require ************
const mainController = require("../controllers/mainController");


// ************ Views ************

/*** HOME PAGE ***/
router.get('/', mainController.index);


// ************ Export ************
module.exports = router;