// src/models/Cliente.js
import { DataTypes } from 'sequelize';
import sequelize from '../db/connection.js'; // Nota la extensión .js

const Camionero = sequelize.define('Camionero', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        unique: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    domicilio: {
        type: DataTypes.STRING,
        allowNull: true
    },
    telefono: {
        type: DataTypes.STRING,
        allowNull: true
    },

    salario: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    }
}, {
    tableName: 'camioneros',
    timestamps: false
});

export default Camionero;