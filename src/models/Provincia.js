import { DataTypes } from 'sequelize';
import sequelize from '../db/connection.js'; // Nota la extensión .js

const Provincia = sequelize.define('Provincia', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    }

}, {
    tableName: 'provincias',
    timestamps: false
});

export default Provincia;