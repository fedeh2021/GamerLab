const productos = {
    listadoProductos: (req, res) => {
        res.sendFile("./views/listadoProductos.ejs") /*no existe esta vista*/ 
    },
    detalleProductos: (req, res) => {
        res.sendFile("./views/producto.ejs")
    },
    creacionProducto:(req, res) => {
        res.sendFile("./views/creacionProducto.ejs") /*no existe esta vista*/ 
    },
    edicionProducto:(req, res) => {
        res.sendFile("./views/edicionProducto.ejs")
    },
};

module.exports = productos;