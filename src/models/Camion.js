import { DataTypes } from 'sequelize';
import sequelize from '../db/connection.js'; // Nota la extensión .js

const Camion = sequelize.define('Camion', {

    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        unique: true
    },
    modelo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    marca: {
        type: DataTypes.STRING,
        allowNull: true
    },
    capacidad: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
}, 
{
    tableName: 'camiones',
    timestamps: false
});

export default Camion;