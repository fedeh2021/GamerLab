const fs = require('fs');
const path = require('path');
const { inflateRaw } = require('zlib');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));


const productsController = 
{
    listadoProductos: (req, res) => {
        res.render("producto", {productos: products})
    },

    index:(req,res) =>{
        res.render("index", {productos: products})
    },

    detalleProductos: (req, res) => {
        let idProducto = req.params.id
        for (let i = 0; i < products.length; i++){
            if (idProducto == products[i].id){
                var productoEnDetalle = products[i]
            }
        }
        res.render("detail", {productoEnDetalle:productoEnDetalle})
    },

    creacionProducto:(req, res) => {
        res.render("creacionProducto") 
    },

    edicionProducto:(req, res) => {
        var productoId = req.param.id
        for (let i=0; i<products.length; i++){
            if (products[i].id == productoId){
                var productoEncontrado = products[i]
            }
        }
        res.render("edicionProducto", {productoAEditar: productoEncontrado}) 
    },

    //delete:(req, res)
};

module.exports = productsController;