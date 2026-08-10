import { Request, Response } from 'express';
import User from '../models/User';
import { AppError } from '../errors/AppError';
import { asyncHandler } from '../middleware/errorHandler';
import { UpdateUserInput } from '@/schemas/user.schema';
import { ApiResponse } from '@/types/apiResponse';
import { UserProfileDto } from '../dtos/user.dto';

export const getUserProfile = asyncHandler(async (req: Request, res: Response<ApiResponse<UserProfileDto>>) => {
  const firebaseUid = req.user?.uid;

  const user = await User.findOne({ firebaseUid });
  if (!user) {
    throw AppError.notFound('Usuario no encontrado');
  }

  res.status(200).json({
    status: 'success',
    statusCode: 200,
    message: 'Perfil de usuario obtenido exitosamente',
    data: new UserProfileDto(user)
  });
});

// A revisar
export const getUserById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const user = await User.findById(id);

  if (!user) {
    throw AppError.notFound('Usuario no encontrado');
  }

  res.status(200).json({
    status: 'success',
    statusCode: 200,
    message: 'Usuario obtenido exitosamente',
    data: new UserProfileDto(user)
  });
});

export const updateUser = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const email = req.user?.email;
  const { nombreUsuario, nombre, apellido, fotoPerfil, ubicacion } = req.body as UpdateUserInput['body'];

  const user = await User.findById(id);
  if (!user) {
    throw AppError.notFound('Usuario no encontrado');
  }

  if (email && email !== user.email) {
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      throw AppError.conflict('El email ya está registrado');
    }
  }

  if (nombreUsuario && nombreUsuario !== user.nombreUsuario) {
    const existingUsername = await User.findOne({ nombreUsuario });
    if (existingUsername) {
      throw AppError.conflict('El nombre de usuario ya está registrado');
    }
  }

  const updatedData = Object.fromEntries(Object.entries(req.body).filter(([key, value]) => value !== undefined));
  Object.assign(user, updatedData);
  const updatedUser = await user.save();

  res.status(200).json({
    status: 'success',
    statusCode: 200,
    message: 'Usuario actualizado exitosamente',
    data: new UserProfileDto(updatedUser)
  });
});

export const deleteUser = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const user = await User.findByIdAndDelete(id);

  if (!user) {
    throw AppError.notFound('Usuario no encontrado');
  }

  res.status(200).json({
    status: 'success',
    statusCode: 200,
    message: 'Usuario eliminado exitosamente',
    data: new UserProfileDto(user)
  });
});
