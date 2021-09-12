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
const { validationResult } = require('express-validator');


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
            updated_at: 0,
            deleted_at: 0,
        })
        res.redirect('/');    
    },


/*** EDIT Y UPDATE DE UN PRODUCTO***/
    edicionProducto:async (req, res) => {
        let productos = await db.Producto.findByPk(req.params.id)
        let categorias = await db.categorias.findAll();

            return res.render ("edicionProducto", {productos, categorias})
    },
 
    checkEdicionProducto:(req, res) => {
        db.Producto.update({
            nombre: req.body.name,
            imagen: req.file.filename,
            descripcion:req.body.description,
            precio_lista: req.body.price,
            descuento: req.body.discount,
            categoria_fk: req.body.category,
            updated_at: Date.now(),
            deleteable: 1,
            stock: req.body.stock

        }, {where:{
            id:req.params.id
            }}
        ).then(function(){res.redirect('/products/detail/' + req.params.id)})
    },


/*** BORRAR UN PRODUCTO ***/
    delete:(req, res) => {
        db.Producto.update({
            deleteable: 0,
            deleted_at: Date.now(),
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
    },

    categorias: async (req, res) => {
        let productos = await db.Producto.findAll({
                        where: {categoria_fk: req.params.id}
                        })
        let categorias = await db.categorias.findOne({
                        where: {id: req.params.id}
                        });

            return res.render ("categoria", {productos, categorias})
    }
};


// ************ Export ************
module.exports = productsController;