import { z } from 'zod';
import { USER } from '../utils/validation';

// Esquema para crear usuario
export const createUserSchema = z.object({
  body: z.object({
    nombreUsuario: z
      .string()
      .min(USER.NOMBRE_USUARIO.MIN_LENGTH, USER.NOMBRE_USUARIO.MIN_LENGTH_MESSAGE)
      .max(USER.NOMBRE_USUARIO.MAX_LENGTH, USER.NOMBRE_USUARIO.MAX_LENGTH_MESSAGE),
    nombres: z
      .string()
      .min(USER.NOMBRES.MIN_LENGTH, USER.NOMBRES.MIN_LENGTH_MESSAGE)
      .max(USER.NOMBRES.MAX_LENGTH, USER.NOMBRES.MAX_LENGTH_MESSAGE),
    apellidos: z
      .string()
      .min(USER.APELLIDOS.MIN_LENGTH, USER.APELLIDOS.MIN_LENGTH_MESSAGE)
      .max(USER.APELLIDOS.MAX_LENGTH, USER.APELLIDOS.MAX_LENGTH_MESSAGE),
    email: z
      .string()
      .email(USER.EMAIL.INVALID_MESSAGE),
    contraseña: z
      .string()
      .min(USER.CONTRASEÑA.MIN_LENGTH, USER.CONTRASEÑA.MIN_LENGTH_MESSAGE),
    fotoPerfil: z.string().optional(),
    ubicacion: z.string().optional(),
  }),
});

// Esquema para actualizar usuario
export const updateUserSchema = z.object({
  body: z.object({
    nombreUsuario: z
      .string()
      .min(USER.NOMBRE_USUARIO.MIN_LENGTH, USER.NOMBRE_USUARIO.MIN_LENGTH_MESSAGE)
      .max(USER.NOMBRE_USUARIO.MAX_LENGTH, USER.NOMBRE_USUARIO.MAX_LENGTH_MESSAGE)
      .optional(),
    nombres: z
      .string()
      .min(USER.NOMBRES.MIN_LENGTH, USER.NOMBRES.MIN_LENGTH_MESSAGE)
      .max(USER.NOMBRES.MAX_LENGTH, USER.NOMBRES.MAX_LENGTH_MESSAGE)
      .optional(),
    apellidos: z
      .string()
      .min(USER.APELLIDOS.MIN_LENGTH, USER.APELLIDOS.MIN_LENGTH_MESSAGE)
      .max(USER.APELLIDOS.MAX_LENGTH, USER.APELLIDOS.MAX_LENGTH_MESSAGE)
      .optional(),
    email: z
      .string()
      .email(USER.EMAIL.INVALID_MESSAGE)
      .optional(),
    contraseña: z
      .string()
      .min(USER.CONTRASEÑA.MIN_LENGTH, USER.CONTRASEÑA.MIN_LENGTH_MESSAGE)
      .optional(),
    fotoPerfil: z.string().optional(),
    ubicacion: z.string().optional(),
    puntacion: z
      .number()
      .min(USER.PUNTACION.MIN_VALUE, USER.PUNTACION.MIN_VALUE_MESSAGE)
      .optional(),
  }),
});

// Esquema para obtener usuario por ID (params)
export const getUserByIdSchema = z.object({
  params: z.object({
    id: z.string().refine((val) => /^[0-9a-fA-F]{24}$/.test(val), {
      message: 'ID inválido',
    }),
  }),
});

// Esquema para eliminar usuario por ID
export const deleteUserSchema = z.object({
  params: z.object({
    id: z.string().refine((val) => /^[0-9a-fA-F]{24}$/.test(val), {
      message: 'ID inválido',
    }),
  }),
});

// Tipos TypeScript derivados de Zod
export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
