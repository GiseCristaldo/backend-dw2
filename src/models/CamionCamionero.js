// src/models/CamionCamionero.js
import { DataTypes } from 'sequelize';
import sequelize from '../db/connection.js';

const CamionCamionero = sequelize.define('CamionCamionero', {
  idCamionero: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: 'camioneros',
      key: 'id'
    }
  },
  idCamion: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: 'camiones',
      key: 'id'
    }
  }
}, {
  tableName: 'camiones_camioneros', // Nombre real en tu base
  timestamps: false
});

export default CamionCamionero;
