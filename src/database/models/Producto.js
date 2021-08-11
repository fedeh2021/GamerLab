module.exports = (sequelize, dataTypes) => {

    const alias = 'productos';

    const cols = {
        id: { 
            type: dataTypes.INTEGER, 
            primaryKey:true, 
            autoIncrement:true
        },
        create_at: {
            type: dataTypes.DATE, 
            allowNull:false
        },
        update_at: {
            type: dataTypes.DATE, 
            allowNull:false
        },
        delete_at: {
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
        camelCase: false
    }

    const Producto = sequelize.define(alias,cols,config)
    
    Producto.associate = function (models){
        Producto.belongsTo( models.Categoria, {
          as: "categorias",
          foreignKey: "categoriaFK"
        });
    }

    return Producto;
}