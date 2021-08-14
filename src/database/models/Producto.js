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
            
        },
        updated_at: {
            type: dataTypes.DATE, 
            
        },
        deleted_at: {
            type: dataTypes.DATE,
            defaultValue: true
            
        },
        nombre: {
            type: dataTypes.STRING(255),
            allowNull:false
        },
        imagen: {
            type: dataTypes.STRING(500), 
            
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
        stock: {
            type: dataTypes.INTEGER, 
            allowNull:false
        },
    }
    const config = {
        tablename: 'productos',
        timestamps: false,
        camelCase: false
    }

    const Producto = sequelize.define(alias,cols,config);
    
    Producto.associate = function (models) {
        Producto.belongsTo( models.Categoria, {
          as: "Categoria",
          foreignKey: "categoriaFK"
        });
        Producto.belongsToMany( models.Cliente, {
            as: "clientes",
            through: "pedidos",
            foreignKey: "productoFK",
            otherKey: "clienteFK",
            timestamps: false
        })
    }

    return Producto;
}