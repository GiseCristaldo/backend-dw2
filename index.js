
// index.js (en la raíz del proyecto) - Versión Actualizada
import express from 'express';
// Importamos sequelize y los modelos
import { sequelize } from './src/models/index.js';

// --- AQUÍ IRÍAN TUS RUTAS API ---

// 📦 Importa rutas (¡agregá esta línea!)
import camioneros from './src/routes/camioneros.routes.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // parseamos el cuerpo a JSON

// ✅ Usa las rutas
app.use('/api/camioneros', camioneros);

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
