import { z } from 'zod';

// Esquema para crear comentario
export const createCommentSchema = z.object({
  body: z.object({
    usuarioId: z
      .string()
      .refine((val) => /^[0-9a-fA-F]{24}$/.test(val), {
        message: 'ID de usuario inválido',
      }),
      productoId: z
      .string()
      .refine((val) => /^[0-9a-fA-F]{24}$/.test(val), {
        message: 'ID de producto inválido',
      }),
    descripcion: z
      .string()
      .min(5, 'La descripción debe tener al menos 5 caracteres')
      .max(500, 'La descripción no puede exceder 500 caracteres'),
    imagenes: z.array(z.string()).optional(),
  }),
});

// Esquema para actualizar comentario
export const updateCommentSchema = z.object({
  body: z.object({
    descripcion: z
      .string()
      .min(5, 'La descripción debe tener al menos 5 caracteres')
      .max(500, 'La descripción no puede exceder 500 caracteres')
      .optional(),
    imagenes: z.array(z.string()).optional(),
  }),
});

// Esquema para obtener comentario por ID
export const getCommentByIdSchema = z.object({
  params: z.object({
    id: z.string().refine((val) => /^[0-9a-fA-F]{24}$/.test(val), {
      message: 'ID inválido',
    }),
  }),
});

// Esquema para eliminar comentario
export const deleteCommentSchema = z.object({
  params: z.object({
    id: z.string().refine((val) => /^[0-9a-fA-F]{24}$/.test(val), {
      message: 'ID inválido',
    }),
  }),
});

// Tipos TypeScript derivados de Zod
export type CreateCommentInput = z.infer<typeof createCommentSchema>;
export type UpdateCommentInput = z.infer<typeof updateCommentSchema>;
