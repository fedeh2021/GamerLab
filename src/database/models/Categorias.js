module.exports = function moviesData(sequelize, Datatypes){

    alias = 'categorias';

    cols = {
      id: { type: Datatypes.INTEGER, primaryKey:true, autoIncrement:true},
      create_at: {type: Datatypes.DATE},
      update_at: {type: Datatypes.DATE},
      delete_at: {type: Datatypes.DATE},
      nombre: {type: Datatypes.STRING(255)},
      descripcion: { type: Datatypes.STRING(255)},
    };

    config = {};

    productos = sequelize.define(alias,cols,config)

    Categorias.associate = function (models){
      Categorias.hasMany( models.Productos, {
        as: "productos",
        foreignKey: "categoriaFK"
      });
  }
    
    return categorias;
}