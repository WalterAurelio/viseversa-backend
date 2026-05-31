import { z } from 'zod';
import { PRODUCT } from '../utils/validation';

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
      .min(PRODUCT.TITLE.MIN_LENGTH, PRODUCT.TITLE.MIN_LENGTH_MESSAGE)
      .max(PRODUCT.TITLE.MAX_LENGTH, PRODUCT.TITLE.MAX_LENGTH_MESSAGE),
    descripcion: z
      .string()
      .min(PRODUCT.DESCRIPTION.MIN_LENGTH, PRODUCT.DESCRIPTION.MIN_LENGTH_MESSAGE)
      .max(PRODUCT.DESCRIPTION.MAX_LENGTH, PRODUCT.DESCRIPTION.MAX_LENGTH_MESSAGE),
    imagenes: z.array(z.string()).optional(),
    estaActivo: z.boolean().optional(),
  }),
});

// Esquema para actualizar producto
export const updateProductSchema = z.object({
  body: z.object({
    titulo: z
      .string()
      .min(PRODUCT.TITLE.MIN_LENGTH, PRODUCT.TITLE.MIN_LENGTH_MESSAGE)
      .max(PRODUCT.TITLE.MAX_LENGTH, PRODUCT.TITLE.MAX_LENGTH_MESSAGE)
      .optional(),
    descripcion: z
      .string()
      .min(PRODUCT.DESCRIPTION.MIN_LENGTH, PRODUCT.DESCRIPTION.MIN_LENGTH_MESSAGE)
      .max(PRODUCT.DESCRIPTION.MAX_LENGTH, PRODUCT.DESCRIPTION.MAX_LENGTH_MESSAGE)
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
