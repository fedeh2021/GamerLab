const fs = require('fs');
const path = require('path');
const { inflateRaw } = require('zlib');
const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const db =require ("../database/models")


const productsController = 
{
    listadoProductos: (req, res) => {
        db.productos.findAll()
        .then(function(productos){
            res.render("producto", {productos: db.productos})
        })
    },

    index:(req,res) =>{
        db.productos.findAll()
        .then(function(productos) {
            res.render ("productos", {productos: db.productos})
        })
    },

    detalleProductos: (req, res) => {        
        
        db.pelicula.FindByPk(req.params.id, {
            include: [{association: categorias}]
        })
        .then(function(pelicula){
            res.render("detail", {productoEnDetalle:productoEncontrado})
        })
       
    },

//CREATE Y STORE
    creacionProducto:(req, res) => {
        db.productos.findAll()
        .then(function(resultado){
            return res.render("creacionProducto", {producto: db.productos})
        } )
    },

    checkCreacionProducto:(req, res) => {
        db.productos.create({
            nombre: req.body.name,
            descripcion:req.body.description,
            precio_lista: req.body.price,
            descuento: req.body.discount,
            categoriaFK: req.body.category,

        })
        res.redirect('/');    
        /*let nombreImagen=req.file.filename;
            let idNuevo = products[products.length-1].id + 1;
            let nuevoObjeto =  Object.assign({id: idNuevo},req.body,{image:nombreImagen});
            products.push(nuevoObjeto);
            fs.writeFileSync(productsFilePath, JSON.stringify(products,null, ' '));
            res.redirect('/');*/
    },


//EDIT Y UP0DATE
    edicionProducto:(req, res) => {
        let pedidoProducto = db.productos.findByPk(req.params.id);
        //let pedidoCategorias = db.categorias.findAll();

        Promise.all([pedidoProducto, pedidoCategoria])
        .then(function(producto){
            res.render ("edicionPorducto", {productoEnDetalle: producto})
        })
    },
 
    checkEdicionProducto:(req, res) => {
        db.productos.update({
            nombre: req.body.name,
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


    //DELETE
    delete:(req, res) => {
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

		}
    
};

module.exports = productsController;