// ************ Require's ************
const fs = require('fs');
const path = require('path');


// ************ Require DATABASE ************
const db =require ("../database/models")


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
        db.Producto.findAll()
        .then(function(productos) {
            res.render ("producto", {productos})
        })
    },

    // SEGUNDA OPCION INDEX 
      /*  db.Producto.findAll({include: [{association: 'productos'}, {association: 'categorias'}]}) 
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
    }) */

/*** DETALLE DE PRODUCTO ***/
    detalleProductos: (req, res) => {        
        db.Producto.findByPk(req.params.id, {
            include: [{association: "categorias"}]
        })
        .then(function(productos){
            res.render("detail", {productos})
        })
    },

/*** CREATE Y STORE ***/
    creacionProducto:(req, res) => {
        db.Producto.findAll()
        .then(function(productos){
            return res.render("creacionProducto", {productos})
        } )
    },

    checkCreacionProducto:(req, res) => {
        db.Producto.create({
            nombre: req.body.name,
            imagen: req.body.image,
            descripcion:req.body.description,
            precio_lista: req.body.price,
            descuento: req.body.discount,
            stock: req.body.stock,
            categoriaFK: req.body.category,
        })
        res.redirect('/');    

        /*let nombreImagen=req.file.filename;
            let idNuevo = products[products.length-1].id + 1;
            let nuevoObjeto =  Object.assign({id: idNuevo},req.body,{image:nombreImagen});
            products.push(nuevoObjeto);
            fs.writeFileSync(productsFilePath, JSON.stringify(products,null, ' '));
            res.redirect('/');*/

       //SEGUNDA OPCION INDEX 
       // db.Producto.create({
       //    nombre: req.body.name
        //let nombreImagen=req.file.filename;
		//let idNuevo = products[products.length-1].id + 1;
		//let nuevoObjeto =  Object.assign({id: idNuevo},req.body,{image:nombreImagen});
		//products.push(nuevoObjeto);
   	    //fs.writeFileSync(productsFilePath, JSON.stringify(products,null, ' '));
        //})
         //  res.redirect('/');
    },


/*** EDIT Y UPDATE DE UN PRODUCTO***/
    edicionProducto:(req, res) => {
        let pedidoProducto = db.Producto.findByPk(req.params.id);
        let pedidoCategoria = db.Categoria.findAll();

        Promise.all([pedidoProducto, pedidoCategoria])
        .then(function(productos, categorias){
            res.render ("edicionProducto", {productos, categorias})
        })
    },
 
    checkEdicionProducto:(req, res) => {
        db.Producto.update({
            nombre: req.body.name,
            imagen: req.body.image,
            descripcion:req.body.description,
            precio_lista: req.body.price,
            descuento: req.body.discount,
            categoriaFK: req.body.category,

        }, {where:{
            id:req.params.id
            }}
        )
        res.redirect('/productos' + req.params.id);  
    },


/*** BORRAR UN PRODUCTO ***/
    delete:(req, res) => {
        db.Producto.destroy({
            where: {
                id: req.params.id
            }
        })
        
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

    /* delete:(req, res) => {
        let productoId = req.params.id;	
		for(let i=0; i < products.length; i++){
			if (products[i].id == productoId){
				var nombreImagen = products[i].image;
				products.splice(i,1);
				break;
			}
		}
		
	    fs.writeFileSync(productsFilePath, JSON.stringify(products,null, ' '));
		fs.unlinkSync(path.join(__dirname,'../../public/img/'+nombreImagen));
        
		res.redirect("/");

		} */
};


// ************ Export ************
module.exports = productsController;