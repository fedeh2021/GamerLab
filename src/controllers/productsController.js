// ************ Require's ************
const fs = require('fs');
const path = require('path');


// ************ Require DATABASE ************
const db = require ("../database/models")
const uploadFile = require ("../middlewares/imageMiddleware");


// ************ otros Require's ************
const { inflateRaw } = require('zlib');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const { response } = require('express');
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

// JSON (borrar cuando esté lista la BDD)
// const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
// const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));


// ************ Controller ************
const productsController = {

/*** LISTADO DE TODOS LOS PRODUCTOS ***/
    listadoProductos: (req, res) => {
        db.Producto.findAll()
        .then(function(productos){
            return res.render("producto", {productos})
        })
    },

    index:(req,res) =>{
    /*
        db.Producto.findAll()
        .then(function(productos) {
            res.render ("producto", {productos})
        })
    },*/

    // SEGUNDA OPCION INDEX 
        db.Producto.findAll({include: [{association: 'productos'}, {association: 'categorias'}]}) 
        .then((productos) => {
        let listadoProductos = [];
        for (producto of productos){
            let listaCategorias = [];
            for (producto of productos.productos){
                listadoProductos.push(producto.nombre + producto.imagen);
            }
            let objaux = {
                nombre: producto.nombre,
                imagen: producto.imagen
            }
            listadoProductos.push(objaux);
        }
        
        res.render("index", {productos: listadoProductos})
    })},

/*** DETALLE DE PRODUCTO ***/
    detalleProductos: (req, res) => {        
        db.Producto.findByPk(req.params.id, {
            include: [{association: "categorias"}]
        })
        .then(function(productos, categorias){
            res.render("detail", {productos, categorias})
        })
    },

/*** CREATE Y STORE ***/
    creacionProducto:(req, res) => {
        db.categorias.findAll()
        .then(function(categorias){
            return res.render("creacionProducto", {categorias})
        } )
    },

    checkCreacionProducto:(req, res) => {
        db.Producto.create({
            categoria_fk: req.body.category,
            nombre: req.body.name,
            imagen: req.file.filename,
            descripcion: req.body.description,
            precio_lista: req.body.price,
            descuento: req.body.discount,
            stock: req.body.stock,
            deleteable: 0,
            created_at: Date.now(),
            updated_at: Date.now(),
            deleted_at: Date.now(),
        })
        res.redirect('/');    
    },


/*** EDIT Y UPDATE DE UN PRODUCTO***/
    edicionProducto:(req, res) => {
        let pedidoProducto = db.Producto.findByPk(req.params.id);
        let pedidoCategorias = db.categorias.findAll();

        Promise.all([pedidoProducto, pedidoCategorias])
        .then(function([productos, categorias]){
            res.render ("edicionProducto", {productos, categorias})
        })
    },
 
    checkEdicionProducto:(req, res) => {
        db.Producto.update({
            nombre: req.body.name,
            imagen: req.file.filename,
            descripcion:req.body.description,
            precio_lista: req.body.price,
            descuento: req.body.discount,
            categoria_fk: req.body.category,
            deleteable: 0,
            stock: req.body.stock

        }, {where:{
            id:req.params.id
            }}
        )
        res.redirect('/products/detail/' + req.params.id);  
    },


/*** BORRAR UN PRODUCTO ***/
    delete:(req, res) => {
        db.Producto.update({
            deleteable: 0
        }, {where:{
            id:req.params.id
            }}
        )
        
        res.redirect("/");

    },
    search: function(req, res) {
        db.Producto.findAll({
            where: { nombre: {[Op.like]: '%' + req.query.keyword + '%'}}
        }).then(productos => {
            if (productos.length > 0) {
            return res.status(200).json(productos);
        }
        return res.status(200).json('No existen productos')
        })
    }

};


// ************ Export ************
module.exports = productsController;