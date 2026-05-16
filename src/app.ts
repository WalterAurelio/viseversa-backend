import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from '@routes/user.routes';
import productRoutes from '@routes/product.routes';
import commentRoutes from '@routes/comment.routes';
import { errorHandler } from '@middleware/errorHandler';
import { AppError } from '@errors/AppError';

dotenv.config();

const app = express();

// Middleware de Seguridad y Parsing
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Logging de Requests
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`📨 ${req.method} ${req.path}`);
  next();
});

// Health Check
app.get('/api/health', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'success',
    message: 'Servidor en funcionamiento',
    timestamp: new Date().toISOString(),
  });
});

// Rutas API
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/comments', commentRoutes);

// Rutas no encontradas (404)
app.use((req: Request, res: Response, next: NextFunction) => {
  throw AppError.notFound(`Ruta no encontrada: ${req.method} ${req.path}`);
});

// Middleware de Manejo de Errores Global
app.use(errorHandler);

export default app;
