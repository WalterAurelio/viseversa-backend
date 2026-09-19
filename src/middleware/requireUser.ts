import { Request, Response, NextFunction } from "express";
import User from "../models/User";
import { AppError } from "../errors/AppError";

export const validateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const firebaseUid = req.user?.uid;
    const user = await User.findOne({ firebaseUid });

    if (!user) {
      throw AppError.notFound("Usuario no encontrado");
    }

    req.dbUser = user;
    next();
  } catch (error) {
    next(error);
  }
};
