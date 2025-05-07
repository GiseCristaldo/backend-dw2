import { DataTypes } from 'sequelize';
import sequelize from '../db/connection.js'; // Nota la extensión .js

const Paquete = sequelize.define('Paquete', {

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        unique: true
    },

   descripcion: {
    type: DataTypes.STRING,
    allowNull: false   
    },

    nombre_destinatario:{
        type: DataTypes.STRING,
        allowNull: false
    },
    
    domicilio_destinatario: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cuil_camionero: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: 'camioneros', // Nombre de la TABLA referenciada
            key: 'id'
        }
    }
}, {
        tableName: 'paquetes',
        timestamps: false
    });
    
    export default Paquete;