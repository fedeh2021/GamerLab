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
            type: dataTypes.VARCHAR(255),
            allowNull: false
        }
    }

    const config = {
        tablename: 'pedidos',
        timestamps: false,
        camelCase: false
    }

    const Pedido = sequelize.define(alias, cols, config);

    return Pedido;
}