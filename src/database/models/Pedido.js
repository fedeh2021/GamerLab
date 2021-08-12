module.exports = (sequelize, dataTypes) => {

    const alias = 'pedidos'

    const cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        clienteFK: {
            type: dataTypes.INTEGER,
            allowNull:false
        },
        productoFK: {
            type: dataTypes.INTEGER,
            allowNull:false
        },
        facturaFK: {
            type: dataTypes.INTEGER,
            allowNull:false
        },
        precio_venta: {
            type: dataTypes.DECIMAL,
            allowNull: false
        },
        cantidad_prod: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        estado: {
            type: dataTypes.STRING,
            allowNull: false
        }
    }

    const config = {
        tablename: 'pedidos',
        timestamps: false,
        camelCase: false
    }

    const Pedido = sequelize.define(alias, cols, config);

    Pedido.associate = function(models){

        Pedido.belongsTo(models.facturas, {   
            as: "facturas",
            foreignKey: "facturaFK"
             });
        Pedido.belongsTo (models.productos, {
            as:"productos",
            foreignKey: "productoFK"
        })
     }

    return Pedido;
}