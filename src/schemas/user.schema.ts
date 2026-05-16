import { z } from 'zod';

// Esquema para crear usuario
export const createUserSchema = z.object({
  body: z.object({
    nombreUsuario: z
      .string()
      .min(3, 'El nombre de usuario debe tener al menos 3 caracteres')
      .max(30, 'El nombre de usuario no puede exceder 30 caracteres'),
    nombres: z
      .string()
      .min(1, 'Los nombres son requeridos')
      .max(100, 'Los nombres no pueden exceder 100 caracteres'),
    apellidos: z
      .string()
      .min(1, 'Los apellidos son requeridos')
      .max(100, 'Los apellidos no pueden exceder 100 caracteres'),
    email: z
      .string()
      .email('Por favor proporciona un email válido'),
    contraseña: z
      .string()
      .min(6, 'La contraseña debe tener al menos 6 caracteres'),
    fotoPerfil: z.string().optional(),
    ubicacion: z.string().optional(),
  }),
});

// Esquema para actualizar usuario
export const updateUserSchema = z.object({
  body: z.object({
    nombreUsuario: z
      .string()
      .min(3, 'El nombre de usuario debe tener al menos 3 caracteres')
      .max(30, 'El nombre de usuario no puede exceder 30 caracteres')
      .optional(),
    nombres: z
      .string()
      .min(1, 'Los nombres son requeridos')
      .max(100, 'Los nombres no pueden exceder 100 caracteres')
      .optional(),
    apellidos: z
      .string()
      .min(1, 'Los apellidos son requeridos')
      .max(100, 'Los apellidos no pueden exceder 100 caracteres')
      .optional(),
    email: z
      .string()
      .email('Por favor proporciona un email válido')
      .optional(),
    contraseña: z
      .string()
      .min(6, 'La contraseña debe tener al menos 6 caracteres')
      .optional(),
    fotoPerfil: z.string().optional(),
    ubicacion: z.string().optional(),
    puntacion: z
      .number()
      .min(0, 'La puntuación no puede ser negativa')
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
