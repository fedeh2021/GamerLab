module.exports = (sequelize, dataTypes) => {
    const alias = 'envios'
    const cols = {
        id: {
            type: dataTypes.SMALLINT(6).UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        pais: {
            type: dataTypes.VARCHAR(123),
            allowNull: false
        },
        ciudad: {
            type: dataTypes.VARCHAR(255),
            allowNull: false
        },
        region: {
            type: dataTypes.VARCHAR(255),
            allowNull: false
        },
        direccion: {
            type: dataTypes.VARCHAR(255),
            allowNull: false
        },
        altura: {
            type: dataTypes.VARCHAR(255),
            allowNull: false
        },
        piso: {
            type: dataTypes.VARCHAR(255),
            allowNull: false
        },
        codigo_postal: {
            type: dataTypes.VARCHAR(255),
            allowNull: false   
        }
    }
    const config = {
        tablename: 'envios',
        timestamps: false,
        camelCase: false
    }
    const Envio = sequelize.define(alias, cols, config);

    return Envio;
}