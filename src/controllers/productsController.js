const fs = require('fs');
const path = require('path');
const { inflateRaw } = require('zlib');
const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const db =require ("../database/models")


const productsController = 
{
    listadoProductos: (req, res) => {
        res.render("producto", {productos: products})
    },

    index:(req,res) =>{
        res.render("index", {productos: products})
    },

    detalleProductos: (req, res) => {
        let productoId = req.params.id
        for (let i = 0; i < products.length; i++){
            if (products[i].id == productoId){
                var productoEncontrado = products[i]
            }
        }
        res.render("detail", {productoEnDetalle:productoEncontrado})
    },

//CREATE Y STORE
    creacionProducto:(req, res) => {
        res.render("creacionProducto") 
    },

    checkCreacionProducto:(req, res) => {
        let nombreImagen=req.file.filename;
		let idNuevo = products[products.length-1].id + 1;
		let nuevoObjeto =  Object.assign({id: idNuevo},req.body,{image:nombreImagen});
		products.push(nuevoObjeto);
   	    fs.writeFileSync(productsFilePath, JSON.stringify(products,null, ' '));
		res.redirect('/');
    },


//EDIT Y UP0DATE
    edicionProducto:(req, res) => {
        var productoId = req.params.id;
        for (let i=0; i < products.length; i++){
            if (products[i].id == productoId){
                var productoEncontrado = products[i]
            }
        }
        res.render("edicionProducto", {productoEnDetalle: productoEncontrado}) 
    },

    checkEdicionProducto:(req, res) => {
        let valoresNuevos = req.body;
        let productoId = req.params.id;

        for (let i = 0; i < products.length; i++){
            if(products[i].id == productoId){
                products[i].name = valoresNuevos.name;
				products[i].price = valoresNuevos.price;
				products[i].discount = valoresNuevos.discount;
				products[i].category = valoresNuevos.category;
				products[i].description = valoresNuevos.description;
                products[i].image = (req.file != undefined)? req.file.filename : products[i].image;
                var productoEncontrado = products[i];

                break;
            }
        }

         fs.writeFileSync(productsFilePath, JSON.stringify(products,null, ' '));
        res.render("detail", {productoEnDetalle: productoEncontrado})
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