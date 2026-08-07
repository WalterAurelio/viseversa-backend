import { Request, Response } from 'express';
import User from '../models/User';
import { AppError } from '../errors/AppError';
import { asyncHandler } from '../middleware/errorHandler';
import { CreateUserInput } from '../schemas/user.schema';
import { UserDto } from '../dtos/user.dto';

export const registerUser = asyncHandler(async (req: Request, res: Response) => {
  const email = req.user?.email;
  const firebaseUid = req.user?.uid;
  const { nombre, apellido, nombreUsuario } = req.body as CreateUserInput['body'];

  // Verificar si el usuario ya existe por email o firebaseUid
  const userExists = await User.findOne({
    $or: [{ email }, { firebaseUid }]
  });

  // Si el usuario ya existe, lanzar un error de conflicto
  if (userExists) {
    throw AppError.conflict('El email o nombre de usuario ya está registrado');
  }

  // Crear un nuevo usuario en la base de datos
  const user = await User.create({
    email,
    // contraseña,
    nombre,
    apellido,
    nombreUsuario,
    firebaseUid
  });

  // Responder con el usuario creado
  res.status(201).json({
    status: 'success',
    statusCode: 201,
    message: 'Usuario creado exitosamente',
    data: new UserDto(user)
  });
});
