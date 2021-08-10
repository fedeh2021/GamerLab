module.exports = function moviesData(sequelize, Datatypes){

    alias = 'productos';

    cols = {
      id: { type: Datatypes.INTEGER, primaryKey:true, autoIncrement:true},
      create_at: {type: Datatypes.DATE, allowNull:false},
      update_at: {type: Datatypes.DATE, allowNull:false},
      delete_at: {type: Datatypes.DATE, allowNull:false},
      nombre: {type: Datatypes.STRING(255), allowNull:false},
      imagen: {type: Datatypes.STRING(500), allowNull:false},
      descripcion: { type: Datatypes.STRING(255), allowNull:false},
      precio_lista: { type: Datatypes.DECIMAL, allowNull:false},
      descuento: {type: Datatypes.DECIMAL, allowNull:false},
    };
    config = {};

    productos = sequelize.define(alias,cols,config)
    
    return productos;
    }
    