import { Request, Response } from "express";
import User from "../../models/User";
import { AppError } from "../../errors/AppError";
import { asyncHandler } from "../../middleware/errorHandler";
import { CreateUserSchema } from "../../schemas/user.schema";

export const createUserAccount = asyncHandler(async (req: Request, res: Response) => {
  const firebaseUid = req.user?.uid;
  const email = req.user?.email;
  const body = req.body as CreateUserSchema["body"];
  const userExists = await User.findOne({ $or: [{ email }, { firebaseUid }] });

  if (userExists) {
    throw AppError.conflict("El email o nombre de usuario ya está registrado");
  }

  const user = await User.create({ email, firebaseUid, ...body });

  res.status(201).json({
    status: "success",
    statusCode: 201,
    message: "Usuario creado exitosamente",
    data: { id: user._id.toString() }
  });
});
