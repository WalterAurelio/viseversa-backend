import { z } from 'zod';

// Esquema para crear producto
export const createProductSchema = z.object({
  body: z.object({
    usuarioId: z
      .string()
      .refine((val) => /^[0-9a-fA-F]{24}$/.test(val), {
        message: 'ID de usuario inválido',
      }),
    titulo: z
      .string()
      .min(3, 'El título debe tener al menos 3 caracteres')
      .max(100, 'El título no puede exceder 100 caracteres'),
    descripcion: z
      .string()
      .min(10, 'La descripción debe tener al menos 10 caracteres')
      .max(1000, 'La descripción no puede exceder 1000 caracteres'),
    imagenes: z.array(z.string()).optional(),
    estaActivo: z.boolean().optional(),
  }),
});

// Esquema para actualizar producto
export const updateProductSchema = z.object({
  body: z.object({
    titulo: z
      .string()
      .min(3, 'El título debe tener al menos 3 caracteres')
      .max(100, 'El título no puede exceder 100 caracteres')
      .optional(),
    descripcion: z
      .string()
      .min(10, 'La descripción debe tener al menos 10 caracteres')
      .max(1000, 'La descripción no puede exceder 1000 caracteres')
      .optional(),
    imagenes: z.array(z.string()).optional(),
    estaActivo: z.boolean().optional(),
  }),
});

// Esquema para obtener producto por ID
export const getProductByIdSchema = z.object({
  params: z.object({
    id: z.string().refine((val) => /^[0-9a-fA-F]{24}$/.test(val), {
      message: 'ID inválido',
    }),
  }),
});

// Esquema para eliminar producto
export const deleteProductSchema = z.object({
  params: z.object({
    id: z.string().refine((val) => /^[0-9a-fA-F]{24}$/.test(val), {
      message: 'ID inválido',
    }),
  }),
});

// Tipos TypeScript derivados de Zod
export type CreateProductInput = z.infer<typeof createProductSchema>;
export type UpdateProductInput = z.infer<typeof updateProductSchema>;
