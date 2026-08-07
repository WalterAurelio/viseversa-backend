import { z } from 'zod';
import { USER } from '../utils/validation';

// Esquema para crear usuario
export const createUserSchema = z.object({
  body: z.object({
    /* email: z
      .string()
      .email(USER.EMAIL.INVALID_MESSAGE), */
    /* contraseña: z
      .string()
      .min(USER.CONTRASEÑA.MIN_LENGTH, USER.CONTRASEÑA.MIN_LENGTH_MESSAGE), */
    nombre: z.string().min(USER.NOMBRE.MIN_LENGTH, USER.NOMBRE.MIN_LENGTH_MESSAGE).max(USER.NOMBRE.MAX_LENGTH, USER.NOMBRE.MAX_LENGTH_MESSAGE),
    apellido: z.string().min(USER.APELLIDO.MIN_LENGTH, USER.APELLIDO.MIN_LENGTH_MESSAGE).max(USER.APELLIDO.MAX_LENGTH, USER.APELLIDO.MAX_LENGTH_MESSAGE),
    nombreUsuario: z
      .string()
      .min(USER.NOMBRE_USUARIO.MIN_LENGTH, USER.NOMBRE_USUARIO.MIN_LENGTH_MESSAGE)
      .max(USER.NOMBRE_USUARIO.MAX_LENGTH, USER.NOMBRE_USUARIO.MAX_LENGTH_MESSAGE),
    fotoPerfil: z.string().optional(),
    ubicacion: z.string().optional()
  })
});

// Esquema para actualizar usuario
export const updateUserSchema = z.object({
  body: z.object({
    /* email: z
      .string()
      .email(USER.EMAIL.INVALID_MESSAGE)
      .optional(), */
    /* contraseña: z
      .string()
      .min(USER.CONTRASEÑA.MIN_LENGTH, USER.CONTRASEÑA.MIN_LENGTH_MESSAGE)
      .optional(), */
    nombre: z.string().min(USER.NOMBRE.MIN_LENGTH, USER.NOMBRE.MIN_LENGTH_MESSAGE).max(USER.NOMBRE.MAX_LENGTH, USER.NOMBRE.MAX_LENGTH_MESSAGE).optional(),
    apellido: z.string().min(USER.APELLIDO.MIN_LENGTH, USER.APELLIDO.MIN_LENGTH_MESSAGE).max(USER.APELLIDO.MAX_LENGTH, USER.APELLIDO.MAX_LENGTH_MESSAGE).optional(),
    nombreUsuario: z
      .string()
      .min(USER.NOMBRE_USUARIO.MIN_LENGTH, USER.NOMBRE_USUARIO.MIN_LENGTH_MESSAGE)
      .max(USER.NOMBRE_USUARIO.MAX_LENGTH, USER.NOMBRE_USUARIO.MAX_LENGTH_MESSAGE)
      .optional(),
    fotoPerfil: z.string().optional(),
    ubicacion: z.string().optional()
  })
});

// Esquema para obtener usuario por ID (params)
export const getUserByIdSchema = z.object({
  params: z.object({
    id: z.string().refine(val => /^[0-9a-fA-F]{24}$/.test(val), {
      message: 'ID inválido'
    })
  })
});

// Esquema para eliminar usuario por ID
export const deleteUserSchema = z.object({
  params: z.object({
    id: z.string().refine(val => /^[0-9a-fA-F]{24}$/.test(val), {
      message: 'ID inválido'
    })
  })
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
