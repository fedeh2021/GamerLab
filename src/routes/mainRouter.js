const mainController = require("../controllers/mainController");

const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', mainController.index);

module.exports = router;
