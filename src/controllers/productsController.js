const productsController = 
{
    listadoProductos: (req, res) => {
        res.render("producto")
    },

    detalleProductos: (req, res) => {
        res.render("detail")
    },

    creacionProducto:(req, res) => {
        res.render("creacionProducto") 
    },

    edicionProducto:(req, res) => {
        res.render("edicionProducto") 
    }
};

module.exports = productsController;