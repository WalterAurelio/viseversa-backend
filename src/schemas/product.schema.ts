import { z } from "zod";
import { categories } from "../types/Category";
import { genders } from "../types/Gender";
import { colors } from "../types/Colour";
import { conditions } from "../types/Condition";
import { sizeByCategory } from "../types/Size";

export const createProductSchema = z.object({
  body: z
    .object({
      title: z.string().min(1, "El título es requerido"),
      description: z.string().min(1, "La descripción es requerida"),
      images: z.array(z.string()).min(1, "Se requiere al menos una imagen"),
      category: z.enum(categories, { message: "La categoría es inválida" }),
      gender: z.enum(genders, { message: "El género es inválido" }),
      size: z.string().min(1, "La talla es requerida"),
      color: z.enum(colors, { message: "El color es inválido" }),
      brand: z.string().min(1, "La marca es requerida"),
      condition: z.enum(conditions, { message: "La condición es inválida" })
    })
    .refine(
      ({ category, size }) => {
        const validSizes = sizeByCategory[category] as readonly string[];
        return validSizes.includes(size);
      },
      {
        path: ["size"],
        message: "La talla no es válida para la categoría seleccionada"
      }
    )
});

export const getProductByIdSchema = z.object({
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, "ID inválido")
  })
});

export const getProductsByQuerySchema = z.object({
  query: z.object({
    query: z.string().trim().min(1, "La búsqueda no puede estar vacía")
  })
});

export const updateProductSchema = z.object({
  body: createProductSchema.shape.body,
  params: getProductByIdSchema.shape.params
});

export const deleteProductByIdSchema = getProductByIdSchema;

export type CreateProductInput = z.infer<typeof createProductSchema>;
export type GetProductByIdInput = z.infer<typeof getProductByIdSchema>;
export type GetProductsByQueryInput = z.infer<typeof getProductsByQuerySchema>;
export type UpdateProductInput = z.infer<typeof updateProductSchema>;
export type DeleteProductByIdInput = z.infer<typeof deleteProductByIdSchema>;
