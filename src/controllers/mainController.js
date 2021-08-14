// ************ Require's ************
const fs = require('fs');
const path = require('path');

// JSON (borrar cuando esté lista la BDD)
const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));



// ************ Controller ************
const mainController = 
{
    index: (req, res) => {
        res.render("index", {productos:products})
    }
};


// ************ Export ************
module.exports = mainController