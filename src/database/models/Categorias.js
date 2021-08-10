module.exports = (sequelize, dataTypes) => {

    const alias = 'categorias';

    const cols = {
        id: { 
            type: dataTypes.INTEGER, 
            primaryKey:true, 
            autoIncrement:true
        },
        create_at: {
            type: dataTypes.DATE
        },
        update_at: {
            type: dataTypes.DATE
        },
        delete_at: {
            type: dataTypes.DATE
        },
        nombre: {
            type: dataTypes.STRING(255)
        },
        descripcion: {
            type: dataTypes.STRING(255)
        }
    }
    config = {
      tablename: 'categorias',
      timestamps: false,
      camelCase: false
    }
    const Categorias = sequelize.define(alias,cols,config);

    Categorias.associate = function (models){

      Categorias.hasMany( models.Productos, {
        as: "productos",
        foreignKey: "categoriaFK"
      });

  }
    
    return Categorias;
}