module.exports = (sequelize, dataTypes) => {
    const alias = 'clientes'
    const cols = {
        id: {
            type: dataTypes.SMALLINT(6).UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        envioFK: {
            type: dataTypes.INT(11),
            allowNull:false
        },
        nombre: {
            type: dataTypes.VARCHAR(123),
            allowNull: false
        },
        apellido: {
            type: dataTypes.VARCHAR(255),
            allowNull: false
        },
        email: {
            type: dataTypes.VARCHAR(255),
            allowNull: false
        },
        contraseña: {
            type: dataTypes.VARCHAR(255),
            allowNull: false
        },
        rol: {
            type: dataTypes.TINYINT(1),
            allowNull: false
        },
        dni: {
            type: dataTypes.INT(11),
            allowNull: false
        },
        fecha_nacimiento: {
            type: dataTypes.DATE,
            allowNull: false
        },
        telefono: {
            type: dataTypes.INT(11),
            allowNull: false
        },
        imagen: {
            type: dataTypes.VARCHAR(255),
            allowNull: false
        },
        created_at: {
            type: dataTypes.DATETIME, 
            allowNull: false
        },
        updated_at: {
            type: dataTypes.DATETIME,
            allowNull: false
        },
        deleted_at: {
            type: dataTypes.DATETIME,
            allowNull: false
        }
    }
    const config = {
        tablename: 'clientes',
        timestamps: false,
        camelCase: false
    }
    const Cliente = sequelize.define(alias, cols, config);

    Cliente.associate = function (models) {
        Cliente.belongsTo( models.Envio, {
          as: "envios",
          foreignKey: "envioFK"
        });
    }

    return Cliente;
}