module.exports = (sequelize, dataTypes) => {

    const alias = 'categorias';

    const cols = {
        id: { 
            type: dataTypes.INTEGER, 
            primaryKey:true, 
            autoIncrement:true
        },
        created_at: {
            type: dataTypes.DATE
        },
        updated_at: {
            type: dataTypes.DATE
        },
        deleted_at: {
            type: dataTypes.DATE
        },
        nombre: {
            type: dataTypes.STRING(255)
        },
        descripcion: {
            type: dataTypes.STRING(255)
        }
    }
    const config = {
      tablename: 'categorias',
      timestamps: false,
      camelCase: false
    }

    const Categoria = sequelize.define(alias,cols,config);

    Categoria.associate = function(models){

      Categoria.hasMany(models.productos, {
        as: "productos",
        foreignKey: "categoriaFK"
      });

  }
    
    return Categoria;
}