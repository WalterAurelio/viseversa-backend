import { Request, Response } from 'express';
import Comment from '../models/Comment';
import User from '../models/User';
import { AppError } from '../errors/AppError';
import { asyncHandler } from '../middleware/errorHandler';

// Crear comentario
export const createComment = asyncHandler(async (req: Request, res: Response) => {
  const { usuarioId, descripcion, imagenes } = req.body;

  // Verificar que el usuario existe
  const user = await User.findById(usuarioId);
  if (!user) {
    throw AppError.notFound('Usuario no encontrado');
  }

  const comment = await Comment.create({
    usuarioId,
    descripcion,
    imagenes,
  });

  // Populate del usuario
  await comment.populate('usuarioId', '-contraseña');

  res.status(201).json({
    status: 'success',
    statusCode: 201,
    message: 'Comentario creado exitosamente',
    data: comment,
  });
});

// Obtener todos los comentarios
export const getComments = asyncHandler(async (req: Request, res: Response) => {
  const comments = await Comment.find().populate('usuarioId', '-contraseña');

  res.status(200).json({
    status: 'success',
    statusCode: 200,
    message: 'Comentarios obtenidos exitosamente',
    data: comments,
  });
});

// Obtener comentario por ID
export const getCommentById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const comment = await Comment.findById(id).populate('usuarioId', '-contraseña');

  if (!comment) {
    throw AppError.notFound('Comentario no encontrado');
  }

  res.status(200).json({
    status: 'success',
    statusCode: 200,
    message: 'Comentario obtenido exitosamente',
    data: comment,
  });
});

// Actualizar comentario
export const updateComment = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { descripcion, imagenes } = req.body;

  // Verificar que el comentario existe
  const comment = await Comment.findById(id);
  if (!comment) {
    throw AppError.notFound('Comentario no encontrado');
  }

  // Actualizar campos
  if (descripcion) comment.descripcion = descripcion;
  if (imagenes !== undefined) comment.imagenes = imagenes;

  const updatedComment = await comment.save();
  await updatedComment.populate('usuarioId', '-contraseña');

  res.status(200).json({
    status: 'success',
    statusCode: 200,
    message: 'Comentario actualizado exitosamente',
    data: updatedComment,
  });
});

// Eliminar comentario
export const deleteComment = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const comment = await Comment.findByIdAndDelete(id);

  if (!comment) {
    throw AppError.notFound('Comentario no encontrado');
  }

  res.status(200).json({
    status: 'success',
    statusCode: 200,
    message: 'Comentario eliminado exitosamente',
    data: comment,
  });
});
