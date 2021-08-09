module.exports = function moviesData(sequelize, Datatypes){

    alias = 'productos';

    cols = {
      id: { type: Datatypes.INTEGER, primaryKey:true, autoIncrement:true},
      create_at: {type: Datatypes.DATE},
      update_at: {type: Datatypes.DATE},
      delete_at: {type: Datatypes.DATE},
      nombre: {type: Datatypes.STRING(255)},
      imagen: {type: Datatypes.STRING(500)},
      descripcion: { type: Datatypes.STRING(255)},
      precio_lista: { type: Datatypes.DECIMAL},
      descuento: {type: Datatypes.DECIMAL},
    };
    config = {};

    productos = sequelize.define(alias,cols,config)
    
    return productos;
    }
    