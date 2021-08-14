module.exports = (sequelize, dataTypes) => {

    const alias = 'Producto';

    const cols = {
        id: { 
            type: dataTypes.INTEGER, 
            primaryKey:true, 
            autoIncrement:true
        },
        created_at: {
            type: dataTypes.DATE, 
            allowNull:false
        },
        updated_at: {
            type: dataTypes.DATE, 
            allowNull:false
        },
        deleted_at: {
            type: dataTypes.DATE, 
            allowNull:false
        },
        nombre: {
            type: dataTypes.STRING(255),
            allowNull:false
        },
        imagen: {
            type: dataTypes.STRING(500), 
            allowNull:false
        },
        descripcion: {
            type: dataTypes.STRING(255), 
            allowNull:false
        },
        precio_lista: { 
            type: dataTypes.DECIMAL, 
            allowNull:false
        },
        descuento: {
            type: dataTypes.DECIMAL, 
            allowNull:false
        },
    }
    const config = {
        tablename: 'productos',
        timestamps: false,
        underscored: true,
        camelCase: false
    }

    const Producto = sequelize.define(alias,cols,config)
    
    Producto.associate = function (models) {
        Producto.belongsTo( models.Categoria, {
          as: "categorias",
          foreignKey: "categoria_fk"
        });
        Producto.belongsToMany( models.Cliente, {
            as: "Cliente",
            through: "pedidos",
            foreignKey: "producto_fk",
            otherKey: "cliente_fk",
            timestamps: false
        })
    }

    return Producto;
}