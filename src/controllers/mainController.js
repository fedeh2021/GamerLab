// ************ Require's ************
const fs = require('fs');
const path = require('path');


const { Op } = require("sequelize");
const { response } = require('express');

// JSON (borrar cuando esté lista la BDD)
//const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
//const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

// ************ Require DATABASE ************
const db = require ("../database/models")


// ************ Controller ************
const mainController = 
{
    index: (req, res) => {
        db.Producto.findAll()
        .then(function(productos) {
            res.render ("index", {productos})
        })
    }
}


// ************ Export ************
module.exports = mainController