const fs = require('fs');
const path = require('path');
// const { inflateRaw } = require('zlib');
// const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
// const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const db =require ("../database/models")

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");


const productsController = 
{
    listadoProductos: (req, res) => {
        db.productos.findAll()
        .then(function(productos){
            return res.render("producto", {productos: db.productos})
        })
    },

    index:(req,res) =>{
        db.productos.findAll()
        .then(function(productos) {
            res.render ("productos", {productos: db.productos})
        })
    },

    //SEGUNDA OPCION INDEX
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
    })
*/

    detalleProductos: (req, res) => {        
        
        db.productos.FindByPk(req.params.id, {
            include: [{association: categorias}]
        })
        .then(function(productos){
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


//EDIT Y UPDATE
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
            
        db.producto.destroy({
            where: {
                id: req.params.id
            }
        })
        
        res.redirect("/");

    }

    /*
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
    */
   
};

module.exports = productsController;