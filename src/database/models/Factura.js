module.exports = (sequelize, dataTypes) => {

    const alias = 'Factura'

    const cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        total_a_pagar: {
            type: dataTypes.DECIMAL,
            allowNull:false
        }
    }
    const config = {
        tablename: 'facturas',
        timestamps: false,
        camelCase: false
    }

    const Factura = sequelize.define(alias, cols, config);

    Factura.associate = function (models){

        Factura.hasMany(models.Pedido, {
           as: "pedidos",
           foreignKey: "facturaFK"
            });
    }
   
    return Factura;
}