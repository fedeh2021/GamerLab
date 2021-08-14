module.exports = (sequelize, dataTypes) => {
    
    const alias = 'Cliente'
    
    const cols = {
        id: {
            type: dataTypes.SMALLINT(6).UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        envioFK: {
            type: dataTypes.INTEGER,
            allowNull:false
        },
        nombre: {
            type: dataTypes.STRING,
            allowNull: false
        },
        apellido: {
            type: dataTypes.STRING,
            allowNull: false
        },
        email: {
            type: dataTypes.STRING,
            allowNull: false
        },
        contraseña: {
            type: dataTypes.STRING,
            allowNull: false
        },
        rol: {
            type: dataTypes.TINYINT(1),
            allowNull: false
        },
        dni: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        fecha_nacimiento: {
            type: dataTypes.DATEONLY,
            allowNull: false
        },
        telefono: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        imagen: {
            type: dataTypes.STRING,
            allowNull: false
        },
        created_at: {
            type: dataTypes.DATE, 
            allowNull: false
        },
        updated_at: {
            type: dataTypes.DATE,
            allowNull: false
        },
        deleted_at: {
            type: dataTypes.DATE,
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
          as: "Envio",
          foreignKey: "envioFK"
        });
        Cliente.belongsToMany( models.Producto, {
            as: "Producto",
            through: "pedidos",
            foreignKey: "clienteFK",
            otherKey: "clienteFK",
            timestamps: false
        })
    }

    return Cliente;
}