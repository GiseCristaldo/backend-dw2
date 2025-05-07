// src/models/index.js
import sequelize from '../db/connection.js';

// Importa todos los modelos (nota las extensiones .js)
import Camionero from './Camionero.js';
import Provincia from './Provincia.js';
import Paquete from './Paquete.js';
import Camion from './Camion.js';
import CamionCamionero from './CamionCamionero.js';

// --- Definir Asociaciones ---

// Relación Paquete <-> Provincia (1:N)
Paquete.hasMany(Provincia, {
    foreignKey: 'idProvincia',
    sourceKey: 'id'
});
Provincia.belongsTo(Paquete, {
    foreignKey: 'idProvincia',
    targetKey: 'id'
});

// Relación Camioneros <-> Paquetes (1:N)
Camionero.hasMany(Paquete, {
    foreignKey: 'idCamionero',
    sourceKey: 'id'
});
Paquete.belongsTo(Camionero, {
    foreignKey: 'idCamionero',
    targetKey: 'id'
});

// Relación Camion <-> Camionero (N:M)
Camionero.belongsToMany(Camion, {
    through: CamionCamionero,
    foreignKey: 'idCamionero',
    otherKey: 'idCamion'
})
Camion.belongsToMany(Camionero,{
    through: CamionCamionero,
    foreignKey: 'idCamion',
    otherKey: 'idCamionero'
});

// Exporta la instancia de sequelize y todos los modelos usando named exports
export {
    sequelize,
    Camion,
    Paquete,
    Provincia,
    Camionero,
    CamionCamionero,
};
