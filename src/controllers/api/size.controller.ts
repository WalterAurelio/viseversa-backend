import { asyncHandler } from "../../middleware/errorHandler";
import { Request, Response } from "express";
import { sizeByCategory } from "../../types/Size";
import { Category } from "../../types/Category";

export const getSizes = asyncHandler(async (req: Request, res: Response) => {
  const { category } = req.params as { category: Category };

  const sizes = sizeByCategory[category];

  res.json({
    status: "success",
    statusCode: 200,
    message: "Talles obtenidas correctamente",
    data: sizes
  });
});
