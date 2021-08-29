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


// ************ Controller ************
const productsController = {


/*** LISTADO DE TODOS LOS PRODUCTOS ***/
    listadoProductos: (req, res) => {
        let pedidoProductos = db.Producto.findAll()
        let pedidoClientes = db.Cliente.findAll()

        Promise.all([pedidoProductos, pedidoClientes])
        .then(function([productos, clientes]){
            return res.render("producto", {productos, clientes})
        })
    },

    index:(req,res) =>{
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

    // SEGUNDA OPCION INDEX (se puede borrar !?)
        /*
        db.Producto.findAll()
        .then(function(productos) {
            res.render ("producto", {productos})
        })
    },
    */


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
            deleteable: 1,
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
            deleteable: 1,
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
        })
        
        .then(productos => {
            if (productos) {
            return res.render("productoBuscado", {productos});
        }
        return res.status(200).json('No existen productos')
        })
    }
};


// ************ Export ************
module.exports = productsController;