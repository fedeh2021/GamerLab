const productsController = 
{
    listadoProductos: (req, res) => {
        res.render("listadoProductos") /*no existe esta vista*/ 
    },

    detalleProductos: (req, res) => {
        res.render("producto")
    },

    creacionProducto:(req, res) => {
        res.render("creacionProducto") /*no existe esta vista*/ 
    },

    edicionProducto:(req, res) => {
        res.render("edicionProducto") /*no existe esta vista*/ 
    }
};

module.exports = productsController;