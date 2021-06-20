const productos = {
    listadoProductos: (req, res) => {
        res.render("./views/listadoProductos.ejs") /*no existe esta vista*/ 
    },
    detalleProductos: (req, res) => {
        res.render("producto")
    },
    creacionProducto:(req, res) => {
        res.render("./views/creacionProducto.ejs") /*no existe esta vista*/ 
    },
    edicionProducto:(req, res) => {
        res.render("./views/edicionProducto.ejs") /*no existe esta vista*/ 
    },
};

module.exports = productos;