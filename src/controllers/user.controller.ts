import { Request, Response } from 'express';
import User from '../models/User';
import { AppError } from '../errors/AppError';
import { asyncHandler } from '../middleware/errorHandler';
import { CreateUserInput, UpdateUserInput } from '@/schemas/user.schema';
import { UserDto } from '../dtos/user.dto';

export const createUser = asyncHandler(async (req: Request, res: Response) => {
  const { nombreUsuario, nombres, apellidos, email, contraseña, fotoPerfil, ubicacion } = req.body as CreateUserInput['body'];

  const userExists = await User.findOne({
    $or: [{ email }, { nombreUsuario }]
  });

  if (userExists) {
    throw AppError.conflict('El email o nombre de usuario ya está registrado');
  }

  const user = await User.create({
    nombreUsuario,
    nombres,
    apellidos,
    email,
    contraseña,
    fotoPerfil,
    ubicacion
  });

  res.status(201).json({
    status: 'success',
    statusCode: 201,
    message: 'Usuario creado exitosamente',
    data: new UserDto(user)
  });
});

export const getUsers = asyncHandler(async (req: Request, res: Response) => {
  const users = await User.find();

  res.status(200).json({
    status: 'success',
    statusCode: 200,
    message: 'Usuarios obtenidos exitosamente',
    data: users.map(user => new UserDto(user))
  });
});

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
    data: new UserDto(user)
  });
});

export const updateUser = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { nombreUsuario, nombres, apellidos, email, contraseña, fotoPerfil, ubicacion, puntacion } = req.body as UpdateUserInput['body'];

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
    data: new UserDto(updatedUser)
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
    data: new UserDto(user)
  });
});
