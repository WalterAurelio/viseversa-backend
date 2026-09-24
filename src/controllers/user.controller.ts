import { Request, Response } from "express";
import User from "../models/User";
import { AppError } from "../errors/AppError";
import { asyncHandler } from "../middleware/errorHandler";
import { UserProfileDto } from "../dtos/user.dto";
import { GetUserByIdSchema, UpdateUserSchema } from "../schemas/user.schema";

export const getUserProfile = asyncHandler(async (req: Request, res: Response) => {
  const user = req.dbUser!;
  res.status(200).json({
    status: "success",
    statusCode: 200,
    message: "Perfil de usuario obtenido exitosamente",
    data: new UserProfileDto(user)
  });
});

export const getUserById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params as GetUserByIdSchema["params"];
  const user = await User.findById(id);

  if (!user) {
    throw AppError.notFound("Usuario no encontrado");
  }

  res.status(200).json({
    status: "success",
    statusCode: 200,
    message: "Usuario obtenido exitosamente",
    data: new UserProfileDto(user)
  });
});

// A revisar
export const updateUser = asyncHandler(async (req: Request, res: Response) => {
  const user = req.dbUser!;
  const currentEmail = req.user?.email;
  const body = req.body as UpdateUserSchema["body"];

  if (body.username && body.username !== user.username) {
    const existingUser = await User.findOne({ username: body.username });
    if (existingUser) {
      throw AppError.conflict("El nombre de usuario ya está en uso");
    }
  }

  Object.assign(user, body);
  const updatedUser = await user.save();

  res.status(200).json({
    status: "success",
    statusCode: 200,
    message: "Usuario actualizado exitosamente",
    data: new UserProfileDto(updatedUser)
  });
});

export const deleteUser = asyncHandler(async (req: Request, res: Response) => {
  const user = req.dbUser!;
  await user.deleteOne();

  res.status(200).json({
    status: "success",
    statusCode: 200,
    message: "Usuario eliminado exitosamente",
    data: new UserProfileDto(user)
  });
});
