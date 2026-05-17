import { Request, Response } from 'express';
import User from '../models/User';
import { AppError } from '../errors/AppError';
import { asyncHandler } from '../middleware/errorHandler';

// Crear usuario
export const createUser = asyncHandler(async (req: Request, res: Response) => {
  const { nombreUsuario, nombres, apellidos, email, contraseña, fotoPerfil, ubicacion } = req.body;

  const userExists = await User.findOne({
    $or: [{ email }, { nombreUsuario }],
  });

  if (userExists) {
    throw AppError.conflict(
      'El email o nombre de usuario ya está registrado'
    );
  }

  const user = await User.create({
    nombreUsuario,
    nombres,
    apellidos,
    email,
    contraseña,
    fotoPerfil,
    ubicacion,
  });

  res.status(201).json({
    status: 'success',
    statusCode: 201,
    message: 'Usuario creado exitosamente',
    data: user,
  });
});

// Obtener todos los usuarios
export const getUsers = asyncHandler(async (req: Request, res: Response) => {
  const users = await User.find().select('-contraseña');

  res.status(200).json({
    status: 'success',
    statusCode: 200,
    message: 'Usuarios obtenidos exitosamente',
    data: users,
  });
});

// Obtener usuario por ID
export const getUserById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const user = await User.findById(id).select('-contraseña');

  if (!user) {
    throw AppError.notFound('Usuario no encontrado');
  }

  res.status(200).json({
    status: 'success',
    statusCode: 200,
    message: 'Usuario obtenido exitosamente',
    data: user,
  });
});

// Actualizar usuario
export const updateUser = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { nombreUsuario, nombres, apellidos, email, contraseña, fotoPerfil, ubicacion, puntacion } = req.body;

  // Verificar si el usuario existe
  const user = await User.findById(id);
  if (!user) {
    throw AppError.notFound('Usuario no encontrado');
  }

  // Verificar si el nuevo email o nombreUsuario ya existe
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

  // Actualizar campos
  if (nombreUsuario) user.nombreUsuario = nombreUsuario;
  if (nombres) user.nombres = nombres;
  if (apellidos) user.apellidos = apellidos;
  if (email) user.email = email;
  if (contraseña) user.contraseña = contraseña;
  if (fotoPerfil !== undefined) user.fotoPerfil = fotoPerfil;
  if (ubicacion !== undefined) user.ubicacion = ubicacion;
  if (puntacion !== undefined) user.puntacion = puntacion;

  const updatedUser = await user.save();

  const userResponse = updatedUser.toObject();
  delete (userResponse as Partial<typeof userResponse>).contraseña;

  res.status(200).json({
    status: 'success',
    statusCode: 200,
    message: 'Usuario actualizado exitosamente',
    data: userResponse,
  });
});

// Eliminar usuario
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
    data: user,
  });
});
