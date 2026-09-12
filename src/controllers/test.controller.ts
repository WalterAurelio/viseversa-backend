import { Request, Response } from "express";
import User from "../models/User";
import { AppError } from "../errors/AppError";
import { asyncHandler } from "../middleware/errorHandler";
import { getAuth } from "firebase-admin/auth";
import { connectDb } from "../config/database";
import seedUsers from "../seeds/seedUsers";

export const deleteUser = asyncHandler(async (req: Request, res: Response) => {
  const email = req.body.email;

  const firebaseUser = await getAuth().getUserByEmail(email);
  await getAuth().deleteUser(firebaseUser.uid);

  const user = await User.findOneAndDelete({ email });
  if (!user) {
    throw AppError.notFound("Usuario no encontrado");
  }

  res.status(200).json({ message: "Usuario eliminado correctamente" });
});

export const seedDb = asyncHandler(async (req: Request, res: Response) => {
  await connectDb();
  await seedUsers();
  res.status(200).json({ message: "Base de datos sembrada correctamente" });
});
