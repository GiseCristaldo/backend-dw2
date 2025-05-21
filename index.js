import express from 'express';
import { sequelize } from './src/models/index.js'; // Importamos sequelize y los modelos

// --- AQUÍ IRÍAN TUS RUTAS API ---

import camioneros from './src/routes/camioneros.routes.js';
import camion from './src/routes/camiones.routes.js';
import camionCamionero from './src/routes/camionCamionero.routes.js';
import paquetes from './src/routes/paquetes.routes.js';
import provincias from './src/routes/provincias.routes.js';


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // parseamos el cuerpo a JSON

// ✅ Usa las rutas
app.use('/api/camioneros', camioneros);
app.use('/api/camiones', camion);
app.use('/api/camion-camionero', camionCamionero);
app.use('/api/paquetes', paquetes);
app.use('/api/provincias', provincias);

// Iniciar servidor y sincronizar DB
async function startServer() {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexión a la base de datos establecida correctamente.');

    // Sincroniza los modelos con la base de datos.
    // force: false (default) - No borra tablas si existen.
    // force: true - Borra y recrea tablas. ¡PELIGROSO en producción!
    // alter: true - Intenta modificar tablas existentes.
    await sequelize.sync({ force: false }); // Cambia bajo tu propio riesgo
    console.log('🔄 Modelos sincronizados con la base de datos.');

    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Error al iniciar el servidor:', error);
  }
}

startServer();
