import { Request, Response, NextFunction } from 'express';
import { AppError } from '@errors/AppError';

interface ErrorResponse {
  status: string;
  statusCode: number;
  message: string;
  data?: unknown;
  timestamp: string;
  path: string;
}

export const errorHandler = (error: Error | AppError, req: Request, res: Response, next: NextFunction) => {
  console.error('Error:', error);

  let statusCode = 500;
  let message = 'Ocurrió un error interno del servidor';
  let isOperational = false;

  if (error instanceof AppError) {
    statusCode = error.statusCode;
    message = error.message;
    isOperational = error.isOperational;
  }

  const errorResponse: ErrorResponse = {
    status: 'error',
    statusCode,
    message,
    timestamp: new Date().toISOString(),
    path: req.path
  };

  // Enviar más detalles en desarrollo
  if (process.env.NODE_ENV === 'development') {
    errorResponse.data = {
      stack: error instanceof Error ? error.stack : undefined
    };
  }

  // Si no es un error operacional, registrar y no enviar detalles
  if (!isOperational) {
    console.error('Error no operacional:', error);
    errorResponse.message = 'Ocurrió un error interno del servidor';
  }

  res.status(statusCode).json(errorResponse);
};

export const asyncHandler = (fn: (req: Request, res: Response, next: NextFunction) => Promise<void>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
