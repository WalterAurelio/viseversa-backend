import { z } from "zod";

export const createUserSchema = z.object({
  body: z.object({
    name: z.string().min(1, "El nombre es requerido"),
    lastName: z.string().min(1, "El apellido es requerido"),
    username: z.string().min(1, "El nombre de usuario es requerido"),
    profilePicture: z.string().optional(),
    location: z.string().optional()
  })
});

export const getUserByIdSchema = z.object({
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, "ID inválido")
  })
});

export const updateUserSchema = z.object({
  body: createUserSchema.shape.body.partial()
});

export type CreateUserSchema = z.infer<typeof createUserSchema>;
export type GetUserByIdSchema = z.infer<typeof getUserByIdSchema>;
export type UpdateUserSchema = z.infer<typeof updateUserSchema>;
