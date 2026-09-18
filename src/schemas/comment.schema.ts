import { z } from "zod";

const commentIdSchema = z.string().regex(/^[0-9a-fA-F]{24}$/, "ID inválido");

export const getCommentsByProductIdSchema = z.object({
  params: z.object({
    productId: commentIdSchema
  })
});

export const createCommentSchema = z.object({
  body: z.object({
    parentCommentId: commentIdSchema.optional(),
    content: z.string().trim().min(1, "El contenido es requerido")
  }),
  params: getCommentsByProductIdSchema.shape.params
});

export const updateCommentSchema = z.object({
  body: z.object({
    content: createCommentSchema.shape.body.shape.content
  }),
  params: z.object({
    id: commentIdSchema
  })
});

export const deleteCommentByIdSchema = z.object({
  params: updateCommentSchema.shape.params
});

export type GetCommentsByProductIdInput = z.infer<typeof getCommentsByProductIdSchema>;
export type CreateCommentInput = z.infer<typeof createCommentSchema>;
export type UpdateCommentInput = z.infer<typeof updateCommentSchema>;
export type DeleteCommentByIdInput = z.infer<typeof deleteCommentByIdSchema>;
