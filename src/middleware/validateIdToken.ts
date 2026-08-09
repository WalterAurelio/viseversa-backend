import { AppError } from '../errors/AppError';
import { Request, Response, NextFunction } from 'express';
import { getAuth, DecodedIdToken, FirebaseAuthError } from 'firebase-admin/auth';

// Extendemos la interfaz Request para incluir la propiedad user
declare module 'express-serve-static-core' {
  interface Request {
    user?: DecodedIdToken;
  }
}

export const validateIdToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    const formattedAuthHeader = authHeader as string;

    if (!formattedAuthHeader?.startsWith('Bearer ')) {
      throw AppError.unauthorized('No se proporcionó un token de autorización válido');
    }

    const token = formattedAuthHeader.split(' ')[1];

    try {
      const decodedToken = await getAuth().verifyIdToken(token);
      console.debug('Firebase ID token verificado');
      req.user = decodedToken;
      next();
    } catch (error) {
      if (error instanceof FirebaseAuthError) {
        console.error('Error al verificar el token de Firebase', error);
        throw AppError.unauthorized('Token de autorización inválido');
      }
      throw error;
    }
  } catch (error) {
    next(error);
  }
};
