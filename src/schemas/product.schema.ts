import { z } from "zod";

export const createProductSchema = z.object({
  body: z.object({
    title: z.string().min(1, "El título es requerido"),
    description: z.string().min(1, "La descripción es requerida"),
    images: z.array(z.string()).min(1, "Se requiere al menos una imagen"),
    category: z.string().min(1, "La categoría es requerida"),
    gender: z.string().min(1, "El género es requerido"),
    size: z.string().min(1, "La talla es requerida"),
    color: z.string().min(1, "El color es requerido"),
    brand: z.string().min(1, "La marca es requerida"),
    condition: z.string().min(1, "La condición es requerida")
  })
});

export const getProductByIdSchema = z.object({
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, "ID inválido")
  })
});

export const updateProductSchema = z.object({
  body: createProductSchema.shape.body.partial(),
  params: getProductByIdSchema.shape.params
});

export const deleteProductByIdSchema = getProductByIdSchema;

export type CreateProductInput = z.infer<typeof createProductSchema>;
export type GetProductByIdInput = z.infer<typeof getProductByIdSchema>;
export type UpdateProductInput = z.infer<typeof updateProductSchema>;
export type DeleteProductByIdInput = z.infer<typeof deleteProductByIdSchema>;
