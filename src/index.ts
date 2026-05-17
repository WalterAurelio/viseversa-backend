import dotenv from 'dotenv';
dotenv.config();
import app from './app';
import { connectDB } from './config/database';

const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';

const startServer = async () => {
  try {
    // Conectar a MongoDB
    await connectDB();

    // Iniciar servidor
    app.listen(PORT, () => {
      console.log(`
========================================
🚀 Servidor iniciado exitosamente
========================================
📍 URL: http://localhost:${PORT}
🔧 Entorno: ${NODE_ENV}
📊 Health Check: http://localhost:${PORT}/api/health
========================================
      `);
    });
  } catch (error) {
    console.error('❌ Error iniciando el servidor:', error);
    process.exit(1);
  }
};

startServer();
