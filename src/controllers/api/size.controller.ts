import { asyncHandler } from "../../middleware/errorHandler";
import { Request, Response } from "express";
import { sizeByCategory } from "../../types/Size";
import { Category } from "../../types/Category";
import { AppError } from "../../errors/AppError";

export const getSizes = asyncHandler(async (req: Request, res: Response) => {
  const { category } = req.params as { category: Category };

  if (!sizeByCategory[category]) {
    throw AppError.badRequest("Categoría no válida");
  }

  const sizes = sizeByCategory[category];

  res.json({
    status: "success",
    statusCode: 200,
    message: "Talles obtenidas correctamente",
    data: sizes
  });
});
